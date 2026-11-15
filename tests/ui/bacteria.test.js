import { describe, it, expect, vi } from 'vitest';
import {
  obterRepresentacaoBacteria,
  criarElementoBacteria,
} from '../../src/ui/bacteria.js';
import { PROVISORIO_ESCALAS_BACTERIA } from '../../src/config/index.js';

describe('UI: Representação das Bactérias por Classe e Escala (RF24, RF25, RF26, RF27, RNF10)', () => {
  it('critério de aceitação: a bactéria vermelha exibe 3 bolinhas e a verde 1 (lidos da config) (RF24, RF26)', () => {
    const infoVerde = obterRepresentacaoBacteria('verde');
    expect(infoVerde.bolinhas).toBe(PROVISORIO_ESCALAS_BACTERIA.verde.bolinhas);
    expect(infoVerde.bolinhas).toBe(1);
    expect(infoVerde.textoBolinhas).toBe('●');
    expect(infoVerde.escala).toBe('horas');

    const infoAmarela = obterRepresentacaoBacteria('amarela');
    expect(infoAmarela.bolinhas).toBe(PROVISORIO_ESCALAS_BACTERIA.amarela.bolinhas);
    expect(infoAmarela.bolinhas).toBe(2);
    expect(infoAmarela.textoBolinhas).toBe('●●');
    expect(infoAmarela.escala).toBe('minutos');

    const infoVermelha = obterRepresentacaoBacteria('vermelha');
    expect(infoVermelha.bolinhas).toBe(PROVISORIO_ESCALAS_BACTERIA.vermelha.bolinhas);
    expect(infoVermelha.bolinhas).toBe(3);
    expect(infoVermelha.textoBolinhas).toBe('●●●');
    expect(infoVermelha.escala).toBe('segundos');
  });

  it('critério de aceitação: presença do aria-label com a cor e escala para acessibilidade (RNF10)', () => {
    const info = obterRepresentacaoBacteria('verde');
    expect(info.rotuloAcessivel).toContain('verde');
    expect(info.rotuloAcessivel).toContain('horas');
    expect(info.rotuloAcessivel).toContain('1 bolinha');

    const el = criarElementoBacteria({ id: 'bact-1', cor: 'verde' });
    expect(el.getAttribute('aria-label')).toBe(info.rotuloAcessivel);
    expect(el.getAttribute('role')).toBe('img');
  });

  it('critério de aceitação: nenhum temporizador é criado para as escalas', () => {
    const spySetTimeout = vi.spyOn(globalThis, 'setTimeout');
    const spySetInterval = vi.spyOn(globalThis, 'setInterval');

    obterRepresentacaoBacteria('vermelha');
    criarElementoBacteria({ id: 'bact-teste', cor: 'vermelha' });

    expect(spySetTimeout).not.toHaveBeenCalled();
    expect(spySetInterval).not.toHaveBeenCalled();

    spySetTimeout.mockRestore();
    spySetInterval.mockRestore();
  });
});
