/**
 * Persistência de pontuações no sessionStorage com isolamento por try/catch (RF43).
 * A perda de dados ao fechar a aba é intencional.
 */

import { STORAGE_KEY_PONTUACOES } from '../config/index.js';

/**
 * Obtém a referência ao sessionStorage, permitindo injeção de mock em testes.
 * @param {object} [opcoes={}]
 * @returns {Storage|null}
 */
function obterStorage(opcoes = {}) {
  if (opcoes.storage !== undefined) {
    return opcoes.storage;
  }
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return window.sessionStorage;
    }
  } catch (e) {
    // Acesso bloqueado por segurança ou ambiente restrito
  }
  return null;
}

/**
 * Salva um registro de pontuação no sessionStorage.
 * Sempre encapsulado em try/catch para garantir que o jogo continue caso o storage esteja inacessível.
 *
 * @param {{ username: string, pontuacao: number }} registro
 * @param {object} [opcoes={}]
 * @returns {boolean} True se salvo com sucesso, false caso contrário.
 */
export function salvarPontuacaoSessao(registro, opcoes = {}) {
  try {
    const storage = obterStorage(opcoes);
    if (!storage) return false;

    const chave = opcoes.chave || STORAGE_KEY_PONTUACOES;
    const historico = obterPontuacoesSessao(opcoes);

    const novoHistorico = [
      ...historico,
      {
        username: registro.username,
        pontuacao: Number(registro.pontuacao) || 0,
        timestamp: Date.now(),
      },
    ];

    storage.setItem(chave, JSON.stringify(novoHistorico));
    return true;
  } catch (erro) {
    // Falha silenciosa ou log de aviso para não quebrar a execução
    console.warn('Aviso: falha ao salvar pontuação no sessionStorage:', erro.message || erro);
    return false;
  }
}

/**
 * Lê o histórico de pontuações salvo na sessão.
 *
 * @param {object} [opcoes={}]
 * @returns {Array<{ username: string, pontuacao: number, timestamp: number }>}
 */
export function obterPontuacoesSessao(opcoes = {}) {
  try {
    const storage = obterStorage(opcoes);
    if (!storage) return [];

    const chave = opcoes.chave || STORAGE_KEY_PONTUACOES;
    const item = storage.getItem(chave);
    if (!item) return [];

    const parseado = JSON.parse(item);
    return Array.isArray(parseado) ? parseado : [];
  } catch (erro) {
    console.warn('Aviso: falha ao ler pontuações do sessionStorage:', erro.message || erro);
    return [];
  }
}

/**
 * Limpa o histórico de pontuações no sessionStorage.
 * @param {object} [opcoes={}]
 * @returns {boolean}
 */
export function limparPontuacoesSessao(opcoes = {}) {
  try {
    const storage = obterStorage(opcoes);
    if (!storage) return false;

    const chave = opcoes.chave || STORAGE_KEY_PONTUACOES;
    storage.removeItem(chave);
    return true;
  } catch (erro) {
    return false;
  }
}
