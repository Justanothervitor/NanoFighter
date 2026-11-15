/**
 * Lógica pura de composição e geração de bactérias por fase e modo infinito (RF48, RF49, RF50, RF51, RF52, RF53).
 */

import {
  ALTURA_GRADE,
  COMPOSICAO_FASE_1, COMPOSICAO_POR_FASE,
  FASE_MODO_INFINITO,
  LARGURA_GRADE,
  METAS_POR_FASE,
  POSICAO_INICIAL_JOGADOR,
  PROVISORIO_LIMITE_BACTERIAS_MODO_INFINITO
} from '../config/index.js';
import {rngPadrao} from '../util/rng.js';
import {atualizarEstado, obterEstado} from '../estado/index.js';
import {EVENTOS, ouvir} from '../eventos/index.js';

/**
 * Retorna as quantidades nominais de cada cor de bactéria para uma fase específica.
 * @param {number} fase
 * @returns {{ verde: number, amarela: number, vermelha: number }|null}
 */
export function obterComposicaoFase(fase) {
  const f = Number(fase) || 1;
  if (f >= FASE_MODO_INFINITO) {
    return null; // Modo infinito possui composição dinâmica
  }
  return COMPOSICAO_POR_FASE?.[f] || COMPOSICAO_FASE_1;
}

/**
 * Embaralha uma lista de forma determinística utilizando o gerador RNG injetado.
 * @template T
 * @param {T[]} lista
 * @param {() => number} rng
 * @returns {T[]}
 */
function embaralharLista(lista, rng) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

/**
 * Gera a lista de todas as coordenadas livres na grade, excluindo a posição do jogador.
 * @param {{ largura?: number, altura?: number }} dimensoes
 * @param {{ x: number, y: number }} [posicaoJogador]
 * @returns {Array<{ x: number, y: number }>}
 */
export function obterCelulasLivres(
  dimensoes = {},
  posicaoJogador = { x: 0, y: 0 }
) {
  const largura = dimensoes.largura;
  const altura = dimensoes.altura;
  const celulas = [];

  for (let y = 0; y < altura; y++) {
    for (let x = 0; x < largura; x++) {
      if (!posicaoJogador || posicaoJogador.x !== x || posicaoJogador.y !== y) {
        celulas.push({ x, y });
      }
    }
  }

  return celulas;
}

function contagensDaFase(fase, composicao) {
  const soma = (composicao.verde || 0) + (composicao.amarela || 0) + (composicao.vermelha || 0);

  // Contagens absolutas (ex.: 9, 1, 0): usa direto
  if (soma > 1.0001) {
    return {
      verde: Math.round(composicao.verde || 0),
      amarela: Math.round(composicao.amarela || 0),
      vermelha: Math.round(composicao.vermelha || 0),
    };
  }

  // Proporções: distribui sobre a meta da fase
  const total = METAS_POR_FASE[fase] ?? 10;
  const amarela = Math.round(total * (composicao.amarela || 0));
  const vermelha = Math.round(total * (composicao.vermelha || 0));
  return { verde: Math.max(0, total - amarela - vermelha), amarela, vermelha };
}

/**
 * Gera uma leva aleatória de bactérias para o modo infinito (RF52).
 * Respeita o limite numérico da fase 4 (1 a 25) e a ausência de bactérias verdes (RF51).
 *
 * @param {{ largura?: number, altura?: number }} [dimensoes={}]
 * @param {() => number} [rng=rngPadrao]
 * @param {{ x: number, y: number }} [posicaoJogador]
 * @returns {Array<{ id: string, cor: 'amarela'|'vermelha', posicao: { x: number, y: number } }>}
 */
export function gerarModoInfinito(
  dimensoes = {},
  rng = rngPadrao,
  posicaoJogador = { x: 0, y: 0 }
) {
  // RF52: Quantidade aleatória respeitando o limite do nível 4 (entre 1 e 25, nunca 0)
  const quantidade = Math.floor(rng() * PROVISORIO_LIMITE_BACTERIAS_MODO_INFINITO) + 1;

  const celulasLivres = embaralharLista(
    obterCelulasLivres(dimensoes, posicaoJogador),
    rng
  );

  const totalParaCriar = Math.min(quantidade, celulasLivres.length);
  const bacterias = [];

  for (let i = 0; i < totalParaCriar; i++) {
    // PROVISÓRIO: sem bactériasc verdes no modo infinito (apenas amarelas e vermelhas)
    const cor = rng() < 0.6 ? 'amarela' : 'vermelha';
    bacterias.push({
      id: `bact-inf-${Date.now()}-${i + 1}`,
      cor,
      posicao: celulasLivres[i],
    });
  }

  return bacterias;
}

