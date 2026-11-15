import { describe, it, expect, vi, beforeEach } from 'vitest';
import { processarTecla, inicializarTeclado } from '../../src/entrada/teclado.js';
import { EVENTOS, limpar, ouvir } from '../../src/eventos/index.js';
import { definirEstado, reiniciarEstado, obterEstado } from '../../src/estado/index.js';

describe('Entrada: Teclado (RF54, RF56, RF57)', () => {
  beforeEach(() => {
    reiniciarEstado();
    limpar();
  });

  it('no mapa: teclas W, A, S, D e setas devem acionar movimento', () => {
    definirEstado({
      jogador: { posicao: { x: 5, y: 5 } },
      bacteriasNoMapa: [],
      confronto: null,
    });

    const resW = processarTecla('KeyW');
    expect(resW).toEqual({ acao: 'mover_mapa', detalhe: { direcao: 'cima', movido: true } });
    expect(obterEstado().jogador.posicao).toEqual({ x: 5, y: 4 });

    const resS = processarTecla('KeyS');
    expect(resS).toEqual({ acao: 'mover_mapa', detalhe: { direcao: 'baixo', movido: true } });
    expect(obterEstado().jogador.posicao).toEqual({ x: 5, y: 5 });

    const resA = processarTecla('KeyA');
    expect(resA).toEqual({ acao: 'mover_mapa', detalhe: { direcao: 'esquerda', movido: true } });
    expect(obterEstado().jogador.posicao).toEqual({ x: 4, y: 5 });

    const resD = processarTecla('KeyD');
    expect(resD).toEqual({ acao: 'mover_mapa', detalhe: { direcao: 'direita', movido: true } });
    expect(obterEstado().jogador.posicao).toEqual({ x: 5, y: 5 });
  });

  it('na batalha: A e D alternam o destaque e Enter confirma', () => {
    definirEstado({
      jogador: { posicao: { x: 2, y: 2 } },
      bacteriasNoMapa: [],
      confronto: {
        bacteria: { id: 'bact-1', cor: 'verde', posicao: { x: 2, y: 2 } },
        opcoes: [],
        turno: 1,
        indiceSelecionado: 0,
      },
    });

    const listener = vi.fn();
    ouvir(EVENTOS.MEDICAMENTO_ESCOLHIDO, listener);

    // Tecla D altera destaque para 1
    const resD = processarTecla('KeyD');
    expect(resD).toEqual({ acao: 'selecionar_medicamento', detalhe: { indice: 1 } });
    expect(obterEstado().confronto.indiceSelecionado).toBe(1);

    // Tecla A altera destaque para 0
    const resA = processarTecla('KeyA');
    expect(resA).toEqual({ acao: 'selecionar_medicamento', detalhe: { indice: 0 } });
    expect(obterEstado().confronto.indiceSelecionado).toBe(0);

    // Tecla D novamente
    processarTecla('KeyD');

    // Enter confirma a escolha com índice 1
    const resEnter = processarTecla('Enter');
    expect(resEnter).toEqual({ acao: 'confirmar_medicamento' });
    expect(listener).toHaveBeenCalledWith({ indice: 1 });
  });

  it('na batalha: W e S NÃO movem o personagem nem disparam ação', () => {
    definirEstado({
      jogador: { posicao: { x: 2, y: 2 } },
      bacteriasNoMapa: [],
      confronto: {
        bacteria: { id: 'bact-1', cor: 'verde', posicao: { x: 2, y: 2 } },
        opcoes: [],
        turno: 1,
        indiceSelecionado: 0,
      },
    });

    const resW = processarTecla('KeyW');
    expect(resW).toBeNull();

    const resS = processarTecla('KeyS');
    expect(resS).toBeNull();

    expect(obterEstado().jogador.posicao).toEqual({ x: 2, y: 2 });
  });

  it('inicializarTeclado deve capturar eventos no DOM e permitir cancelamento', () => {
    const alvo = document.createElement('div');
    const destruir = inicializarTeclado(alvo);

    const evento = new KeyboardEvent('keydown', { code: 'KeyW', bubbles: true, cancelable: true });
    alvo.dispatchEvent(evento);

    destruir();

    const eventoAposDestruir = new KeyboardEvent('keydown', { code: 'KeyW', bubbles: true });
    alvo.dispatchEvent(eventoAposDestruir);
  });
});
