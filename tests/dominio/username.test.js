import { describe, it, expect } from 'vitest';
import {
  validarUsername,
  usernameFinal,
  sanitizarTexto,
} from '../../src/dominio/username.js';

describe('Domínio: Validação e Sanitização de Username (RF03, RF60, RNF03)', () => {
  it('critério de aceitação: usernames com 2 ou 9 caracteres são rejeitados; com 3 e 8 são aceitos (RF03)', () => {
    // 2 caracteres: rejeitado
    expect(validarUsername('ab').valido).toBe(false);
    expect(validarUsername('ab').erro).toBeDefined();

    // 9 caracteres: rejeitado
    expect(validarUsername('abcdefghi').valido).toBe(false);
    expect(validarUsername('abcdefghi').erro).toBeDefined();

    // 3 caracteres: aceito
    expect(validarUsername('abc').valido).toBe(true);
    expect(validarUsername('abc').username).toBe('abc');

    // 8 caracteres: aceito
    expect(validarUsername('abcdefgh').valido).toBe(true);
    expect(validarUsername('abcdefgh').username).toBe('abcdefgh');
  });

  it('critério de aceitação: campo vazio ou só espaços resulta em "player" (RF60)', () => {
    expect(validarUsername('').vazio).toBe(true);
    expect(validarUsername('').username).toBe('player');

    expect(validarUsername('   ').vazio).toBe(true);
    expect(validarUsername('   ').username).toBe('player');

    expect(usernameFinal('')).toBe('player');
    expect(usernameFinal('   ')).toBe('player');
    expect(usernameFinal(null)).toBe('player');
    expect(usernameFinal(undefined)).toBe('player');
  });

  it('deve remover espaços no início e fim (trim) antes de validar', () => {
    const res = validarUsername('  hero  ');
    expect(res.valido).toBe(true);
    expect(res.username).toBe('hero');
  });

  it('deve rejeitar caracteres especiais não permitidos e tentativas maliciosas', () => {
    // Caracteres especiais como tags
    expect(validarUsername('<script>').valido).toBe(false);
    expect(validarUsername('a!b@c').valido).toBe(false);

    // Letras, números e _ são aceitos
    expect(validarUsername('Nano_01').valido).toBe(true);
  });

  it('sanitizarTexto deve escapar entidades HTML para prevenir injeção (RNF03)', () => {
    const malicioso = '<script>alert("xss")</script>';
    const sanitizado = sanitizarTexto(malicioso);

    expect(sanitizado).not.toContain('<');
    expect(sanitizado).not.toContain('>');
    expect(sanitizado).toContain('&lt;script&gt;');
  });
});