/**
 * Gera as bactérias para a fase especificada posicionando-as em células livres sem sobreposição.
 *
 * @param {number} fase Número da fase (1 a 5).
 * @param {{ largura?: number, altura?: number }} [dimensoes={}] Limites do mapa.
 * @param {() => number} [rng=rngPadrao]
 * @param {{ x: number, y: number }} [posicaoJogador]
 * @returns {Array<{ id: string, cor: 'verde'|'amarela'|'vermelha', posicao: { x: number, y: number } }>}
 */
export function gerarBacterias(
    fase,
    dimensoes = {},
    rng = rngPadrao,
    posicaoJogador = { x: 0, y: 0 }
) {
  const f = Number(fase) || 1;

  if (f >= FASE_MODO_INFINITO) {
    return gerarModoInfinito(dimensoes, rng, posicaoJogador);
  }

  const composicao = obterComposicaoFase(f);
  const c = contagensDaFase(f, composicao);

  const coresParaGerar = [];
  for (let i = 0; i < c.verde; i++) coresParaGerar.push('verde');
  for (let i = 0; i < c.amarela; i++) coresParaGerar.push('amarela');
  for (let i = 0; i < c.vermelha; i++) coresParaGerar.push('vermelha');

  const celulasLivres = embaralharLista(
      obterCelulasLivres(dimensoes, posicaoJogador),
      rng
  );

  const bacterias = [];
  const total = Math.min(coresParaGerar.length, celulasLivres.length);

  for (let i = 0; i < total; i++) {
    bacterias.push({
      id: `bact-f${f}-${i + 1}`,
      cor: coresParaGerar[i],
      posicao: celulasLivres[i],
    });
  }

  return bacterias;
}

/**
 * Popula o mapa com as bactérias da fase informada.
 * @param {number} fase
 * @param {object} [dependencias={}]
 * @returns {Array<object>}
 */
export function popularMapaParaFase(fase, dependencias = {}) {
  const fnObterEstado = dependencias.obterEstado || obterEstado;
  const fnAtualizarEstado = dependencias.atualizarEstado || atualizarEstado;
  const rng = dependencias.rng || rngPadrao;
  const dimensoes = dependencias.dimensoes || {
    largura: LARGURA_GRADE,
    altura: ALTURA_GRADE,
  };

  const estado = fnObterEstado();
  const posJogador = estado.jogador?.posicao || { x: 0, y: 0 };
  const novasBacterias = gerarBacterias(fase, dimensoes, rng, posJogador);

  fnAtualizarEstado((atual) => ({
    ...atual,
    bacteriasNoMapa: novasBacterias,
  }));

  return novasBacterias;
}

/**
 * Conecta a geração de bactérias aos eventos do jogo:
 * - Ao ouvir `fase:iniciada`: popula o mapa com a composição da nova fase.
 * - Ao ouvir `bacteria:derrotada`: no modo infinito, gera nova leva se o contador chegar a zero (RF53).
 *
 * @param {object} [dependencias={}]
 * @returns {() => void} Função de desinscrição
 */
export function vincularComposicaoAosEventos(dependencias = {}) {
  const fnOuvir = dependencias.ouvir || ouvir;
  const fnObterEstado = dependencias.obterEstado || obterEstado;

  // 1. Ao iniciar nova fase, popula o mapa
  const cancelarFaseIniciada = fnOuvir(EVENTOS.FASE_INICIADA, ({ fase }) => {
    const fnAtualizarEstado = dependencias.atualizarEstado || atualizarEstado;
    fnAtualizarEstado((atual) => ({
      ...atual,
      jogador: { ...atual.jogador, posicao: { ...POSICAO_INICIAL_JOGADOR } },
      confronto: null,
    }));
    popularMapaParaFase(fase, dependencias);
  });

  // 2. RF53: No modo infinito, repõe bactérias quando o mapa chegar a zero
  const cancelarBacteriaDerrotada = fnOuvir(EVENTOS.BACTERIA_DERROTADA, () => {
    const estado = fnObterEstado();
    // Apenas no modo infinito (fase 5) e quando todas do mapa tiverem sido derrotadas
    if (estado.fase >= FASE_MODO_INFINITO && (!estado.bacteriasNoMapa || estado.bacteriasNoMapa.length === 0)) {
      popularMapaParaFase(estado.fase, dependencias);
    }
  });

  return function desvincular() {
    cancelarFaseIniciada();
    cancelarBacteriaDerrotada();
  };
}
