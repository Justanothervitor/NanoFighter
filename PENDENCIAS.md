# Registro de Pendências (Project NanoFighter)

| RF | Pergunta pendente | Valor provisório adotado | Arquivo |
| :--- | :--- | :--- | :--- |
| P0 / Geral | Qual a distribuição/composição exata de cores de bactérias no nível 1? | `{ verde: 1.0, amarela: 0.0, vermelha: 0.0 }` | `src/config/index.js` |
| P1 / RF09 / P13 | Qual o tamanho exato da grade e se há um mapa diferente por fase? | Grade única 10x10 (`PROVISORIO_LARGURA_GRADE = 10`, `PROVISORIO_ALTURA_GRADE = 10`), posição inicial `{ x: 0, y: 0 }` | `src/config/index.js` |
| P4 / P13 | Como funcionam os mapas entre as fases? | Reutilização da mesma grade de mapa; ao iniciar nova fase, o mapa é repopulado com novas bactérias em P5 | `src/dominio/fases.js` |
| P5 / RF49 | Quais as quantidades exatas de bactérias nos níveis 2, 3 e 4? | Tabela provisória proporcional: F2={v:7, a:8, vm:0}, F3={v:4, a:13, vm:3}, F4={v:0, a:18, vm:7} (`PROVISORIO_COMPOSICAO_POR_FASE`) | `src/config/composicao.js` |
| P5 / RF52 | O que significa "respeitando o limite do nível 4" no modo infinito? | Quantidade máxima aleatória entre 1 e 25 (`PROVISORIO_LIMITE_BACTERIAS_MODO_INFINITO = 25`) e composição sem verdes (`PROVISORIO_MODO_INFINITO_SEM_VERDES = true`) | `src/config/composicao.js` |
| P5 / P13 | Qual a regra de posicionamento das bactérias na grade? | Sorteio aleatório de coordenadas em células livres (sem sobrepor personagem nem bactérias existentes) | `src/dominio/composicao.js` |
| P6 / RF22 | Quais são os limiares exatos de XP para os níveis 2 a 10? | Tabela progressiva provisória: 50, 120, 210, 320, 450, 600, 770, 960, 1200 (`PROVISORIO_LIMIARES_XP_POR_NIVEL`) | `src/config/index.js` |
| P6 / RF23 | O multiplicador de pontos pelo nível de XP é igual ao nível ou segue tabela? | Adotado multiplicador igual ao nível de XP atual (`PROVISORIO_MULTIPLICADOR_IGUAL_NIVEL = true`) | `src/dominio/progressao.js` |
| P6 / RF46 | O aumento de 10 PV por nível de XP aumenta apenas o PV máximo ou também cura o jogador? | Adotado que aumenta `pvMax += 10` e cura `pv += 10` (`PROVISORIO_AUMENTO_PV_CURA = true`); alternativa: apenas `pvMax += 10` | `src/dominio/progressao.js` |
| P6 / RF01 / RF20 | A pontuação e XP na vitória consideram a cor inicial ou a cor no momento da derrota após mutações? | Adotada a cor da bactéria no momento da derrota (`PROVISORIO_COR_PONTOS_NO_MOMENTO_DA_DERROTA = true`); alternativa: cor inicial de spawn | `src/dominio/progressao.js` |
| P7 / RF03 | Quais caracteres são permitidos no username e deve haver unicidade? | Alfanumérico e underline (`^[a-zA-Z0-9_]{3,8}$`), sem unicidade forçada (`PROVISORIO_REGEX_USERNAME`) | `src/dominio/username.js` |
| P7 / RF04 | Como resolver empates na pontuação do ranking? | Adotada ordem de chegada / inserção (`PROVISORIO_CRITERIO_DESEMPATE_RANKING = 'ordem_chegada'`) | `src/dominio/ranking.js` |
| P7 / RF42 | Quais os valores e nomes de referência para pontuaçãoMockada.csv? | 10 jogadores com 3 a 8 caracteres e pontuações entre 100 e 1500 | `public/data/pontuaçãoMockada.csv` |
| P8 / RF24-26 | Qual o mapeamento exato de bolinhas por escala e posição na tela? | 1 bolinha = horas (verde), 2 bolinhas = minutos (amarela), 3 bolinhas = segundos (vermelha) (`PROVISORIO_ESCALAS_BACTERIA`) | `src/ui/bacteria.js` |
| P8 / RNF | Qual a largura mínima suportada sem quebra de layout? | Suporte responsivo fluido a partir de 360 px de largura de viewport sem scroll horizontal | `src/ui/index.js` |
| P1 / RNF | Existe largura mínima estrita de viewport para dispositivos móveis? | Não bloquear; layout fluido e responsivo | `src/ui/index.js` |
| P2 / RF15-17 / RF35 | Qual o formato numérico da eficácia no CSV (65 ou 0,65)? | Parser aceita ambos e normaliza para fração decimal [0, 1] (`PROVISORIO_FORMATO_EFICACIA_CSV`) | `src/dados/medicamentos.js` |
| P2 / RF39 | Qual a curva intermediária de sorteio da Terapia entre os níveis 1 e 10? | Interpolação linear entre 2,5% e 50% (`PROVISORIO_CURVA_INTERMEDIARIA_TERAPIA`) | `src/dominio/sorteio.js` |
| P2 / RF39 | A chance máxima de 50% da Terapia vale por posição ou por dupla? | Por posição (`PROVISORIO_CHANCE_TERAPIA_POR_POSICAO`) | `src/dominio/sorteio.js` |
| P2 / RF39 | Como o restante da probabilidade é dividido entre Vírus e IA? | Divisão igualitária 50%/50% do restante (`PROVISORIO_DIVISAO_RESTANTE_VIRUS_IA`) | `src/dominio/sorteio.js` |
| P2 / RF18 | O mesmo tipo de medicamento pode se repetir no par sorteado? | Sim, sorteio independente por posição (`PROVISORIO_PERMITE_REPETICAO_MEDICAMENTO`) | `src/dominio/sorteio.js` |
| P3 / RF32 | O dano ao jogador na falha é baseado na cor antes ou depois da mutação? | Adotada a cor ANTES da mutação (`PROVISORIO_DANO_COR_ANTES_DA_MUTACAO = true`) | `src/config/index.js` |
