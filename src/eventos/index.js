/**
 * Constantes com os nomes de eventos do Project NanoFighter.
 */
export const EVENTOS = Object.freeze({
  CONFRONTO_INICIADO: 'confronto:iniciado',
  MEDICAMENTO_SORTEADO: 'medicamento:sorteado',
  MEDICAMENTO_ESCOLHIDO: 'medicamento:escolhido',
  MEDICAMENTO_USADO: 'medicamento:usado',
  BACTERIA_MUTADA: 'bacteria:mutada',
  BACTERIA_DERROTADA: 'bacteria:derrotada',
  JOGADOR_DANIFICADO: 'jogador:danificado',
  XP_GANHO: 'xp:ganho',
  NIVEL_XP_SUBIU: 'nivelXp:subiu',
  FASE_INICIADA: 'fase:iniciada',
  FASE_CONCLUIDA: 'fase:concluida',
  JOGO_ENCERRADO: 'jogo:encerrado',
});

/**
 * Cria uma nova instância de barramento de eventos.
 */
export function criarBarramento() {
  /** @type {Map<string, Set<Function>>} */
  const ouvintes = new Map();

  /**
   * Registra um ouvinte para um evento específico.
   * @param {string} nome Nome do evento.
   * @param {Function} fn Função callback executada na emissão.
   * @returns {Function} Função de cancelamento da inscrição (unsubscribe).
   */
  function ouvir(nome, fn) {
    if (!ouvintes.has(nome)) {
      ouvintes.set(nome, new Set());
    }
    ouvintes.get(nome).add(fn);

    return () => remover(nome, fn);
  }

  /**
   * Remove um ouvinte previamente cadastrado.
   * @param {string} nome Nome do evento.
   * @param {Function} fn Função callback a remover.
   */
  function remover(nome, fn) {
    const lista = ouvintes.get(nome);
    if (lista) {
      lista.delete(fn);
      if (lista.size === 0) {
        ouvintes.delete(nome);
      }
    }
  }

  /**
   * Emite um evento com seu payload para todos os ouvintes inscritos.
   * @param {string} nome Nome do evento.
   * @param {*} [payload] Dados transmitidos com o evento.
   */
  function emitir(nome, payload) {
    const lista = ouvintes.get(nome);
    if (!lista) return;

    // Itera sobre cópia para evitar efeitos colaterais de remoção durante a iteração
    for (const fn of Array.from(lista)) {
      fn(payload);
    }
  }

  /**
   * Limpa todos os ouvintes registrados no barramento.
   */
  function limpar() {
    ouvintes.clear();
  }

  return {
    ouvir,
    remover,
    emitir,
    limpar,
  };
}

// Instância padrão global para comunicação central
export const barramentoPadrao = criarBarramento();
export const ouvir = barramentoPadrao.ouvir;
export const remover = barramentoPadrao.remover;
export const emitir = barramentoPadrao.emitir;
export const limpar = barramentoPadrao.limpar;
