import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  metaDaFase,
  obterFaseAtual,
  estaNoModoInfinito,
  registrarEliminacao,
  vincularFasesAosEventos,
} from '../../src/dominio/fases.js';
import { EVENTOS, limpar, emitir, ouvir } from '../../src/eventos/index.js';
import { definirEstado, reiniciarEstado, obterEstado } from '../../src/estado/index.js';

describe('Domínio: Fases e Progressão (RF07, RF08, RF28, RF29, RF30, RF40, RF41)', () => {
  beforeEach(() => {
    reiniciarEstado();
    limpar();
  });

  it('critério de aceitação: metaDaFase(1..4) devolve 10, 15, 20, 25 e fase 5 devolve Infinity', () => {
    expect(metaDaFase(1)).toBe(10);
    expect(metaDaFase(2)).toBe(15);
    expect(metaDaFase(3)).toBe(20);
    expect(metaDaFase(4)).toBe(25);
    expect(metaDaFase(5)).toBe(Infinity);
    expect(metaDaFase(6)).toBe(Infinity);
  });

  it('deve identificar o modo infinito corretamente', () => {
    expect(estaNoModoInfinito(1)).toBe(false);
    expect(estaNoModoInfinito(4)).toBe(false);
    expect(estaNoModoInfinito(5)).toBe(true);

    expect(estaNoModoInfinito({ fase: 3 })).toBe(false);
    expect(estaNoModoInfinito({ fase: 5 })).toBe(true);
  });

  it('critério de aceitação: eliminar 10 bactérias na fase 1 emite fase:concluida (1) e fase:iniciada (2) e zera eliminadasNaFase', () => {
    let estado = {
      fase: 1,
      eliminadasNaFase: 9, // Falta 1 para 10
    };

    const ouvinteConcluida = vi.fn();
    const ouvinteIniciada = vi.fn();
    ouvir(EVENTOS.FASE_CONCLUIDA, ouvinteConcluida);
    ouvir(EVENTOS.FASE_INICIADA, ouvinteIniciada);

    const novoEstado = registrarEliminacao(estado);

    expect(novoEstado.fase).toBe(2);
    expect(novoEstado.eliminadasNaFase).toBe(0); // Reinício do contador

    expect(ouvinteConcluida).toHaveBeenCalledTimes(1);
    expect(ouvinteConcluida).toHaveBeenCalledWith({ fase: 1 });

    expect(ouvinteIniciada).toHaveBeenCalledTimes(1);
    expect(ouvinteIniciada).toHaveBeenCalledWith({ fase: 2 });
  });

  it('deve transicionar sequencialmente entre 2→3, 3→4 e 4→5 sem permitir saltos', () => {
    const ouvinteConcluida = vi.fn();
    const ouvinteIniciada = vi.fn();
    ouvir(EVENTOS.FASE_CONCLUIDA, ouvinteConcluida);
    ouvir(EVENTOS.FASE_INICIADA, ouvinteIniciada);

    // Transição 2 -> 3 (meta 15)
    let estado = { fase: 2, eliminadasNaFase: 14 };
    estado = registrarEliminacao(estado);
    expect(estado.fase).toBe(3);
    expect(estado.eliminadasNaFase).toBe(0);
    expect(ouvinteConcluida).toHaveBeenLastCalledWith({ fase: 2 });
    expect(ouvinteIniciada).toHaveBeenLastCalledWith({ fase: 3 });

    // Transição 3 -> 4 (meta 20)
    estado = { fase: 3, eliminadasNaFase: 19 };
    estado = registrarEliminacao(estado);
    expect(estado.fase).toBe(4);
    expect(estado.eliminadasNaFase).toBe(0);
    expect(ouvinteConcluida).toHaveBeenLastCalledWith({ fase: 3 });
    expect(ouvinteIniciada).toHaveBeenLastCalledWith({ fase: 4 });

    // Transição 4 -> 5 (meta 25)
    estado = { fase: 4, eliminadasNaFase: 24 };
    estado = registrarEliminacao(estado);
    expect(estado.fase).toBe(5);
    expect(estado.eliminadasNaFase).toBe(0);
    expect(ouvinteConcluida).toHaveBeenLastCalledWith({ fase: 4 });
    expect(ouvinteIniciada).toHaveBeenLastCalledWith({ fase: 5 });

    // Garante que foram 3 transições sequenciais estritas
    expect(ouvinteConcluida).toHaveBeenCalledTimes(3);
    expect(ouvinteIniciada).toHaveBeenCalledTimes(3);
  });

  it('critério de aceitação: concluir a fase 4 inicia a fase 5, e esta nunca emite fase:concluida (RF40, RF41)', () => {
    const ouvinteConcluida = vi.fn();
    ouvir(EVENTOS.FASE_CONCLUIDA, ouvinteConcluida);

    let estado = { fase: 5, eliminadasNaFase: 0 };

    // Simula eliminação de 100 bactérias no modo infinito
    for (let i = 0; i < 100; i++) {
      estado = registrarEliminacao(estado);
    }

    expect(estado.fase).toBe(5);
    expect(estado.eliminadasNaFase).toBe(100);
    expect(ouvinteConcluida).not.toHaveBeenCalled();
  });

  it('ao ouvir bacteria:derrotada via vincularFasesAosEventos, atualiza o estado central e avança a fase ao bater a meta', () => {
    definirEstado({
      fase: 1,
      eliminadasNaFase: 9,
    });

    const ouvinteConcluida = vi.fn();
    ouvir(EVENTOS.FASE_CONCLUIDA, ouvinteConcluida);

    const desvincular = vincularFasesAosEventos();

    emitir(EVENTOS.BACTERIA_DERROTADA, {
      bacteria: { id: 'bact-10', cor: 'verde' },
    });

    expect(ouvinteConcluida).toHaveBeenCalledWith({ fase: 1 });

    const estadoFinal = obterEstado();
    expect(estadoFinal.fase).toBe(2);
    expect(estadoFinal.eliminadasNaFase).toBe(0);

    desvincular();
  });
});
