import {
  esUsuarioWhalyValido,
} from "./validarUsuarioWhaly.js";

const CLAVE_USUARIO = "whalyUsuario";


/* ========================================
   GENERAR ID PARA EL USUARIO
======================================== */

function generarId() {

  if (
    typeof crypto !== "undefined" &&
    crypto.randomUUID
  ) {
    return crypto.randomUUID();
  }

  return `whaly-${Date.now()}`;
}


/* ========================================
   GUARDAR USUARIO
======================================== */

export function guardarUsuarioWhaly({
  datos,
  respuestas,
  perfilWhaly,
  resultadoPerfilWhaly,
  plan,
}) {

  const usuarioAnterior =
    obtenerUsuarioWhaly();


  const fechaActual =
    new Date().toISOString();


  const usuario = {

    /*
      Si ya había un usuario,
      conserva su ID.
    */

    id:
      usuarioAnterior?.id ||
      generarId(),


    tipoUsuario: "persona",


    datosPersonales: {

      nombre:
        datos.nombre,

      edad:
        Number(datos.edad),

      ciudad:
        datos.ciudad,

      telefono:
        datos.telefono,

    },


    /*
      Nombre del perfil generado
      por el cuestionario.
    */

    perfilWhaly,

    resultadoPerfilWhaly,


    /*
      Guardamos las respuestas
      por si posteriormente queremos
      volver a calcular el perfil.
    */

    respuestas,


    /*
      Guardamos el plan FINAL.

      Si el usuario agregó o eliminó
      seguros, se guarda exactamente
      como quedó.
    */

    plan: plan.map(
      (seguro) => ({

        id:
          seguro.id,

        codigo:
          seguro.codigo,

        titulo:
          seguro.titulo,

        descripcion:
          seguro.descripcion,

        imagen:
          seguro.imagen,

      })
    ),


    cuestionarioCompletado:
      true,


    fechaCreacion:
      usuarioAnterior?.fechaCreacion ||
      fechaActual,


    fechaActualizacion:
      fechaActual,

  };

  if (!esUsuarioWhalyValido(usuario)) {
    throw new TypeError(
      "No se puede guardar un perfil Whaly con datos incompletos o inválidos."
    );
  }

  localStorage.setItem(
    CLAVE_USUARIO,
    JSON.stringify(usuario)
  );


  return usuario;

}

export function actualizarPlanUsuarioWhaly(plan) {
  const usuario = obtenerUsuarioWhaly();

  if (!usuario) {
    throw new Error(
      "No se puede actualizar el plan porque no existe un perfil Whaly válido."
    );
  }

  const usuarioActualizado = {
    ...usuario,
    plan: plan.map((seguro) => ({
      id: seguro.id,
      codigo: seguro.codigo,
      titulo: seguro.titulo,
      descripcion: seguro.descripcion,
      imagen: seguro.imagen,
    })),
    fechaActualizacion: new Date().toISOString(),
  };

  if (!esUsuarioWhalyValido(usuarioActualizado)) {
    throw new TypeError(
      "No se puede actualizar el plan con seguros incompletos o inválidos."
    );
  }

  localStorage.setItem(
    CLAVE_USUARIO,
    JSON.stringify(usuarioActualizado)
  );

  return usuarioActualizado;
}


/* ========================================
   OBTENER USUARIO
======================================== */

export function obtenerUsuarioWhaly() {

  const usuario =
    localStorage.getItem(
      CLAVE_USUARIO
    );


  if (!usuario) {
    return null;
  }


  try {

    const usuarioGuardado = JSON.parse(
      usuario
    );

    if (!esUsuarioWhalyValido(usuarioGuardado)) {
      console.warn(
        "Los datos guardados del perfil Whaly no tienen una estructura válida."
      );
      return null;
    }

    return usuarioGuardado;

  } catch (error) {

    console.error(
      "Error leyendo el usuario Whaly:",
      error
    );


    return null;

  }

}


/* ========================================
   COMPROBAR SI EXISTE
======================================== */

export function existeUsuarioWhaly() {

  return (
    obtenerUsuarioWhaly() !== null
  );

}


/* ========================================
   ELIMINAR USUARIO
======================================== */

export function eliminarUsuarioWhaly() {

  localStorage.removeItem(
    CLAVE_USUARIO
  );

}