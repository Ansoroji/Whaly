import segurosData from "../datos/seguros.json";
import reglas from "../datos/reglasRecomendacion.json";
import {
  calcularPuntajesPerfiles,
} from "./calcularPuntajesPerfiles";


function sumarReglas(puntajes, regla) {
  if (!regla) return;

  Object.entries(regla).forEach(
    ([codigoSeguro, puntos]) => {

      if (typeof puntos !== "number") {
        return;
      }

      puntajes[codigoSeguro] =
        (puntajes[codigoSeguro] || 0) + puntos;
    }
  );
}


export function calcularRecomendaciones(respuestas) {
  const puntajes = {};

  const responsabilidades =
    Array.isArray(respuestas.responsabilidades)
      ? respuestas.responsabilidades
      : [];

  responsabilidades.forEach(
    (responsabilidad) => {
      sumarReglas(
        puntajes,
        reglas.responsabilidades[responsabilidad]
      );
    }
  );

  const prioridades =
    Array.isArray(respuestas.protegerEspecialmente)
      ? respuestas.protegerEspecialmente
      : [];

  prioridades.forEach(
    (prioridad) => {
      sumarReglas(
        puntajes,
        reglas.prioridades[prioridad]
      );
    }
  );

  sumarReglas(
    puntajes,
    reglas.personasDependientes[
      respuestas.personasDependientes
    ]
  );

  if (
    ["Tengo moto", "Tengo carro", "Tengo más de un vehículo disponible"]
      .includes(respuestas.movilidad)
  ) {
    sumarReglas(puntajes, { movilidad: 2 });
  }

  if (
    ["Sí, una", "Sí, más de una"]
      .includes(respuestas.mascota)
  ) {
    sumarReglas(puntajes, { mascotas: 2 });
  }

  return segurosData.segurosPersonas
    .map(
      (seguro) => ({
        ...seguro,
        puntos: puntajes[seguro.codigo] || 0,
      })
    )
    .filter((seguro) => seguro.puntos > 0)
    .sort(
      (a, b) => b.puntos - a.puntos
    )
    .slice(
      0,
      reglas.configuracion.cantidadRecomendaciones
    );
}


export function calcularResultadoPerfilWhaly(respuestas) {
  return calcularPuntajesPerfiles(
    respuestas,
    reglas.perfiles,
    reglas.configuracion.diferenciaPerfilComplementario
  );
}


export function obtenerPerfilWhaly(respuestas) {
  return calcularResultadoPerfilWhaly(
    respuestas
  ).principal.nombre;
}
