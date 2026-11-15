/**
 * Regras puras de movimentação e verificação no mapa de grade.
 */

import {ALTURA_GRADE, DIRECOES, LARGURA_GRADE, VETORES_DIRECAO} from '../config/index.js';
import {atualizarEstado, obterEstado} from '../estado/index.js';
import {emitir, EVENTOS} from '../eventos/index.js';

/**
 * Normaliza qualquer representação de direção para o vetor { dx, dy }.
 * @param {string|{dx: number, dy: number}} direcao
 * @returns {{ dx: number, dy: number }|null}
 */
export function normalizarVetorDirecao(direcao) {
  if (typeof direcao === 'object' && direcao !== null && 'dx' in direcao && 'dy' in direcao) {
    return { dx: Math.sign(direcao.dx), dy: Math.sign(direcao.dy) };
  }

  if (typeof direcao === 'string') {
    const chave = direcao.toLowerCase();
    if (chave === 'cima' || chave === 'w' || chave === 'arrowup' || chave === 'keyw') {
      return VETORES_DIRECAO[DIRECOES.CIMA];
    }
    if (chave === 'baixo' || chave === 's' || chave === 'arrowdown' || chave === 'keys') {
      return VETORES_DIRECAO[DIRECOES.BAIXO];
    }
    if (chave === 'esquerda' || chave === 'a' || chave === 'arrowleft' || chave === 'keya') {
      return VETORES_DIRECAO[DIRECOES.ESQUERDA];
    }
    if (chave === 'direita' || chave === 'd' || chave === 'arrowright' || chave === 'keyd') {
      return VETORES_DIRECAO[DIRECOES.DIREITA];
    }
  }

  return null;
}

/**
 * Verifica se uma coordenada está dentro dos limites da grade.
 * @param {{ x: number, y: number }} posicao
 * @param {number} [largura=LARGURA_GRADE]
 * @param {number} [altura=ALTURA_GRADE]
 * @returns {boolean}
 */
export function estaDentroDosLimites(
  posicao,
  largura = LARGURA_GRADE,
  altura = ALTURA_GRADE
) {
  if (!posicao || typeof posicao.x !== 'number' || typeof posicao.y !== 'number') {
    return false;
  }
  return posicao.x >= 0 && posicao.x < largura && posicao.y >= 0 && posicao.y < altura;
}

/**
 * Busca bactéria presente em uma posição específica do mapa.
 * @param {{ x: number, y: number }} posicao
 * @param {Array<{ id: string, cor: string, posicao: { x: number, y: number } }>} bacterias
 * @returns {object|null}
 */
export function bacteriaNaPosicao(posicao, bacterias = []) {
  if (!posicao || !Array.isArray(bacterias)) return null;
  return (
    bacterias.find(
      (b) => b && b.posicao && b.posicao.x === posicao.x && b.posicao.y === posicao.y
    ) || null
  );
}

/**
 * Função pura que calcula o novo estado após tentativa de movimento.
 * Não altera a posição se ultrapassar os limites ou se estiver em confronto.
 * Se colidir com uma bactéria, inicia o confronto no novo estado.
 *
 * @param {object} estado Estado atual do jogo.
 * @param {string|{dx: number, dy: number}} direcao Direção do movimento.
 * @param {{ largura?: number, altura?: number }} [limites={}] Limites da grade.
 * @returns {object} Novo estado (ou o mesmo se bloqueado).
 */
export function mover(estado, direcao, limites = {}) {
  if (!estado) return estado;

  // Bloqueio de movimento enquanto houver confronto em andamento
  if (estado.confronto !== null && estado.confronto !== undefined) {
    return estado;
  }

  const vetor = normalizarVetorDirecao(direcao);
  if (!vetor) return estado;

  const posicaoAtual = estado.jogador?.posicao || { x: 0, y: 0 };
  const novaPosicao = {
    x: posicaoAtual.x + vetor.dx,
    y: posicaoAtual.y + vetor.dy,
  };

  const largura = limites.largura !== undefined ? limites.largura : LARGURA_GRADE;
  const altura = limites.altura !== undefined ? limites.altura : ALTURA_GRADE;

  // Não move para fora dos limites do mapa
  if (!estaDentroDosLimites(novaPosicao, largura, altura)) {
    return estado;
  }

  const bacteriaEncontrada = bacteriaNaPosicao(novaPosicao, estado.bacteriasNoMapa);

  return {
    ...estado,
    jogador: {
      ...estado.jogador,
      posicao: novaPosicao,
    },
    confronto: bacteriaEncontrada
        ? {
          bacteria: bacteriaEncontrada,
          opcoes: [],
          turno: 1,
          indiceSelecionado: 0,
        }
        : null,
  };
}

/**
 * Orquestra o movimento consumindo e atualizando o estado central e emitindo eventos se houver confronto.
 * @param {string|{dx: number, dy: number}} direcao
 * @param {object} [dependencias={}] Injeção opcional para testes
 * @returns {object|null} Novo estado ou null se não houve movimento
 */
export function executarMovimento(direcao, dependencias = {}) {
  const fnObterEstado = dependencias.obterEstado || obterEstado;
  const fnAtualizarEstado = dependencias.atualizarEstado|| atualizarEstado;
  const fnEmitir = dependencias.emitir || emitir;

  const estadoAtual = fnObterEstado();

  if (estadoAtual.jogador?.pv <= 0) return null;   // jogo encerrado
  if (estadoAtual.confronto != null) return null;

  const limites = dependencias.limites || {
    largura: LARGURA_GRADE,
    altura: ALTURA_GRADE,
  };

  const novoEstado = mover(estadoAtual, direcao, limites);

  // Sem alteração de posição (ex: barreira de limite)
  if (
    novoEstado.jogador?.posicao?.x === estadoAtual.jogador?.posicao?.x &&
    novoEstado.jogador?.posicao?.y === estadoAtual.jogador?.posicao?.y
  ) {
    return null;
  }

  // Atualiza o estado central
  fnAtualizarEstado(novoEstado);

  // Se houve contato com bactéria e iniciou confronto, emite exatamente 1 evento
  if (novoEstado.confronto) {
    fnEmitir(EVENTOS.CONFRONTO_INICIADO, {
      bacteria: novoEstado.confronto.bacteria,
    });
  }

  return novoEstado;
}
