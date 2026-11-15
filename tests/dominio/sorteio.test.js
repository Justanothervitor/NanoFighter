import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  chanceTerapia,
  sortearUmMedicamento,
  sortearOpcoes,
  vincularSorteioAosEventos,
  MEDICAMENTOS_PADRAO,
} from '../../src/dominio/sorteio.js';
import { criarRngDeterministico } from '../../src/util/rng.js';
import { EVENTOS, limpar, emitir, ouvir } from '../../src/eventos/index.js';
import { definirEstado, reiniciarEstado, obterEstado } from '../../src/estado/index.js';

describe('Domínio: Sorteio de Medicamentos (RF14, RF18, RF36, RF39)', () => {
  beforeEach(() => {
    reiniciarEstado();
    limpar();
  });

  it('critério de aceitação: chanceTerapia(1) = 0,025 e chanceTerapia(10) = 0,5', () => {
    expect(chanceTerapia(1)).toBe(0.025);
    expect(chanceTerapia(10)).toBe(0.5);

    // Nível intermediário 5
    // 0.025 + 4 * (0.475 / 9) = 0.025 + 0.211111... ≈ 0.236111...
    expect(chanceTerapia(5)).toBeCloseTo(0.23611, 4);

    // Clamping para valores fora da faixa
    expect(chanceTerapia(0)).toBe(0.025);
    expect(chanceTerapia(15)).toBe(0.5);
  });

  it('critério de aceitação: com rng determinístico, sortearOpcoes é reproduzível', () => {
    const semente = 42;
    const rng1 = criarRngDeterministico(semente);
    const rng2 = criarRngDeterministico(semente);

    const opcoes1 = sortearOpcoes(1, MEDICAMENTOS_PADRAO, rng1);
    const opcoes2 = sortearOpcoes(1, MEDICAMENTOS_PADRAO, rng2);

    expect(opcoes1).toEqual(opcoes2);
    expect(opcoes1.length).toBe(2);
  });

  it('critério de aceitação: em 10.000 sorteios simulados no nível 1, a frequência da Terapia fica dentro de ±1 ponto percentual de 2,5%', () => {
    const totalSorteios = 10000;
    const sementeFixa = 12345;
    const rng = criarRngDeterministico(sementeFixa);

    let contagemTerapia = 0;

    for (let i = 0; i < totalSorteios; i++) {
      const med = sortearUmMedicamento(1, MEDICAMENTOS_PADRAO, rng);
      if (med.nome === 'Terapia Fotodinâmica') {
        contagemTerapia++;
      }
    }

    const frequenciaObservada = contagemTerapia / totalSorteios;
    const frequenciaEsperada = 0.025; // 2,5%
    const margemMaxima = 0.01; // ± 1 ponto percentual (1,5% a 3,5%)

    expect(frequenciaObservada).toBeGreaterThanOrEqual(frequenciaEsperada - margemMaxima);
    expect(frequenciaObservada).toBeLessThanOrEqual(frequenciaEsperada + margemMaxima);
  });

  it('critério de aceitação: cada confronto:iniciado produz exatamente 1 medicamento:sorteado com 2 opções', () => {
    definirEstado({
      jogador: { nivelXp: 1 },
      confronto: {
        bacteria: { id: 'b1', cor: 'verde', posicao: { x: 2, y: 2 } },
        opcoes: [],
        turno: 1,
      },
    });

    const desvincular = vincularSorteioAosEventos();
    const listener = vi.fn();
    ouvir(EVENTOS.MEDICAMENTO_SORTEADO, listener);

    emitir(EVENTOS.CONFRONTO_INICIADO, { bacteria: { id: 'b1', cor: 'verde' } });

    expect(listener).toHaveBeenCalledTimes(1);
    const chamada = listener.mock.calls[0][0];
    expect(chamada).toBeDefined();
    expect(chamada.opcoes).toBeDefined();
    expect(chamada.opcoes.length).toBe(2);

    // O estado central do confronto deve guardar as 2 opções
    const estado = obterEstado();
    expect(estado.confronto.opcoes).toEqual(chamada.opcoes);

    desvincular();
  });

  it('critério de aceitação: ao ouvir medicamento:usado, deve ressortear e emitir novo medicamento:sorteado (RF36)', () => {
    definirEstado({
      jogador: { nivelXp: 2 },
      confronto: {
        bacteria: { id: 'b1', cor: 'amarela', posicao: { x: 3, y: 3 } },
        opcoes: [
          { nome: 'Antigo 1', eficacia: 0.5 },
          { nome: 'Antigo 2', eficacia: 0.5 },
        ],
        turno: 1,
      },
    });

    const desvincular = vincularSorteioAosEventos();
    const listener = vi.fn();
    ouvir(EVENTOS.MEDICAMENTO_SORTEADO, listener);

    emitir(EVENTOS.MEDICAMENTO_USADO, {
      medicamento: { nome: 'Vírus', eficacia: 0.65 },
      sucesso: false,
      bacteria: { id: 'b1', cor: 'amarela' },
    });

    expect(listener).toHaveBeenCalledTimes(1);
    const opcoesRessorteadas = listener.mock.calls[0][0].opcoes;
    expect(opcoesRessorteadas.length).toBe(2);

    const estado = obterEstado();
    expect(estado.confronto.opcoes).toEqual(opcoesRessorteadas);

    desvincular();
  });
});
