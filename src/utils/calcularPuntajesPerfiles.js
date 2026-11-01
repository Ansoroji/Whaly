export function calcularPuntajesPerfiles(
  respuestas,
  perfiles,
  diferenciaComplementaria
) {
  const resultados = perfiles.map((perfil) => {
    const respuestasValidas =
      perfil.preguntas
        .map((preguntaId) => respuestas[preguntaId])
        .filter(
          (respuesta) =>
            Number.isInteger(respuesta) &&
            respuesta >= 1 &&
            respuesta <= 5
        );

    const total = respuestasValidas.reduce(
      (acumulado, respuesta) => acumulado + respuesta,
      0
    );

    return {
      id: perfil.id,
      nombre: perfil.nombre,
      puntaje: respuestasValidas.length
        ? Math.round((total / respuestasValidas.length) * 5)
        : 0,
    };
  });

  resultados.sort((a, b) => b.puntaje - a.puntaje);

  const [principal, ...restantes] = resultados;

  return {
    principal,
    complementarios: restantes.filter(
      (perfil) =>
        principal.puntaje - perfil.puntaje <=
        diferenciaComplementaria
    ),
  };
}
