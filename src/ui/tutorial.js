import { t, assinarIdioma } from '../i18n/index.js';

const CHAVE_VISTO = 'nanofighter_tutorial_visto';
const PASSOS = ['objetivo', 'mover', 'batalha', 'falha', 'cores', 'fases'];

let tela = null;

export function tutorialJaVisto() {
    try { return localStorage.getItem(CHAVE_VISTO) === '1'; } catch { return false; }
}

function marcarComoVisto() {
    try { localStorage.setItem(CHAVE_VISTO, '1'); } catch { /* ignora */ }
}

export function tutorialAberto() {
    return tela !== null;
}

export function fecharTutorial() {
    if (!tela) return;
    tela.remove();
    tela = null;
    marcarComoVisto();
}

export function abrirTutorial() {
    if (tela) tela.remove();

    tela = document.createElement('div');
    tela.className = 'tela-tutorial';
    tela.setAttribute('role', 'dialog');
    tela.setAttribute('aria-modal', 'true');
    tela.setAttribute('aria-label', t('tutorial.titulo'));
    tela.tabIndex = -1;

    const caixa = document.createElement('div');
    caixa.className = 'quadro-tutorial';

    const titulo = document.createElement('h2');
    titulo.textContent = t('tutorial.titulo');
    caixa.appendChild(titulo);

    PASSOS.forEach((passo) => {
        const secao = document.createElement('section');
        const h3 = document.createElement('h3');
        h3.textContent = t(`tutorial.${passo}.titulo`);
        const p = document.createElement('p');
        p.textContent = t(`tutorial.${passo}.texto`);
        secao.append(h3, p);
        caixa.appendChild(secao);
    });

    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'botao-fechar-tutorial';
    botao.textContent = t('tutorial.fechar');
    botao.addEventListener('click', fecharTutorial);
    caixa.appendChild(botao);

    // O teclado do jogo escuta a window: segura as teclas aqui dentro
    tela.addEventListener('keydown', (e) => {
        e.stopPropagation();
        if (e.key === 'Escape') fecharTutorial();
    });

    tela.appendChild(caixa);
    document.body.appendChild(tela);
    botao.focus();
}

export function criarBotaoAjuda() {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'botao-ajuda';
    btn.textContent = '?';

    const atualizar = () => {
        btn.setAttribute('aria-label', t('tutorial.abrir'));
        btn.title = t('tutorial.abrir');
    };
    atualizar();

    btn.addEventListener('click', () => {
        abrirTutorial();
        btn.blur();
    });
    btn.addEventListener('keydown', (e) => e.stopPropagation());

    // Troca de idioma: refaz o texto do botão e o quadro, se estiver aberto
    assinarIdioma(() => {
        atualizar();
        if (tela) abrirTutorial();
    });

    return btn;
}