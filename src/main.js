/**
 * Ponto de entrada da aplicação Project NanoFighter.
 */

import {obterEstado, assinarEstado, reiniciarEstado} from './estado/index.js';
import { EVENTOS, ouvir } from './eventos/index.js';
import { inicializarTeclado } from './entrada/teclado.js';
import { renderizarJogo } from './ui/index.js';
import { carregarMedicamentos } from './dados/medicamentos.js';
import { vincularSorteioAosEventos, MEDICAMENTOS_PADRAO } from './dominio/sorteio.js';
import { vincularCombateAosEventos } from './dominio/combate.js';
import { vincularFasesAosEventos } from './dominio/fases.js';
import { vincularComposicaoAosEventos, popularMapaParaFase } from './dominio/composicao.js';
import { vincularProgressaoAosEventos } from './dominio/progressao.js';
import { carregarSimulados } from './dados/ranking.js';
import { montarRanking } from './dominio/ranking.js';
import { salvarPontuacaoSessao } from './dados/sessao.js';
import { renderizarRanking } from './ui/ranking.js';
import {renderizarEntradaUsername} from "./ui/index.js";
import {FASE_INICIAL} from "./config/index.js";
import {validarUsername} from "./dominio/username.js";
import {assinarIdioma, t} from "./i18n/index.js"
import {criarSeletorIdioma} from "./ui/idioma.js";
import {abrirTutorial, criarBotaoAjuda, tutorialJaVisto} from "./ui/tutorial.js";

// Cache dos jogadores simulados do ranking
let simuladosRanking = [];
carregarSimulados()
  .then((dados) => {
    simuladosRanking = dados;
    console.info('Jogadores simulados do ranking carregados:', dados.length);
  })
  .catch((err) => {
    console.warn('Aviso: erro ao carregar simulados do ranking:', err);
  });

document.body.appendChild(criarSeletorIdioma());

let dadosFim = null; // preencha em mostrarFimDeJogo: dadosFim = { ranking, username }

assinarIdioma(() => {
  atualizarInterface();
  if (telaFim && dadosFim) mostrarFimDeJogo(dadosFim.ranking, dadosFim.username);
  if (telaUsuario) mostrarTelaUsuario();
});

// Vincula os subsistemas reativos aos eventos
let desvincularSorteio = vincularSorteioAosEventos({ medicamentos: MEDICAMENTOS_PADRAO });
vincularCombateAosEventos();
vincularFasesAosEventos();
vincularComposicaoAosEventos();
vincularProgressaoAosEventos();

// Inicializa o mapa com as bactérias da fase atual (fase 1: 9 verdes e 1 amarela)
const estadoInicial = obterEstado();
if (estadoInicial.bacteriasNoMapa.length === 0) {
  popularMapaParaFase(estadoInicial.fase || 1);
}

// Carrega os medicamentos do CSV e atualiza o vinculador
carregarMedicamentos()
  .then((meds) => {
    desvincularSorteio= vincularSorteioAosEventos({ medicamentos: meds });
    console.info('Medicamentos carregados do CSV com sucesso:', meds);
  })
  .catch((err) => {
    console.warn('Aviso: usando medicamentos padrão de fallback devido a erro de carregamento:', err);
  });

const raiz = document.getElementById('app');

function atualizarInterface() {
  if (raiz) {
    const inicio = performance.now();
    renderizarJogo(raiz, obterEstado());
    const duracao = performance.now() - inicio;
    if (duracao > 200) {
      console.warn(`[PERFORMANCE] Tempo de renderização excedeu 200ms: ${duracao.toFixed(2)}ms`);
    }
  }
}
assinarEstado(() => atualizarInterface());

// Inicializa controles de teclado
inicializarTeclado(window);

// Re-renderiza a UI quando eventos relevantes acontecem
ouvir(EVENTOS.CONFRONTO_INICIADO, (payload) => {
  console.info('Confronto iniciado:', payload);
  atualizarInterface();
});

ouvir(EVENTOS.MEDICAMENTO_SORTEADO, (payload) => {
  console.info('Medicamentos sorteados:', payload);
  atualizarInterface();
});

ouvir(EVENTOS.MEDICAMENTO_USADO, (payload) => {
  console.info('Medicamento usado:', payload);
  atualizarInterface();
});

ouvir(EVENTOS.BACTERIA_DERROTADA, (payload) => {
  console.info('Bactéria derrotada:', payload);
  atualizarInterface();
});

