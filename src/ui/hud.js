/**
 * Painel de HUD (Heads-Up Display) para exibição do status do jogador e fase (RF02, RF21, RF31, RF34, RNF10).
 * Contraste de cores em conformidade com WCAG 2.1 AA.
 */

import { metaDaFase, estaNoModoInfinito } from '../dominio/fases.js';
import { EVENTOS, ouvir } from '../eventos/index.js';
import { obterEstado } from '../estado/index.js';

/**
 * Extrai e formata os dados brutos do estado para exibição pura no HUD.
 * Função pura e desacoplada do DOM.
 *
 * @param {object} estado
 * @returns {{
 *   pontuacao: number,
 *   xp: number,
 *   nivelXp: number,
 *   pv: number,
 *   pvMax: number,
 *   fase: number,
 *   eliminadas: number,
 *   meta: number,
 *   textoProgresso: string,
 *   modoInfinito: boolean
 * }}
 */
export function formatarDadosHud(estado) {
  const jogador = estado?.jogador || {};
  const fase = estado?.fase || 1;
  const eliminadas = estado?.eliminadasNaFase || 0;
  const meta = metaDaFase(fase);
  const modoInfinito = estaNoModoInfinito(fase);

  // RF31: no modo infinito mostre só o total eliminado
  const textoProgresso = modoInfinito
    ? `Eliminadas: ${eliminadas} (Modo Infinito)`
    : `${eliminadas}/${meta}`;

  return {
    pontuacao: jogador.pontuacao || 0,
    xp: jogador.xp || 0,
    nivelXp: jogador.nivelXp || 1,
    pv: jogador.pv !== undefined ? jogador.pv : 10,
    pvMax: jogador.pvMax !== undefined ? jogador.pvMax : 10,
    fase,
    eliminadas,
    meta,
    textoProgresso,
    modoInfinito,
  };
}

/**
 * Renderiza os elementos do HUD no container HTML fornecido.
 *
 * @param {HTMLElement} container
 * @param {object} estado
 */
export function renderizarHud(container, estado) {
  if (!container) return;

  const dados = formatarDadosHud(estado);

  container.innerHTML = '';
  container.className = 'hud-container';
  container.setAttribute('role', 'region');
  container.setAttribute('aria-label', 'Status do Jogo e do Jogador');

  // 1. PV (RF34)
  const itemPv = document.createElement('div');
  itemPv.className = 'hud-item hud-pv';
  itemPv.setAttribute('aria-label', `Pontos de Vida: ${dados.pv} de ${dados.pvMax}`);
  itemPv.innerHTML = `
    <span class="hud-rotulo">PV</span>
    <span class="hud-valor">${dados.pv}/${dados.pvMax}</span>
  `;

  // 2. Pontuação (RF02)
  const itemPontos = document.createElement('div');
  itemPontos.className = 'hud-item hud-pontos';
  itemPontos.setAttribute('aria-label', `Pontuação: ${dados.pontuacao} pontos`);
  itemPontos.innerHTML = `
    <span class="hud-rotulo">Pontos</span>
    <span class="hud-valor">${dados.pontuacao}</span>
  `;

  // 3. Nível e XP (RF21)
  const itemXp = document.createElement('div');
  itemXp.className = 'hud-item hud-xp';
  itemXp.setAttribute('aria-label', `Nível de XP: ${dados.nivelXp}, total de ${dados.xp} XP`);
  itemXp.innerHTML = `
    <span class="hud-rotulo">Nível</span>
    <span class="hud-valor">${dados.nivelXp} <small>(${dados.xp} XP)</small></span>
  `;

  // 4. Fase e Progresso de Eliminações (RF31)
  const itemFase = document.createElement('div');
  itemFase.className = 'hud-item hud-fase';
  itemFase.setAttribute('aria-label', `Fase ${dados.fase}, progresso: ${dados.textoProgresso}`);
  itemFase.innerHTML = `
    <span class="hud-rotulo">Fase ${dados.fase}</span>
    <span class="hud-valor">${dados.textoProgresso}</span>
  `;

  container.appendChild(itemPv);
  container.appendChild(itemPontos);
  container.appendChild(itemXp);
  container.appendChild(itemFase);
}

/**
 * Conecta a atualização automática do HUD a todos os eventos relevantes do BLOCO BASE.
 *
 * @param {HTMLElement} container
 * @param {object} [dependencias={}]
 * @returns {() => void} Função de desinscrição de todos os ouvintes
 */
export function vincularHudAosEventos(container, dependencias = {}) {
  const fnOuvir = dependencias.ouvir || ouvir;
  const fnObterEstado = dependencias.obterEstado || obterEstado;

  function atualizar() {
    renderizarHud(container, fnObterEstado());
  }

  // Lista de eventos que alteram valores exibidos no HUD
  const eventosParaMonitorar = [
    EVENTOS.JOGADOR_DANIFICADO,
    EVENTOS.XP_GANHO,
    EVENTOS.NIVEL_XP_SUBIU,
    EVENTOS.BACTERIA_DERROTADA,
    EVENTOS.FASE_INICIADA,
    EVENTOS.FASE_CONCLUIDA,
    EVENTOS.JOGO_ENCERRADO,
  ];

  const canceladores = eventosParaMonitorar.map((ev) => fnOuvir(ev, atualizar));

  // Renderização inicial
  atualizar();

  return function desvincular() {
    canceladores.forEach((cancelar) => cancelar());
  };
}
