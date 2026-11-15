/**
 * Renderizador da interface de batalha e cartas de medicamentos.
 * RF56: Destaque visual alternável por A/D.
 * RF58: Escolha por clique do mouse no desktop.
 * RF59: Escolha por toque na carta em dispositivos móveis.
 */

import { escolherMedicamento, obterIndiceSelecionado } from '../dominio/batalha.js';
import { obterRepresentacaoBacteria } from './bacteria.js';
import { renderizarCartasMedicamento } from './cartas.js';

/**
 * Renderiza o painel de confronto e as opções de medicamentos.
 * @param {HTMLElement} container
 * @param {object} estado
 * @param {object} [opcoes={}]
 */
export function renderizarBatalha(container, estado, opcoes = {}) {
  if (!container) return;

  const fnEscolher = opcoes.escolherMedicamento || escolherMedicamento;

  // Se não estiver em confronto, oculta a interface de batalha
  if (!estado.confronto) {
    container.innerHTML = '';
    container.style.display = 'none';
    return;
  }

  container.innerHTML = '';
  container.style.display = 'block';
  container.className = 'painel-batalha';
  container.setAttribute('role', 'region');
  container.setAttribute('aria-label', 'Painel de Batalha');

  const cabecalho = document.createElement('div');
  cabecalho.className = 'batalha-cabecalho';
  const bact = estado.confronto.bacteria;
  const infoBact = obterRepresentacaoBacteria(bact.cor);

  cabecalho.innerHTML = `
    <h3>Batalha em Andamento</h3>
    <p>Alvo: <span class="bacteria-alvo ${bact.cor}" aria-label="${infoBact.rotuloAcessivel}">Bactéria ${bact.cor} [${infoBact.textoBolinhas} ${infoBact.escala}]</span></p>
  `;
  container.appendChild(cabecalho);
  const resultado = estado.confronto.resultado;
  if (resultado) {
    const msg = document.createElement('p');
    msg.className = `batalha-resultado batalha-${resultado}`;
    msg.setAttribute('role', 'status');
    msg.textContent =
        resultado === 'vitoria'
            ? 'Vitória! A bactéria foi eliminada.'
            : 'Derrota! A bactéria sofreu mutação e você perdeu PV.';
    container.appendChild(msg);
    return; // não desenha as cartas: evita cliques durante a mensagem
  }

  const containerCartas = document.createElement('div');
  const indiceDestaque = obterIndiceSelecionado(estado);

  renderizarCartasMedicamento(
    containerCartas,
    estado.confronto.opcoes,
    indiceDestaque,
    (indice) => fnEscolher(indice, opcoes.dependencias)
  );

  container.appendChild(containerCartas);
}
