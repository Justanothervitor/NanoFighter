import { describe, it, expect, beforeEach } from 'vitest';
import {
  obterEstado,
  atualizarEstado,
  reiniciarEstado,
  definirEstado,
  criarEstadoInicial,
} from '../../src/estado/index.js';
import {
  PV_INICIAL,
  PV_MAXIMO_INICIAL,
  NIVEL_XP_INICIAL,
  XP_INICIAL,
  USERNAME_PADRAO,
  FASE_INICIAL,
  PROVISORIO_POSICAO_INICIAL_JOGADOR,
} from '../../src/config/index.js';

describe('Estado Central', () => {
  beforeEach(() => {
    reiniciarEstado();
  });

  it('deve ter a forma inicial completa definida pelo contrato', () => {
    const estado = obterEstado();

    expect(estado).toEqual({
      jogador: {
        username: USERNAME_PADRAO,
        pv: PV_INICIAL,
        pvMax: PV_MAXIMO_INICIAL,
        nivelXp: NIVEL_XP_INICIAL,
        xp: XP_INICIAL,
        pontuacao: 0,
        posicao: PROVISORIO_POSICAO_INICIAL_JOGADOR,
      },
      fase: FASE_INICIAL,
      eliminadasNaFase: 0,
      bacteriasNoMapa: [],
      confronto: null,
    });
  });

  it('deve respeitar username customizado ao criar estado inicial', () => {
    const estadoCustom = criarEstadoInicial({ username: 'nanomed' });
    expect(estadoCustom.jogador.username).toBe('nanomed');
  });

  it('deve garantir que obterEstado() retorne uma cópia imutável', () => {
    const estado = obterEstado();
    estado.jogador.pv = 999;
    estado.bacteriasNoMapa.push({ id: 'fake' });

    const novoEstado = obterEstado();
    expect(novoEstado.jogador.pv).toBe(PV_INICIAL);
    expect(novoEstado.bacteriasNoMapa).toEqual([]);
  });

  it('deve atualizar o estado através de objeto parcial', () => {
    atualizarEstado({
      jogador: { pv: 8, pontuacao: 50 },
      eliminadasNaFase: 3,
    });

    const estado = obterEstado();
    expect(estado.jogador.pv).toBe(8);
    expect(estado.jogador.pontuacao).toBe(50);
    expect(estado.jogador.username).toBe(USERNAME_PADRAO); // Preservado
    expect(estado.eliminadasNaFase).toBe(3);
  });

  it('deve atualizar o estado através de função redutora', () => {
    atualizarEstado((atual) => ({
      ...atual,
      fase: 2,
      jogador: {
        ...atual.jogador,
        pontuacao: atual.jogador.pontuacao + 100,
      },
    }));

    const estado = obterEstado();
    expect(estado.fase).toBe(2);
    expect(estado.jogador.pontuacao).toBe(100);
  });

  it('deve reiniciar o estado para as configurações padrão', () => {
    atualizarEstado({
      fase: 4,
      eliminadasNaFase: 12,
      jogador: { pv: 2, pontuacao: 500 },
    });

    reiniciarEstado();
    const estado = obterEstado();

    expect(estado.fase).toBe(FASE_INICIAL);
    expect(estado.eliminadasNaFase).toBe(0);
    expect(estado.jogador.pv).toBe(PV_INICIAL);
    expect(estado.jogador.pontuacao).toBe(0);
  });

  it('deve permitir substituir o estado completamente com definirEstado()', () => {
    const estadoMock = {
      jogador: {
        username: 'alfa',
        pv: 5,
        pvMax: 10,
        nivelXp: 3,
        xp: 15,
        pontuacao: 300,
      },
      fase: 3,
      eliminadasNaFase: 7,
      bacteriasNoMapa: [{ id: 'b1', cor: 'verde', posicao: { x: 1, y: 1 } }],
      confronto: null,
    };

    definirEstado(estadoMock);
    expect(obterEstado()).toEqual(estadoMock);
  });
});
