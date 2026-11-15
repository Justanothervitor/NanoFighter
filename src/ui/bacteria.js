/**
 * Representação visual e acessibilidade das bactérias por classe e escala (RF24, RF25, RF26, RF27, RNF10).
 * As escalas são representações conceituais de força e NÃO utilizam nenhum temporizador.
 */

import { PROVISORIO_ESCALAS_BACTERIA } from '../config/index.js';

/**
 * Retorna as informações conceituais de escala, quantidade de bolinhas e rótulo acessível da bactéria.
 * Função pura e desacoplada do DOM.
 *
 * @param {'verde'|'amarela'|'vermelha'} cor
 * @returns {{ cor: string, escala: string, bolinhas: number, textoBolinhas: string, rotuloAcessivel: string }}
 */
export function obterRepresentacaoBacteria(cor) {
  const config = PROVISORIO_ESCALAS_BACTERIA[cor] || {
    escala: 'horas',
    bolinhas: 1,
    rotulo: 'Horas',
  };

  const textoBolinhas = '●'.repeat(config.bolinhas);
  const rotuloAcessivel = `Bactéria ${cor}, escala ${config.escala}, ${config.bolinhas} ${
    config.bolinhas === 1 ? 'bolinha' : 'bolinhas'
  }`;

  return {
    cor,
    escala: config.escala,
    bolinhas: config.bolinhas,
    textoBolinhas,
    rotuloAcessivel,
  };
}

/**
 * Cria o elemento DOM para exibição da bactéria na grade do mapa com suporte a acessibilidade (RNF10).
 *
 * @param {{ id: string, cor: 'verde'|'amarela'|'vermelha', posicao?: { x: number, y: number } }} bacteria
 * @returns {HTMLElement}
 */
export function criarElementoBacteria(bacteria) {
  const info = obterRepresentacaoBacteria(bacteria.cor);

  const elemento = document.createElement('div');
  elemento.className = `marcador-bacteria bacteria-${info.cor}`;
  elemento.setAttribute('role', 'img');
  elemento.setAttribute('aria-label', info.rotuloAcessivel);

  // Letra identificadora da classe
  const spanLetra = document.createElement('span');
  spanLetra.className = 'bacteria-letra';
  spanLetra.textContent = info.cor[0].toUpperCase();

  // Indicador de bolinhas (RF24, RF25, RF26)
  const spanBolinhas = document.createElement('span');
  spanBolinhas.className = 'bacteria-bolinhas';
  spanBolinhas.setAttribute('aria-hidden', 'true');
  spanBolinhas.textContent = info.textoBolinhas;

  elemento.appendChild(spanLetra);
  elemento.appendChild(spanBolinhas);

  return elemento;
}
