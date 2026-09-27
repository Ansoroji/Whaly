import {
  Box,
  Container,
  SimpleGrid,
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
  calcularRecomendaciones,
  obtenerPerfilWhaly,
} from "../../utils/calcularRecomendaciones";

import {
  guardarUsuarioWhaly,
} from "../../utils/perfilStorage";


import EncabezadoPerfil
  from "./EncabezadoPerfil";

import PlanRecomendado
  from "./PlanRecomendado";

import PanelPersonalizar
  from "./PanelPersonalizar";

import ListaSegurosDisponibles
  from "./ListaSegurosDisponibles";

import AccionesPlan
  from "./AccionesPlan";


function ResultadoPlan({
  datos,
  respuestas,
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


  /* ========================================
     PERFIL WHALY
  ======================================== */

  const perfil =
    useMemo(
      () =>
        obtenerPerfilWhaly(
          respuestas
        ),
      [respuestas]
    );


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
      return;
    }


    setPlan(
      (actual) => [
        ...actual,
        seguro,
      ]
    );

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

    setMostrarSeguros(true);

  };


  /* ========================================
     MOSTRAR / OCULTAR SEGUROS
  ======================================== */

  const alternarSeguros = () => {

    setMostrarSeguros(
      (actual) => !actual
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
            perfil={
              perfil
            }
          />


          {/* PLAN Y PERSONALIZACIÓN */}

          <SimpleGrid
            columns={{
              base: 1,
              lg: 3,
            }}
            gap="25px"
          >

            <PlanRecomendado
              plan={
                plan
              }
              editando={
                editando
              }
              onAlternarEdicion={() =>
                setEditando(
                  (actual) =>
                    !actual
                )
              }
              onEliminar={
                eliminarSeguro
              }
              onRestaurar={
                restaurarPlan
              }
            />


            <PanelPersonalizar
              mostrarSeguros={
                mostrarSeguros
              }
              onAlternarSeguros={
                alternarSeguros
              }
              onCrearNuevoPaquete={
                crearNuevoPaquete
              }
            />

          </SimpleGrid>


          {/* SEGUROS DISPONIBLES */}

          {mostrarSeguros && (

            <ListaSegurosDisponibles
              seguros={
                segurosDisponibles
              }
              onAgregar={
                agregarSeguro
              }
            />

          )}


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