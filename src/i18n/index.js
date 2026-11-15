import ptBR from './pt-BR.js';
import en from './en.js';

const DICIONARIOS = { 'pt-BR': ptBR, en };
const IDIOMA_PADRAO = 'pt-BR';
const CHAVE_STORAGE = 'nanofighter_idioma';

export const IDIOMAS = Object.freeze([
    { codigo: 'pt-BR', rotulo: 'Português' },
    { codigo: 'en', rotulo: 'English' },
]);

const assinantes = new Set();

function detectarIdioma() {
    try {
        const salvo = localStorage.getItem(CHAVE_STORAGE);
        if (salvo && DICIONARIOS[salvo]) return salvo;
    } catch { /* storage indisponível */ }

    const nav = (navigator.language || '').toLowerCase();
    if (nav.startsWith('en')) return 'en';
    return IDIOMA_PADRAO;
}

let idiomaAtual = detectarIdioma();
if (typeof document !== 'undefined') document.documentElement.lang = idiomaAtual;

export function obterIdioma() {
    return idiomaAtual;
}

export function definirIdioma(codigo) {
    if (!DICIONARIOS[codigo] || codigo === idiomaAtual) return;
    idiomaAtual = codigo;
    try { localStorage.setItem(CHAVE_STORAGE, codigo); } catch { /* ignora */ }
    document.documentElement.lang = codigo;
    assinantes.forEach((fn) => fn(codigo));
}

export function assinarIdioma(fn) {
    assinantes.add(fn);
    return () => assinantes.delete(fn);
}

export function tem(chave) {
    return chave in DICIONARIOS[idiomaAtual] || chave in DICIONARIOS[IDIOMA_PADRAO];
}

/** Traduz a chave e substitui {parametros}. Sem tradução, cai no pt-BR e depois na própria chave. */
export function t(chave, parametros = {}) {
    const texto =
        DICIONARIOS[idiomaAtual][chave] ?? DICIONARIOS[IDIOMA_PADRAO][chave] ?? chave;
    return texto.replace(/\{(\w+)\}/g, (_, nome) => parametros[nome] ?? `{${nome}}`);
}

/** Nome de medicamento vindo do CSV: traduz se houver chave, senão mantém o original. */
export function nomeMedicamento(nome) {
    const slug = String(nome)
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase().trim().replace(/\s+/g, '_');
    const chave = `medicamento.${slug}`;
    return tem(chave) ? t(chave) : nome;
}