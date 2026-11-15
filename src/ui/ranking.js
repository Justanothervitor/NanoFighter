/**
 * Componente visual de exibição do ranking top 10 e entrada de username (RF03, RF04, RF05, RF06, RNF03).
 */

import { t } from '../i18n/index.js';
import {
  TAMANHO_MIN_USERNAME,
  TAMANHO_MAX_USERNAME,
  USERNAME_PADRAO,
} from '../config/index.js';

export function renderizarRanking(container, listaRanking = []) {
  if (!container) return;

  container.innerHTML = '';
  container.className = 'painel-ranking';

  const titulo = document.createElement('h2');
  titulo.textContent = t('ranking.titulo');
  container.appendChild(titulo);

  const tabela = document.createElement('table');
  tabela.className = 'tabela-ranking';

  const thead = document.createElement('thead');
  const trCab = document.createElement('tr');
  ['ranking.pos', 'ranking.jogador', 'ranking.pontuacao'].forEach((chave) => {
    const th = document.createElement('th');
    th.textContent = t(chave);
    trCab.appendChild(th);
  });
  thead.appendChild(trCab);
  tabela.appendChild(thead);

  const tbody = document.createElement('tbody');

  listaRanking.forEach((item) => {
    const tr = document.createElement('tr');
    if (item.ehJogadorAtual) {
      tr.classList.add('linha-jogador-atual');
    }

    const tdPos = document.createElement('td');
    tdPos.textContent = t('ranking.posicao', { numero: item.posicao });

    // Proteção XSS: inserção segura exclusivamente via textContent
    const tdNome = document.createElement('td');
    tdNome.textContent = item.ehJogadorAtual
        ? `${item.nomeJogador} ${t('ranking.voce')}`
        : item.nomeJogador;

    const tdPontos = document.createElement('td');
    tdPontos.textContent = String(item.pontuacao);

    tr.append(tdPos, tdNome, tdPontos);
    tbody.appendChild(tr);
  });

  tabela.appendChild(tbody);
  container.appendChild(tabela);
}

export function renderizarEntradaUsername(
    container,
    usernameAtual = USERNAME_PADRAO,
    aoSalvar = () => {}
) {
  if (!container) return;

  container.innerHTML = '';
  container.className = 'formulario-username';

  const label = document.createElement('label');
  label.textContent = t('username.rotulo', {
    min: TAMANHO_MIN_USERNAME,
    max: TAMANHO_MAX_USERNAME,
  });
  label.setAttribute('for', 'input-username');

  const input = document.createElement('input');
  input.id = 'input-username';
  input.type = 'text';
  input.maxLength = TAMANHO_MAX_USERNAME;
  input.value = usernameAtual;
  input.placeholder = USERNAME_PADRAO;
  input.autocomplete = 'off';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = t('username.botao');

  const feedback = document.createElement('span');
  feedback.className = 'feedback-username';
  feedback.setAttribute('role', 'alert');

  const enviar = () => {
    // aoSalvar devolve null se ok, ou a mensagem de erro já traduzida
    const erro = aoSalvar(input.value);
    feedback.textContent = erro || '';
    if (erro) input.focus();
  };

  btn.addEventListener('click', enviar);

  input.addEventListener('keydown', (e) => {
    e.stopPropagation(); // W/A/S/D e setas não movem o personagem
    if (e.key === 'Enter') {
      e.preventDefault();
      enviar();
    }
  });

  container.append(label, input, btn, feedback);
  input.focus();
}