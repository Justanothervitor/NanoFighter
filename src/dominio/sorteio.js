/**
 * Regras e funções puras de sorteio com pesos para medicamentos (RF14, RF18, RF36, RF39).
 */

import {
  CHANCE_SORTEIO_TERAPIA,
  NIVEL_XP_INICIAL,
  NIVEL_XP_MAXIMO,
  NOMES_MEDICAMENTOS,
  EFICACIA_NOMINAL_MEDICAMENTOS,
} from '../config/index.js';
import { rngPadrao } from '../util/rng.js';
import { obterEstado, atualizarEstado } from '../estado/index.js';
import { EVENTOS, ouvir, emitir } from '../eventos/index.js';

/**
 * Medicamentos nominais padrão para fallback ou testes que não carregam CSV diretamente.
 */
export const MEDICAMENTOS_PADRAO = Object.freeze([
  { nome: NOMES_MEDICAMENTOS.VIRUS, eficacia: EFICACIA_NOMINAL_MEDICAMENTOS[NOMES_MEDICAMENTOS.VIRUS] },
  { nome: NOMES_MEDICAMENTOS.TERAPIA_FOTODINAMICA, eficacia: EFICACIA_NOMINAL_MEDICAMENTOS[NOMES_MEDICAMENTOS.TERAPIA_FOTODINAMICA] },
  { nome: NOMES_MEDICAMENTOS.MEDICAMENTO_IA, eficacia: EFICACIA_NOMINAL_MEDICAMENTOS[NOMES_MEDICAMENTOS.MEDICAMENTO_IA] },
]);

/**
 * Calcula a probabilidade de sorteio da Terapia Fotodinâmica para um dado nível de XP.
 * No nível 1: 2,5% (0.025). No nível 10: 50% (0.50).
 * Níveis intermediários por interpolação linear (PROVISÓRIO: aguardando confirmação).
 *
 * @param {number} nivelXp Nível de XP atual do jogador (1 a 10).
 * @returns {number} Probabilidade calculada entre 0.025 e 0.50.
 */
export function chanceTerapia(nivelXp) {
  const nivelValido = Math.max(
    NIVEL_XP_INICIAL,
    Math.min(NIVEL_XP_MAXIMO, Number(nivelXp) || NIVEL_XP_INICIAL)
  );

  const cMin = CHANCE_SORTEIO_TERAPIA.NIVEL_1;
  const cMax = CHANCE_SORTEIO_TERAPIA.NIVEL_10;

  // Interpolação linear entre nível 1 e nível 10
  // PROVISÓRIO: aguardando confirmação da curva intermediária
  const progresso = (nivelValido - NIVEL_XP_INICIAL) / (NIVEL_XP_MAXIMO - NIVEL_XP_INICIAL);
  return cMin + progresso * (cMax - cMin);
}

/**
 * Calcula as probabilidades relativas dos 3 medicamentos para um dado nível de XP.
 * PROVISÓRIO: 50% da Terapia calculado por posição e restante dividido igualmente entre Vírus e IA.
 *
 * @param {number} nivelXp
 * @returns {{ terapia: number, virus: number, ia: number }}
 */
export function calcularPesosMedicamentos(nivelXp) {
  const pTerapia = chanceTerapia(nivelXp);
  const pRestante = 1 - pTerapia;

  // PROVISÓRIO: aguardando confirmação da divisão entre Vírus e IA (adotada 50%/50%)
  const pVirus = pRestante / 2;
  const pIa = pRestante / 2;

  return {
    terapia: pTerapia,
    virus: pVirus,
    ia: pIa,
  };
}

/**
 * Encontra um medicamento na lista pelo nome parcial ou exato.
 * @param {Array<{ nome: string, eficacia: number }>} medicamentos
 * @param {string} nomeBuscado
 * @returns {{ nome: string, eficacia: number }}
 */
function encontrarMedicamento(medicamentos, nomeBuscado) {
  const alvo = nomeBuscado.toLowerCase();
  const encontrado = medicamentos.find((m) => m.nome.toLowerCase().includes(alvo));
  if (encontrado) return encontrado;

  // Fallback caso não encontre pelo nome
  const nominal = EFICACIA_NOMINAL_MEDICAMENTOS[nomeBuscado] || 0.5;
  return { nome: nomeBuscado, eficacia: nominal };
}

