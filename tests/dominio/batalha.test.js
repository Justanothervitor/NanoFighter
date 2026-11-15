import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  obterIndiceSelecionado,
  definirIndiceSelecionado,
  alternarIndiceSelecionado,
  escolherMedicamento,
  confirmarEscolhaMedicamento,
} from '../../src/dominio/batalha.js';
import { EVENTOS, limpar, ouvir } from '../../src/eventos/index.js';
import { definirEstado, reiniciarEstado } from '../../src/estado/index.js';

describe('Domínio: Batalha e Seleção de Medicamentos (RF56, RF57, RF58, RF59)', () => {
  beforeEach(() => {
    reiniciarEstado();
    limpar();
  });

  it('deve obter e definir o índice selecionado no confronto', () => {
    definirEstado({
      confronto: {
        bacteria: { id: 'b1', cor: 'verde', posicao: { x: 1, y: 1 } },
        opcoes: [],
        turno: 1,
        indiceSelecionado: 0,
      },
    });

    expect(obterIndiceSelecionado()).toBe(0);

    definirIndiceSelecionado(1);
    expect(obterIndiceSelecionado()).toBe(1);

    definirIndiceSelecionado(0);
    expect(obterIndiceSelecionado()).toBe(0);
  });

  it('critério de aceitação: A/D alternam o destaque entre as 2 opções', () => {
    definirEstado({
      confronto: {
        bacteria: { id: 'b1', cor: 'verde', posicao: { x: 1, y: 1 } },
        opcoes: [],
        turno: 1,
        indiceSelecionado: 0,
      },
    });

    // Pressionando 'd' move o destaque para a direita (índice 1)
    alternarIndiceSelecionado('d');
    expect(obterIndiceSelecionado()).toBe(1);

    // Pressionando 'a' move o destaque para a esquerda (índice 0)
    alternarIndiceSelecionado('a');
    expect(obterIndiceSelecionado()).toBe(0);
  });

  it('critério de aceitação: Enter emite medicamento:escolhido com o índice destacado', () => {
    definirEstado({
      confronto: {
        bacteria: { id: 'b1', cor: 'amarela', posicao: { x: 3, y: 3 } },
        opcoes: [],
        turno: 1,
        indiceSelecionado: 1,
      },
    });

    const listener = vi.fn();
    ouvir(EVENTOS.MEDICAMENTO_ESCOLHIDO, listener);

    confirmarEscolhaMedicamento();

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith({ indice: 1 });
  });

  it('deve emitir medicamento:escolhido diretamente por clique ou toque', () => {
    definirEstado({
      confronto: {
        bacteria: { id: 'b1', cor: 'verde', posicao: { x: 1, y: 1 } },
        opcoes: [],
        turno: 1,
        indiceSelecionado: 0,
      },
    });

    const listener = vi.fn();
    ouvir(EVENTOS.MEDICAMENTO_ESCOLHIDO, listener);

    escolherMedicamento(0);
    expect(listener).toHaveBeenLastCalledWith({ indice: 0 });

    escolherMedicamento(1);
    expect(listener).toHaveBeenLastCalledWith({ indice: 1 });
    expect(listener).toHaveBeenCalledTimes(2);
  });
});
