import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderizarRanking, renderizarEntradaUsername } from '../../src/ui/ranking.js';

describe('UI: Ranking e Entrada de Username (RF03, RF05, RNF03)', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  it('critério de aceitação: renderiza tabela com posição, username e pontuação', () => {
    const listaRanking = [
      { posicao: 1, nomeJogador: 'Campeao', pontuacao: 1500, ehJogadorAtual: false },
      { posicao: 2, nomeJogador: 'Heroi', pontuacao: 1200, ehJogadorAtual: true },
    ];

    renderizarRanking(container, listaRanking);

    const linhas = container.querySelectorAll('tbody tr');
    expect(linhas.length).toBe(2);

    // Linha 1
    const cols1 = linhas[0].querySelectorAll('td');
    expect(cols1[0].textContent).toBe('1º');
    expect(cols1[1].textContent).toBe('Campeao');
    expect(cols1[2].textContent).toBe('1500');
    expect(linhas[0].classList.contains('linha-jogador-atual')).toBe(false);

    // Linha 2 (jogador atual destacado)
    const cols2 = linhas[1].querySelectorAll('td');
    expect(cols2[0].textContent).toBe('2º');
    expect(cols2[1].textContent).toContain('Heroi');
    expect(cols2[2].textContent).toBe('1200');
    expect(linhas[1].classList.contains('linha-jogador-atual')).toBe(true);
  });

  it('critério de aceitação: entrada com <script> aparece como texto, sem executar (RNF03)', () => {
    const entradaXss = '<script>window.__xssExecutou = true;</script>';
    const listaComXss = [
      { posicao: 1, nomeJogador: entradaXss, pontuacao: 999, ehJogadorAtual: false },
    ];

    renderizarRanking(container, listaComXss);

    // Nenhuma tag <script> deve ser criada no DOM
    const scriptsCriados = container.querySelectorAll('script');
    expect(scriptsCriados.length).toBe(0);

    // O texto deve estar contido literalmente
    const tdNome = container.querySelector('tbody td:nth-child(2)');
    expect(tdNome.textContent).toBe(entradaXss);

    // Script não foi executado
    expect(window.__xssExecutou).toBeUndefined();
  });

  it('renderizarEntradaUsername deve permitir preencher e salvar novo username', () => {
    const callbackSalvar = vi.fn();
    renderizarEntradaUsername(container, 'player', callbackSalvar);

    const input = container.querySelector('input');
    const botao = container.querySelector('button');

    expect(input).not.toBeNull();
    expect(input.value).toBe('player');

    input.value = 'novoUser';
    botao.click();

    expect(callbackSalvar).toHaveBeenCalledWith('novoUser');
  });
});
