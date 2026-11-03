import assert from "node:assert/strict";
import test from "node:test";

import {
  esUsuarioWhalyValido,
} from "../src/utils/validarUsuarioWhaly.js";
import {
  actualizarPlanUsuarioWhaly,
  guardarUsuarioWhaly,
  obtenerUsuarioWhaly,
} from "../src/utils/perfilStorage.js";

const usuarioValido = {
  id: "usuario-1",
  tipoUsuario: "persona",
  datosPersonales: {
    nombre: "Ana",
    edad: 30,
    ciudad: "Bogotá",
    telefono: "3001234567",
  },
  perfilWhaly: "Pragmático",
  resultadoPerfilWhaly: {
    principal: {
      id: "pragmatico",
      nombre: "Pragmático",
      puntaje: 22,
    },
    complementarios: [],
  },
  respuestas: {
    pragmatico_1: 5,
  },
  plan: [
    {
      codigo: "salud",
      titulo: "Seguro de Salud",
      descripcion: "Descripción",
    },
  ],
  cuestionarioCompletado: true,
  fechaCreacion: "2026-11-01T10:00:00.000Z",
  fechaActualizacion: "2026-11-01T10:00:00.000Z",
};

test("acepta un perfil guardado con la estructura esperada", () => {
  assert.equal(esUsuarioWhalyValido(usuarioValido), true);
});

test("rechaza datos guardados incompletos o de tipo incorrecto", () => {
  assert.equal(esUsuarioWhalyValido(null), false);
  assert.equal(esUsuarioWhalyValido({ ...usuarioValido, plan: {} }), false);
  assert.equal(
    esUsuarioWhalyValido({
      ...usuarioValido,
      resultadoPerfilWhaly: {
        ...usuarioValido.resultadoPerfilWhaly,
        principal: {
          ...usuarioValido.resultadoPerfilWhaly.principal,
          puntaje: 26,
        },
      },
    }),
    false
  );
});

test("rechaza registros sin información personal y fechas válidas", () => {
  assert.equal(
    esUsuarioWhalyValido({
      ...usuarioValido,
      datosPersonales: {
        ...usuarioValido.datosPersonales,
        nombre: "",
      },
    }),
    false
  );
  assert.equal(
    esUsuarioWhalyValido({
      ...usuarioValido,
      fechaActualizacion: "fecha inválida",
    }),
    false
  );
});

test("guarda y recupera solo perfiles con la estructura esperada", () => {
  const datosGuardados = new Map();
  globalThis.localStorage = {
    getItem: (clave) => datosGuardados.get(clave) ?? null,
    setItem: (clave, valor) => datosGuardados.set(clave, valor),
    removeItem: (clave) => datosGuardados.delete(clave),
  };

  const guardado = guardarUsuarioWhaly({
    datos: usuarioValido.datosPersonales,
    respuestas: usuarioValido.respuestas,
    perfilWhaly: usuarioValido.perfilWhaly,
    resultadoPerfilWhaly: usuarioValido.resultadoPerfilWhaly,
    plan: usuarioValido.plan,
  });

  assert.equal(guardado.cuestionarioCompletado, true);
  assert.equal(obtenerUsuarioWhaly().id, guardado.id);

  datosGuardados.set("whalyUsuario", JSON.stringify({ perfilWhaly: "Pragmático" }));
  const advertenciaOriginal = console.warn;
  console.warn = () => {};

  try {
    assert.equal(obtenerUsuarioWhaly(), null);
  } finally {
    console.warn = advertenciaOriginal;
    delete globalThis.localStorage;
  }
});

test("no guarda perfiles incompletos", () => {
  globalThis.localStorage = {
    getItem: () => null,
    setItem: () => assert.fail("No debe persistir un usuario inválido."),
  };

  assert.throws(
    () =>
      guardarUsuarioWhaly({
        datos: {},
        respuestas: {},
        perfilWhaly: "",
        resultadoPerfilWhaly: {},
        plan: [],
      }),
    TypeError
  );

  delete globalThis.localStorage;
});

test("actualiza y persiste el plan sin reemplazar el perfil", () => {
  const datosGuardados = new Map();
  globalThis.localStorage = {
    getItem: (clave) => datosGuardados.get(clave) ?? null,
    setItem: (clave, valor) => datosGuardados.set(clave, valor),
    removeItem: (clave) => datosGuardados.delete(clave),
  };

  try {
    const guardado = guardarUsuarioWhaly({
      datos: usuarioValido.datosPersonales,
      respuestas: usuarioValido.respuestas,
      perfilWhaly: usuarioValido.perfilWhaly,
      resultadoPerfilWhaly: usuarioValido.resultadoPerfilWhaly,
      plan: usuarioValido.plan,
    });
    const nuevoSeguro = {
      codigo: "vida",
      titulo: "Seguro de Vida",
      descripcion: "Descripción",
    };

    const actualizado = actualizarPlanUsuarioWhaly([
      ...guardado.plan,
      nuevoSeguro,
    ]);

    assert.equal(actualizado.id, guardado.id);
    assert.deepEqual(
      actualizado.plan.map((seguro) => seguro.codigo),
      ["salud", "vida"]
    );
    assert.deepEqual(
      obtenerUsuarioWhaly().plan.map((seguro) => ({
        codigo: seguro.codigo,
        titulo: seguro.titulo,
      })),
      [
        { codigo: "salud", titulo: "Seguro de Salud" },
        { codigo: "vida", titulo: "Seguro de Vida" },
      ]
    );
  } finally {
    delete globalThis.localStorage;
  }
});

test("no persiste una actualización de plan inválida", () => {
  const datosGuardados = new Map();
  globalThis.localStorage = {
    getItem: (clave) => datosGuardados.get(clave) ?? null,
    setItem: (clave, valor) => datosGuardados.set(clave, valor),
    removeItem: (clave) => datosGuardados.delete(clave),
  };

  try {
    guardarUsuarioWhaly({
      datos: usuarioValido.datosPersonales,
      respuestas: usuarioValido.respuestas,
      perfilWhaly: usuarioValido.perfilWhaly,
      resultadoPerfilWhaly: usuarioValido.resultadoPerfilWhaly,
      plan: usuarioValido.plan,
    });

    const valorAnterior = datosGuardados.get("whalyUsuario");

    assert.throws(
      () =>
        actualizarPlanUsuarioWhaly([
          { codigo: "vida", titulo: "", descripcion: "Descripción" },
        ]),
      TypeError
    );
    assert.equal(datosGuardados.get("whalyUsuario"), valorAnterior);
  } finally {
    delete globalThis.localStorage;
  }
});
