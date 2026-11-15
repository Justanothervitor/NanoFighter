/**
 * Regras e controle de seleção e escolha de medicamentos em batalha.
 */

import { obterEstado, atualizarEstado } from '../estado/index.js';
import { EVENTOS, emitir } from '../eventos/index.js';

/**
 * Retorna o índice da opção atualmente selecionada no confronto (padrão: 0).
 * @param {object} [estado]
 * @returns {number} 0 ou 1
 */
export function obterIndiceSelecionado(estado) {
  const e = estado || obterEstado();
  return e.confronto?.indiceSelecionado === 1 ? 1 : 0;
}

/**
 * Atualiza o índice destacado da opção de medicamento no confronto.
 * @param {number} indice 0 ou 1
 * @param {object} [dependencias={}]
 * @returns {number}
 */
export function definirIndiceSelecionado(indice, dependencias = {}) {
  const fnObterEstado = dependencias.obterEstado || obterEstado;
  const fnAtualizarEstado = dependencias.atualizarEstado || atualizarEstado;

  const estado = fnObterEstado();
  if (!estado.confronto) return 0;

  const indiceNormalizado = indice === 1 ? 1 : 0;

  fnAtualizarEstado((atual) => {
    if (!atual.confronto) return atual;
    return {
      ...atual,
      confronto: {
        ...atual.confronto,
        indiceSelecionado: indiceNormalizado,
      },
    };
  });

  return indiceNormalizado;
}

/**
 * Alterna a opção destacada em batalha usando esquerda/direita ou 'a'/'d'.
 * @param {'esquerda'|'direita'|'a'|'d'|string} direcao
 * @param {object} [dependencias={}]
 * @returns {number} Novo índice destacado
 */
export function alternarIndiceSelecionado(direcao, dependencias = {}) {
  const chave = typeof direcao === 'string' ? direcao.toLowerCase() : '';
  let novoIndice = 0;

  if (chave === 'direita' || chave === 'd' || chave === 'arrowright' || chave === 'keyd') {
    novoIndice = 1;
  } else if (chave === 'esquerda' || chave === 'a' || chave === 'arrowleft' || chave === 'keya') {
    novoIndice = 0;
  } else {
    // Alternância simples
    const atual = obterIndiceSelecionado(dependencias.obterEstado?.() || obterEstado());
    novoIndice = atual === 0 ? 1 : 0;
  }

  return definirIndiceSelecionado(novoIndice, dependencias);
}

/**
 * Emite a escolha direta de um medicamento pelo índice.
 * Utilizado por clique de mouse (RF58) e toque na tela (RF59).
 * @param {number} indice
 * @param {object} [dependencias={}]
 */
export function escolherMedicamento(indice, dependencias = {}) {
  const fnEmitir = dependencias.emitir || emitir;
  const indiceNormalizado = Number(indice) === 1 ? 1 : 0;

  definirIndiceSelecionado(indiceNormalizado, dependencias);
  fnEmitir(EVENTOS.MEDICAMENTO_ESCOLHIDO, { indice: indiceNormalizado });
}

/**
 * Confirma a escolha do medicamento atualmente destacado com Enter (RF57).
 * @param {object} [dependencias={}]
 */
export function confirmarEscolhaMedicamento(dependencias = {}) {
  const fnObterEstado = dependencias.obterEstado || obterEstado;
  const estado = fnObterEstado();

  if (!estado.confronto) return;

  const indice = obterIndiceSelecionado(estado);
  escolherMedicamento(indice, dependencias);
}
