import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  obterComposicaoFase,
  gerarBacterias,
  gerarModoInfinito,
  popularMapaParaFase,
  vincularComposicaoAosEventos,
} from '../../src/dominio/composicao.js';
import {
  COMPOSICAO_FASE_1,
  PROVISORIO_COMPOSICAO_POR_FASE,
  PROVISORIO_LIMITE_BACTERIAS_MODO_INFINITO,
  METAS_POR_FASE,
} from '../../src/config/index.js';
import { criarRngDeterministico } from '../../src/util/rng.js';
import { EVENTOS, limpar, emitir, ouvir } from '../../src/eventos/index.js';
import { definirEstado, reiniciarEstado, obterEstado } from '../../src/estado/index.js';

describe('Domínio: Composição e Geração de Bactérias (RF48, RF49, RF50, RF51, RF52, RF53)', () => {
  beforeEach(() => {
    reiniciarEstado();
    limpar();
  });

  it('critério de aceitação: fase 1 tem exatamente 9 verdes e 1 amarela (RF48)', () => {
    const comp1 = obterComposicaoFase(1);
    expect(comp1.verde).toBe(9);
    expect(comp1.amarela).toBe(1);
    expect(comp1.vermelha).toBe(0);

    const bacterias = gerarBacterias(1, { largura: 10, altura: 10 });
    const verdes = bacterias.filter((b) => b.cor === 'verde');
    const amarelas = bacterias.filter((b) => b.cor === 'amarela');
    const vermelhas = bacterias.filter((b) => b.cor === 'vermelha');

    expect(verdes.length).toBe(9);
    expect(amarelas.length).toBe(1);
    expect(vermelhas.length).toBe(0);
    expect(bacterias.length).toBe(10);
  });

  it('critério de aceitação: todas as invariantes passam para as fases 1 a 4', () => {
    // Invariante 1: soma de cada fase é igual à meta da fase (10, 15, 20, 25)
    for (let f = 1; f <= 4; f++) {
      const comp = obterComposicaoFase(f);
      const soma = comp.verde + comp.amarela + comp.vermelha;
      expect(soma).toBe(METAS_POR_FASE[f]);
    }

    // Invariante 2: de uma fase para a seguinte (2 a 4), amarelas aumentam e verdes diminuem
    for (let f = 1; f < 4; f++) {
      const compAtual = obterComposicaoFase(f);
      const compSeguinte = obterComposicaoFase(f + 1);

      expect(compSeguinte.amarela).toBeGreaterThan(compAtual.amarela);
      expect(compSeguinte.verde).toBeLessThan(compAtual.verde);
    }

    // Invariante 3: vermelha >= 1 a partir da fase 3
    expect(obterComposicaoFase(1).vermelha).toBe(0);
    expect(obterComposicaoFase(2).vermelha).toBe(0);
    expect(obterComposicaoFase(3).vermelha).toBeGreaterThanOrEqual(1);
    expect(obterComposicaoFase(4).vermelha).toBeGreaterThanOrEqual(1);

    // Invariante 4: fase 4 sem verdes
    expect(obterComposicaoFase(4).verde).toBe(0);
  });

  it('geração determinística com semente produz idêntica disposição de posições e cores', () => {
    const semente = 8888;
    const rng1 = criarRngDeterministico(semente);
    const rng2 = criarRngDeterministico(semente);

    const b1 = gerarBacterias(2, { largura: 10, altura: 10 }, rng1, { x: 0, y: 0 });
    const b2 = gerarBacterias(2, { largura: 10, altura: 10 }, rng2, { x: 0, y: 0 });

    expect(b1).toEqual(b2);
  });

  it('células sem sobreposição: nenhuma bactéria ocupa a mesma célula e nem a célula do jogador', () => {
    const posJogador = { x: 3, y: 3 };
    const rng = criarRngDeterministico(12345);
    const bacterias = gerarBacterias(4, { largura: 10, altura: 10 }, rng, posJogador);

    expect(bacterias.length).toBe(25);

    const posicoesOcupadas = new Set();
    for (const b of bacterias) {
      const chave = `${b.posicao.x},${b.posicao.y}`;
      // Garante que não sobrepõe outra bactéria
      expect(posicoesOcupadas.has(chave)).toBe(false);
      posicoesOcupadas.add(chave);

      // Garante que não sobrepõe o jogador
      expect(b.posicao).not.toEqual(posJogador);
    }
  });

  it('critério de aceitação: no modo infinito, a quantidade gerada nunca excede o limite (25) e nunca é 0 (RF52)', () => {
    const rng = criarRngDeterministico(999);

    for (let i = 0; i < 50; i++) {
      const bacterias = gerarModoInfinito({ largura: 10, altura: 10 }, rng, { x: 0, y: 0 });
      expect(bacterias.length).toBeGreaterThanOrEqual(1);
      expect(bacterias.length).toBeLessThanOrEqual(PROVISORIO_LIMITE_BACTERIAS_MODO_INFINITO);

      // Composição sem verdes no modo infinito
      const temVerdes = bacterias.some((b) => b.cor === 'verde');
      expect(temVerdes).toBe(false);
    }
  });

  it('critério de aceitação: quando o contador do mapa chega a 0 no modo infinito, uma nova leva aparece (RF53); nos níveis 1 a 4 isso não ocorre', () => {
    const desvincular = vincularComposicaoAosEventos();

    // 1. Nível 1 a 4: com mapa zerado, NÃO gera nova leva automaticamente
    definirEstado({
      fase: 2,
      bacteriasNoMapa: [],
      jogador: { posicao: { x: 0, y: 0 } },
    });

    emitir(EVENTOS.BACTERIA_DERROTADA, {
      bacteria: { id: 'bact-1', cor: 'verde' },
    });

    expect(obterEstado().bacteriasNoMapa.length).toBe(0);

    // 2. Modo Infinito (fase 5): com mapa zerado, GERA nova leva
    definirEstado({
      fase: 5,
      bacteriasNoMapa: [],
      jogador: { posicao: { x: 0, y: 0 } },
    });

    emitir(EVENTOS.BACTERIA_DERROTADA, {
      bacteria: { id: 'bact-inf', cor: 'vermelha' },
    });

    const novoEstadoInf = obterEstado();
    expect(novoEstadoInf.bacteriasNoMapa.length).toBeGreaterThan(0);
    expect(novoEstadoInf.bacteriasNoMapa.length).toBeLessThanOrEqual(PROVISORIO_LIMITE_BACTERIAS_MODO_INFINITO);

    desvincular();
  });

  it('ao ouvir fase:iniciada, popula o mapa com as bactérias da respectiva fase', () => {
    definirEstado({
      fase: 3,
      bacteriasNoMapa: [],
      jogador: { posicao: { x: 0, y: 0 } },
    });

    const desvincular = vincularComposicaoAosEventos();

    emitir(EVENTOS.FASE_INICIADA, { fase: 3 });

    const estado = obterEstado();
    expect(estado.bacteriasNoMapa.length).toBe(20); // Meta da fase 3

    desvincular();
  });
});
