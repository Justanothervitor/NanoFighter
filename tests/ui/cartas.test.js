import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  formatarDadosCarta,
  renderizarCartasMedicamento,
} from '../../src/ui/cartas.js';

describe('UI: Cartas de Medicamentos (RF19, RF56, RF58, RF59)', () => {
  let container;

  beforeEach(() => {
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  it('formatarDadosCarta deve formatar dados nominais e atalhos com exatidão', () => {
    const med = { nome: 'Vírus', eficacia: 0.65 };
    const dados = formatarDadosCarta(med, 0, true);

    expect(dados.nome).toBe('Vírus');
    expect(dados.eficaciaPercentual).toBe('65%');
    expect(dados.atalho).toBe('A');
    expect(dados.destacado).toBe(true);
    expect(dados.rotuloAcessivel).toContain('Vírus');
    expect(dados.rotuloAcessivel).toContain('65%');
    expect(dados.rotuloAcessivel).toContain('tecla A');
  });

  it('critério de aceitação: em batalha, exatamente 2 cartas visíveis, cada uma com nome e eficácia (RF19)', () => {
    const opcoes = [
      { nome: 'Vírus', eficacia: 0.65 },
      { nome: 'Terapia Fotodinâmica', eficacia: 0.99 },
    ];

    renderizarCartasMedicamento(container, opcoes, 1);

    const cartas = container.querySelectorAll('.carta-medicamento');
    expect(cartas.length).toBe(2);

    expect(cartas[0].textContent).toContain('Vírus');
    expect(cartas[0].textContent).toContain('65%');
    expect(cartas[0].classList.contains('carta-destacada')).toBe(false);

    expect(cartas[1].textContent).toContain('Terapia Fotodinâmica');
    expect(cartas[1].textContent).toContain('99%');
    expect(cartas[1].classList.contains('carta-destacada')).toBe(true);
    expect(cartas[1].getAttribute('aria-selected')).toBe('true');
  });

  it('deve disparar evento de seleção por clique e toque', () => {
    const opcoes = [
      { nome: 'Opção 0', eficacia: 0.5 },
      { nome: 'Opção 1', eficacia: 0.5 },
    ];

    const aoEscolher = vi.fn();
    renderizarCartasMedicamento(container, opcoes, 0, aoEscolher);

    const cartas = container.querySelectorAll('.carta-medicamento');

    // Clique
    cartas[0].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(aoEscolher).toHaveBeenCalledWith(0);

    // Toque
    const touchEv = new PointerEvent('pointerdown', { bubbles: true, pointerType: 'touch' });
    cartas[1].dispatchEvent(touchEv);
    expect(aoEscolher).toHaveBeenCalledWith(1);
  });
});
