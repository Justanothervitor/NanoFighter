/**
 * Parâmetros de balanceamento e configurações do Project NanoFighter.
 * Nenhum valor de balanceamento deve ficar disperso fora desta pasta.
 */

// Cores válidas de bactérias
export const CORES_BACTERIA = /** @type {const} */ (['verde', 'amarela', 'vermelha']);

// Pontuação base concedida ao derrotar uma bactéria por cor
export const PONTOS_BASE_POR_COR = Object.freeze({
  verde: 10,
  amarela: 15,
  vermelha: 30,
});

// Dano causado ao jogador por cor de bactéria em caso de falha de medicamento
export const DANO_POR_COR = Object.freeze({
  verde: 1,
  amarela: 2,
  vermelha: 3,
});

// Fator B da fórmula de XP: XP = 2 * (A * B), onde A = nível de XP atual
export const FATOR_B_XP_POR_COR = Object.freeze({
  verde: 2,
  amarela: 3,
  vermelha: 5,
});

// Metas de bactérias eliminadas por fase para avançar (fase 5 é modo infinito)
export const METAS_POR_FASE = Object.freeze({
  1: 10,
  2: 15,
  3: 20,
  4: 25,
  5: Infinity,
});

// Parâmetros de PV (Pontos de Vida)
export const PV_INICIAL = 10;
export const PV_MAXIMO_INICIAL = 10;

// Parâmetros de Nível de XP
export const NIVEL_XP_INICIAL = 1;
export const NIVEL_XP_MAXIMO = 10;
export const XP_INICIAL = 0;

// Eficácia nominal de referência para os 3 medicamentos
export const EFICACIA_NOMINAL_MEDICAMENTOS = Object.freeze({
  'Vírus': 0.65,
  'Terapia Fotodinâmica': 0.99,
  'Medicamento com IA': 0.50,
});

// Nomes de referência dos medicamentos
export const NOMES_MEDICAMENTOS = Object.freeze({
  VIRUS: 'Vírus',
  TERAPIA_FOTODINAMICA: 'Terapia Fotodinâmica',
  MEDICAMENTO_IA: 'Medicamento com IA',
});

// Sorteio de Terapia Fotodinâmica: 2,5% no nível 1 até 50% no nível 10
export const CHANCE_SORTEIO_TERAPIA = Object.freeze({
  NIVEL_1: 0.025,
  NIVEL_10: 0.50,
});

// PROVISÓRIO: aguardando confirmação da curva intermediária da Terapia Fotodinâmica
export const PROVISORIO_CURVA_INTERMEDIARIA_TERAPIA = 'linear';

// PROVISÓRIO: aguardando confirmação se os 50% valem por posição ou por dupla
export const PROVISORIO_CHANCE_TERAPIA_POR_POSICAO = true;

// PROVISÓRIO: aguardando confirmação da divisão do restante entre Vírus e IA
export const PROVISORIO_DIVISAO_RESTANTE_VIRUS_IA = 0.5;

// PROVISÓRIO: aguardando confirmação se o mesmo medicamento pode se repetir nas 2 opções
export const PROVISORIO_PERMITE_REPETICAO_MEDICAMENTO = true;

// PROVISÓRIO: aguardando confirmação se o formato de eficácia no CSV é 65 ou 0.65
export const PROVISORIO_FORMATO_EFICACIA_CSV = 'ambos';

// Caminho padrão para o arquivo CSV de medicamentos
//export const CAMINHO_CSV_MEDICAMENTOS = '../../public/data/medicamentos.csv';
export const CAMINHO_CSV_MEDICAMENTOS = './data/medicamentos.csv';
// Validação de username
export const TAMANHO_MIN_USERNAME = 3;
export const TAMANHO_MAX_USERNAME = 8;
export const USERNAME_PADRAO = 'player';

// Fases do jogo
export const FASE_INICIAL = 1;
export const FASE_MAXIMA_CAMPANHA = 4;
export const FASE_MODO_INFINITO = 5;

// PROVISÓRIO: aguardando confirmação se o dano é calculado pela cor antes ou depois da mutação
// Valor padrão adotado: antes da mutação (verde=1, amarela=2, vermelha=3)
export const PROVISORIO_DANO_COR_ANTES_DA_MUTACAO = true;

// Próxima cor ao mutar por falha (limite em vermelha)
export const PROXIMA_COR_MUTACAO = Object.freeze({
  verde: 'amarela',
  amarela: 'vermelha',
  vermelha: 'vermelha',
});

// PROVISÓRIO: aguardando confirmação do tamanho da grade e se há um mapa por fase (P13)
export const LARGURA_GRADE = 10;
export const ALTURA_GRADE = 10;
export const POSICAO_INICIAL_JOGADOR = Object.freeze({ x: 0, y: 0 });

// Mapeamento de direções de movimento
export const DIRECOES = Object.freeze({
  CIMA: 'cima',
  BAIXO: 'baixo',
  ESQUERDA: 'esquerda',
  DIREITA: 'direita',
});

