import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  parsearCsvRanking,
  carregarSimulados,
  limparCacheSimulados,
} from '../../src/dados/ranking.js';
import fs from 'node:fs';
import path from 'node:path';

describe('Dados: Ranking CSV (RF42)', () => {
  beforeEach(() => {
    limparCacheSimulados();
  });

  it('parsearCsvRanking deve processar CSV válido', () => {
    const csv = `nomeJogador,pontuacao
BioGuard,1500
NanoHero,1200`;

    const dados = parsearCsvRanking(csv);
    expect(dados).toEqual([
      { nomeJogador: 'BioGuard', pontuacao: 1500 },
      { nomeJogador: 'NanoHero', pontuacao: 1200 },
    ]);
  });

  it('parsearCsvRanking deve rejeitar cabeçalho ou linhas inválidas', () => {
    expect(() => parsearCsvRanking('coluna1,coluna2\na,1')).toThrow('Cabeçalho CSV inválido');
    expect(() => parsearCsvRanking('nomeJogador,pontuacao\nInvalido,abc')).toThrow('Pontuação inválida');
    expect(() => parsearCsvRanking('nomeJogador,pontuacao\nSoUmValor')).toThrow('Linha inválida');
  });

  it('carregarSimulados deve buscar via fetch e tratar erros HTTP e rede', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => `nomeJogador,pontuacao\nBioGuard,1500\nNanoHero,1200`,
    });

    const lista = await carregarSimulados('/data/pontuacaoMockada.csv', {
      fetch: fetchMock,
      forcarRecarga: true,
    });

    expect(fetchMock).toHaveBeenCalledWith('/data/pontuacaoMockada.csv');
    expect(lista.length).toBe(2);

    // Erro HTTP 404
    const fetchMock404 = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });
    await expect(
      carregarSimulados('/data/inexistente.csv', {
        fetch: fetchMock404,
        forcarRecarga: true,
      })
    ).rejects.toThrow('Falha HTTP ao carregar');
  });

  it('critério de aceitação: o arquivo public/data/pontuacaoMockada.csv físico contém 10 jogadores com 3 a 8 caracteres', () => {
    const caminhoReal = path.resolve(process.cwd(), 'public/data/pontuacaoMockada.csv');
    const conteudoReal = fs.readFileSync(caminhoReal, 'utf-8');

    const lista = parsearCsvRanking(conteudoReal);
    expect(lista.length).toBe(10);

    lista.forEach((jogador) => {
      expect(jogador.nomeJogador.length).toBeGreaterThanOrEqual(3);
      expect(jogador.nomeJogador.length).toBeLessThanOrEqual(8);
      expect(jogador.pontuacao).toBeGreaterThanOrEqual(0);
    });
  });
});
