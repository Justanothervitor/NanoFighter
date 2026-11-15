/**
 * Gerenciador de entrada por teclado (Desktop).
 * RF54: Movimentação com W, A, S, D no mapa.
 * RF56: Seleção de medicamentos com A e D na batalha.
 * RF57: Confirmação com Enter.
 */

import { obterEstado } from '../estado/index.js';
import { TECLAS_MOVIMENTO, TECLAS_BATALHA } from '../config/index.js';
import { executarMovimento } from '../dominio/mapa.js';
import {
  alternarIndiceSelecionado,
  confirmarEscolhaMedicamento,
} from '../dominio/batalha.js';

/**
 * Processa uma tecla pressionada de acordo com o contexto (mapa vs batalha).
 * Função desacoplada da janela para permitir testes unitários diretos.
 *
 * @param {string} codigoOuTecla Ex: 'KeyW', 'KeyA', 'Enter', 'w', 'a'
 * @param {object} [dependencias={}] Injeção de dependências para testes
 * @returns {{ acao: string, detalhe?: any }|null}
 */
export function processarTecla(codigoOuTecla, dependencias = {}) {
  const fnObterEstado = dependencias.obterEstado || obterEstado;
  const fnExecutarMovimento = dependencias.executarMovimento || executarMovimento;
  const fnAlternarIndice = dependencias.alternarIndiceSelecionado || alternarIndiceSelecionado;
  const fnConfirmar = dependencias.confirmarEscolhaMedicamento || confirmarEscolhaMedicamento;

  const estado = fnObterEstado();
  const codigo = codigoOuTecla;

  // Normalização para comparar com TECLAS_MOVIMENTO e TECLAS_BATALHA
  const codigoFormatado =
    codigo.length === 1 ? `Key${codigo.toUpperCase()}` : codigo;

  // 1. Contexto de Batalha (confronto em andamento)
  if (estado && estado.confronto) {
    if (TECLAS_BATALHA.ESQUERDA.includes(codigoFormatado) || codigo.toLowerCase() === 'a') {
      const novoIndice = fnAlternarIndice('esquerda', dependencias);
      return { acao: 'selecionar_medicamento', detalhe: { indice: novoIndice } };
    }

    if (TECLAS_BATALHA.DIREITA.includes(codigoFormatado) || codigo.toLowerCase() === 'd') {
      const novoIndice = fnAlternarIndice('direita', dependencias);
      return { acao: 'selecionar_medicamento', detalhe: { indice: novoIndice } };
    }

    if (
      TECLAS_BATALHA.CONFIRMAR.includes(codigoFormatado) ||
      codigo === 'Enter'
    ) {
      fnConfirmar(dependencias);
      return { acao: 'confirmar_medicamento' };
    }

    // Teclas W, S e quaisquer outras não movem o personagem em batalha
    return null;
  }

  // 2. Contexto de Mapa (livre exploração)
  const direcao =
    TECLAS_MOVIMENTO[codigoFormatado] ||
    TECLAS_MOVIMENTO[codigo] ||
    (codigo.toLowerCase() === 'w' ? 'cima' : null) ||
    (codigo.toLowerCase() === 's' ? 'baixo' : null) ||
    (codigo.toLowerCase() === 'a' ? 'esquerda' : null) ||
    (codigo.toLowerCase() === 'd' ? 'direita' : null);

  if (direcao) {
    const novoEstado = fnExecutarMovimento(direcao, dependencias);
    return { acao: 'mover_mapa', detalhe: { direcao, movido: novoEstado !== null } };
  }

  return null;
}

/**
 * Inicializa o ouvinte de eventos de teclado no elemento especificado (padrão window).
 * @param {EventTarget} [alvo]
 * @param {object} [dependencias={}]
 * @returns {() => void} Função para remover os ouvintes
 */
export function inicializarTeclado(alvo, dependencias = {}) {
  const elementoAlvo = alvo || (typeof window !== 'undefined' ? window : null);
  if (!elementoAlvo) return () => {};

  function manipuladorKeyDown(evento) {
    const resultado = processarTecla(evento.code || evento.key, dependencias);
    if (resultado) {
      if (typeof evento.preventDefault === 'function') {
        evento.preventDefault();
      }
    }
  }

  elementoAlvo.addEventListener('keydown', manipuladorKeyDown);

  return function destruirTeclado() {
    elementoAlvo.removeEventListener('keydown', manipuladorKeyDown);
  };
}
