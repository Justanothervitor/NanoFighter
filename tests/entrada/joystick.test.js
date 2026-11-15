import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ehDispositivoToque, criarJoystick } from '../../src/entrada/joystick.js';
import { DIRECOES } from '../../src/config/index.js';

describe('Entrada: Joystick Virtual (RF55)', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('deve identificar dispositivo de toque corretamente', () => {
    // Em ambiente de teste padrão, sem toque
    expect(typeof ehDispositivoToque()).toBe('boolean');
  });

  it('não deve exibir joystick se não for dispositivo de toque e não for forçado', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const joystick = criarJoystick(container, { forcarExibicao: false });
    expect(joystick.elemento).toBeNull();
  });

  it('deve renderizar botões direcionais quando exibição for forçada', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const mockMover = vi.fn();
    const joystick = criarJoystick(container, {
      forcarExibicao: true,
      executarMovimento: mockMover,
    });

    expect(joystick.elemento).not.toBeNull();
    const botoes = container.querySelectorAll('.btn-direcao');
    expect(botoes.length).toBe(4);

    const btnCima = container.querySelector('.btn-cima');
    const btnBaixo = container.querySelector('.btn-baixo');
    const btnEsq = container.querySelector('.btn-esquerda');
    const btnDir = container.querySelector('.btn-direita');

    expect(btnCima).not.toBeNull();
    expect(btnBaixo).not.toBeNull();
    expect(btnEsq).not.toBeNull();
    expect(btnDir).not.toBeNull();

    // Acionamento do botão Cima
    btnCima.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    expect(mockMover).toHaveBeenCalledWith(DIRECOES.CIMA, undefined);

    // Acionamento do botão Baixo
    btnBaixo.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    expect(mockMover).toHaveBeenCalledWith(DIRECOES.BAIXO, undefined);

    // Acionamento do botão Esquerda
    btnEsq.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    expect(mockMover).toHaveBeenCalledWith(DIRECOES.ESQUERDA, undefined);

    // Acionamento do botão Direita
    btnDir.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    expect(mockMover).toHaveBeenCalledWith(DIRECOES.DIREITA, undefined);

    // Destruição remove elemento
    joystick.destruir();
    expect(container.querySelector('.joystick-direcional')).toBeNull();
  });
});