// Vetores de deslocamento por direção (grade cartesiana com origem (0,0) no topo-esquerdo)
export const VETORES_DIRECAO = Object.freeze({
  [DIRECOES.CIMA]: Object.freeze({ dx: 0, dy: -1 }),
  [DIRECOES.BAIXO]: Object.freeze({ dx: 0, dy: 1 }),
  [DIRECOES.ESQUERDA]: Object.freeze({ dx: -1, dy: 0 }),
  [DIRECOES.DIREITA]: Object.freeze({ dx: 1, dy: 0 }),
});

// Mapeamento de teclas de controle
export const TECLAS_MOVIMENTO = Object.freeze({
  KeyW: DIRECOES.CIMA,
  KeyS: DIRECOES.BAIXO,
  KeyA: DIRECOES.ESQUERDA,
  KeyD: DIRECOES.DIREITA,
  ArrowUp: DIRECOES.CIMA,
  ArrowDown: DIRECOES.BAIXO,
  ArrowLeft: DIRECOES.ESQUERDA,
  ArrowRight: DIRECOES.DIREITA,
});

export const TECLAS_BATALHA = Object.freeze({
  ESQUERDA: ['KeyA', 'ArrowLeft'],
  DIREITA: ['KeyD', 'ArrowRight'],
  CONFIRMAR: ['Enter', 'NumpadEnter'],
});

// Limite temporal para resposta da UI
export const TEMPO_MAXIMO_RESPOSTA_MS = 200;

// Incremento de PV a cada subida de nível de XP (RF46)
export const VALOR_INCREMENTO_PV_POR_NIVEL = 10;

// PROVISÓRIO: aguardando confirmação da curva de limiares de XP por nível (níveis 1 a 10)
export const PROVISORIO_LIMIARES_XP_POR_NIVEL = Object.freeze({
  1: 0,
  2: 50,
  3: 120,
  4: 210,
  5: 320,
  6: 450,
  7: 600,
  8: 770,
  9: 960,
  10: 1200,
});

// PROVISÓRIO: aguardando confirmação se o multiplicador de pontos é igual ao nível ou segue tabela
export const PROVISORIO_MULTIPLICADOR_IGUAL_NIVEL = true;

// PROVISÓRIO: aguardando confirmação se o aumento de PV no nível cura ou afeta apenas o máximo
// Adotado: aumenta pvMax em 10 e cura pv em 10
export const PROVISORIO_AUMENTO_PV_CURA = true;

// PROVISÓRIO: aguardando confirmação se a cor para pontuação/XP é a original ou a do momento da derrota
export const PROVISORIO_COR_PONTOS_NO_MOMENTO_DA_DERROTA = true;

// Quantidade máxima de posições exibidas no ranking (RF04)
export const TOP_RANKING_MAXIMO = 10;

// Caminho padrão para o arquivo CSV de pontuações simuladas (RF42)
//export const CAMINHO_CSV_RANKING = '../../public/data/pontuaçãoMockada.csv';
export const CAMINHO_CSV_RANKING = './data/pontuaçãoMockada.csv';

// PROVISÓRIO: aguardando confirmação do critério de desempate no ranking (adotada ordem de chegada)
export const PROVISORIO_CRITERIO_DESEMPATE_RANKING = 'ordem_chegada';

// PROVISÓRIO: aguardando confirmação de caracteres permitidos no username (adotado alfanumérico e underline)
export const PROVISORIO_REGEX_USERNAME = /^[a-zA-Z0-9_]{3,8}$/;

// PROVISÓRIO: aguardando confirmação se username deve ser único frente aos simulados
export const PROVISORIO_VERIFICAR_UNICIDADE_USERNAME = false;

// PROVISÓRIO: aguardando confirmação do mapeamento de bolinhas por escala de bactéria (RF24, RF25, RF26)
// Horas = 1 bolinha, Minutos = 2 bolinhas, Segundos = 3 bolinhas
export const PROVISORIO_ESCALAS_BACTERIA = Object.freeze({
  verde: Object.freeze({ escala: 'horas', bolinhas: 1, rotulo: 'Horas' }),
  amarela: Object.freeze({ escala: 'minutos', bolinhas: 2, rotulo: 'Minutos' }),
  vermelha: Object.freeze({ escala: 'segundos', bolinhas: 3, rotulo: 'Segundos' }),
});

// Re-exportações de composição das bactérias
export {
  COMPOSICAO_FASE_1,
  COMPOSICAO_POR_FASE,
  PROVISORIO_LIMITE_BACTERIAS_MODO_INFINITO,
//  PROVISORIO_MODO_INFINITO_SEM_VERDES,
} from './composicao.js';

// Chave do sessionStorage para salvar pontuações
export const STORAGE_KEY_PONTUACOES = 'nanofighter_pontuacoes';
