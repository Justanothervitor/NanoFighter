import {
  PROVISORIO_REGEX_USERNAME,
  TAMANHO_MAX_USERNAME,
  TAMANHO_MIN_USERNAME,
  USERNAME_PADRAO
} from "../config/index.js";

/**
 * @returns {{ valido: boolean, erro?: string, codigoErro?: 'minimo'|'maximo'|'caracteres',
 *             parametros?: object, username?: string, vazio?: boolean }}
 */
export function validarUsername(texto) {
  if (texto === null || texto === undefined) {
    return { valido: true, vazio: true, username: USERNAME_PADRAO };
  }

  const limpo = String(texto).trim();

  if (limpo.length === 0) {
    return { valido: true, vazio: true, username: USERNAME_PADRAO };
  }

  if (limpo.length < TAMANHO_MIN_USERNAME) {
    return {
      valido: false,
      codigoErro: 'minimo',
      parametros: { min: TAMANHO_MIN_USERNAME },
      erro: `Username deve possuir no mínimo ${TAMANHO_MIN_USERNAME} caracteres.`,
    };
  }

  if (limpo.length > TAMANHO_MAX_USERNAME) {
    return {
      valido: false,
      codigoErro: 'maximo',
      parametros: { max: TAMANHO_MAX_USERNAME },
      erro: `Username deve possuir no máximo ${TAMANHO_MAX_USERNAME} caracteres.`,
    };
  }

  if (!PROVISORIO_REGEX_USERNAME.test(limpo)) {
    return {
      valido: false,
      codigoErro: 'caracteres',
      parametros: {},
      erro: 'Username deve conter apenas letras, números ou underline (_).',
    };
  }

  return { valido: true, vazio: false, username: limpo };
}