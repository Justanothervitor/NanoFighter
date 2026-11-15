import { escolherMedicamento, obterIndiceSelecionado } from '../dominio/batalha.js';
import { obterRepresentacaoBacteria } from './bacteria.js';
import { renderizarCartasMedicamento } from './cartas.js';
import { t } from '../i18n/index.js';

export function renderizarBatalha(container, estado, opcoes = {}) {
  if (!container) return;

  const fnEscolher = opcoes.escolherMedicamento || escolherMedicamento;

  if (!estado.confronto) {
    container.innerHTML = '';
    container.style.display = 'none';
    return;
  }

  container.innerHTML = '';
  container.style.display = 'block';
  container.className = 'painel-batalha';
  container.setAttribute('role', 'region');
  container.setAttribute('aria-label', t('batalha.painel'));

  const bact = estado.confronto.bacteria;
  const infoBact = obterRepresentacaoBacteria(bact.cor);

  const cabecalho = document.createElement('div');
  cabecalho.className = 'batalha-cabecalho';

  const titulo = document.createElement('h3');
  titulo.textContent = t('batalha.titulo');

  const alvo = document.createElement('p');
  const spanAlvo = document.createElement('span');
  spanAlvo.className = `bacteria-alvo ${bact.cor}`;
  spanAlvo.setAttribute('aria-label', infoBact.rotuloAcessivel);
  spanAlvo.textContent = t('batalha.alvo', {
    cor: t(`cor.${bact.cor}`),
    bolinhas: infoBact.textoBolinhas,
    escala: t(`escala.${infoBact.escala}`),
  });
  alvo.appendChild(spanAlvo);

  cabecalho.append(titulo, alvo);
  container.appendChild(cabecalho);

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