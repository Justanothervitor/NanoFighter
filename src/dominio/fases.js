/**
 * Gerenciamento de progressão de fases e modo infinito (RF07, RF08, RF28, RF29, RF30, RF40, RF41).
 */

import {
  METAS_POR_FASE,
  FASE_INICIAL,
  FASE_MAXIMA_CAMPANHA,
  FASE_MODO_INFINITO,
} from '../config/index.js';
import { obterEstado, atualizarEstado } from '../estado/index.js';
import { EVENTOS, emitir, ouvir } from '../eventos/index.js';

/**
 * Retorna a meta de bactérias eliminadas para a fase informada (RF29).
 * Fases 1 a 4: 10, 15, 20, 25.
 * Fase 5 (modo infinito): sem meta finita (Infinity).
 *
 * @param {number} fase Número da fase (1 a 5)
 * @returns {number} Quantidade necessária de bactérias eliminadas ou Infinity
 */
export function metaDaFase(fase) {
  const f = Math.max(FASE_INICIAL, Number(fase) || FASE_INICIAL);

  if (f >= FASE_MODO_INFINITO) {
    return Infinity;
  }

  if (METAS_POR_FASE[f] !== undefined) {
    return METAS_POR_FASE[f];
  }

  // Fórmula contratual: 10 + 5 * (fase - 1)
  return 10 + 5 * (f - 1);
}

/**
 * Retorna o número da fase atual a partir do estado.
 * @param {object} [estado]
 * @returns {number}
 */
export function obterFaseAtual(estado) {
  const e = estado || obterEstado();
  return e?.fase || FASE_INICIAL;
}

/**
 * Verifica se o jogo está no modo infinito (Fase 5) (RF40, RF41).
 * @param {object|number} estadoOuFase
 * @returns {boolean}
 */
export function estaNoModoInfinito(estadoOuFase) {
  if (typeof estadoOuFase === 'number') {
    return estadoOuFase >= FASE_MODO_INFINITO;
  }
  return obterFaseAtual(estadoOuFase) >= FASE_MODO_INFINITO;
}

/**
 * Registra a eliminação de uma bactéria e avança a fase se a meta for atingida.
 * Função pura que calcula o novo estado e emite eventos de fase quando aplicável.
 * A progressão é estritamente sequencial (1 -> 2 -> 3 -> 4 -> 5), impedindo salto de fases.
 *
 * @param {object} estado
 * @param {object} [dependencias={}]
 * @returns {object} Novo estado com eliminadasNaFase atualizado e eventual avanço de fase
 */
export function registrarEliminacao(estado, dependencias = {}) {
  if (!estado) return estado;

  const fnEmitir = dependencias.emitir || emitir;
  const faseAtual = obterFaseAtual(estado);
  const eliminadasAtual = estado.eliminadasNaFase || 0;
  const novaQtdEliminadas = eliminadasAtual + 1;
  const meta = metaDaFase(faseAtual);

  // Modo Infinito (Fase 5): apenas conta as eliminações, nunca emite fase:concluida (RF41)
  if (estaNoModoInfinito(faseAtual)) {
    return {
      ...estado,
      eliminadasNaFase: novaQtdEliminadas,
    };
  }

  // Fases de Campanha (1 a 4): avalia se a meta foi atingida (RF30, RF40)
  if (novaQtdEliminadas >= meta) {
    const proximaFase = faseAtual + 1; // Ordem estrita 1 -> 5, sem saltos

    const novoEstado = {
      ...estado,
      fase: proximaFase,
      eliminadasNaFase: 0, // Zera contador para a nova fase
    };

    // Emite eventos de conclusão da atual e início da próxima
    fnEmitir(EVENTOS.FASE_CONCLUIDA, { fase: faseAtual });
    fnEmitir(EVENTOS.FASE_INICIADA, { fase: proximaFase });

    return novoEstado;
  }

  // Meta ainda não atingida
  return {
    ...estado,
    eliminadasNaFase: novaQtdEliminadas,
  };
}

/**
 * Orquestra o registro de eliminação consumindo e atualizando o estado central.
 * @param {object} [dependencias={}]
 * @returns {object}
 */
export function executarRegistroEliminacao(dependencias = {}) {
  const fnObterEstado = dependencias.obterEstado || obterEstado;
  const fnAtualizarEstado = dependencias.atualizarEstado || atualizarEstado;
  const fnEmitirReal = dependencias.emitir || emitir;

  const eventosPendentes = [];
  const enfileirar = (nome, dados) => eventosPendentes.push([nome, dados]);

  const estadoAtual = fnObterEstado();
  const novoEstado = registrarEliminacao(estadoAtual, {
    ...dependencias,
    emitir: enfileirar,
  });

  fnAtualizarEstado(novoEstado);
  eventosPendentes.forEach(([nome, dados]) => fnEmitirReal(nome, dados));

  return novoEstado;
}
/**
 * Conecta o avanço de fases ao evento de derrota de bactérias (`bacteria:derrotada`).
 *
 * @param {object} [dependencias={}]
 * @returns {() => void} Função de desinscrição
 */
export function vincularFasesAosEventos(dependencias = {}) {
  const fnOuvir = dependencias.ouvir || ouvir;

  const cancelar = fnOuvir(EVENTOS.BACTERIA_DERROTADA, () => {
    executarRegistroEliminacao(dependencias);
  });

  return cancelar;
}