/**
 * Sorteia um único medicamento respeitando os pesos calculados para o nível de XP.
 *
 * @param {number} nivelXp Nível de XP do jogador.
 * @param {Array<{ nome: string, eficacia: number }>} [medicamentos=MEDICAMENTOS_PADRAO]
 * @param {() => number} [rng=rngPadrao] Gerador de número pseudoaleatório injetável em [0, 1).
 * @returns {{ nome: string, eficacia: number }}
 */
export function sortearUmMedicamento(
  nivelXp,
  medicamentos = MEDICAMENTOS_PADRAO,
  rng = rngPadrao
) {
  const pesos = calcularPesosMedicamentos(nivelXp);
  const sorteio = rng();

  const medTerapia = encontrarMedicamento(medicamentos, NOMES_MEDICAMENTOS.TERAPIA_FOTODINAMICA);
  const medVirus = encontrarMedicamento(medicamentos, NOMES_MEDICAMENTOS.VIRUS);
  const medIa = encontrarMedicamento(medicamentos, NOMES_MEDICAMENTOS.MEDICAMENTO_IA);

  // Sorteio por roleta cumulativa
  if (sorteio < pesos.terapia) {
    return { ...medTerapia };
  }

  if (sorteio < pesos.terapia + pesos.virus) {
    return { ...medVirus };
  }

  return { ...medIa };
}

/**
 * Sorteia exatamente 2 opções de medicamentos aleatoriamente dentre os 3.
 * Sorteio independente por posição (permite repetição de tipo).
 *
 * @param {number} nivelXp Nível de XP do jogador.
 * @param {Array<{ nome: string, eficacia: number }>} [medicamentos=MEDICAMENTOS_PADRAO]
 * @param {() => number} [rng=rngPadrao]
 * @returns {[ { nome: string, eficacia: number }, { nome: string, eficacia: number } ]}
 */
export function sortearOpcoes(
  nivelXp,
  medicamentos = MEDICAMENTOS_PADRAO,
  rng = rngPadrao
) {
  const op1 = sortearUmMedicamento(nivelXp, medicamentos, rng);
  const op2 = sortearUmMedicamento(nivelXp, medicamentos, rng);

  return [op1, op2];
}

/**
 * Conecta a lógica de sorteio aos eventos de ciclo de vida da batalha:
 * - Ao ouvir `confronto:iniciado`, sorteia e emite `medicamento:sorteado { opcoes }`.
 * - Ao ouvir `medicamento:usado`, ressorteia e emite `medicamento:sorteado { opcoes }` (RF36).
 *
 * @param {object} [dependencias={}] Injeção de dependências para testes e ambiente
 * @returns {() => void} Função de cancelamento das inscrições
 */
export function vincularSorteioAosEventos(dependencias = {}) {
  const fnOuvir = dependencias.ouvir || ouvir;
  const fnEmitir = dependencias.emitir || emitir;
  const fnObterEstado = dependencias.obterEstado || obterEstado;
  const fnAtualizarEstado = dependencias.atualizarEstado || atualizarEstado;
  const rng = dependencias.rng || rngPadrao;
  const medicamentos = dependencias.medicamentos || MEDICAMENTOS_PADRAO;

  function realizarSorteioEEmitir() {
    const estado = fnObterEstado();
    if (!estado.confronto) return;

    const nivelXp = estado.jogador?.nivelXp || NIVEL_XP_INICIAL;
    const opcoes = sortearOpcoes(nivelXp, medicamentos, rng);

    // Salva as opções no estado do confronto
    fnAtualizarEstado((atual) => {
      if (!atual.confronto) return atual;
      return {
        ...atual,
        confronto: {
          ...atual.confronto,
          opcoes,
        },
      };
    });

    // Emite o evento contratual
    fnEmitir(EVENTOS.MEDICAMENTO_SORTEADO, { opcoes });
  }

  // 1. Ao iniciar confronto: exatamente 1 sorteio emitido
  const cancelarInicio = fnOuvir(EVENTOS.CONFRONTO_INICIADO, () => {
    realizarSorteioEEmitir();
  });

  // 2. Ao usar medicamento: ressorteia novo par (RF36)
  const cancelarUsado = fnOuvir(EVENTOS.MEDICAMENTO_USADO, () => {
    realizarSorteioEEmitir();
  });

  return function desvincular() {
    cancelarInicio();
    cancelarUsado();
  };
}
