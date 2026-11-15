/**
 * Módulo de carregamento e parsing dos jogadores simulados do ranking (RF42).
 */

import { CAMINHO_CSV_RANKING } from '../config/index.js';
import { validarUsername } from '../dominio/username.js';

/**
 * Converte o texto CSV de ranking em uma lista de objetos de jogadores simulados.
 *
 * @param {string} conteudoCsv
 * @returns {Array<{ nomeJogador: string, pontuacao: number }>}
 * @throws {Error} Se o formato ou conteúdo for inválido.
 */
export function parsearCsvRanking(conteudoCsv) {
  if (!conteudoCsv || typeof conteudoCsv !== 'string') {
    throw new Error('Conteúdo CSV de ranking vazio ou inválido.');
  }

  const linhas = conteudoCsv
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (linhas.length < 2) {
    throw new Error('O CSV de ranking deve conter ao menos a linha de cabeçalho e um registro.');
  }

  const cabecalho = linhas[0].split(',').map((c) => c.trim().toLowerCase());
  const idxNome = cabecalho.findIndex((c) => c === 'nomejogador');
  const idxPontos = cabecalho.findIndex(
    (c) => c === 'pontuacao' || c === 'pontuação'
  );

  if (idxNome === -1 || idxPontos === -1) {
    throw new Error(
      `Cabeçalho CSV inválido: esperado conter "nomeJogador,pontuacao", recebido "${linhas[0]}"`
    );
  }

  const simulados = [];

  for (let i = 1; i < linhas.length; i++) {
    const colunas = linhas[i].split(',').map((c) => c.trim());
    if (colunas.length < 2) {
      throw new Error(`Linha inválida ${i + 1} no CSV de ranking: "${linhas[i]}"`);
    }

    const nome = colunas[idxNome];
    const pontosStr = colunas[idxPontos];

    if (!nome) {
      throw new Error(`Nome de jogador ausente na linha ${i + 1}.`);
    }

    const pontuacao = parseInt(pontosStr, 10);
    if (Number.isNaN(pontuacao) || pontuacao < 0) {
      throw new Error(`Pontuação inválida na linha ${i + 1}: "${pontosStr}"`);
    }

    simulados.push({
      nomeJogador: nome,
      pontuacao,
    });
  }

  return simulados;
}

let simuladosCarregados = null;

/**
 * Carrega a lista dos 10 jogadores simulados via fetch.
 *
 * @param {string} [caminho=CAMINHO_CSV_RANKING]
 * @param {object} [opcoes={}]
 * @returns {Promise<Array<{ nomeJogador: string, pontuacao: number }>>}
 */
export async function carregarSimulados(
  caminho = CAMINHO_CSV_RANKING,
  opcoes = {}
) {
  if (simuladosCarregados && !opcoes.forcarRecarga) {
    return simuladosCarregados;
  }

  const fnFetch = opcoes.fetch || globalThis.fetch;
  if (typeof fnFetch !== 'function') {
    throw new Error('Ambiente sem suporte a fetch disponível.');
  }

  let resposta;
  try {
    resposta = await fnFetch(caminho);
  } catch (erroRede) {
    throw new Error(
      `Erro de rede ao buscar o ranking "${caminho}": ${erroRede.message || erroRede}`
    );
  }

  if (!resposta.ok) {
    throw new Error(
      `Falha HTTP ao carregar "${caminho}": ${resposta.status} ${resposta.statusText}`
    );
  }

  const texto = await resposta.text();
  const lista = parsearCsvRanking(texto);
  simuladosCarregados = lista;

  return lista;
}

/**
 * Limpa o cache de jogadores simulados em memória.
 */
export function limparCacheSimulados() {
  simuladosCarregados = null;
}
