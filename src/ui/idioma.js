import { IDIOMAS, obterIdioma, definirIdioma, assinarIdioma, t } from '../i18n/index.js';

export function criarSeletorIdioma() {
    const caixa = document.createElement('div');
    caixa.className = 'seletor-idioma';

    const label = document.createElement('label');
    label.htmlFor = 'seletor-idioma';

    const select = document.createElement('select');
    select.id = 'seletor-idioma';
    IDIOMAS.forEach(({ codigo, rotulo }) => {
        const op = document.createElement('option');
        op.value = codigo;
        op.textContent = rotulo;
        select.appendChild(op);
    });

    const atualizar = () => {
        label.textContent = t('idioma.rotulo');
        select.value = obterIdioma();
    };

    // Setas e A/D no select não podem mover o personagem
    select.addEventListener('keydown', (e) => e.stopPropagation());
    select.addEventListener('change', () => {
        definirIdioma(select.value);
        select.blur(); // devolve o teclado ao jogo
    });

    assinarIdioma(atualizar);
    atualizar();

    caixa.append(label, select);
    return caixa;
}