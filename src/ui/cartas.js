/**
 * Componente visual de cartas de medicamento (RF19, RF56, RF58, RF59, RNF10).
 */

import { t, nomeMedicamento } from '../i18n/index.js';

export function formatarDadosCarta(medicamento, indice, destacado = false) {
  const nome = medicamento?.nome
      ? nomeMedicamento(medicamento.nome)
      : t('carta.padrao', { numero: indice + 1 });
  const valorEficacia = typeof medicamento?.eficacia === 'number' ? medicamento.eficacia : 0.5;
  const eficaciaPercentual = `${Math.round(valorEficacia * 100)}%`;
  const atalho = indice === 0 ? 'A' : 'D';

  const rotuloAcessivel =
      t('carta.rotulo', { nome, eficacia: eficaciaPercentual, tecla: atalho }) +
      (destacado ? ' ' + t('carta.selecionada') : '');

  return {
    nome,
    eficaciaPercentual,
    atalho,
    destacado,
    rotuloAcessivel,
  };
}

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
    { nome: '', eficacia: 0.5 },
    { nome: '', eficacia: 0.5 },
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

    const titulo = document.createElement('div');
    titulo.className = 'carta-titulo';
    titulo.textContent = dados.nome;

    const eficacia = document.createElement('div');
    eficacia.className = 'carta-eficacia';
    eficacia.append(`${t('carta.eficacia')}: `);
    const forte = document.createElement('strong');
    forte.textContent = dados.eficaciaPercentual;
    eficacia.appendChild(forte);

    const atalho = document.createElement('div');
    atalho.className = 'carta-atalho';
    atalho.setAttribute('aria-hidden', 'true');
    atalho.textContent = t('carta.atalho', { tecla: dados.atalho });

    carta.append(titulo, eficacia, atalho);

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