import test from 'node:test';
import assert from 'node:assert/strict';
import { calcularConsumoAgua } from '../calcularAgua.mjs';

test('70 kg equivale a 2,45 litros', () => {
  assert.deepEqual(calcularConsumoAgua('70'), { valido: true, litros: 2.45 });
});
test('aceita peso decimal com vírgula ou ponto', () => {
  assert.equal(calcularConsumoAgua('70,5').litros.toFixed(2), '2.47');
  assert.equal(calcularConsumoAgua('70.5').litros.toFixed(2), '2.47');
});
test('rejeita campo vazio, zero e valores negativos', () => {
  for (const valor of ['', '   ', '0', '-5']) {
    assert.equal(calcularConsumoAgua(valor).valido, false);
  }
});
test('rejeita caracteres e formatos inválidos', () => {
  for (const valor of ['abc', '10kg', '10,2,3', '1e3', 'Infinity']) {
    assert.equal(calcularConsumoAgua(valor).valido, false);
  }
});
