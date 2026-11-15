/**
 * Joystick virtual na tela para dispositivos móveis (RF55).
 * Detecta capacidades de toque por `pointer: coarse` e APIs touch.
 */

import { executarMovimento } from '../dominio/mapa.js';
import { DIRECOES } from '../config/index.js';

/**
 * Detecta se o ambiente é um dispositivo sensível ao toque.
 * @returns {boolean}
 */
export function ehDispositivoToque() {
  if (typeof window === 'undefined') return false;
  const temMediaCoarse =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(pointer: coarse)').matches;
  const temTouchNaJanela = 'ontouchstart' in window;
  const temPontosDeToque =
    typeof navigator !== 'undefined' &&
    navigator.maxTouchPoints !== undefined &&
    navigator.maxTouchPoints > 0;

  return Boolean(temMediaCoarse || temTouchNaJanela || temPontosDeToque);
}

/**
 * Cria o componente de joystick virtual com setas direcionais.
 * @param {HTMLElement} containerElemento
 * @param {object} [opcoes={}]
 * @returns {{ elemento: HTMLElement|null, destruir: () => void }}
 */
export function criarJoystick(containerElemento, opcoes = {}) {
  const fnExecutarMovimento = opcoes.executarMovimento || executarMovimento;
  const forcarExibicao = opcoes.forcarExibicao || false;

  // Só exibe se for dispositivo de toque ou explicitamente forçado
  if (!ehDispositivoToque() && !forcarExibicao) {
    return {
      elemento: null,
      destruir: () => {},
    };
  }

  const joystickContainer = document.createElement('div');
  joystickContainer.className = 'joystick-direcional';
  joystickContainer.setAttribute('role', 'region');
  joystickContainer.setAttribute('aria-label', 'Controles de Movimento');

  const botoesConfig = [
    { direcao: DIRECOES.CIMA, rotulo: '↑', classe: 'btn-cima' },
    { direcao: DIRECOES.ESQUERDA, rotulo: '←', classe: 'btn-esquerda' },
    { direcao: DIRECOES.DIREITA, rotulo: '→', classe: 'btn-direita' },
    { direcao: DIRECOES.BAIXO, rotulo: '↓', classe: 'btn-baixo' },
  ];

  const elementosBotoes = [];

  botoesConfig.forEach(({ direcao, rotulo, classe }) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `btn-direcao ${classe}`;
    btn.textContent = rotulo;
    btn.setAttribute('aria-label', `Mover para ${direcao}`);

    function acionar(evento) {
      if (evento) {
        if (typeof evento.preventDefault === 'function') evento.preventDefault();
        if (typeof evento.stopPropagation === 'function') evento.stopPropagation();
      }
      fnExecutarMovimento(direcao, opcoes.dependencias);
    }

    btn.addEventListener('pointerdown', acionar);
    elementosBotoes.push({ btn, acionar });
    joystickContainer.appendChild(btn);
  });

  if (containerElemento && typeof containerElemento.appendChild === 'function') {
    containerElemento.appendChild(joystickContainer);
  }

  function destruir() {
    elementosBotoes.forEach(({ btn, acionar }) => {
      btn.removeEventListener('pointerdown', acionar);
    });
    if (joystickContainer.parentNode) {
      joystickContainer.parentNode.removeChild(joystickContainer);
    }
  }

  return {
    elemento: joystickContainer,
    destruir,
  };
}
