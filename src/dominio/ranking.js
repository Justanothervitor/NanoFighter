/**
 * Lógica pura de composição e ordenação do ranking (RF04, RF05, RF06).
 */

import { TOP_RANKING_MAXIMO } from '../config/index.js';
import { usernameFinal } from './username.js';

/**
 * Junta os jogadores simulados e o jogador atual, ordenando por pontuação decrescente
 * e retornando as 10 primeiras posições (RF04, RF05, RF06).
 *
 * @param {Array<{ nomeJogador: string, pontuacao: number }>} simulados
 * @param {{ username?: string, nomeJogador?: string, pontuacao?: number }} jogadorAtual
 * @param {number} [limite=TOP_RANKING_MAXIMO]
 * @returns {Array<{ posicao: number, nomeJogador: string, pontuacao: number, ehJogadorAtual: boolean }>}
 */
export function montarRanking(
  simulados = [],
  jogadorAtual = {},
  limite = TOP_RANKING_MAXIMO
) {
  const nomeFinal = usernameFinal(
    jogadorAtual.username || jogadorAtual.nomeJogador || ''
  );
  const pontosJogador = Math.max(0, Number(jogadorAtual.pontuacao) || 0);

  // Mapeia os registros garantindo formato padronizado
  const listaSimulados = simulados.map((s) => ({
    nomeJogador: s.nomeJogador,
    pontuacao: Number(s.pontuacao) || 0,
    ehJogadorAtual: false,
  }));

  const entradaJogador = {
    nomeJogador: nomeFinal,
    pontuacao: pontosJogador,
    ehJogadorAtual: true,
  };

  // Junta todos os competidores
  const todos = [...listaSimulados, entradaJogador];

  // Ordenação estável por pontuação decrescente (RF04)
  // PROVISÓRIO: critério de desempate por ordem de chegada/inserção
  todos.sort((a, b) => b.pontuacao - a.pontuacao);

  // Limita ao top 10 (ou limite configurado)
  const top10 = todos.slice(0, limite);

  // Atribui posições de 1 a 10 (RF05)
  return top10.map((item, index) => ({
    posicao: index + 1,
    nomeJogador: item.nomeJogador,
    pontuacao: item.pontuacao,
    ehJogadorAtual: item.ehJogadorAtual,
  }));
}
