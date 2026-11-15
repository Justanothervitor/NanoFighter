/**
 * Módulo de carregamento e parsing de medicamentos (RF14, RF15, RF16, RF17, RF35).
 */

import { CAMINHO_CSV_MEDICAMENTOS } from '../config/index.js';

/**
 * Normaliza o valor textual de eficácia para fração decimal entre 0 e 1.
 * Aceita tanto valores percentuais (ex: '65', '65%') quanto frações ('0.65', '0,65').
 *
 * @param {string} valorStr
 * @returns {number} Fração decimal entre 0 e 1.
 * @throws {Error} Se o valor for inválido ou fora dos limites.
 */
export function normalizarEficacia(valorStr) {
  if (typeof valorStr !== 'string' && typeof valorStr !== 'number') {
    throw new Error(`Valor de eficácia inválido: ${valorStr}`);
  }

  const limpo = String(valorStr).trim().replace('%', '').replace(',', '.');
  const numero = parseFloat(limpo);

  if (Number.isNaN(numero) || numero < 0 || numero > 100) {
    throw new Error(`Eficácia fora dos limites válidos [0, 100]: "${valorStr}"`);
  }

  // Se o valor for maior que 1, assume-se formato percentual (ex: 65 -> 0.65)
  // PROVISÓRIO: aguardando confirmação do formato definitivo no CSV
  const fracao = numero > 1 ? numero / 100 : numero;

  return Math.min(Math.max(fracao, 0), 1);
}

/**
 * Realiza o parsing de uma string CSV de medicamentos no padrão UTF-8.
 * Cabeçalho esperado: nomeMedicamento,eficácia (ou eficacia).
 *
 * @param {string} conteudoCsv
 * @returns {Array<{ nome: string, eficacia: number }>}
 * @throws {Error} Em caso de cabeçalho incorreto ou linha com formato inválido.
 */
export function parsearCsvMedicamentos(conteudoCsv) {
  if (!conteudoCsv || typeof conteudoCsv !== 'string') {
    throw new Error('Conteúdo CSV vazio ou inválido.');
  }

  const linhas = conteudoCsv
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (linhas.length < 2) {
    throw new Error('O CSV deve conter ao menos a linha de cabeçalho e um registro.');
  }

  const cabecalho = linhas[0].split(',').map((c) => c.trim().toLowerCase());
  const idxNome = cabecalho.findIndex((c) => c === 'nomemedicamento');
  const idxEficacia = cabecalho.findIndex(
    (c) => c === 'eficácia' || c === 'eficacia'
  );

  if (idxNome === -1 || idxEficacia === -1) {
    throw new Error(
      `Cabeçalho CSV inválido: esperado conter "nomeMedicamento,eficácia", recebido "${linhas[0]}"`
    );
  }

  const medicamentos = [];

  for (let i = 1; i < linhas.length; i++) {
    const colunas = linhas[i].split(',').map((c) => c.trim());
    if (colunas.length < 2) {
      throw new Error(`Linha inválida ${i + 1} no CSV de medicamentos: "${linhas[i]}"`);
    }

    const nome = colunas[idxNome];
    const eficTexto = colunas[idxEficacia];

    if (!nome) {
      throw new Error(`Nome de medicamento ausente na linha ${i + 1}.`);
    }

    const eficacia = normalizarEficacia(eficTexto);
    medicamentos.push({
      nome,
      eficacia,
    });
  }

  return medicamentos;
}

// Cache em memória dos medicamentos carregados
let medicamentosCarregados = null;

/**
 * Carrega a lista de medicamentos a partir do CSV via requisição HTTP (fetch).
 * Trata erros de rede e codificação UTF-8.
 *
 * @param {string} [caminho=CAMINHO_CSV_MEDICAMENTOS]
 * @param {object} [opcoes={}]
 * @returns {Promise<Array<{ nome: string, eficacia: number }>>}
 */
export async function carregarMedicamentos(
  caminho = CAMINHO_CSV_MEDICAMENTOS,
  opcoes = {}
) {
  if (medicamentosCarregados && !opcoes.forcarRecarga) {
    return medicamentosCarregados;
  }

  const fnFetch = opcoes.fetch || globalThis.fetch;
  if (typeof fnFetch !== 'function') {
    throw new Error('Ambiente sem suporte a fetch disponível.');
  }

  let resposta;
  try {
    resposta = await fnFetch(caminho);
  } catch (erroRede) {
    throw new Error(
      `Erro de rede ao buscar o arquivo "${caminho}": ${erroRede.message || erroRede}`
    );
  }

  if (!resposta.ok) {
    throw new Error(
      `Falha HTTP ao carregar "${caminho}": ${resposta.status} ${resposta.statusText}`
    );
  }

  const texto = await resposta.text();
  const lista = parsearCsvMedicamentos(texto);
  medicamentosCarregados = lista;

  return lista;
}

/**
 * Limpa o cache interno de medicamentos (útil para testes).
 */
export function limparCacheMedicamentos() {
  medicamentosCarregados = null;
}
