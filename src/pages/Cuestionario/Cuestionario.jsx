import {
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";


import FormularioDatos
  from "../../components/Cuestionario/FormularioDatos";

import PreguntaCuestionario
  from "../../components/Cuestionario/PreguntaCuestionario";

import ResultadoPlan
  from "../../components/ResultadoPlan/ResultadoPlan";


import preguntas
  from "../../datos/preguntasCuestionario.json";

import rutasCuestionario
  from "../../datos/rutasCuestionario.json";

import useCiudades
  from "../../hooks/useCiudades";

import {
  seleccionarPreguntasCuestionario,
} from "../../utils/seleccionarPreguntasCuestionario";
import {
  esCelularColombianoValido,
} from "../../utils/validarCelularColombiano";


function Cuestionario() {

  const navigate =
    useNavigate();


  /* ========================================
     DATOS PERSONALES
  ======================================== */

  const [
    datos,
    setDatos,
  ] = useState({

    nombre: "",
    edad: "",
    ciudad: "",
    telefono: "",

  });


  /* ========================================
     CIUDADES
  ======================================== */

  const {
    ciudades,
    cargandoCiudades,
    errorCiudades,
  } = useCiudades();


  /* ========================================
     CUESTIONARIO
  ======================================== */

  const [
    etapa,
    setEtapa,
  ] = useState("datos");

  const [
    modoCuestionario,
    setModoCuestionario,
  ] = useState("completo");

  const listaPreguntas =
    seleccionarPreguntasCuestionario(
      preguntas.preguntas,
      modoCuestionario,
      rutasCuestionario
    );


  const [
    preguntaActual,
    setPreguntaActual,
  ] = useState(0);


  const [
    respuestas,
    setRespuestas,
  ] = useState({});


  const pregunta =
    listaPreguntas[preguntaActual];


  /* ========================================
     DATOS PERSONALES
  ======================================== */

  const manejarCambioDatos = (
    e
  ) => {

    const {
      name,
      value,
    } = e.target;

    const valorCampo =
      name === "telefono"
        ? value.replace(/\D/g, "").slice(0, 10)
        : value;

    setDatos((prev) => ({

      ...prev,

      [name]: valorCampo,

    }));

  };

  const puedeSeleccionar = (
    opcion
  ) => {

    if (
      pregunta.tipo !== "multiple" ||
      estaSeleccionada(opcion) ||
      !pregunta.maxSeleccion
    ) {
      return true;
    }

    const seleccionadas =
      respuestas[pregunta.id] || [];

    return (
      seleccionadas.length <
      pregunta.maxSeleccion
    );

  };


  const formularioCompleto =

    datos.nombre.trim() !== "" &&

    datos.edad.trim() !== "" &&

    datos.ciudad.trim() !== "" &&

    esCelularColombianoValido(datos.telefono);


  const comenzarCuestionario = () => {

    if (!formularioCompleto) {
      return;
    }

    setPreguntaActual(0);

    setEtapa(
      "preguntas"
    );

  };


  /* ========================================
     SELECCIONAR RESPUESTA
  ======================================== */

  const seleccionarRespuesta = (
    opcion
  ) => {


    /* SELECCIÓN MÚLTIPLE */

    if (
      pregunta.tipo ===
      "multiple"
    ) {

      const actuales =

        respuestas[
          pregunta.id
        ] || [];

      if (
        pregunta.opcionesExclusivas?.includes(
          opcion
        )
      ) {

        setRespuestas(
          (prev) => ({

            ...prev,

            [pregunta.id]:
              actuales.includes(opcion)
                ? []
                : [opcion],

          })
        );

        return;

      }


      const exclusivas =
        pregunta.opcionesExclusivas || [];

      let nuevas =
        actuales.filter(
          (item) =>
            !exclusivas.includes(item)
        );

      if (
        nuevas.includes(
          opcion
        )
      ) {

        nuevas = nuevas.filter(
            (item) =>
              item !== opcion
        );

      } else {

        if (
          pregunta.maxSeleccion &&
          nuevas.length >=
            pregunta.maxSeleccion
        ) {
          return;
        }

        nuevas = [
          ...nuevas,
          opcion,
        ];

      }


      setRespuestas(
        (prev) => ({

          ...prev,

          [pregunta.id]:
            nuevas,

        })
      );


      return;

    }


    /* ÚNICA / ESCALA */

    setRespuestas(
      (prev) => ({

        ...prev,

        [pregunta.id]:
          opcion,

      })
    );

  };


  /* ========================================
     OPCIÓN SELECCIONADA
  ======================================== */

  const estaSeleccionada = (
    opcion
  ) => {

    const respuesta =
      respuestas[
        pregunta.id
      ];


    if (
      pregunta.tipo ===
      "multiple"
    ) {

      return (
        Array.isArray(
          respuesta
        ) &&
        respuesta.includes(
          opcion
        )
      );

    }

    return (
      respuesta === opcion
    );

  };


  /* ========================================
     VALIDACIÓN
  ======================================== */

  const puedeContinuar = () => {

    if (!pregunta) {
      return false;
    }


    const respuestaActual =

      respuestas[
        pregunta.id
      ];


    if (
      pregunta.tipo ===
      "multiple"
    ) {

      return (

        Array.isArray(
          respuestaActual
        ) &&

        respuestaActual.length >
          0

      );

    }

    if (pregunta.opcional) {
      return true;
    }


    return (

      respuestaActual !==
        undefined &&

      respuestaActual !==
        null &&

      respuestaActual !== ""

    );

  };


  /* ========================================
     SIGUIENTE
  ======================================== */

  const siguiente = () => {

    if (!puedeContinuar()) {
      return;
    }


    if (
      preguntaActual <
      listaPreguntas.length - 1
    ) {

      setPreguntaActual(
        (actual) =>
          actual + 1
      );


      return;

    }


    setEtapa(
      "resultado"
    );

  };


  /* ========================================
     ANTERIOR
  ======================================== */

  const anterior = () => {

    if (
      preguntaActual === 0
    ) {

      setEtapa(
        "datos"
      );


      return;

    }


    setPreguntaActual(
      (actual) =>
        actual - 1
    );

  };


  /* ========================================
     RESULTADO
  ======================================== */

  if (
    etapa === "resultado"
  ) {

    return (

      <ResultadoPlan
        datos={datos}

        respuestas={
          respuestas
        }

        modoCuestionario={
          modoCuestionario
        }

        onVolver={() => {

          setPreguntaActual(
            listaPreguntas.length - 1
          );


          setEtapa(
            "preguntas"
          );

        }}
      />

    );

  }


  /* ========================================
     PREGUNTAS
  ======================================== */

  if (
    etapa === "preguntas"
  ) {

    return (

      <PreguntaCuestionario

        pregunta={
          modoCuestionario === "breve" && pregunta.preguntaBreve
            ? {
                ...pregunta,
                pregunta: pregunta.preguntaBreve,
              }
            : pregunta
        }

        respuestaAbierta={
          respuestas[pregunta.id] || ""
        }

        textoSeccion={
          preguntas.secciones[
            pregunta.seccion
          ]
        }

        etiquetasEscala={
          preguntas.escalaPerfil
        }

        mostrarSeccion={
          preguntaActual === 0 ||
          listaPreguntas[
            preguntaActual - 1
          ].seccion !== pregunta.seccion
        }

        numero={
          preguntaActual + 1
        }

        total={
          listaPreguntas.length
        }

        estaSeleccionada={
          estaSeleccionada
        }

        seleccionarRespuesta={
          seleccionarRespuesta
        }

        puedeSeleccionar={
          puedeSeleccionar
        }

        puedeContinuar={
          puedeContinuar()
        }

        onAnterior={
          anterior
        }

        onSiguiente={
          siguiente
        }

      />

    );

  }


  /* ========================================
     FORMULARIO INICIAL
  ======================================== */

  return (

    <FormularioDatos

      datos={
        datos
      }

      onChange={
        manejarCambioDatos
      }

      ciudades={
        ciudades
      }

      cargandoCiudades={
        cargandoCiudades
      }

      errorCiudades={
        errorCiudades
      }

      formularioCompleto={
        formularioCompleto
      }

      telefonoValido={
        esCelularColombianoValido(datos.telefono)
      }

      onComenzar={comenzarCuestionario}
      modoCuestionario={modoCuestionario}
      onCambiarModo={setModoCuestionario}

      onVolver={() =>
        navigate(-1)
      }

    />

  );

}


export default Cuestionario;