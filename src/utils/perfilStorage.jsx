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


  localStorage.setItem(
    CLAVE_USUARIO,
    JSON.stringify(usuario)
  );


  return usuario;

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

    return JSON.parse(
      usuario
    );

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