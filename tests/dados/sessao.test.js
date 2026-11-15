import { describe, it, expect, beforeEach } from 'vitest';
import {
  salvarPontuacaoSessao,
  obterPontuacoesSessao,
  limparPontuacoesSessao,
} from '../../src/dados/sessao.js';

describe('Dados: Sessão e Persistência no sessionStorage (RF43)', () => {
  beforeEach(() => {
    limparPontuacoesSessao();
  });

  it('deve salvar e recuperar registros de pontuação com sucesso', () => {
    const sucesso = salvarPontuacaoSessao({
      username: 'nano_1',
      pontuacao: 350,
    });
    expect(sucesso).toBe(true);

    const historico = obterPontuacoesSessao();
    expect(historico.length).toBe(1);
    expect(historico[0].username).toBe('nano_1');
    expect(historico[0].pontuacao).toBe(350);
    expect(historico[0].timestamp).toBeDefined();
  });

  it('deve acumular múltiplos registros ordenados por ordem de inserção', () => {
    salvarPontuacaoSessao({ username: 'p1', pontuacao: 100 });
    salvarPontuacaoSessao({ username: 'p2', pontuacao: 200 });

    const historico = obterPontuacoesSessao();
    expect(historico.length).toBe(2);
    expect(historico[0].username).toBe('p1');
    expect(historico[1].username).toBe('p2');
  });

  it('critério de aceitação: com sessionStorage indisponível, o jogo continua funcionando sem lançar erro', () => {
    // Storage que lança erro ao tentar acessar
    const storageQuebrado = {
      getItem: () => {
        throw new Error('SecurityError: The operation is insecure.');
      },
      setItem: () => {
        throw new Error('QuotaExceededError');
      },
      removeItem: () => {
        throw new Error('SecurityError');
      },
    };

    expect(() => {
      const salvo = salvarPontuacaoSessao(
        { username: 'test', pontuacao: 100 },
        { storage: storageQuebrado }
      );
      expect(salvo).toBe(false);
    }).not.toThrow();

    expect(() => {
      const historico = obterPontuacoesSessao({ storage: storageQuebrado });
      expect(historico).toEqual([]);
    }).not.toThrow();

    // Storage nulo
    expect(() => {
      const salvo = salvarPontuacaoSessao(
        { username: 'test', pontuacao: 100 },
        { storage: null }
      );
      expect(salvo).toBe(false);
      const lido = obterPontuacoesSessao({ storage: null });
      expect(lido).toEqual([]);
    }).not.toThrow();
  });
});
