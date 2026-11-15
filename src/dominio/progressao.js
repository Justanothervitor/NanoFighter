/**
 * Lógica pura de pontuação, XP, progressão de nível e pontos de vida (RF01, RF20, RF22, RF23, RF45, RF46).
 */

import {
  PONTOS_BASE_POR_COR,
  FATOR_B_XP_POR_COR,
  NIVEL_XP_INICIAL,
  NIVEL_XP_MAXIMO,
  VALOR_INCREMENTO_PV_POR_NIVEL,
  PROVISORIO_LIMIARES_XP_POR_NIVEL,
  PROVISORIO_AUMENTO_PV_CURA,
} from '../config/index.js';
import { obterEstado, atualizarEstado } from '../estado/index.js';
import { EVENTOS, emitir, ouvir } from '../eventos/index.js';

/**
 * Retorna os pontos base concedidos ao derrotar uma bactéria por cor (RF01).
 * verde: 10, amarela: 15, vermelha: 30.
 * @param {'verde'|'amarela'|'vermelha'} cor
 * @returns {number}
 */
export function pontosBase(cor) {
  return PONTOS_BASE_POR_COR[cor] !== undefined ? PONTOS_BASE_POR_COR[cor] : 10;
}

/**
 * Retorna o fator B da fórmula de XP para a cor informada (RF20).
 * verde: 2, amarela: 3, vermelha: 5.
 * @param {'verde'|'amarela'|'vermelha'} cor
 * @returns {number}
 */
export function fatorB(cor) {
  return FATOR_B_XP_POR_COR[cor] !== undefined ? FATOR_B_XP_POR_COR[cor] : 2;
}

/**
 * Calcula o XP concedido ao derrotar uma bactéria (RF20).
 * Fórmula: XP = 2 * (A * B), onde A = nível de XP atual e B = fator da cor.
 *
 * @param {number} nivelXp Nível de XP atual do jogador no momento da vitória.
 * @param {'verde'|'amarela'|'vermelha'} cor Cor da bactéria no momento da vitória.
 * @returns {number} Quantidade de XP ganha.
 */
export function xpGanho(nivelXp, cor) {
  const a = Math.max(NIVEL_XP_INICIAL, Number(nivelXp) || NIVEL_XP_INICIAL);
  const b = fatorB(cor);
  return 2 * (a * b);
}

/**
 * Retorna o multiplicador de pontos baseado no nível de XP atual (RF23).
 * PROVISÓRIO: igual ao próprio nível de XP atual.
 * @param {number} nivelXp
 * @returns {number}
 */
export function multiplicador(nivelXp) {
  const nivel = Math.max(NIVEL_XP_INICIAL, Number(nivelXp) || NIVEL_XP_INICIAL);
  return nivel;
}

/**
 * Aplica a vitória contra uma bactéria, somando pontos, concedendo XP e verificando subida de nível.
 * Função pura que calcula o novo estado e despacha os eventos contratuais correspondentes.
 *
 * @param {object} estado Estado atual do jogo.
 * @param {{ id: string, cor: 'verde'|'amarela'|'vermelha' }} bacteria
 * @param {object} [dependencias={}] Injeção de barramento de eventos.
 * @returns {object} Novo estado com jogador atualizado.
 */
export function aplicarVitoria(estado, bacteria, dependencias = {}) {
  if (!estado || !bacteria) return estado;

  const fnEmitir = dependencias.emitir || emitir;
  const jogadorAtual = estado.jogador || {};

  const nivelInicial = jogadorAtual.nivelXp || NIVEL_XP_INICIAL;
  const cor = bacteria.cor || 'verde';

  // 1. Pontuação: pontos base * multiplicador do nível ATUAL (antes do ganho de XP) (RF01, RF23)
  const ptsBase = pontosBase(cor);
  const mult = multiplicador(nivelInicial);
  const pontosConcedidos = ptsBase * mult;
  const novaPontuacao = (jogadorAtual.pontuacao || 0) + pontosConcedidos;

  // 2. XP ganho: 2 * (nivelAtual * B) (RF20)
  const xpConcedido = xpGanho(nivelInicial, cor);
  const novoXp = (jogadorAtual.xp || 0) + xpConcedido;

  // Emite evento de XP ganho
  fnEmitir(EVENTOS.XP_GANHO, { xp: xpConcedido });

  // 3. Verificação de subida de nível de XP (RF22, RF46)
  let nivelTemp = nivelInicial;
  let pvMaxTemp = jogadorAtual.pvMax !== undefined ? jogadorAtual.pvMax : 10;
  let pvTemp = jogadorAtual.pv !== undefined ? jogadorAtual.pv : 10;

  // Verifica se o XP acumulado atinge ou supera os limiares dos próximos níveis
  while (nivelTemp < NIVEL_XP_MAXIMO) {
    const proximoNivel = nivelTemp + 1;
    const limiarProximo = PROVISORIO_LIMIARES_XP_POR_NIVEL[proximoNivel];

    if (limiarProximo !== undefined && novoXp >= limiarProximo) {
      nivelTemp = proximoNivel;
      pvMaxTemp += VALOR_INCREMENTO_PV_POR_NIVEL;

      // PROVISÓRIO: aumenta pvMax e também cura o jogador na mesma quantia
      if (PROVISORIO_AUMENTO_PV_CURA) {
        pvTemp += VALOR_INCREMENTO_PV_POR_NIVEL;
      }

      // Emite evento para cada nível conquistado
      fnEmitir(EVENTOS.NIVEL_XP_SUBIU, { nivel: nivelTemp });
    } else {
      break;
    }
  }

  return {
    ...estado,
    jogador: {
      ...jogadorAtual,
      pontuacao: novaPontuacao,
      xp: novoXp,
      nivelXp: nivelTemp,
      pv: pvTemp,
      pvMax: pvMaxTemp,
    },
  };
}

/**
 * Orquestra o registro de vitória consumindo e atualizando o estado central.
 * @param {{ id: string, cor: 'verde'|'amarela'|'vermelha' }} bacteria
 * @param {object} [dependencias={}]
 * @returns {object}
 */
export function executarVitoria(bacteria, dependencias = {}) {
  const fnObterEstado = dependencias.obterEstado || obterEstado;
  const fnAtualizarEstado = dependencias.atualizarEstado || atualizarEstado;

  const estadoAtual = fnObterEstado();
  const novoEstado = aplicarVitoria(estadoAtual, bacteria, dependencias);
  fnAtualizarEstado(novoEstado);

  return novoEstado;
}

/**
 * Conecta a concessão de pontuação e XP ao evento `bacteria:derrotada`.
 *
 * @param {object} [dependencias={}]
 * @returns {() => void} Função de desinscrição
 */
export function vincularProgressaoAosEventos(dependencias = {}) {
  const fnOuvir = dependencias.ouvir || ouvir;

  const cancelar = fnOuvir(EVENTOS.BACTERIA_DERROTADA, ({ bacteria }) => {
    executarVitoria(bacteria, dependencias);
  });

  return cancelar;
}
