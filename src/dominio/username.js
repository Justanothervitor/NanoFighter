/**
 * Validação, sanitização e normalização de username (RF03, RF60, RNF03).
 */

import {
  TAMANHO_MIN_USERNAME,
  TAMANHO_MAX_USERNAME,
  USERNAME_PADRAO,
  PROVISORIO_REGEX_USERNAME,
} from '../config/index.js';

/**
 * Valida o username informado de acordo com as regras contratuais.
 * - 3 a 8 caracteres após trim (RF03).
 * - Campo vazio é aceito para resolução como padrão "player" (RF60).
 * - Caracteres permitidos: letras, números e underline (PROVISÓRIO).
 *
 * @param {string} [texto]
 * @returns {{ valido: boolean, erro?: string, username?: string, vazio?: boolean }}
 */
export function validarUsername(texto) {
  if (texto === null || texto === undefined) {
    return { valido: true, vazio: true, username: USERNAME_PADRAO };
  }

  const limpo = String(texto).trim();

  // Campo vazio resolve para "player"
  if (limpo.length === 0) {
    return { valido: true, vazio: true, username: USERNAME_PADRAO };
  }

  // Validação de comprimento mínimo (3) e máximo (8)
  if (limpo.length < TAMANHO_MIN_USERNAME) {
    return {
      valido: false,
      erro: `Username deve possuir no mínimo ${TAMANHO_MIN_USERNAME} caracteres.`,
    };
  }

  if (limpo.length > TAMANHO_MAX_USERNAME) {
    return {
      valido: false,
      erro: `Username deve possuir no máximo ${TAMANHO_MAX_USERNAME} caracteres.`,
    };
  }

  // Validação de caracteres permitidos
  if (!PROVISORIO_REGEX_USERNAME.test(limpo)) {
    return {
      valido: false,
      erro: 'Username deve conter apenas letras, números ou underline (_).',
    };
  }

  return {
    valido: true,
    vazio: false,
    username: limpo,
  };
}

/**
 * Retorna o username definitivo a ser utilizado no jogo.
 * Devolve "player" se o campo estiver vazio ou não for informado (RF60).
 *
 * @param {string} [texto]
 * @returns {string} Username validado ou padrão "player".
 * @throws {Error} Se o username fornecido for inválido (ex: fora do limite de tamanho).
 */
export function usernameFinal(texto) {
  const resultado = validarUsername(texto);

  if (!resultado.valido) {
    throw new Error(resultado.erro || 'Username inválido.');
  }

  return resultado.username || USERNAME_PADRAO;
}

/**
 * Sanitiza o texto contra injeção de HTML/scripts (RNF03).
 * @param {string} texto
 * @returns {string}
 */
export function sanitizarTexto(texto) {
  if (typeof texto !== 'string') return '';
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
