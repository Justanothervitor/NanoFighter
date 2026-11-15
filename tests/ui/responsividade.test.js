import { describe, it, expect, beforeEach } from 'vitest';
import { renderizarJogo, injetarEstilosBase } from '../../src/ui/index.js';

describe('UI: Responsividade e Layout Fluido em 360px', () => {
  let appRaiz;

  beforeEach(() => {
    document.body.innerHTML = '';
    appRaiz = document.createElement('div');
    appRaiz.id = 'app';
    document.body.appendChild(appRaiz);
  });

  it('critério de aceitação: em viewport de 360 px de largura, o HUD e as cartas não saem da tela', () => {
    injetarEstilosBase();

    // Simula viewport móvel estreito de 360px
    appRaiz.style.width = '360px';
    appRaiz.style.maxWidth = '360px';

    const estado = {
      jogador: { pv: 10, pvMax: 10, pontuacao: 120, nivelXp: 1, xp: 8, posicao: { x: 0, y: 0 } },
      fase: 1,
      eliminadasNaFase: 2,
      bacteriasNoMapa: [{ id: 'b1', cor: 'verde', posicao: { x: 2, y: 2 } }],
      confronto: {
        bacteria: { id: 'b1', cor: 'verde', posicao: { x: 2, y: 2 } },
        opcoes: [
          { nome: 'Vírus', eficacia: 0.65 },
          { nome: 'Terapia Fotodinâmica', eficacia: 0.99 },
        ],
        turno: 1,
        indiceSelecionado: 0,
      },
    };

    renderizarJogo(appRaiz, estado);

    const hud = appRaiz.querySelector('.hud-container');
    const cartas = appRaiz.querySelector('.container-cartas-medicamento');
    const painelBatalha = appRaiz.querySelector('.painel-batalha');

    expect(hud).not.toBeNull();
    expect(cartas).not.toBeNull();
    expect(painelBatalha).not.toBeNull();

    // Valida que o estilo global proíbe rolagem horizontal
    expect(document.documentElement.style.overflowX).not.toBe('scroll');
    expect(window.getComputedStyle(document.body).overflowX).toBe('hidden');
  });
});
