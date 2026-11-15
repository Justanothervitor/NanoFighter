/**
 * Lógica pura de resolução de combate por turnos (RF11, RF12, RF13, RF32, RF33, RF37, RF38, RF44).
 */

import {
  DANO_POR_COR,
  PROXIMA_COR_MUTACAO,
  PROVISORIO_DANO_COR_ANTES_DA_MUTACAO,
  PV_INICIAL,
} from '../config/index.js';
import { rngPadrao } from '../util/rng.js';
import { obterEstado, atualizarEstado } from '../estado/index.js';
import { EVENTOS, emitir, ouvir } from '../eventos/index.js';

/**
 * Resolve o uso de um medicamento pelo jogador em um confronto ativo.
 * Função pura que calcula a transição de estado e notifica os eventos correspondentes.
 *
 * @param {object} estado Estado atual do jogo.
 * @param {number} indice Índice da opção escolhida (0 ou 1).
 * @param {() => number} [rng=rngPadrao] Gerador de número pseudoaleatório em [0, 1).
 * @param {object} [dependencias={}] Injeção opcional de barramento para testes.
 * @returns {object} Novo estado do jogo.
 */
export function resolverUso(estado, indice, rng = rngPadrao, dependencias = {}) {
  if (!estado || !estado.confronto) {
    return estado;
  }

  const fnEmitir = dependencias.emitir || emitir;
  const idx = Number(indice) === 1 ? 1 : 0;
  const opcoes = estado.confronto.opcoes || [];
  const medicamento = opcoes[idx];

  // Se não houver medicamento na posição solicitada, não altera o estado
  if (!medicamento) {
    return estado;
  }

  const bacteriaAtual = estado.confronto.bacteria;
  const turnoAtual = estado.confronto.turno || 1;
  const proximoTurno = turnoAtual + 1; // RF37: incrementa 1 turno a cada uso

  // RF12: Sorteio de sucesso com probabilidade igual à sua eficácia
  const sorteio = rng();
  const sucesso = sorteio < medicamento.eficacia;

  if (sucesso) {
    // 1. Sucesso: elimina a bactéria (RF12)
    const novasBacterias = (estado.bacteriasNoMapa || []).filter(
      (b) => b.id !== bacteriaAtual.id
    );

    // RF38: medicamento consumido e confronto encerrado
    const novoEstado = {
      ...estado,
      bacteriasNoMapa: novasBacterias,
      confronto: null,
    };

    // Emissão dos eventos de ciclo de vida
    fnEmitir(EVENTOS.MEDICAMENTO_USADO, {
      medicamento: { ...medicamento },
      sucesso: true,
      bacteria: { ...bacteriaAtual },
    });

    fnEmitir(EVENTOS.BACTERIA_DERROTADA, {
      bacteria: { ...bacteriaAtual },
    });

    return novoEstado;
  }

  // 2. Falha: aplica dano, muta a cor e avança o turno
  const corBaseDano = PROVISORIO_DANO_COR_ANTES_DA_MUTACAO
    ? bacteriaAtual.cor
    : PROXIMA_COR_MUTACAO[bacteriaAtual.cor] || bacteriaAtual.cor;

  // RF32: dano ao jogador por cor (verde: 1, amarela: 2, vermelha: 3)
  const dano = DANO_POR_COR[corBaseDano] !== undefined ? DANO_POR_COR[corBaseDano] : 1;
  const pvAtual = estado.jogador?.pv !== undefined ? estado.jogador.pv : PV_INICIAL;
  const novoPv = Math.max(0, pvAtual - dano); // PV nunca fica abaixo de 0

  // Emite dano recebido
  fnEmitir(EVENTOS.JOGADOR_DANIFICADO, {
    dano,
    pv: novoPv,
  });

  // RF13 e RF44: mutação de cor (verde -> amarela -> vermelha; vermelha permanece vermelha)
  const corAnterior = bacteriaAtual.cor;
  const corNova = PROXIMA_COR_MUTACAO[corAnterior] || 'vermelha';
  const bacteriaMutada = {
    ...bacteriaAtual,
    cor: corNova,
  };

  const novasBacterias = (estado.bacteriasNoMapa || []).map((b) =>
    b.id === bacteriaAtual.id ? bacteriaMutada : b
  );

  // Se a cor mudou efetivamente (verde->amarela ou amarela->vermelha), emite evento de mutação
  if (corAnterior !== corNova) {
    fnEmitir(EVENTOS.BACTERIA_MUTADA, {
      bacteria: { ...bacteriaMutada },
      corAnterior,
      corNova,
    });
  }

  // RF38 e RF37: medicamento consumido, opções limpas para ressorteio e turno incrementado
  const novoConfronto = {
    ...estado.confronto,
    bacteria: bacteriaMutada,
    turno: proximoTurno,
    opcoes: [], // aguarda novo sorteio via evento medicamento:usado
  };

  const novoEstado = {
    ...estado,
    jogador: {
      ...estado.jogador,
      pv: novoPv,
    },
    bacteriasNoMapa: novasBacterias,
    confronto: novoPv === 0 ? null : novoConfronto,
  };

  // Emite evento de medicamento usado
  fnEmitir(EVENTOS.MEDICAMENTO_USADO, {
    medicamento: { ...medicamento },
    sucesso: false,
    bacteria: { ...bacteriaMutada },
  });

  // RF33: encerra a partida quando os PV chegarem a 0 (exatamente 1 vez)
  if (novoPv === 0) {
    fnEmitir(EVENTOS.JOGO_ENCERRADO, {
      pontuacao: estado.jogador?.pontuacao || 0,
      fase: estado.fase || 1,
    });
  }

  return novoEstado;
}

/**
 * Orquestra o uso do medicamento pelo índice consumindo e atualizando o estado central.
 *
 * @param {number} indice
 * @param {object} [dependencias={}]
 * @returns {object|null} Novo estado ou null se não aplicável
 */
export function executarUsoMedicamento(indice, dependencias = {}) {
  const fnObterEstado = dependencias.obterEstado || obterEstado;
  const fnAtualizarEstado = dependencias.atualizarEstado || atualizarEstado;
  const fnEmitirReal = dependencias.emitir || emitir;
  const rng = dependencias.rng || rngPadrao;

  const estadoAtual = fnObterEstado();
  if (!estadoAtual.confronto) {
    return null;
  }

  // Guarda os eventos para emitir só depois de o estado ser gravado
  const eventosPendentes = [];
  const enfileirar = (nome, dados) => {
    eventosPendentes.push([nome, dados]);
  };

  const novoEstado = resolverUso(estadoAtual, indice, rng, {
    ...dependencias,
    emitir: enfileirar,
  });

  // 1. Grava o estado (confronto já na nova rodada, com opcoes: [])
  fnAtualizarEstado(novoEstado);

  // 2. Só agora dispara os eventos; o sorteio enxerga o estado atualizado
  eventosPendentes.forEach(([nome, dados]) => fnEmitirReal(nome, dados));

  return novoEstado;
}

/**
 * Vincula a escuta de `medicamento:escolhido` à resolução do combate.
 *
 * @param {object} [dependencias={}]
 * @returns {() => void} Função de desinscrição
 */
export function vincularCombateAosEventos(dependencias = {}) {
  const fnOuvir = dependencias.ouvir || ouvir;

  const cancelar = fnOuvir(EVENTOS.MEDICAMENTO_ESCOLHIDO, ({ indice }) => {
    executarUsoMedicamento(indice, dependencias);
  });

  return cancelar;
}
