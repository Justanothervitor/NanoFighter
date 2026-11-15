import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  mover,
  executarMovimento,
  estaDentroDosLimites,
  bacteriaNaPosicao,
} from '../../src/dominio/mapa.js';
import {
  PROVISORIO_LARGURA_GRADE,
  PROVISORIO_ALTURA_GRADE,
} from '../../src/config/index.js';
import { EVENTOS, limpar, ouvir } from '../../src/eventos/index.js';
import { definirEstado, reiniciarEstado } from '../../src/estado/index.js';

describe('Domínio: Mapa e Movimentação (RF09, RF10)', () => {
  beforeEach(() => {
    reiniciarEstado();
    limpar();
  });

  it('deve validar limites corretamente', () => {
    expect(estaDentroDosLimites({ x: 0, y: 0 }, 10, 10)).toBe(true);
    expect(estaDentroDosLimites({ x: 9, y: 9 }, 10, 10)).toBe(true);
    expect(estaDentroDosLimites({ x: -1, y: 0 }, 10, 10)).toBe(false);
    expect(estaDentroDosLimites({ x: 0, y: -1 }, 10, 10)).toBe(false);
    expect(estaDentroDosLimites({ x: 10, y: 5 }, 10, 10)).toBe(false);
    expect(estaDentroDosLimites({ x: 5, y: 10 }, 10, 10)).toBe(false);
  });

  it('deve encontrar bactéria por posição', () => {
    const bacterias = [
      { id: 'b1', cor: 'verde', posicao: { x: 3, y: 4 } },
      { id: 'b2', cor: 'amarela', posicao: { x: 5, y: 6 } },
    ];

    expect(bacteriaNaPosicao({ x: 3, y: 4 }, bacterias)).toEqual(bacterias[0]);
    expect(bacteriaNaPosicao({ x: 0, y: 0 }, bacterias)).toBeNull();
  });

  it('função pura mover deve atualizar posição nas direções permitidas', () => {
    const estado = {
      jogador: { posicao: { x: 2, y: 2 } },
      bacteriasNoMapa: [],
      confronto: null,
    };

    const estadoCima = mover(estado, 'cima');
    expect(estadoCima.jogador.posicao).toEqual({ x: 2, y: 1 });

    const estadoBaixo = mover(estado, 'baixo');
    expect(estadoBaixo.jogador.posicao).toEqual({ x: 2, y: 3 });

    const estadoEsq = mover(estado, 'esquerda');
    expect(estadoEsq.jogador.posicao).toEqual({ x: 1, y: 2 });

    const estadoDir = mover(estado, 'direita');
    expect(estadoDir.jogador.posicao).toEqual({ x: 3, y: 2 });
  });

  it('critério de aceitação: mover para fora dos limites NÃO altera a posição', () => {
    const estadoCantoSuperior = {
      jogador: { posicao: { x: 0, y: 0 } },
      bacteriasNoMapa: [],
      confronto: null,
    };

    const tentouCima = mover(estadoCantoSuperior, 'cima');
    expect(tentouCima.jogador.posicao).toEqual({ x: 0, y: 0 });

    const tentouEsq = mover(estadoCantoSuperior, 'esquerda');
    expect(tentouEsq.jogador.posicao).toEqual({ x: 0, y: 0 });

    const estadoCantoInferior = {
      jogador: {
        posicao: {
          x: PROVISORIO_LARGURA_GRADE - 1,
          y: PROVISORIO_ALTURA_GRADE - 1,
        },
      },
      bacteriasNoMapa: [],
      confronto: null,
    };

    const tentouDir = mover(estadoCantoInferior, 'direita');
    expect(tentouDir.jogador.posicao).toEqual({
      x: PROVISORIO_LARGURA_GRADE - 1,
      y: PROVISORIO_ALTURA_GRADE - 1,
    });

    const tentouBaixo = mover(estadoCantoInferior, 'baixo');
    expect(tentouBaixo.jogador.posicao).toEqual({
      x: PROVISORIO_LARGURA_GRADE - 1,
      y: PROVISORIO_ALTURA_GRADE - 1,
    });
  });

  it('critério de aceitação: encostar numa bactéria emite exatamente 1 confronto:iniciado', () => {
    const bacteria = { id: 'bact-teste', cor: 'verde', posicao: { x: 1, y: 0 } };
    definirEstado({
      jogador: { posicao: { x: 0, y: 0 } },
      bacteriasNoMapa: [bacteria],
      confronto: null,
    });

    const listener = vi.fn();
    ouvir(EVENTOS.CONFRONTO_INICIADO, listener);

    // Movimenta para cima da bactéria
    executarMovimento('direita');

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith({ bacteria });

    // Tentativa de novo movimento enquanto em confronto não deve emitir novo evento
    executarMovimento('direita');
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it('critério de aceitação: em batalha, W/A/S/D não movem o personagem', () => {
    const bacteria = { id: 'b1', cor: 'vermelha', posicao: { x: 2, y: 2 } };
    const estadoComConfronto = {
      jogador: { posicao: { x: 2, y: 2 } },
      bacteriasNoMapa: [bacteria],
      confronto: { bacteria, opcoes: [], turno: 1, indiceSelecionado: 0 },
    };

    definirEstado(estadoComConfronto);

    expect(mover(estadoComConfronto, 'cima').jogador.posicao).toEqual({ x: 2, y: 2 });
    expect(mover(estadoComConfronto, 'baixo').jogador.posicao).toEqual({ x: 2, y: 2 });
    expect(mover(estadoComConfronto, 'esquerda').jogador.posicao).toEqual({ x: 2, y: 2 });
    expect(mover(estadoComConfronto, 'direita').jogador.posicao).toEqual({ x: 2, y: 2 });

    const resultadoExecucao = executarMovimento('baixo');
    expect(resultadoExecucao).toBeNull();
  });
});
