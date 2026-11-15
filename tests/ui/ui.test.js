import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderizarMapa } from '../../src/ui/mapa.js';
import { renderizarBatalha } from '../../src/ui/batalha.js';
import { renderizarJogo } from '../../src/ui/index.js';
import { EVENTOS, limpar, ouvir } from '../../src/eventos/index.js';
import { TEMPO_MAXIMO_RESPOSTA_MS } from '../../src/config/index.js';

describe('Interface do Usuário (UI): Grade, Batalha e Latência (RF58, RF59)', () => {
  let container;

  beforeEach(() => {
    limpar();
    document.body.innerHTML = '';
    container = document.createElement('div');
    container.id = 'app';
    document.body.appendChild(container);
  });

  it('deve renderizar a grade com as células, jogador e bactérias', () => {
    const estado = {
      jogador: { posicao: { x: 1, y: 1 } },
      bacteriasNoMapa: [{ id: 'b1', cor: 'verde', posicao: { x: 3, y: 3 } }],
      confronto: null,
    };

    renderizarMapa(container, estado, { largura: 5, altura: 5 });

    const celulas = container.querySelectorAll('.celula-grade');
    expect(celulas.length).toBe(25);

    const celulaJogador = container.querySelector('.celula-jogador');
    expect(celulaJogador).not.toBeNull();
    expect(celulaJogador.dataset.x).toBe('1');
    expect(celulaJogador.dataset.y).toBe('1');

    const celulaBact = container.querySelector('.celula-bacteria.bacteria-verde');
    expect(celulaBact).not.toBeNull();
    expect(celulaBact.dataset.x).toBe('3');
    expect(celulaBact.dataset.y).toBe('3');
  });

  it('deve renderizar o painel de batalha com cartas e destaque correto', () => {
    const estado = {
      jogador: { posicao: { x: 1, y: 1 } },
      bacteriasNoMapa: [],
      confronto: {
        bacteria: { id: 'b1', cor: 'amarela', posicao: { x: 1, y: 1 } },
        opcoes: [
          { nome: 'Vírus', eficacia: 0.65 },
          { nome: 'Terapia', eficacia: 0.99 },
        ],
        turno: 1,
        indiceSelecionado: 1,
      },
    };

    renderizarBatalha(container, estado);

    const cartas = container.querySelectorAll('.carta-medicamento');
    expect(cartas.length).toBe(2);

    expect(cartas[0].classList.contains('carta-destacada')).toBe(false);
    expect(cartas[1].classList.contains('carta-destacada')).toBe(true);
  });

  it('RF58: clique do mouse na carta deve emitir medicamento:escolhido com o índice', () => {
    const estado = {
      jogador: { posicao: { x: 1, y: 1 } },
      bacteriasNoMapa: [],
      confronto: {
        bacteria: { id: 'b1', cor: 'verde', posicao: { x: 1, y: 1 } },
        opcoes: [
          { nome: 'Opção 0', eficacia: 0.5 },
          { nome: 'Opção 1', eficacia: 0.8 },
        ],
        turno: 1,
        indiceSelecionado: 0,
      },
    };

    const listener = vi.fn();
    ouvir(EVENTOS.MEDICAMENTO_ESCOLHIDO, listener);

    renderizarBatalha(container, estado);

    const cartas = container.querySelectorAll('.carta-medicamento');
    cartas[1].dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(listener).toHaveBeenCalledWith({ indice: 1 });
  });

  it('RF59: toque na carta em dispositivos móveis deve emitir medicamento:escolhido', () => {
    const estado = {
      jogador: { posicao: { x: 1, y: 1 } },
      bacteriasNoMapa: [],
      confronto: {
        bacteria: { id: 'b1', cor: 'vermelha', posicao: { x: 1, y: 1 } },
        opcoes: [
          { nome: 'Opção 0', eficacia: 0.5 },
          { nome: 'Opção 1', eficacia: 0.8 },
        ],
        turno: 1,
        indiceSelecionado: 0,
      },
    };

    const listener = vi.fn();
    ouvir(EVENTOS.MEDICAMENTO_ESCOLHIDO, listener);

    renderizarBatalha(container, estado);

    const cartas = container.querySelectorAll('.carta-medicamento');
    const eventoToque = new PointerEvent('pointerdown', {
      bubbles: true,
      pointerType: 'touch',
    });
    cartas[0].dispatchEvent(eventoToque);

    expect(listener).toHaveBeenCalledWith({ indice: 0 });
  });

  it('critério de aceitação: ação do jogador reflete na tela em até 200 ms', () => {
    const estado = {
      jogador: { posicao: { x: 0, y: 0 } },
      bacteriasNoMapa: [{ id: 'b1', cor: 'verde', posicao: { x: 2, y: 2 } }],
      confronto: null,
    };

    const tInicio = performance.now();
    renderizarJogo(container, estado);
    const tFim = performance.now();

    const duracao = tFim - tInicio;
    expect(duracao).toBeLessThan(TEMPO_MAXIMO_RESPOSTA_MS);
  });
});
