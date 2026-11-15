/**
 * Renderizador mínimo da grade do mapa e dos personagens/bactérias.
 */

import { criarElementoBacteria } from './bacteria.js';
import {LARGURA_GRADE, ALTURA_GRADE} from "../config/index.js";

/**
 * Renderiza a grade e elementos posicionados no container fornecido.
 * @param {HTMLElement} container
 * @param {object} estado
 * @param {object} [opcoes={}]
 */
export function renderizarMapa(container, estado, opcoes = {}) {
  if (!container) return;

  const largura = opcoes.largura ?? LARGURA_GRADE;
  const altura = opcoes.altura ?? ALTURA_GRADE;

  container.innerHTML = '';
  container.className = 'container-mapa';

  const gradeElemento = document.createElement('div');
  gradeElemento.className = 'grade-mapa';
  gradeElemento.style.display = 'grid';
  gradeElemento.style.gridTemplateColumns = `repeat(${largura}, 1fr)`;
  gradeElemento.style.gridTemplateRows = `repeat(${altura}, 1fr)`;

  const posJogador = estado.jogador?.posicao || { x: 0, y: 0 };
  const bacterias = estado.bacteriasNoMapa || [];

  for (let y = 0; y < altura; y++) {
    for (let x = 0; x < largura; x++) {
      const celula = document.createElement('div');
      celula.className = 'celula-grade';
      celula.dataset.x = String(x);
      celula.dataset.y = String(y);

      // Renderiza jogador
      if (posJogador.x === x && posJogador.y === y) {
        celula.classList.add('celula-jogador');
        celula.textContent = 'P';
        celula.setAttribute('aria-label', 'Jogador');
      }

      // Renderiza bactéria com representação de classe, cor e escala em bolinhas (RF24-27, RNF10)
      const bacteria = bacterias.find((b) => b.posicao.x === x && b.posicao.y === y);
      if (bacteria) {
        celula.classList.add('celula-bacteria', `bacteria-${bacteria.cor}`);
        const elBacteria = criarElementoBacteria(bacteria);
        celula.appendChild(elBacteria);
      }

      gradeElemento.appendChild(celula);
    }
  }

  container.appendChild(gradeElemento);
}
