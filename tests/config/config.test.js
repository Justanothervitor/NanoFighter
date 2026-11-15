import { describe, it, expect } from 'vitest';
import {
  CORES_BACTERIA,
  PONTOS_BASE_POR_COR,
  DANO_POR_COR,
  FATOR_B_XP_POR_COR,
  METAS_POR_FASE,
  PV_INICIAL,
  PV_MAXIMO_INICIAL,
  NIVEL_XP_INICIAL,
  NIVEL_XP_MAXIMO,
  EFICACIA_NOMINAL_MEDICAMENTOS,
  NOMES_MEDICAMENTOS,
  CHANCE_SORTEIO_TERAPIA,
  PROVISORIO_COMPOSICAO_FASE_1,
  TAMANHO_MIN_USERNAME,
  TAMANHO_MAX_USERNAME,
  USERNAME_PADRAO,
  FASE_INICIAL,
  FASE_MAXIMA_CAMPANHA,
  FASE_MODO_INFINITO,
  PROXIMA_COR_MUTACAO,
} from '../../src/config/index.js';

describe('Configurações e Balanceamento', () => {
  it('deve ter as cores de bactéria esperadas', () => {
    expect(CORES_BACTERIA).toEqual(['verde', 'amarela', 'vermelha']);
  });

  it('deve conter os pontos base por cor corretos (verde: 10, amarela: 15, vermelha: 30)', () => {
    expect(PONTOS_BASE_POR_COR).toEqual({
      verde: 10,
      amarela: 15,
      vermelha: 30,
    });
  });

  it('deve conter o dano por cor correto (verde: 1, amarela: 2, vermelha: 3)', () => {
    expect(DANO_POR_COR).toEqual({
      verde: 1,
      amarela: 2,
      vermelha: 3,
    });
  });

  it('deve conter o fator B de XP por cor correto (verde: 2, amarela: 3, vermelha: 5)', () => {
    expect(FATOR_B_XP_POR_COR).toEqual({
      verde: 2,
      amarela: 3,
      vermelha: 5,
    });
  });

  it('deve conter as metas por fase corretas (10, 15, 20, 25)', () => {
    expect(METAS_POR_FASE[1]).toBe(10);
    expect(METAS_POR_FASE[2]).toBe(15);
    expect(METAS_POR_FASE[3]).toBe(20);
    expect(METAS_POR_FASE[4]).toBe(25);
    expect(METAS_POR_FASE[5]).toBe(Infinity);
  });

  it('deve conter os limites de PV e Nível de XP corretos', () => {
    expect(PV_INICIAL).toBe(10);
    expect(PV_MAXIMO_INICIAL).toBe(10);
    expect(NIVEL_XP_INICIAL).toBe(1);
    expect(NIVEL_XP_MAXIMO).toBe(10);
  });

  it('deve conter as eficácias nominais de referência corretas para os 3 medicamentos', () => {
    expect(EFICACIA_NOMINAL_MEDICAMENTOS['Vírus']).toBe(0.65);
    expect(EFICACIA_NOMINAL_MEDICAMENTOS['Terapia Fotodinâmica']).toBe(0.99);
    expect(EFICACIA_NOMINAL_MEDICAMENTOS['Medicamento com IA']).toBe(0.50);
  });

  it('deve conter a chance de sorteio da Terapia Fotodinâmica configurada', () => {
    expect(CHANCE_SORTEIO_TERAPIA.NIVEL_1).toBe(0.025);
    expect(CHANCE_SORTEIO_TERAPIA.NIVEL_10).toBe(0.50);
  });

  it('deve conter a composição provisória da fase 1', () => {
    expect(PROVISORIO_COMPOSICAO_FASE_1).toBeDefined();
    expect(PROVISORIO_COMPOSICAO_FASE_1.verde).toBe(1.0);
  });

  it('deve conter as regras de username', () => {
    expect(TAMANHO_MIN_USERNAME).toBe(3);
    expect(TAMANHO_MAX_USERNAME).toBe(8);
    expect(USERNAME_PADRAO).toBe('player');
  });

  it('deve conter a regra de mutação de cor (verde -> amarela -> vermelha -> vermelha)', () => {
    expect(PROXIMA_COR_MUTACAO.verde).toBe('amarela');
    expect(PROXIMA_COR_MUTACAO.amarela).toBe('vermelha');
    expect(PROXIMA_COR_MUTACAO.vermelha).toBe('vermelha');
  });
});
