function esTextoNoVacio(valor) {
  return typeof valor === "string" && valor.trim().length > 0;
}

function esPuntajePerfilValido(perfil) {
  return (
    perfil !== null &&
    typeof perfil === "object" &&
    esTextoNoVacio(perfil.id) &&
    esTextoNoVacio(perfil.nombre) &&
    Number.isFinite(perfil.puntaje) &&
    perfil.puntaje >= 0 &&
    perfil.puntaje <= 25
  );
}

export function esUsuarioWhalyValido(usuario) {
  if (
    usuario === null ||
    typeof usuario !== "object" ||
    Array.isArray(usuario)
  ) {
    return false;
  }

  const datos = usuario.datosPersonales;
  const resultado = usuario.resultadoPerfilWhaly;
  const respuestas = usuario.respuestas;

  return (
    esTextoNoVacio(usuario.id) &&
    usuario.tipoUsuario === "persona" &&
    usuario.cuestionarioCompletado === true &&
    datos !== null &&
    typeof datos === "object" &&
    esTextoNoVacio(datos.nombre) &&
    Number.isFinite(datos.edad) &&
    datos.edad >= 1 &&
    esTextoNoVacio(datos.ciudad) &&
    typeof datos.telefono === "string" &&
    esTextoNoVacio(usuario.perfilWhaly) &&
    resultado !== null &&
    typeof resultado === "object" &&
    esPuntajePerfilValido(resultado.principal) &&
    Array.isArray(resultado.complementarios) &&
    resultado.complementarios.every(esPuntajePerfilValido) &&
    respuestas !== null &&
    typeof respuestas === "object" &&
    !Array.isArray(respuestas) &&
    Array.isArray(usuario.plan) &&
    usuario.plan.every(
      (seguro) =>
        seguro !== null &&
        typeof seguro === "object" &&
        esTextoNoVacio(seguro.codigo) &&
        esTextoNoVacio(seguro.titulo) &&
        typeof seguro.descripcion === "string"
    ) &&
    typeof usuario.fechaCreacion === "string" &&
    !Number.isNaN(Date.parse(usuario.fechaCreacion)) &&
    typeof usuario.fechaActualizacion === "string" &&
    !Number.isNaN(Date.parse(usuario.fechaActualizacion))
  );
}
