/**
 * Componente visual de exibição do ranking top 10 e entrada de username (RF03, RF04, RF05, RF06, RNF03).
 */

import { sanitizarTexto } from '../dominio/username.js';

/**
 * Renderiza o ranking top 10 com posições, nomes e pontuações (RF04, RF05, RF06).
 * RNF03: Utiliza textContent para garantir que nenhuma injeção HTML/Script seja executada.
 *
 * @param {HTMLElement} container
 * @param {Array<{ posicao: number, nomeJogador: string, pontuacao: number, ehJogadorAtual: boolean }>} listaRanking
 */
export function renderizarRanking(container, listaRanking = []) {
  if (!container) return;

  container.innerHTML = '';
  container.className = 'painel-ranking';

  const titulo = document.createElement('h2');
  titulo.textContent = 'Top 10 - Ranking Geral';
  container.appendChild(titulo);

  const tabela = document.createElement('table');
  tabela.className = 'tabela-ranking';

  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>Pos</th>
      <th>Jogador</th>
      <th>Pontuação</th>
    </tr>
  `;
  tabela.appendChild(thead);

  const tbody = document.createElement('tbody');

  listaRanking.forEach((item) => {
    const tr = document.createElement('tr');
    if (item.ehJogadorAtual) {
      tr.classList.add('linha-jogador-atual');
    }

    const tdPos = document.createElement('td');
    tdPos.textContent = `${item.posicao}º`;

    // Proteção XSS: inserção segura exclusivamente via textContent
    const tdNome = document.createElement('td');
    tdNome.textContent = item.nomeJogador;
    if (item.ehJogadorAtual) {
      tdNome.textContent += ' (Você)';
    }

    const tdPontos = document.createElement('td');
    tdPontos.textContent = String(item.pontuacao);

    tr.appendChild(tdPos);
    tr.appendChild(tdNome);
    tr.appendChild(tdPontos);
    tbody.appendChild(tr);
  });

  tabela.appendChild(tbody);
  container.appendChild(tabela);
}

/**
 * Renderiza o campo para o jogador definir seu username (RF03, RF60).
 *
 * @param {HTMLElement} container
 * @param {string} usernameAtual
 * @param {(novoUsername: string) => void} aoSalvar
 */
export function renderizarEntradaUsername(
    container,
    usernameAtual = 'player',
    aoSalvar = () => {}
) {
  if (!container) return;

  container.innerHTML = '';
  container.className = 'formulario-username';

  const label = document.createElement('label');
  label.textContent = 'Seu Username (3 a 8 caracteres): ';
  label.setAttribute('for', 'input-username');

  const input = document.createElement('input');
  input.id = 'input-username';
  input.type = 'text';
  input.maxLength = 8;
  input.value = usernameAtual;
  input.placeholder = 'player';
  input.autocomplete = 'off';

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.textContent = 'Jogar';

  const feedback = document.createElement('span');
  feedback.className = 'feedback-username';
  feedback.setAttribute('role', 'alert');

  const enviar = () => {
    // aoSalvar devolve null se ok, ou a mensagem de erro
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
