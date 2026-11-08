import assert from "node:assert/strict";
import test from "node:test";

import {
  esCelularColombianoValido,
} from "../src/utils/validarCelularColombiano.js";

test("acepta celulares colombianos de 10 dígitos que empiezan por 3", () => {
  assert.equal(esCelularColombianoValido("3001234567"), true);
});

test("rechaza teléfonos cortos, fijos y números que no empiezan por 3", () => {
  assert.equal(esCelularColombianoValido("11111111"), false);
  assert.equal(esCelularColombianoValido("300123456"), false);
  assert.equal(esCelularColombianoValido("6011234567"), false);
  assert.equal(esCelularColombianoValido("2001234567"), false);
});

test("rechaza números formados por el mismo dígito repetido", () => {
  assert.equal(esCelularColombianoValido("1111111111"), false);
  assert.equal(esCelularColombianoValido("3333333333"), false);
});