ouvir(EVENTOS.BACTERIA_MUTADA, (payload) => {
  console.info('Bactéria mutada:', payload);
  atualizarInterface();
});

ouvir(EVENTOS.JOGADOR_DANIFICADO, (payload) => {
  console.info('Jogador danificado:', payload);
  atualizarInterface();
});

ouvir(EVENTOS.JOGO_ENCERRADO, (payload) => {
  const estado = obterEstado();
  const username = estado.jogador?.username || 'player';

  salvarPontuacaoSessao({ username, pontuacao: payload.pontuacao || 0 });
  const ranking = montarRanking(simuladosRanking, {
    username,
    pontuacao: payload.pontuacao || 0,
  });

  atualizarInterface();
  mostrarFimDeJogo(ranking, username);
});

  let telaFim = null;

  function jogarNovamente(username) {
    if (telaFim) {
      telaFim.remove();
      telaFim = null;
    }
    reiniciarEstado({ username });          // PV, XP, pontuação, fase 1, posição inicial
    popularMapaParaFase(FASE_INICIAL);      // novas bactérias da fase 1
  }

  function mostrarFimDeJogo(ranking, username) {
    if (telaFim) telaFim.remove();

    telaFim = document.createElement('div');
    telaFim.className = 'tela-fim-de-jogo';
    telaFim.setAttribute('role', 'dialog');
    telaFim.setAttribute('aria-modal', 'true');
    telaFim.setAttribute('aria-label', 'Fim de jogo');

    const titulo = document.createElement('h2');
    titulo.textContent = 'Fim de jogo';

    const containerRanking = document.createElement('div');
    renderizarRanking(containerRanking, ranking);

    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'botao-jogar-novamente';
    botao.textContent = 'Jogar novamente';
    botao.addEventListener('click', () => jogarNovamente(username));

    telaFim.append(titulo, containerRanking, botao);
    document.body.appendChild(telaFim);
    botao.focus(); // Enter também aciona o botão
  }

ouvir(EVENTOS.FASE_CONCLUIDA, (payload) => {
  console.info('Fase concluída:', payload);
  atualizarInterface();
});

ouvir(EVENTOS.FASE_INICIADA, (payload) => {
  console.info('Fase iniciada:', payload);
  atualizarInterface();
});

ouvir(EVENTOS.XP_GANHO, (payload) => {
  console.info('XP ganho:', payload);
  atualizarInterface();
});

ouvir(EVENTOS.NIVEL_XP_SUBIU, (payload) => {
  console.info('Nível de XP subiu:', payload);
  atualizarInterface();
});

// Renderização inicial
atualizarInterface();
console.info('Project NanoFighter - Etapa P2 carregada.');

let telaUsuario = null;
let rascunhoNome = '';

function mostrarTelaUsuario() {
  // Guarda o que o jogador já digitou antes de refazer a tela (troca de idioma)
  const digitado = telaUsuario?.querySelector('input')?.value;
  if (digitado !== undefined) rascunhoNome = digitado;
  if (telaUsuario) telaUsuario.remove();

  telaUsuario = document.createElement('div');
  telaUsuario.className = 'tela-usuario';
  telaUsuario.setAttribute('role', 'dialog');
  telaUsuario.setAttribute('aria-modal', 'true');
  telaUsuario.setAttribute('aria-label', t('username.titulo'));

  const titulo = document.createElement('h2');
  titulo.textContent = 'NanoFighter';

  const form = document.createElement('div');
  renderizarEntradaUsername(form, rascunhoNome, (valor) => {
    console.log('[nome] clique, valor =', JSON.stringify(valor));
    const resultado = validarUsername(valor);
    console.log('[nome] validação', resultado);
    if (!resultado.valido) {
      return t(`username.erro.${resultado.codigoErro}`, resultado.parametros);
    }
    try {
      iniciarPartida(resultado.username);
    } catch (err) {
      console.error('[nome] erro ao iniciar partida:', err);
      return 'Erro ao iniciar: ' + err.message; // aparece no campo de feedback
    }
    telaUsuario.remove();
    telaUsuario = null;
    rascunhoNome = '';
    return null;
  });

  telaUsuario.append(titulo, form);
  document.body.appendChild(telaUsuario);
  form.querySelector('input')?.focus();
}

mostrarTelaUsuario();

document.body.appendChild(criarBotaoAjuda());

function iniciarPartida(username) {
  reiniciarEstado({ username });
  popularMapaParaFase(FASE_INICIAL);
  if (!tutorialJaVisto()) abrirTutorial();   // só na primeira vez
}