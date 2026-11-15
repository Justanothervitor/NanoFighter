/**
 * Utilitários para geração de números pseudoaleatórios (PRNG).
 * Permite injeção de dependência para testes determinísticos e uso em produção.
 */

/**
 * Cria um gerador pseudoaleatório determinístico baseado no algoritmo Mulberry32.
 * @param {number} [semente=123456789] Valor inteiro inicial (semente).
 * @returns {() => number} Função rng() que retorna um número no intervalo [0, 1).
 */
export function criarRngDeterministico(semente = 123456789) {
  let s = (semente >>> 0) || 1;

  return function rng() {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return (t >>> 0) / 4294967296;
  };
}

/**
 * Cria um gerador que percorre uma lista finita pré-determinada de números em [0, 1).
 * Útil para testar cenários específicos de vitória/derrota.
 * @param {number[]} valores Lista de valores no intervalo [0, 1).
 * @returns {() => number} Função rng() sequencial.
 */
export function criarRngSequencial(valores) {
  let indice = 0;
  return function rng() {
    if (valores.length === 0) return 0;
    const valor = valores[indice % valores.length];
    indice++;
    return valor;
  };
}

/**
 * Adaptador padrão para ambiente de produção, baseado em Math.random().
 * @returns {number} Número pseudoaleatório no intervalo [0, 1).
 */
export const rngPadrao = () => Math.random();

/**
 * Cria uma instância do adaptador de produção.
 * @returns {() => number}
 */
export function criarRngPadrao() {
  return rngPadrao;
}
