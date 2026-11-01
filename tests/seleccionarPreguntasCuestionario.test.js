import assert from "node:assert/strict";
import test from "node:test";

import rutas from "../src/datos/rutasCuestionario.json" with { type: "json" };

import {
  seleccionarPreguntasCuestionario,
} from "../src/utils/seleccionarPreguntasCuestionario.js";

const preguntas = [
  ...Array.from({ length: 10 }, (_, index) => ({
    id: `contexto-${index + 1}`,
    numero: index + 1,
  })),
  ...rutas.breve.preguntasAdicionales.map((id, index) => ({
    id,
    numero: 12 + index,
  })),
  {
    id: "pregunta-completa-extra",
    numero: 37,
  },
];

test("la ruta breve contiene exactamente 15 preguntas y conserva su orden", () => {
  const resultado = seleccionarPreguntasCuestionario(
    preguntas,
    "breve",
    rutas
  );

  assert.equal(resultado.length, 15);
  assert.deepEqual(
    resultado.map((pregunta) => pregunta.numero),
    [...Array.from({ length: 10 }, (_, index) => index + 1), 12, 13, 14, 15, 16]
  );
});

test("mantiene la lista completa para rutas no configuradas", () => {
  assert.equal(
    seleccionarPreguntasCuestionario(
      preguntas,
      "completo",
      rutas
    ),
    preguntas
  );
});
