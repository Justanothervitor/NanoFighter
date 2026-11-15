import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  parsearCsvMedicamentos,
  normalizarEficacia,
  carregarMedicamentos,
  limparCacheMedicamentos,
} from '../../src/dados/medicamentos.js';
import fs from 'node:fs';
import path from 'node:path';

describe('Dados: Medicamentos CSV (RF14, RF15, RF16, RF17, RF35)', () => {
  beforeEach(() => {
    limparCacheMedicamentos();
  });

  it('normalizarEficacia deve tratar valores percentuais e decimais (ponto e vírgula)', () => {
    expect(normalizarEficacia('65')).toBe(0.65);
    expect(normalizarEficacia('65%')).toBe(0.65);
    expect(normalizarEficacia('0.65')).toBe(0.65);
    expect(normalizarEficacia('0,65')).toBe(0.65);

    expect(normalizarEficacia('99')).toBe(0.99);
    expect(normalizarEficacia('0.99')).toBe(0.99);

    expect(normalizarEficacia('50')).toBe(0.5);
    expect(normalizarEficacia('0.50')).toBe(0.5);
    expect(normalizarEficacia('0,5')).toBe(0.5);
  });

  it('normalizarEficacia deve lançar erro claro para valores inválidos', () => {
    expect(() => normalizarEficacia('invalido')).toThrow('Eficácia fora dos limites válidos');
    expect(() => normalizarEficacia('-5')).toThrow('Eficácia fora dos limites válidos');
    expect(() => normalizarEficacia('150')).toThrow('Eficácia fora dos limites válidos');
  });

  it('parsearCsvMedicamentos deve ler CSV válido com acento em "eficácia"', () => {
    const csv = `nomeMedicamento,eficácia
Vírus,0.65
Terapia Fotodinâmica,0.99
Medicamento com IA,0.50`;

    const meds = parsearCsvMedicamentos(csv);
    expect(meds).toEqual([
      { nome: 'Vírus', eficacia: 0.65 },
      { nome: 'Terapia Fotodinâmica', eficacia: 0.99 },
      { nome: 'Medicamento com IA', eficacia: 0.5 },
    ]);
  });

  it('parsearCsvMedicamentos deve aceitar formato percentual inteiro (65, 99, 50)', () => {
    const csv = `nomeMedicamento,eficácia
Vírus,65
Terapia Fotodinâmica,99
Medicamento com IA,50`;

    const meds = parsearCsvMedicamentos(csv);
    expect(meds[0].eficacia).toBe(0.65);
    expect(meds[1].eficacia).toBe(0.99);
    expect(meds[2].eficacia).toBe(0.5);
  });

  it('parsearCsvMedicamentos deve falhar com mensagem clara para cabeçalho inválido', () => {
    const csv = `colunaA,colunaB
Vírus,0.65`;
    expect(() => parsearCsvMedicamentos(csv)).toThrow('Cabeçalho CSV inválido');
  });

  it('parsearCsvMedicamentos deve falhar com mensagem clara para linha sem colunas suficientes', () => {
    const csv = `nomeMedicamento,eficácia
Vírus`;
    expect(() => parsearCsvMedicamentos(csv)).toThrow('Linha inválida 2 no CSV de medicamentos');
  });

  it('carregarMedicamentos deve buscar via fetch e tratar erros HTTP e de rede', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => `nomeMedicamento,eficácia\nVírus,0.65\nTerapia Fotodinâmica,0.99\nMedicamento com IA,0.50`,
    });

    const lista = await carregarMedicamentos('/data/medicamentos.csv', {
      fetch: fetchMock,
      forcarRecarga: true,
    });

    expect(fetchMock).toHaveBeenCalledWith('/data/medicamentos.csv');
    expect(lista.length).toBe(3);
    expect(lista[0].nome).toBe('Vírus');
    expect(lista[0].eficacia).toBe(0.65);

    // Erro HTTP (ex: 404)
    const fetchMock404 = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });
    await expect(
      carregarMedicamentos('/caminho/inexistente.csv', {
        fetch: fetchMock404,
        forcarRecarga: true,
      })
    ).rejects.toThrow('Falha HTTP ao carregar');

    // Erro de rede
    const fetchMockRede = vi.fn().mockRejectedValue(new Error('Network disconnected'));
    await expect(
      carregarMedicamentos('/data/medicamentos.csv', {
        fetch: fetchMockRede,
        forcarRecarga: true,
      })
    ).rejects.toThrow('Erro de rede');
  });

  it('critério de aceitação: o arquivo public/data/medicamentos.csv real é lido sem erro de codificação', () => {
    const caminhoReal = path.resolve(process.cwd(), 'public/data/medicamentos.csv');
    const conteudoReal = fs.readFileSync(caminhoReal, 'utf-8');

    const meds = parsearCsvMedicamentos(conteudoReal);
    expect(meds.length).toBe(3);

    const virus = meds.find((m) => m.nome === 'Vírus');
    const terapia = meds.find((m) => m.nome === 'Terapia Fotodinâmica');
    const ia = meds.find((m) => m.nome === 'Medicamento com IA');

    expect(virus).toBeDefined();
    expect(virus.eficacia).toBe(0.65);

    expect(terapia).toBeDefined();
    expect(terapia.eficacia).toBe(0.99);

    expect(ia).toBeDefined();
    expect(ia.eficacia).toBe(0.50);
  });
});
