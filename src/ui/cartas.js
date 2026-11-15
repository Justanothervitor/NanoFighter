/**
 * Componente visual de cartas de medicamento (RF19, RF56, RF58, RF59, RNF10).
 */

/**
 * Formata os dados de exibição de uma carta de medicamento.
 * Função pura desacoplada do DOM.
 *
 * @param {{ nome: string, eficacia: number }} medicamento
 * @param {number} indice 0 ou 1
 * @param {boolean} destacado Se a carta está atualmente selecionada pelo teclado
 * @returns {{ nome: string, eficaciaPercentual: string, atalho: string, destacado: boolean, rotuloAcessivel: string }}
 */
export function formatarDadosCarta(medicamento, indice, destacado = false) {
  const nome = medicamento?.nome || `Medicamento ${indice + 1}`;
  const valorEficacia = typeof medicamento?.eficacia === 'number' ? medicamento.eficacia : 0.5;
  const eficaciaPercentual = `${Math.round(valorEficacia * 100)}%`;
  const atalho = indice === 0 ? 'A' : 'D';

  const rotuloAcessivel = `${nome}, eficácia de ${eficaciaPercentual}, atalho tecla ${atalho}. ${
    destacado ? 'Atualmente selecionado.' : ''
  }`;

  return {
    nome,
    eficaciaPercentual,
    atalho,
    destacado,
    rotuloAcessivel,
  };
}

/**
 * Renderiza o conjunto de 2 cartas de medicamentos em batalha (RF19).
 *
 * @param {HTMLElement} container
 * @param {Array<{ nome: string, eficacia: number }>} opcoes
 * @param {number} [indiceSelecionado=0]
 * @param {(indice: number) => void} [aoEscolher=()=>{}]
 */
export function renderizarCartasMedicamento(
  container,
  opcoes = [],
  indiceSelecionado = 0,
  aoEscolher = () => {}
) {
  if (!container) return;

  container.innerHTML = '';
  container.className = 'container-cartas-medicamento';

  // Garante a presença exata de 2 cartas para renderização
  const duasOpcoes = opcoes && opcoes.length === 2 ? opcoes : [
    { nome: 'Opção 1', eficacia: 0.5 },
    { nome: 'Opção 2', eficacia: 0.5 },
  ];

  duasOpcoes.forEach((med, indice) => {
    const dados = formatarDadosCarta(med, indice, indice === indiceSelecionado);

    const carta = document.createElement('button');
    carta.type = 'button';
    carta.className = `carta-medicamento ${dados.destacado ? 'carta-destacada' : ''}`;
    carta.dataset.indice = String(indice);
    carta.setAttribute('role', 'option');
    carta.setAttribute('aria-selected', String(dados.destacado));
    carta.setAttribute('aria-label', dados.rotuloAcessivel);

    carta.innerHTML = `
      <div class="carta-titulo">${dados.nome}</div>
      <div class="carta-eficacia">Eficácia: <strong>${dados.eficaciaPercentual}</strong></div>
      <div class="carta-atalho" aria-hidden="true">[Teclar ${dados.atalho}]</div>
    `;

    // RF58: Clique do mouse
    carta.addEventListener('click', (evento) => {
      evento.preventDefault();
      aoEscolher(indice);
    });

    // RF59: Toque no mobile
    carta.addEventListener('pointerdown', (evento) => {
      if (evento.pointerType === 'touch') {
        evento.preventDefault();
        aoEscolher(indice);
      }
    });

    container.appendChild(carta);
  });
}
