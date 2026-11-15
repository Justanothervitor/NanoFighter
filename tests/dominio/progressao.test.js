import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  pontosBase,
  fatorB,
  xpGanho,
  multiplicador,
  aplicarVitoria,
  vincularProgressaoAosEventos,
} from '../../src/dominio/progressao.js';
import {
  PONTOS_BASE_POR_COR,
  FATOR_B_XP_POR_COR,
  PV_INICIAL,
  NIVEL_XP_MAXIMO,
  PROVISORIO_LIMIARES_XP_POR_NIVEL,
} from '../../src/config/index.js';
import { EVENTOS, limpar, emitir, ouvir } from '../../src/eventos/index.js';
import { definirEstado, reiniciarEstado, obterEstado } from '../../src/estado/index.js';

describe('Domínio: Progressão, XP e Pontuação (RF01, RF20, RF22, RF23, RF45, RF46)', () => {
  beforeEach(() => {
    reiniciarEstado();
    limpar();
  });

  it('critério de aceitação: jogador inicia com 10 PV (RF45)', () => {
    const estado = obterEstado();
    expect(estado.jogador.pv).toBe(10);
    expect(estado.jogador.pvMax).toBe(10);
  });

  it('critério de aceitação: pontos base corretos por cor (RF01)', () => {
    expect(pontosBase('verde')).toBe(10);
    expect(pontosBase('amarela')).toBe(15);
    expect(pontosBase('vermelha')).toBe(30);
  });

  it('fator B correto por cor', () => {
    expect(fatorB('verde')).toBe(2);
    expect(fatorB('amarela')).toBe(3);
    expect(fatorB('vermelha')).toBe(5);
  });

  it('critério de aceitação: fórmula de XP exata em todas as cores e níveis 1, 5 e 10 (RF20)', () => {
    // Casos contratuais explícitos:
    // xpGanho(1, "verde") = 2 * (1 * 2) = 4
    expect(xpGanho(1, 'verde')).toBe(4);
    // xpGanho(1, "amarela") = 2 * (1 * 3) = 6
    expect(xpGanho(1, 'amarela')).toBe(6);
    // xpGanho(1, "vermelha") = 2 * (1 * 5) = 10
    expect(xpGanho(1, 'vermelha')).toBe(10);
    // xpGanho(10, "vermelha") = 2 * (10 * 5) = 100
    expect(xpGanho(10, 'vermelha')).toBe(100);

    // Nível 5:
    expect(xpGanho(5, 'verde')).toBe(2 * (5 * 2)); // 20
    expect(xpGanho(5, 'amarela')).toBe(2 * (5 * 3)); // 30
    expect(xpGanho(5, 'vermelha')).toBe(2 * (5 * 5)); // 50

    // Nível 10 demais cores:
    expect(xpGanho(10, 'verde')).toBe(2 * (10 * 2)); // 40
    expect(xpGanho(10, 'amarela')).toBe(2 * (10 * 3)); // 60
  });

  it('critério de aceitação: derrotar uma verde no nível 1 soma 10 x multiplicador(1) à pontuação', () => {
    const estado = {
      jogador: {
        pv: 10,
        pvMax: 10,
        nivelXp: 1,
        xp: 0,
        pontuacao: 0,
      },
    };

    const bacteria = { id: 'b1', cor: 'verde' };
    const novoEstado = aplicarVitoria(estado, bacteria);

    // 10 base * mult(1) = 10
    expect(novoEstado.jogador.pontuacao).toBe(10);
    // XP ganho: 2 * (1 * 2) = 4
    expect(novoEstado.jogador.xp).toBe(4);
  });

  it('critério de aceitação: pontuação e XP são contadores independentes no estado', () => {
    const estado = {
      jogador: {
        pv: 10,
        pvMax: 10,
        nivelXp: 2,
        xp: 30,
        pontuacao: 100,
      },
    };

    const bacteria = { id: 'b2', cor: 'amarela' };
    const novoEstado = aplicarVitoria(estado, bacteria);

    // Pontos: 15 * mult(2) = 30 -> 100 + 30 = 130
    expect(novoEstado.jogador.pontuacao).toBe(130);
    // XP: 2 * (2 * 3) = 12 -> 30 + 12 = 42
    expect(novoEstado.jogador.xp).toBe(42);

    expect(novoEstado.jogador.pontuacao).not.toBe(novoEstado.jogador.xp);
  });

  it('deve subir de nível ao atingir limiar e aumentar PV e PVMax em 10 (RF22, RF46)', () => {
    // Limiar para nível 2 é 50
    const estado = {
      jogador: {
        pv: 8,
        pvMax: 10,
        nivelXp: 1,
        xp: 45, // Ganhará mais de 5 XP
        pontuacao: 0,
      },
    };

    const ouvinteXp = vi.fn();
    const ouvinteSubiu = vi.fn();
    ouvir(EVENTOS.XP_GANHO, ouvinteXp);
    ouvir(EVENTOS.NIVEL_XP_SUBIU, ouvinteSubiu);

    const bacteria = { id: 'b1', cor: 'vermelha' }; // Ganha 10 XP no nível 1 (45 + 10 = 55 >= 50)
    const novoEstado = aplicarVitoria(estado, bacteria);

    expect(novoEstado.jogador.xp).toBe(55);
    expect(novoEstado.jogador.nivelXp).toBe(2);
    expect(novoEstado.jogador.pvMax).toBe(20); // 10 + 10
    expect(novoEstado.jogador.pv).toBe(18); // 8 + 10 (cura provisória)

    expect(ouvinteXp).toHaveBeenCalledWith({ xp: 10 });
    expect(ouvinteSubiu).toHaveBeenCalledWith({ nivel: 2 });
  });

  it('deve suportar subida de vários níveis de uma só vez emitindo eventos para cada nível', () => {
    const estado = {
      jogador: {
        pv: 10,
        pvMax: 10,
        nivelXp: 1,
        xp: 0,
        pontuacao: 0,
      },
    };

    // Forjamos limiares: nível 2 = 10, nível 3 = 20
    const ouvinteSubiu = vi.fn();
    ouvir(EVENTOS.NIVEL_XP_SUBIU, ouvinteSubiu);

    // No nível 1 contra vermelha daria 10 XP, mas testamos com XP suficiente para pular direto
    // Simulamos um estado acumulando 150 XP (ultrapassando 50 e 120, chegando ao nível 3)
    const estadoComBastanteXp = {
      ...estado,
      jogador: {
        ...estado.jogador,
        xp: 115, // Ganhará 10 de XP = 125 (atinge nível 2 [50] e nível 3 [120])
      },
    };

    const novoEstado = aplicarVitoria(estadoComBastanteXp, { id: 'b_super', cor: 'vermelha' });

    expect(novoEstado.jogador.nivelXp).toBe(3);
    expect(novoEstado.jogador.pvMax).toBe(30); // 10 + 10 + 10
    expect(novoEstado.jogador.pv).toBe(30); // 10 + 10 + 10

    expect(ouvinteSubiu).toHaveBeenCalledTimes(2);
    expect(ouvinteSubiu).toHaveBeenNthCalledWith(1, { nivel: 2 });
    expect(ouvinteSubiu).toHaveBeenNthCalledWith(2, { nivel: 3 });
  });

  it('critério de aceitação: o nível de XP não ultrapassa 10, mesmo com XP excedente (RF22)', () => {
    const estadoQuaseMax = {
      jogador: {
        pv: 100,
        pvMax: 100,
        nivelXp: 10,
        xp: 5000, // Muito além de 1200
        pontuacao: 1000,
      },
    };

    const ouvinteSubiu = vi.fn();
    ouvir(EVENTOS.NIVEL_XP_SUBIU, ouvinteSubiu);

    const novoEstado = aplicarVitoria(estadoQuaseMax, { id: 'b_max', cor: 'vermelha' });

    expect(novoEstado.jogador.nivelXp).toBe(10);
    expect(novoEstado.jogador.nivelXp).not.toBeGreaterThan(NIVEL_XP_MAXIMO);
    expect(ouvinteSubiu).not.toHaveBeenCalled();
  });

  it('ao ouvir bacteria:derrotada via vincularProgressaoAosEventos, atualiza pontuação e XP no estado central', () => {
    definirEstado({
      jogador: {
        pv: 10,
        pvMax: 10,
        nivelXp: 1,
        xp: 0,
        pontuacao: 0,
      },
    });

    const desvincular = vincularProgressaoAosEventos();
    const ouvinteXp = vi.fn();
    ouvir(EVENTOS.XP_GANHO, ouvinteXp);

    emitir(EVENTOS.BACTERIA_DERROTADA, {
      bacteria: { id: 'bact-venceu', cor: 'verde' },
    });

    expect(ouvinteXp).toHaveBeenCalledWith({ xp: 4 });

    const estadoFinal = obterEstado();
    expect(estadoFinal.jogador.pontuacao).toBe(10);
    expect(estadoFinal.jogador.xp).toBe(4);

    desvincular();
  });
});
