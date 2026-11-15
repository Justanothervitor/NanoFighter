import { describe, it, expect, beforeEach } from 'vitest';
import {
  formatarDadosHud,
  renderizarHud,
  vincularHudAosEventos,
} from '../../src/ui/hud.js';
import { EVENTOS, limpar, emitir } from '../../src/eventos/index.js';
import { definirEstado, reiniciarEstado, obterEstado } from '../../src/estado/index.js';
import { TEMPO_MAXIMO_RESPOSTA_MS } from '../../src/config/index.js';

describe('UI: HUD (Status, Progresso, PV, XP e Pontuação) (RF02, RF21, RF31, RF34)', () => {
  let container;

  beforeEach(() => {
    reiniciarEstado();
    limpar();
    document.body.innerHTML = '';
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  it('função pura formatarDadosHud deve estruturar corretamente todos os dados do HUD', () => {
    const estado = {
      jogador: {
        pv: 8,
        pvMax: 20,
        pontuacao: 350,
        nivelXp: 2,
        xp: 85,
      },
      fase: 3,
      eliminadasNaFase: 12,
    };

    const dados = formatarDadosHud(estado);

    expect(dados.pv).toBe(8);
    expect(dados.pvMax).toBe(20);
    expect(dados.pontuacao).toBe(350);
    expect(dados.nivelXp).toBe(2);
    expect(dados.xp).toBe(85);
    expect(dados.fase).toBe(3);
    expect(dados.eliminadas).toBe(12);
    expect(dados.meta).toBe(20);
    expect(dados.textoProgresso).toBe('12/20');
    expect(dados.modoInfinito).toBe(false);
  });

  it('no modo infinito, o HUD deve exibir apenas o total de eliminadas sem meta finita (RF31)', () => {
    const estadoInf = {
      jogador: { pv: 10, pvMax: 10, pontuacao: 1000, nivelXp: 5, xp: 400 },
      fase: 5,
      eliminadasNaFase: 42,
    };

    const dados = formatarDadosHud(estadoInf);
    expect(dados.modoInfinito).toBe(true);
    expect(dados.textoProgresso).toBe('Eliminadas: 42 (Modo Infinito)');
  });

  it('renderizarHud deve criar elementos acessíveis com os 4 blocos de status', () => {
    const estado = {
      jogador: { pv: 10, pvMax: 10, pontuacao: 50, nivelXp: 1, xp: 10 },
      fase: 1,
      eliminadasNaFase: 4,
    };

    renderizarHud(container, estado);

    const itens = container.querySelectorAll('.hud-item');
    expect(itens.length).toBe(4);

    expect(container.querySelector('.hud-pv .hud-valor').textContent).toBe('10/10');
    expect(container.querySelector('.hud-pontos .hud-valor').textContent).toBe('50');
    expect(container.querySelector('.hud-xp .hud-valor').textContent).toContain('1');
    expect(container.querySelector('.hud-fase .hud-valor').textContent).toBe('4/10');

    // Presença de aria-label para acessibilidade
    itens.forEach((el) => {
      expect(el.getAttribute('aria-label')).toBeTruthy();
    });
  });

  it('critério de aceitação: cada mudança no estado reflete no HUD em até 200 ms', () => {
    definirEstado({
      jogador: { pv: 10, pvMax: 10, pontuacao: 0, nivelXp: 1, xp: 0 },
      fase: 1,
      eliminadasNaFase: 0,
    });

    const desvincular = vincularHudAosEventos(container);

    const tInicio = performance.now();

    // Simula evento de dano
    definirEstado({
      ...obterEstado(),
      jogador: { ...obterEstado().jogador, pv: 7 },
    });
    emitir(EVENTOS.JOGADOR_DANIFICADO, { dano: 3, pv: 7 });

    const tFim = performance.now();
    const duracao = tFim - tInicio;

    expect(duracao).toBeLessThan(TEMPO_MAXIMO_RESPOSTA_MS);
    expect(container.querySelector('.hud-pv .hud-valor').textContent).toBe('7/10');

    desvincular();
  });
});
