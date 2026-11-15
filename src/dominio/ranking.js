import { TOP_RANKING_MAXIMO, USERNAME_PADRAO } from '../config/index.js';
import { validarUsername } from './username.js';

export function montarRanking(simulados, jogadorAtual = {}, limite = TOP_RANKING_MAXIMO) {
  const bruto = jogadorAtual.username || jogadorAtual.nomeJogador || '';
  const validacao = validarUsername(bruto);
  const nomeFinal = validacao.valido ? validacao.username : USERNAME_PADRAO;
  const pontosJogador = Math.max(0, Number(jogadorAtual.pontuacao) || 0);

  const listaSimulados = (simulados || [])
      .filter((s) => s && s.nomeJogador)
      .map((s) => ({
        nomeJogador: String(s.nomeJogador),
        pontuacao: Number(s.pontuacao) || 0,
        ehJogadorAtual: false,
      }));

  const entradaJogador = {
    nomeJogador: nomeFinal,
    pontuacao: pontosJogador,
    ehJogadorAtual: true,
  };

  const todos = [...listaSimulados, entradaJogador];
  todos.sort((a, b) => b.pontuacao - a.pontuacao);

  return todos.slice(0, limite).map((item, index) => ({
    posicao: index + 1,
    nomeJogador: item.nomeJogador,
    pontuacao: item.pontuacao,
    ehJogadorAtual: item.ehJogadorAtual,
  }));
}
