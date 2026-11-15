import { describe, it, expect } from 'vitest';
import { montarRanking } from '../../src/dominio/ranking.js';

describe('Domínio: Montagem e Ordenação do Ranking (RF04, RF05, RF06)', () => {
  const simuladosBase = [
    { nomeJogador: 'BioGuard', pontuacao: 1500 },
    { nomeJogador: 'NanoHero', pontuacao: 1200 },
    { nomeJogador: 'CellDef', pontuacao: 1000 },
    { nomeJogador: 'PhageX', pontuacao: 850 },
    { nomeJogador: 'Microbe', pontuacao: 700 },
    { nomeJogador: 'Immuno', pontuacao: 600 },
    { nomeJogador: 'GeneShld', pontuacao: 450 },
    { nomeJogador: 'AntiPro', pontuacao: 350 },
    { nomeJogador: 'CurieLab', pontuacao: 250 },
    { nomeJogador: 'VaxRun', pontuacao: 100 },
  ];

  it('critério de aceitação: o ranking tem no máximo 10 linhas, ordenadas da maior para a menor pontuação (RF04)', () => {
    const jogador = { username: 'tester', pontuacao: 500 };
    const ranking = montarRanking(simuladosBase, jogador);

    expect(ranking.length).toBe(10);

    for (let i = 0; i < ranking.length - 1; i++) {
      expect(ranking[i].pontuacao).toBeGreaterThanOrEqual(ranking[i + 1].pontuacao);
      expect(ranking[i].posicao).toBe(i + 1);
    }
  });

  it('critério de aceitação: se o jogador tiver a maior pontuação, aparece em 1º lugar', () => {
    const jogadorCampeao = { username: 'Campeao', pontuacao: 2000 };
    const ranking = montarRanking(simuladosBase, jogadorCampeao);

    expect(ranking[0].posicao).toBe(1);
    expect(ranking[0].nomeJogador).toBe('Campeao');
    expect(ranking[0].pontuacao).toBe(2000);
    expect(ranking[0].ehJogadorAtual).toBe(true);

    // O último da lista original foi empurrado para fora do top 10
    const nomesNoTop10 = ranking.map((r) => r.nomeJogador);
    expect(nomesNoTop10).not.toContain('VaxRun');
  });

  it('se o jogador tiver pontuação intermediária, aparece na posição correta no meio do ranking', () => {
    const jogadorMedio = { username: 'Meio', pontuacao: 750 };
    const ranking = montarRanking(simuladosBase, jogadorMedio);

    // 1500 (1º), 1200 (2º), 1000 (3º), 850 (4º), 750 (5º)
    expect(ranking[4].posicao).toBe(5);
    expect(ranking[4].nomeJogador).toBe('Meio');
    expect(ranking[4].pontuacao).toBe(750);
    expect(ranking[4].ehJogadorAtual).toBe(true);
  });

  it('critério de aceitação: se o jogador tiver a menor pontuação (fora do top 10), não aparece no ranking', () => {
    const jogadorLanterna = { username: 'Baixo', pontuacao: 50 };
    const ranking = montarRanking(simuladosBase, jogadorLanterna);

    expect(ranking.length).toBe(10);
    const encontrouJogador = ranking.some((r) => r.ehJogadorAtual);
    expect(encontrouJogador).toBe(false);
  });

  it('jogador sem username informado deve receber "player" como nome no ranking (RF60)', () => {
    const jogadorSemNome = { username: '', pontuacao: 1600 };
    const ranking = montarRanking(simuladosBase, jogadorSemNome);

    expect(ranking[0].nomeJogador).toBe('player');
    expect(ranking[0].ehJogadorAtual).toBe(true);
  });
});
