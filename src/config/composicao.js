/**
 * Configuração e parâmetros de composição das bactérias por fase (RF48, RF49, RF50, RF51, RF52).
 */
// As quantidades exatas para os níveis 2, 3 e 4 foram confirmadas.
export const COMPOSICAO_FASE_1 = Object.freeze({
  verde: 9,
  amarela: 1,
  vermelha: 0,
});

// Composição confirmada para fases 2, 3 e 4 (RF49).
export const COMPOSICAO_POR_FASE = Object.freeze({
  1: COMPOSICAO_FASE_1,
  2: Object.freeze({ verde: 7, amarela: 8, vermelha: 0 }),
  3: Object.freeze({ verde: 4, amarela: 13, vermelha: 3 }),
  4: Object.freeze({ verde: 0, amarela: 18, vermelha: 7 }),
});

// PROVISÓRIO: aguardando confirmação do "limite do nível 4" no modo infinito
// Valor adotado: limite numérico máximo de 25 bactérias e composição sem verdes (RF51, RF52)
export const PROVISORIO_LIMITE_BACTERIAS_MODO_INFINITO = 25;
//export const MODO_INFINITO_SEM_VERDES = true;
