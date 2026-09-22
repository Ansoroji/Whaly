import segurosData from "../datos/seguros.json";
import reglas from "../datos/reglasRecomendacion.json";


function sumarReglas(puntajes, regla) {
  if (!regla) return;

  Object.entries(regla).forEach(
    ([codigoSeguro, puntos]) => {

      /*
        Algunas reglas pueden guardar
        información que no sea puntuación.
      */
      if (typeof puntos !== "number") {
        return;
      }

      puntajes[codigoSeguro] =
        (puntajes[codigoSeguro] || 0) + puntos;
    }
  );
}


export function calcularRecomendaciones(respuestas) {

  /*
    Aquí iremos acumulando los puntos.

    Ejemplo:

    {
      vida: 12,
      salud: 8,
      educacion: 15
    }
  */
  const puntajes = {};


  /* =========================
     1. MOMENTO DE VIDA
  ========================= */

  sumarReglas(
    puntajes,
    reglas.momentoVida?.[
      respuestas.momentoVida
    ]
  );


  /* =========================
     2. POSESIONES
     Selección múltiple
  ========================= */

  if (
    Array.isArray(respuestas.posesiones)
  ) {

    respuestas.posesiones.forEach(
      (posesion) => {

        sumarReglas(
          puntajes,
          reglas.posesiones?.[posesion]
        );

      }
    );

  }


  /* =========================
     3. PREOCUPACIÓN
  ========================= */

  sumarReglas(
    puntajes,
    reglas.preocupacion?.[
      respuestas.preocupacion
    ]
  );


  /* =========================
     4. PREPARACIÓN
     Escala 1 - 5
  ========================= */

  sumarReglas(
    puntajes,
    reglas.preparacion?.[
      String(respuestas.preparacion)
    ]
  );


  /* =========================
     5. ACTITUD AL RIESGO
  ========================= */

  sumarReglas(
    puntajes,
    reglas.riesgos?.[
      respuestas.riesgos
    ]
  );


  /* =========================
     6. GASTO EN SEGUROS

     Esta pregunta puede servir luego
     para determinar tipo de plan,
     pero no necesariamente suma puntos.
  ========================= */

  sumarReglas(
    puntajes,
    reglas.gastoSeguros?.[
      respuestas.gastoSeguros
    ]
  );


  /* =========================
     7. MENSUALIDAD
  ========================= */

  const reglaMensualidad =
    reglas.mensualidad?.[
      respuestas.mensualidad
    ];


  /*
    Algunas reglas pueden venir directamente:

    {
      "pension": 3
    }

    o tener:

    {
      "preferencia": "...",
      "puntos": {
        "pension": 3
      }
    }
  */

  if (reglaMensualidad?.puntos) {

    sumarReglas(
      puntajes,
      reglaMensualidad.puntos
    );

  } else {

    sumarReglas(
      puntajes,
      reglaMensualidad
    );

  }


  /* =========================
     8. FORMA DE ELEGIR

     Principalmente sirve para saber
     si quiere asesoría, autogestión, etc.
     Por ahora no modifica seguros.
  ========================= */


  /* =========================
     9. PLANEACIÓN
     Escala 1 - 5
  ========================= */

  sumarReglas(
    puntajes,
    reglas.largoPlazo?.[
      String(respuestas.largoPlazo)
    ]
  );


  /* =========================
     10. FUTURO
     Selección múltiple
  ========================= */

  if (
    Array.isArray(respuestas.futuro)
  ) {

    respuestas.futuro.forEach(
      (opcion) => {

        sumarReglas(
          puntajes,
          reglas.futuro?.[opcion]
        );

      }
    );

  }


  /* =========================
     CONECTAR LOS PUNTOS
     CON seguros.json
  ========================= */

  const segurosConPuntaje =
    segurosData.segurosPersonas.map(
      (seguro) => ({

        ...seguro,

        puntos:
          puntajes[seguro.codigo] || 0,

      })
    );


  /* =========================
     ORDENAR
  ========================= */

  const recomendados =
    segurosConPuntaje
      .filter(
        (seguro) =>
          seguro.puntos > 0
      )
      .sort(
        (a, b) =>
          b.puntos - a.puntos
      )
      .slice(0, 4);


  return recomendados;

}


/* =========================
   PERFIL WHALY
========================= */

export function obtenerPerfilWhaly(
  respuestas
) {

  const perfil =
    reglas.perfiles?.[
      respuestas.momentoVida
    ];


  return (
    perfil ||
    "Constructor de tu Futuro"
  );

}