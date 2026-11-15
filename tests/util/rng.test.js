import { describe, it, expect } from 'vitest';
import {
  criarRngDeterministico,
  criarRngSequencial,
  rngPadrao,
  criarRngPadrao,
} from '../../src/util/rng.js';

describe('Utilitário RNG (Random Number Generator)', () => {
  it('mesma semente deve gerar exatamente a mesma sequência de números', () => {
    const semente = 42;
    const rng1 = criarRngDeterministico(semente);
    const rng2 = criarRngDeterministico(semente);

    const seq1 = [rng1(), rng1(), rng1(), rng1(), rng1()];
    const seq2 = [rng2(), rng2(), rng2(), rng2(), rng2()];

    expect(seq1).toEqual(seq2);
  });

  it('sementes diferentes devem gerar sequências distintas', () => {
    const rng1 = criarRngDeterministico(101);
    const rng2 = criarRngDeterministico(202);

    const seq1 = [rng1(), rng1(), rng1()];
    const seq2 = [rng2(), rng2(), rng2()];

    expect(seq1).not.toEqual(seq2);
  });

  it('todos os valores gerados pelo rng determinístico devem estar no intervalo [0, 1)', () => {
    const rng = criarRngDeterministico(999);

    for (let i = 0; i < 1000; i++) {
      const valor = rng();
      expect(valor).toBeGreaterThanOrEqual(0);
      expect(valor).toBeLessThan(1);
    }
  });

  it('o rng padrão (Math.random) deve gerar números no intervalo [0, 1)', () => {
    const val = rngPadrao();
    expect(val).toBeGreaterThanOrEqual(0);
    expect(val).toBeLessThan(1);

    const geradorInstancia = criarRngPadrao();
    const val2 = geradorInstancia();
    expect(val2).toBeGreaterThanOrEqual(0);
    expect(val2).toBeLessThan(1);
  });

  it('o rng sequencial deve percorrer a lista fornecida ciclicamente', () => {
    const lista = [0.1, 0.5, 0.9];
    const rng = criarRngSequencial(lista);

    expect(rng()).toBe(0.1);
    expect(rng()).toBe(0.5);
    expect(rng()).toBe(0.9);
    expect(rng()).toBe(0.1); // Ciclo
  });
});
