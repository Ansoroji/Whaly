export function seleccionarPreguntasCuestionario(
  preguntas,
  modo,
  rutas
) {
  const ruta = rutas[modo];

  if (!ruta) {
    return preguntas;
  }

  const preguntasAdicionales =
    new Set(ruta.preguntasAdicionales);

  return preguntas.filter(
    (pregunta) =>
      pregunta.numero <= ruta.hastaPregunta ||
      preguntasAdicionales.has(pregunta.id)
  );
}
