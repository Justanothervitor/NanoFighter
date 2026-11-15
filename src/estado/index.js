/**
 * Gerenciamento do estado central da aplicação.
 * Segue estritamente o contrato compartilhado definido na arquitetura.
 */

import {
  PV_INICIAL,
  PV_MAXIMO_INICIAL,
  NIVEL_XP_INICIAL,
  XP_INICIAL,
  USERNAME_PADRAO,
  POSICAO_INICIAL_JOGADOR, FASE_INICIAL
} from '../config/index.js';

/**
 * Cria a estrutura inicial do estado central do jogo.
 * @param {Partial<{ username: string, posicao: { x: number, y: number }, jogador: object }>} [opcoes={}]
 * @returns {object} Estado inicial estruturado.
 */
export function criarEstadoInicial(opcoes = {}) {
  const dadosJogador = opcoes.jogador || {};
  return {
    jogador: {
      username: dadosJogador.username || opcoes.username || USERNAME_PADRAO,
      pv: dadosJogador.pv !== undefined ? dadosJogador.pv : PV_INICIAL,
      pvMax: dadosJogador.pvMax !== undefined ? dadosJogador.pvMax : PV_MAXIMO_INICIAL,
      nivelXp: dadosJogador.nivelXp !== undefined ? dadosJogador.nivelXp : NIVEL_XP_INICIAL,
      xp: dadosJogador.xp !== undefined ? dadosJogador.xp : XP_INICIAL,
      pontuacao: dadosJogador.pontuacao !== undefined ? dadosJogador.pontuacao : 0,
        posicao: {
          ...POSICAO_INICIAL_JOGADOR,
          ...(opcoes.posicao || {}),
          ...(dadosJogador.posicao || {}),
        },
    },
    fase: opcoes.fase || FASE_INICIAL,
    eliminadasNaFase: opcoes.eliminadasNaFase || 0,
    bacteriasNoMapa: opcoes.bacteriasNoMapa ? clonarProfundamente(opcoes.bacteriasNoMapa) : [],
    confronto: opcoes.confronto ? clonarProfundamente(opcoes.confronto) : null,
  };
}

// Armazenamento em memória do estado central
let estadoAtual = criarEstadoInicial();

/**
 * Clona profundamente o estado para garantir imutabilidade externa.
 * @param {object} objeto
 * @returns {object}
 */
function clonarProfundamente(objeto) {
  if (typeof structuredClone === 'function') {
    return structuredClone(objeto);
  }
  return JSON.parse(JSON.stringify(objeto));
}

/**
 * Retorna uma cópia do estado atual da aplicação.
 * @returns {object} Cópia do estado central.
 */
export function obterEstado() {
  return clonarProfundamente(estadoAtual);
}
const assinantes = new Set();

/**
 * Registra um callback chamado a cada alteração do estado.
 * @param {(estado: object) => void} fn
 * @returns {() => void} Função de cancelamento
 */
export function assinarEstado(fn) {
  assinantes.add(fn);
  return () => assinantes.delete(fn);
}

function notificar() {
  const copia = obterEstado();
  assinantes.forEach((fn) => fn(copia));
}

export function atualizarEstado(mutador) {
  if (typeof mutador === 'function') {
    const resultado = mutador(clonarProfundamente(estadoAtual));
    if (resultado && typeof resultado === 'object') {
      estadoAtual = clonarProfundamente(resultado);
    }
  } else if (mutador && typeof mutador === 'object') {
    estadoAtual = {
      ...estadoAtual,
      ...clonarProfundamente(mutador),
      jogador: {
        ...estadoAtual.jogador,
        ...(mutador.jogador ? clonarProfundamente(mutador.jogador) : {}),
      },
    };
  }
  notificar();
  return obterEstado();
}

export function reiniciarEstado(opcoes = {}) {
  estadoAtual = criarEstadoInicial(opcoes);
  notificar();
  return obterEstado();
}

export function definirEstado(novoEstado) {
  estadoAtual = clonarProfundamente(novoEstado);
  notificar();
  return obterEstado();
}
