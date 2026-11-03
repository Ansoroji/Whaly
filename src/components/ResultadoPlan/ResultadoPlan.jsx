import {
  Box,
  Container,
  Stack,
} from "@chakra-ui/react";

import {
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import segurosData
  from "../../datos/seguros.json";

import {
  calcularResultadoPerfilWhaly,
  calcularRecomendaciones,
  calcularSegurosPriorizados,
} from "../../utils/calcularRecomendaciones";

import {
  guardarUsuarioWhaly,
} from "../../utils/perfilStorage.js";


import EncabezadoPerfil
  from "./EncabezadoPerfil";

import PlanRecomendado
  from "./PlanRecomendado";

import SelectorSegurosDialog
  from "./SelectorSegurosDialog";

import AccionesPlan
  from "./AccionesPlan";


function ResultadoPlan({
  datos,
  respuestas,
  modoCuestionario,
  onVolver,
}) {

  const navigate =
    useNavigate();


  /* ========================================
     RECOMENDACIONES INICIALES
  ======================================== */

  const recomendacionesIniciales =
    useMemo(
      () =>
        calcularRecomendaciones(
          respuestas
        ),
      [respuestas]
    );

  const segurosPriorizados = useMemo(
    () => calcularSegurosPriorizados(respuestas),
    [respuestas]
  );


  /* ========================================
     PERFIL WHALY
  ======================================== */

  const resultadoPerfil =
    useMemo(
      () =>
        calcularResultadoPerfilWhaly(
          respuestas
        ),
      [respuestas]
    );

  const perfil =
    resultadoPerfil.principal.nombre;


  /* ========================================
     ESTADOS
  ======================================== */

  const [
    plan,
    setPlan,
  ] = useState(
    recomendacionesIniciales
  );


  const [
    editando,
    setEditando,
  ] = useState(false);


  const [
    mostrarSeguros,
    setMostrarSeguros,
  ] = useState(false);


  const [
    guardando,
    setGuardando,
  ] = useState(false);


  /* ========================================
     SEGUROS DISPONIBLES
  ======================================== */

  const segurosDisponibles =
    segurosData.segurosPersonas.filter(
      (seguro) =>
        !plan.some(
          (item) =>
            item.codigo ===
            seguro.codigo
        )
    );

  const codigosRecomendados = new Set(
    segurosPriorizados.map((seguro) => seguro.codigo)
  );
  const segurosRecomendadosDisponibles = segurosDisponibles.filter(
    (seguro) => codigosRecomendados.has(seguro.codigo)
  );
  const otrosSegurosDisponibles = segurosDisponibles.filter(
    (seguro) => !codigosRecomendados.has(seguro.codigo)
  );


  /* ========================================
     ELIMINAR SEGURO
  ======================================== */

  const eliminarSeguro = (
    codigo
  ) => {

    setPlan(
      (actual) =>
        actual.filter(
          (seguro) =>
            seguro.codigo !== codigo
        )
    );

  };


  /* ========================================
     AGREGAR SEGURO
  ======================================== */

  const agregarSeguro = (
    seguro
  ) => {

    const yaExiste =
      plan.some(
        (item) =>
          item.codigo ===
          seguro.codigo
      );


    if (yaExiste) {
      return false;
    }


    setPlan(
      (actual) => [
        ...actual,
        seguro,
      ]
    );

    return true;
  };


  /* ========================================
     RESTAURAR PLAN
  ======================================== */

  const restaurarPlan = () => {

    setPlan(
      recomendacionesIniciales
    );

    setEditando(false);

    setMostrarSeguros(false);

  };


  /* ========================================
     CREAR PLAN DESDE CERO
  ======================================== */

  const crearNuevoPaquete = () => {

    setPlan([]);

    setEditando(true);

    setMostrarSeguros(
      true
    );

  };


  /* ========================================
     CREAR PERFIL LOCAL
  ======================================== */

  const continuarConPlan = () => {

    if (plan.length === 0) {
      return;
    }


    try {

      setGuardando(true);


      const usuario =
        guardarUsuarioWhaly({

          datos,

          respuestas,

          perfilWhaly:
            perfil,

          resultadoPerfilWhaly:
            resultadoPerfil,

          /*
            Guardamos el plan tal como
            quedó después de editarlo.
          */

          plan,

        });


      console.log(
        "Usuario Whaly guardado:",
        usuario
      );


      navigate(
        "/perfil"
      );

    } catch (error) {

      console.error(
        "Error guardando el perfil Whaly:",
        error
      );


      setGuardando(false);

    }

  };


  /* ========================================
     INTERFAZ
  ======================================== */

  return (

    <Box
      as="main"
      minHeight="100vh"
      backgroundColor="var(--whaly-mint)"
      py={{
        base: "50px",
        md: "80px",
      }}
      px={{
        base: "18px",
        md: "24px",
      }}
    >

      <Container
        maxW="1200px"
      >

        <Stack
          gap="35px"
        >


          {/* PERFIL */}

          <EncabezadoPerfil
            nombre={
              datos.nombre
            }
            modoCuestionario={
              modoCuestionario
            }
            perfil={
              perfil
            }
            puntaje={
              resultadoPerfil.principal.puntaje
            }
            perfilesComplementarios={
              resultadoPerfil.complementarios
            }
          />


          {/* PLAN Y PERSONALIZACIÓN */}

          <PlanRecomendado
            plan={plan}
            editando={editando}
            onAlternarEdicion={() =>
              setEditando((actual) => !actual)
            }
            onEliminar={eliminarSeguro}
            onRestaurar={restaurarPlan}
            onAgregarSeguros={() => setMostrarSeguros(true)}
            onCrearNuevoPaquete={crearNuevoPaquete}
          />

          <SelectorSegurosDialog
            open={mostrarSeguros}
            onOpenChange={(event) =>
              setMostrarSeguros(event.open)
            }
            segurosRecomendados={segurosRecomendadosDisponibles}
            otrosSeguros={otrosSegurosDisponibles}
            onAgregar={agregarSeguro}
          />


          {/* ACCIONES FINALES */}

          <AccionesPlan
            planVacio={
              plan.length === 0
            }
            guardando={
              guardando
            }
            onVolver={
              onVolver
            }
            onContinuar={
              continuarConPlan
            }
          />

        </Stack>

      </Container>

    </Box>

  );

}


export default ResultadoPlan;