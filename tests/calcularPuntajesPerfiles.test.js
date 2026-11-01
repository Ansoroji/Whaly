import assert from "node:assert/strict";
import test from "node:test";

import {
  calcularPuntajesPerfiles,
} from "../src/utils/calcularPuntajesPerfiles.js";

const perfiles = [
  {
    id: "perfil-a",
    nombre: "Perfil A",
    preguntas: ["a1", "a2", "a3", "a4", "a5"],
  },
  {
    id: "perfil-b",
    nombre: "Perfil B",
    preguntas: ["b1", "b2", "b3", "b4", "b5"],
  },
];

test("normaliza respuestas parciales al rango de 5 a 25 puntos", () => {
  const resultado = calcularPuntajesPerfiles(
    { a1: 4, a2: 5, a3: 0, b1: 2 },
    perfiles,
    2
  );

  assert.equal(resultado.principal.id, "perfil-a");
  assert.equal(resultado.principal.puntaje, 23);
  assert.equal(resultado.complementarios.length, 0);
});

test("incluye como complementarios los perfiles dentro del umbral", () => {
  const resultado = calcularPuntajesPerfiles(
    { a1: 5, a2: 5, b1: 4, b2: 5 },
    perfiles,
    2
  );

  assert.deepEqual(
    resultado.complementarios.map((perfil) => perfil.id),
    ["perfil-b"]
  );
});

test("asigna cero a perfiles sin respuestas válidas", () => {
  const resultado = calcularPuntajesPerfiles(
    { a1: 6, b1: "5" },
    perfiles,
    2
  );

  assert.equal(resultado.principal.puntaje, 0);
  assert.equal(resultado.complementarios.length, 1);
});
