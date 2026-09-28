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

import useCiudades
  from "../../hooks/useCiudades";


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
    preguntaActual,
    setPreguntaActual,
  ] = useState(0);


  const [
    respuestas,
    setRespuestas,
  ] = useState({});


  const pregunta =
    preguntas[preguntaActual];


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


  const formularioCompleto =

    datos.nombre.trim() !== "" &&

    datos.edad.trim() !== "" &&

    datos.ciudad.trim() !== "" &&

    /^\d{10}$/.test(datos.telefono);


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


      /*
        NINGUNO ELIMINA
        LAS DEMÁS OPCIONES
      */

      if (
        opcion === "Ninguno"
      ) {

        setRespuestas(
          (prev) => ({

            ...prev,

            [pregunta.id]:
              ["Ninguno"],

          })
        );


        return;

      }


      /*
        QUITAMOS NINGUNO
        SI SELECCIONA OTRA OPCIÓN
      */

      let nuevas =

        actuales.filter(
          (item) =>
            item !== "Ninguno"
        );


      /*
        ALTERNAR SELECCIÓN
      */

      if (
        nuevas.includes(
          opcion
        )
      ) {

        nuevas =
          nuevas.filter(
            (item) =>
              item !== opcion
          );

      } else {

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
      preguntas.length - 1
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

        onVolver={() => {

          setPreguntaActual(
            preguntas.length - 1
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
          pregunta
        }

        numero={
          preguntaActual + 1
        }

        total={
          preguntas.length
        }

        estaSeleccionada={
          estaSeleccionada
        }

        seleccionarRespuesta={
          seleccionarRespuesta
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

      onComenzar={
        comenzarCuestionario
      }

      onVolver={() =>
        navigate(-1)
      }

    />

  );

}


export default Cuestionario;