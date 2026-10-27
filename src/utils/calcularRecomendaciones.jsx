import segurosData from "../datos/seguros.json";
import reglas from "../datos/reglasRecomendacion.json";


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
  const resultados =
    reglas.perfiles.map((perfil) => ({
      id: perfil.id,
      nombre: perfil.nombre,
      puntaje: perfil.preguntas.reduce(
        (total, preguntaId) => {
          const respuesta =
            respuestas[preguntaId];

          return (
            total +
            (
              Number.isInteger(respuesta) &&
              respuesta >= 1 &&
              respuesta <= 5
                ? respuesta
                : 0
            )
          );
        },
        0
      ),
    }));

  resultados.sort(
    (a, b) => b.puntaje - a.puntaje
  );

  const principal = resultados[0];
  const diferenciaComplementaria =
    reglas.configuracion.diferenciaPerfilComplementario;

  return {
    principal,
    complementarios: resultados
      .slice(1)
      .filter(
        (perfil) =>
          principal.puntaje - perfil.puntaje <=
          diferenciaComplementaria
      ),
  };
}


export function obtenerPerfilWhaly(respuestas) {
  return calcularResultadoPerfilWhaly(
    respuestas
  ).principal.nombre;
}
