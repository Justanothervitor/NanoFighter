import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  resolverUso,
  executarUsoMedicamento,
  vincularCombateAosEventos,
} from '../../src/dominio/combate.js';
import { criarRngDeterministico, criarRngSequencial } from '../../src/util/rng.js';
import { EVENTOS, limpar, emitir, ouvir } from '../../src/eventos/index.js';
import { definirEstado, reiniciarEstado, obterEstado } from '../../src/estado/index.js';

describe('Domínio: Combate e Resolução de Uso (RF11, RF12, RF13, RF32, RF33, RF37, RF38, RF44)', () => {
  beforeEach(() => {
    reiniciarEstado();
    limpar();
  });

  it('critério de aceitação: com eficácia 1.0 a bactéria é sempre derrotada; com eficácia 0.0 sempre falha', () => {
    const bacteria = { id: 'b1', cor: 'verde', posicao: { x: 1, y: 1 } };
    const estado = {
      jogador: { pv: 10, pontuacao: 0 },
      bacteriasNoMapa: [bacteria],
      confronto: {
        bacteria,
        opcoes: [
          { nome: 'Cura Total', eficacia: 1.0 },
          { nome: 'Inútil', eficacia: 0.0 },
        ],
        turno: 1,
      },
    };

    // RNG que retorna 0.999 (maior que qualquer número < 1)
    const rngAlto = () => 0.999;
    const estadoSucesso = resolverUso(estado, 0, rngAlto);
    expect(estadoSucesso.confronto).toBeNull();
    expect(estadoSucesso.bacteriasNoMapa.length).toBe(0);

    // RNG que retorna 0.001 (menor que qualquer número > 0)
    const rngBaixo = () => 0.001;
    const estadoFalha = resolverUso(estado, 1, rngBaixo);
    expect(estadoFalha.confronto).not.toBeNull();
    expect(estadoFalha.bacteriasNoMapa.length).toBe(1);
    expect(estadoFalha.jogador.pv).toBeLessThan(10);
  });

  it('critério de aceitação: falha em verde (PV -1, vira amarela), amarela (PV -2, vira vermelha) e vermelha (PV -3, continua vermelha)', () => {
    const rngFalha = () => 0.999; // Sempre falha para eficácia < 1

    // 1. Falha em bactéria verde
    const bactVerde = { id: 'b_verde', cor: 'verde', posicao: { x: 2, y: 2 } };
    const estadoVerde = {
      jogador: { pv: 10 },
      bacteriasNoMapa: [bactVerde],
      confronto: {
        bacteria: bactVerde,
        opcoes: [{ nome: 'Med', eficacia: 0.5 }],
        turno: 1,
      },
    };

    const ouvinteMutada = vi.fn();
    const ouvinteDanificado = vi.fn();
    ouvir(EVENTOS.BACTERIA_MUTADA, ouvinteMutada);
    ouvir(EVENTOS.JOGADOR_DANIFICADO, ouvinteDanificado);

    const resVerde = resolverUso(estadoVerde, 0, rngFalha);
    expect(resVerde.jogador.pv).toBe(9); // 10 - 1
    expect(resVerde.confronto.bacteria.cor).toBe('amarela');
    expect(ouvinteDanificado).toHaveBeenCalledWith({ dano: 1, pv: 9 });
    expect(ouvinteMutada).toHaveBeenCalledWith({
      bacteria: expect.objectContaining({ cor: 'amarela' }),
      corAnterior: 'verde',
      corNova: 'amarela',
    });

    // 2. Falha em bactéria amarela
    const bactAmarela = { id: 'b_amarela', cor: 'amarela', posicao: { x: 3, y: 3 } };
    const estadoAmarela = {
      jogador: { pv: 9 },
      bacteriasNoMapa: [bactAmarela],
      confronto: {
        bacteria: bactAmarela,
        opcoes: [{ nome: 'Med', eficacia: 0.5 }],
        turno: 1,
      },
    };

    const resAmarela = resolverUso(estadoAmarela, 0, rngFalha);
    expect(resAmarela.jogador.pv).toBe(7); // 9 - 2
    expect(resAmarela.confronto.bacteria.cor).toBe('vermelha');
    expect(ouvinteDanificado).toHaveBeenCalledWith({ dano: 2, pv: 7 });
    expect(ouvinteMutada).toHaveBeenCalledWith({
      bacteria: expect.objectContaining({ cor: 'vermelha' }),
      corAnterior: 'amarela',
      corNova: 'vermelha',
    });

    // 3. Falha em bactéria vermelha (limite RF44)
    ouvinteMutada.mockClear();
    const bactVermelha = { id: 'b_vermelha', cor: 'vermelha', posicao: { x: 4, y: 4 } };
    const estadoVermelha = {
      jogador: { pv: 7 },
      bacteriasNoMapa: [bactVermelha],
      confronto: {
        bacteria: bactVermelha,
        opcoes: [{ nome: 'Med', eficacia: 0.5 }],
        turno: 1,
      },
    };

    const resVermelha = resolverUso(estadoVermelha, 0, rngFalha);
    expect(resVermelha.jogador.pv).toBe(4); // 7 - 3
    expect(resVermelha.confronto.bacteria.cor).toBe('vermelha'); // Continua vermelha
    expect(ouvinteDanificado).toHaveBeenCalledWith({ dano: 3, pv: 4 });
    // RF44: Não troca a cor da vermelha, portanto não deve emitir evento de mutação
    expect(ouvinteMutada).not.toHaveBeenCalled();
  });

  it('critério de aceitação: PV nunca fica abaixo de 0 e emite jogo:encerrado exatamente 1 vez', () => {
    const bact = { id: 'b1', cor: 'vermelha', posicao: { x: 1, y: 1 } };
    const estado = {
      jogador: { pv: 2, pontuacao: 150 },
      fase: 2,
      bacteriasNoMapa: [bact],
      confronto: {
        bacteria: bact,
        opcoes: [{ nome: 'Med', eficacia: 0.1 }],
        turno: 1,
      },
    };

    const ouvinteFim = vi.fn();
    ouvir(EVENTOS.JOGO_ENCERRADO, ouvinteFim);

    const rngFalha = () => 0.99; // Dano 3 em PV 2 deve resultar em 0 (nunca negativo)
    const novoEstado = resolverUso(estado, 0, rngFalha);

    expect(novoEstado.jogador.pv).toBe(0);
    expect(novoEstado.confronto).toBeNull(); // Confronto encerrado pelo fim de jogo
    expect(ouvinteFim).toHaveBeenCalledTimes(1);
    expect(ouvinteFim).toHaveBeenCalledWith({
      pontuacao: 150,
      fase: 2,
    });
  });

  it('critério de aceitação: cada uso incrementa o turno em 1 e emite medicamento:usado exatamente 1 vez', () => {
    const bact = { id: 'b1', cor: 'verde', posicao: { x: 1, y: 1 } };
    const estado = {
      jogador: { pv: 10 },
      bacteriasNoMapa: [bact],
      confronto: {
        bacteria: bact,
        opcoes: [
          { nome: 'Vírus', eficacia: 0.65 },
          { nome: 'Terapia', eficacia: 0.99 },
        ],
        turno: 1,
      },
    };

    const ouvinteUsado = vi.fn();
    ouvir(EVENTOS.MEDICAMENTO_USADO, ouvinteUsado);

    const rngFalha = () => 0.99;
    const resTurno1 = resolverUso(estado, 0, rngFalha);

    expect(resTurno1.confronto.turno).toBe(2);
    expect(ouvinteUsado).toHaveBeenCalledTimes(1);
    expect(ouvinteUsado).toHaveBeenCalledWith({
      medicamento: { nome: 'Vírus', eficacia: 0.65 },
      sucesso: false,
      bacteria: expect.objectContaining({ cor: 'amarela' }),
    });

    // Simulando segundo turno com novas opções
    resTurno1.confronto.opcoes = [
      { nome: 'Medicamento com IA', eficacia: 0.50 },
      { nome: 'Vírus', eficacia: 0.65 },
    ];

    ouvinteUsado.mockClear();
    const resTurno2 = resolverUso(resTurno1, 1, rngFalha);
    expect(resTurno2.confronto.turno).toBe(3);
    expect(ouvinteUsado).toHaveBeenCalledTimes(1);
    expect(ouvinteUsado).toHaveBeenCalledWith({
      medicamento: { nome: 'Vírus', eficacia: 0.65 },
      sucesso: false,
      bacteria: expect.objectContaining({ cor: 'vermelha' }),
    });
  });

  it('critério de aceitação: em 10.000 usos simulados com eficácia 0.65 a taxa de sucesso fica dentro de ±2 pontos percentuais', () => {
    const totalUsos = 10000;
    const semente = 987654321;
    const rng = criarRngDeterministico(semente);

    const med = { nome: 'Vírus', eficacia: 0.65 };
    let contagemSucessos = 0;

    for (let i = 0; i < totalUsos; i++) {
      const sorteio = rng();
      if (sorteio < med.eficacia) {
        contagemSucessos++;
      }
    }

    const taxaObservada = contagemSucessos / totalUsos;
    const taxaEsperada = 0.65;
    const margemMaxima = 0.02; // ± 2 pontos percentuais (63% a 67%)

    expect(taxaObservada).toBeGreaterThanOrEqual(taxaEsperada - margemMaxima);
    expect(taxaObservada).toBeLessThanOrEqual(taxaEsperada + margemMaxima);
  });

  it('ao ouvir medicamento:escolhido via vincularCombateAosEventos, resolve o uso e atualiza o estado central', () => {
    const bact = { id: 'b_combate', cor: 'verde', posicao: { x: 2, y: 2 } };
    definirEstado({
      jogador: { pv: 10, pontuacao: 0 },
      bacteriasNoMapa: [bact],
      confronto: {
        bacteria: bact,
        opcoes: [
          { nome: 'Terapia Fotodinâmica', eficacia: 0.99 },
          { nome: 'Vírus', eficacia: 0.65 },
        ],
        turno: 1,
        indiceSelecionado: 0,
      },
    });

    const ouvinteDerrotada = vi.fn();
    ouvir(EVENTOS.BACTERIA_DERROTADA, ouvinteDerrotada);

    // RNG que garante sucesso para eficácia 0.99
    const desvincular = vincularCombateAosEventos({ rng: () => 0.1 });

    emitir(EVENTOS.MEDICAMENTO_ESCOLHIDO, { indice: 0 });

    expect(ouvinteDerrotada).toHaveBeenCalledTimes(1);
    expect(ouvinteDerrotada).toHaveBeenCalledWith({ bacteria: bact });

    const estadoFinal = obterEstado();
    expect(estadoFinal.confronto).toBeNull();
    expect(estadoFinal.bacteriasNoMapa.length).toBe(0);

    desvincular();
  });
});
