import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  EVENTOS,
  criarBarramento,
  ouvir,
  remover,
  emitir,
  limpar,
} from '../../src/eventos/index.js';

describe('Barramento de Eventos', () => {
  beforeEach(() => {
    limpar();
  });

  it('deve conter todos os eventos estipulados no contrato', () => {
    expect(EVENTOS.CONFRONTO_INICIADO).toBe('confronto:iniciado');
    expect(EVENTOS.MEDICAMENTO_SORTEADO).toBe('medicamento:sorteado');
    expect(EVENTOS.MEDICAMENTO_ESCOLHIDO).toBe('medicamento:escolhido');
    expect(EVENTOS.MEDICAMENTO_USADO).toBe('medicamento:usado');
    expect(EVENTOS.BACTERIA_MUTADA).toBe('bacteria:mutada');
    expect(EVENTOS.BACTERIA_DERROTADA).toBe('bacteria:derrotada');
    expect(EVENTOS.JOGADOR_DANIFICADO).toBe('jogador:danificado');
    expect(EVENTOS.XP_GANHO).toBe('xp:ganho');
    expect(EVENTOS.NIVEL_XP_SUBIU).toBe('nivelXp:subiu');
    expect(EVENTOS.FASE_INICIADA).toBe('fase:iniciada');
    expect(EVENTOS.FASE_CONCLUIDA).toBe('fase:concluida');
    expect(EVENTOS.JOGO_ENCERRADO).toBe('jogo:encerrado');
  });

  it('deve registrar um ouvinte e executar callback na emissão', () => {
    const callback = vi.fn();
    ouvir(EVENTOS.CONFRONTO_INICIADO, callback);

    const payload = { bacteria: { id: 'bact-1', cor: 'verde', posicao: { x: 2, y: 3 } } };
    emitir(EVENTOS.CONFRONTO_INICIADO, payload);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(payload);
  });

  it('deve permitir remover ouvinte explicitamente via remover()', () => {
    const callback = vi.fn();
    ouvir(EVENTOS.MEDICAMENTO_ESCOLHIDO, callback);

    emitir(EVENTOS.MEDICAMENTO_ESCOLHIDO, { indice: 0 });
    expect(callback).toHaveBeenCalledTimes(1);

    remover(EVENTOS.MEDICAMENTO_ESCOLHIDO, callback);
    emitir(EVENTOS.MEDICAMENTO_ESCOLHIDO, { indice: 1 });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('deve permitir remover ouvinte através da função de retorno do ouvir()', () => {
    const callback = vi.fn();
    const cancelar = ouvir(EVENTOS.JOGADOR_DANIFICADO, callback);

    emitir(EVENTOS.JOGADOR_DANIFICADO, { dano: 2, pv: 8 });
    expect(callback).toHaveBeenCalledTimes(1);

    cancelar();
    emitir(EVENTOS.JOGADOR_DANIFICADO, { dano: 1, pv: 7 });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('deve suportar múltiplos ouvintes para o mesmo evento', () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();

    ouvir(EVENTOS.XP_GANHO, fn1);
    ouvir(EVENTOS.XP_GANHO, fn2);

    emitir(EVENTOS.XP_GANHO, { xp: 10 });
    expect(fn1).toHaveBeenCalledWith({ xp: 10 });
    expect(fn2).toHaveBeenCalledWith({ xp: 10 });
  });

  it('deve limpar todos os ouvintes via limpar()', () => {
    const fn = vi.fn();
    ouvir(EVENTOS.FASE_INICIADA, fn);

    limpar();
    emitir(EVENTOS.FASE_INICIADA, { fase: 2 });
    expect(fn).not.toHaveBeenCalled();
  });

  it('deve permitir criar instâncias isoladas com criarBarramento()', () => {
    const barramentoA = criarBarramento();
    const barramentoB = criarBarramento();

    const fnA = vi.fn();
    const fnB = vi.fn();

    barramentoA.ouvir('teste', fnA);
    barramentoB.ouvir('teste', fnB);

    barramentoA.emitir('teste', 123);
    expect(fnA).toHaveBeenCalledWith(123);
    expect(fnB).not.toHaveBeenCalled();
  });
});
