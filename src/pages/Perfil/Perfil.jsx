import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Dialog,
  Heading,
  Portal,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaCheck,
  FaCirclePlus,
  FaPen,
  FaRotateLeft,
  FaTrashCan,
  FaUser,
} from "react-icons/fa6";

import segurosData
  from "../../datos/seguros.json";

import {
  calcularSegurosPriorizados,
} from "../../utils/calcularRecomendaciones";

import {
  actualizarPlanUsuarioWhaly,
  eliminarUsuarioWhaly,
  obtenerUsuarioWhaly,
} from "../../utils/perfilStorage.js";

import SelectorSegurosDialog
  from "../../components/ResultadoPlan/SelectorSegurosDialog";


function Perfil() {

  const navigate =
    useNavigate();


  /* ========================================
     OBTENER USUARIO LOCAL
  ======================================== */

  const [usuario, setUsuario] =
    useState(obtenerUsuarioWhaly);

  const [
    mostrarConfirmacionEliminar,
    setMostrarConfirmacionEliminar,
  ] = useState(false);
  const [mostrarSelectorSeguros, setMostrarSelectorSeguros] =
    useState(false);
  const [errorPlan, setErrorPlan] = useState("");
  const [editandoSeguros, setEditandoSeguros] = useState(false);
  const [segurosParaDeshacer, setSegurosParaDeshacer] = useState([]);
  const [mensajePlan, setMensajePlan] = useState("");
  const agregarSegurosButtonRef = useRef(null);
  const enfocarAgregarTrasQuitarRef = useRef(false);
  const plan = usuario?.plan;

  useEffect(() => {
    if (!enfocarAgregarTrasQuitarRef.current) {
      return;
    }

    agregarSegurosButtonRef.current?.focus();
    enfocarAgregarTrasQuitarRef.current = false;
  }, [plan]);

  useEffect(() => {
    if (!mensajePlan || segurosParaDeshacer.length > 0) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setMensajePlan("");
    }, 6000);

    return () => window.clearTimeout(timeout);
  }, [mensajePlan, segurosParaDeshacer.length]);

  const volverAHacerCuestionario = () => {
    navigate("/cuestionario");
  };

  const eliminarPerfil = () => {
    eliminarUsuarioWhaly();
    navigate("/cuestionario");
  };


  /* ========================================
     SI NO EXISTE USUARIO
  ======================================== */

  if (!usuario) {

    return (

      <Box
        as="main"
        minHeight="100vh"
        backgroundColor="var(--whaly-lavender)"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px="20px"
      >

        <Container
          maxW="600px"
        >

          <Card.Root
            as="section"
            className="whaly-card"
            aria-labelledby="perfil-sin-datos-titulo"
            backgroundColor="var(--whaly-white)"
            border="2px solid var(--whaly-purple)"
            borderRadius="30px"
          >

            <Card.Body
              p={{
                base: "30px",
                md: "45px",
              }}
            >

              <Stack
                align="center"
                textAlign="center"
                gap="20px"
              >

                <Box
                  width="75px"
                  height="75px"
                  borderRadius="50%"
                  backgroundColor="var(--whaly-mint)"
                  color="var(--whaly-purple)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="28px"
                >
                  <FaUser />
                </Box>


                <Heading
                  as="h1"
                  id="perfil-sin-datos-titulo"
                  color="var(--whaly-purple)"
                >
                  Aún no tienes un perfil
                </Heading>


                <Text
                  color="var(--whaly-purple)"
                  opacity="0.75"
                >
                  Completa el cuestionario
                  para crear tu Perfil Whaly
                  y obtener un plan
                  personalizado.
                </Text>


                <Button
                  asChild
                  backgroundColor="var(--whaly-purple)"
                  color="var(--whaly-white)"
                  borderRadius="30px"
                  px="30px"
                >
                  <Link to="/cuestionario">
                    Crear mi perfil
                  </Link>
                </Button>

              </Stack>

            </Card.Body>

          </Card.Root>

        </Container>

      </Box>

    );

  }


  /* ========================================
     DATOS DEL USUARIO
  ======================================== */

  const {
    datosPersonales,
    perfilWhaly,
    resultadoPerfilWhaly,
  } = usuario;


  const nombreCompleto =
    datosPersonales.nombre?.trim();

  const segurosPriorizados =
    calcularSegurosPriorizados(usuario.respuestas)
      .filter(
        (seguro) =>
          !plan.some((item) => item.codigo === seguro.codigo)
      );
  const codigosRecomendados = new Set(
    segurosPriorizados.map((seguro) => seguro.codigo)
  );
  const segurosDisponibles =
    segurosData.segurosPersonas.filter(
      (seguro) =>
        !plan.some((item) => item.codigo === seguro.codigo)
    );
  const otrosSegurosDisponibles =
    segurosDisponibles.filter(
      (seguro) => !codigosRecomendados.has(seguro.codigo)
    );

  const agregarSeguro = (seguro) => {
    if (plan.some((item) => item.codigo === seguro.codigo)) {
      return false;
    }

    try {
      const usuarioActualizado =
        actualizarPlanUsuarioWhaly([...plan, seguro]);
      setUsuario(usuarioActualizado);
      setEditandoSeguros(false);
      setErrorPlan("");
      return true;
    } catch (error) {
      console.error("Error actualizando el plan de seguros:", error);
      setErrorPlan(
        "No pudimos guardar el cambio. Inténtalo de nuevo."
      );
      return false;
    }
  };

  const quitarSeguro = (seguro) => {
    try {
      const indice = plan.findIndex(
        (item) => item.codigo === seguro.codigo
      );
      const usuarioActualizado = actualizarPlanUsuarioWhaly(
        plan.filter((item) => item.codigo !== seguro.codigo)
      );
      enfocarAgregarTrasQuitarRef.current = true;
      setUsuario(usuarioActualizado);
      setSegurosParaDeshacer((actuales) => [
        ...actuales,
        { seguro, indice },
      ]);
      setMensajePlan(`${seguro.titulo} se quitó de tu plan.`);
      setErrorPlan("");

      if (usuarioActualizado.plan.length === 0) {
        setEditandoSeguros(false);
      }
    } catch (error) {
      console.error("Error quitando un seguro del plan:", error);
      setErrorPlan(
        "No pudimos quitar el seguro. Inténtalo de nuevo."
      );
    }
  };

  const deshacerQuitarSeguro = () => {
    const ultimoSeguroQuitado =
      segurosParaDeshacer[segurosParaDeshacer.length - 1];

    if (!ultimoSeguroQuitado) {
      return;
    }

    const { seguro, indice } = ultimoSeguroQuitado;

    if (plan.some((item) => item.codigo === seguro.codigo)) {
      setMensajePlan(
        `${seguro.titulo} ya está en tu plan.`
      );
      setSegurosParaDeshacer((actuales) => actuales.slice(0, -1));
      return;
    }

    try {
      const planRestaurado = [...plan];
      planRestaurado.splice(
        Math.min(indice, planRestaurado.length),
        0,
        seguro
      );
      const usuarioActualizado =
        actualizarPlanUsuarioWhaly(planRestaurado);
      setUsuario(usuarioActualizado);
      setSegurosParaDeshacer((actuales) => actuales.slice(0, -1));
      setMensajePlan(`${seguro.titulo} volvió a tu plan.`);
      setErrorPlan("");
    } catch (error) {
      console.error("Error restaurando un seguro al plan:", error);
      setErrorPlan(
        "No pudimos restaurar el seguro. Inténtalo de nuevo."
      );
    }
  };

  const restaurarSegurosQuitados = () => {
    if (segurosParaDeshacer.length === 0) {
      return;
    }

    try {
      const planRestaurado = [...plan];
      [...segurosParaDeshacer].reverse().forEach(({ seguro, indice }) => {
        if (!planRestaurado.some((item) => item.codigo === seguro.codigo)) {
          planRestaurado.splice(
            Math.min(indice, planRestaurado.length),
            0,
            seguro
          );
        }
      });
      const usuarioActualizado =
        actualizarPlanUsuarioWhaly(planRestaurado);
      setUsuario(usuarioActualizado);
      setEditandoSeguros(false);
      setSegurosParaDeshacer([]);
      setMensajePlan("Restauramos los seguros que habías quitado.");
      setErrorPlan("");
    } catch (error) {
      console.error("Error restaurando los seguros quitados:", error);
      setErrorPlan(
        "No pudimos restaurar los seguros. Inténtalo de nuevo."
      );
    }
  };


  return (

    <Box
      as="main"
      minHeight="100vh"
      backgroundColor="var(--whaly-lavender)"
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
        maxW="1100px"
      >

        <Stack
          gap="30px"
        >


          {/* =========================
              ENCABEZADO
          ========================= */}

          <Stack
            textAlign="center"
            align="center"
            gap="10px"
          >

            <Box
              width="80px"
              height="80px"
              borderRadius="50%"
              backgroundColor="var(--whaly-mint)"
              border="2px solid var(--whaly-purple)"
              color="var(--whaly-purple)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="30px"
            >
              <FaUser />
            </Box>


            <Text
              color="var(--whaly-purple)"
              fontSize="13px"
              fontWeight="800"
              letterSpacing="3px"
            >
              MI PERFIL WHALY
            </Text>


            <Heading
              as="h1"
              color="var(--whaly-purple)"
              fontSize={{
                base: "34px",
                md: "46px",
              }}
            >
              Hola, {nombreCompleto}
            </Heading>


            <Badge
              backgroundColor="var(--whaly-purple)"
              color="var(--whaly-white)"
              borderRadius="20px"
              px="15px"
              py="6px"
              fontSize="13px"
            >
              {perfilWhaly}
            </Badge>

            {resultadoPerfilWhaly && (
              <Stack
                align="center"
                gap="6px"
                maxW="720px"
              >
                {resultadoPerfilWhaly.complementarios.length > 0 && (
                  <Text
                    color="var(--whaly-purple)"
                    fontSize="14px"
                  >
                    También podrías identificarte con:{" "}
                    {resultadoPerfilWhaly.complementarios
                      .map((perfil) => perfil.nombre)
                      .join(", ")}
                  </Text>
                )}

                <Text
                  color="var(--whaly-purple)"
                  fontSize="14px"
                  opacity="0.75"
                >
                  Este resultado refleja cómo te relacionas hoy con tus decisiones y prioridades. No es una etiqueta permanente: tu Perfil Whaly puede cambiar a medida que también cambia tu vida.
                </Text>
              </Stack>
            )}

          </Stack>


          {/* =========================
              INFORMACIÓN PERSONAL
          ========================= */}

          <Card.Root
            className="whaly-card"
            backgroundColor="var(--whaly-white)"
            border="2px solid var(--whaly-purple)"
            borderRadius="30px"
          >

            <Card.Body
              p={{
                base: "25px",
                md: "35px",
              }}
            >

              <Stack gap="25px">

                <Box>

                  <Text
                    color="var(--whaly-purple)"
                    fontSize="13px"
                    fontWeight="800"
                    letterSpacing="2px"
                  >
                    INFORMACIÓN
                  </Text>

                  <Heading
                    as="h2"
                    id="perfil-datos-titulo"
                    color="var(--whaly-purple)"
                    fontSize="27px"
                  >
                    Tus datos
                  </Heading>

                </Box>


                <SimpleGrid
                  columns={{
                    base: 1,
                    sm: 2,
                  }}
                  gap="15px"
                >

                  <DatoPerfil
                    titulo="Nombre"
                    valor={
                      datosPersonales.nombre
                    }
                  />

                  <DatoPerfil
                    titulo="Edad"
                    valor={`${datosPersonales.edad} años`}
                  />

                  <DatoPerfil
                    titulo="Ciudad"
                    valor={
                      datosPersonales.ciudad
                    }
                  />

                  <DatoPerfil
                    titulo="Teléfono"
                    valor={
                      datosPersonales.telefono
                    }
                  />

                </SimpleGrid>

              </Stack>

            </Card.Body>

          </Card.Root>


          {/* =========================
              PLAN
          ========================= */}

          <Card.Root
            as="section"
            className="whaly-card"
            aria-labelledby="perfil-seguros-titulo"
            backgroundColor="var(--whaly-white)"
            border="2px solid var(--whaly-purple)"
            borderRadius="30px"
          >

            <Card.Body
              p={{
                base: "25px",
                md: "35px",
              }}
            >

              <Stack gap="25px">

                <Stack
                  direction={{ base: "column", lg: "row" }}
                  justify="space-between"
                  align={{ base: "stretch", lg: "center" }}
                  gap="16px"
                >
                  <Box>
                    <Text
                      color="var(--whaly-purple)"
                      fontSize="13px"
                      fontWeight="800"
                      letterSpacing="2px"
                    >
                      MI PLAN
                    </Text>

                    <Heading
                      as="h2"
                      id="perfil-seguros-titulo"
                      color="var(--whaly-purple)"
                      fontSize="27px"
                    >
                      Tus seguros
                    </Heading>
                  </Box>

                  <Stack
                    direction="row"
                    wrap="wrap"
                    justify={{ base: "stretch", lg: "flex-end" }}
                    align="center"
                    gap="10px"
                    width={{ base: "100%", lg: "auto" }}
                    flex="1"
                    minW="0"
                  >
                    <Button
                      onClick={() =>
                        setEditandoSeguros((actual) => !actual)
                      }
                      backgroundColor={
                        editandoSeguros
                          ? "var(--whaly-purple)"
                          : "transparent"
                      }
                      color={
                        editandoSeguros
                          ? "var(--whaly-white)"
                          : "var(--whaly-purple)"
                      }
                      border="2px solid var(--whaly-purple)"
                      borderRadius="25px"
                      fontWeight="700"
                      minH="44px"
                      minW="0"
                      flex={{ base: "1 1 100%", sm: "0 1 auto" }}
                      order={{ base: 1, lg: 1 }}
                      whiteSpace="normal"
                      textAlign="center"
                      aria-pressed={editandoSeguros}
                      disabled={plan.length === 0}
                    >
                      <FaPen aria-hidden="true" />
                      {editandoSeguros ? "Terminar" : "Editar"}
                    </Button>

                    <Button
                      ref={agregarSegurosButtonRef}
                      onClick={() => {
                        setErrorPlan("");
                        setMostrarSelectorSeguros(true);
                      }}
                      backgroundColor="var(--whaly-purple)"
                      color="var(--whaly-white)"
                      border="2px solid var(--whaly-purple)"
                      borderRadius="25px"
                      fontWeight="700"
                      minH="44px"
                      minW="0"
                      flex={{ base: "1 1 100%", sm: "0 1 auto" }}
                      order={{ base: 2, lg: 2 }}
                      whiteSpace="normal"
                      textAlign="center"
                    >
                      <FaCirclePlus aria-hidden="true" />
                      Agregar seguros
                    </Button>

                    <Button
                      onClick={restaurarSegurosQuitados}
                      variant="outline"
                      border="2px solid var(--whaly-purple)"
                      borderRadius="25px"
                      color="var(--whaly-purple)"
                      fontWeight="700"
                      minH="44px"
                      minW="0"
                      flex={{ base: "1 1 100%", sm: "0 1 auto" }}
                      order={{ base: 3, lg: 3 }}
                      whiteSpace="normal"
                      textAlign="center"
                      disabled={segurosParaDeshacer.length === 0}
                    >
                      <FaRotateLeft aria-hidden="true" />
                      Restaurar seguros quitados
                    </Button>
                  </Stack>
                </Stack>

                {errorPlan && (
                  <Text role="alert" color="red.700" fontWeight="700">
                    {errorPlan}
                  </Text>
                )}

                {mensajePlan && (
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={{ base: "stretch", sm: "center" }}
                    justify="space-between"
                    gap="12px"
                    role="status"
                    aria-live="polite"
                    border="1px solid var(--whaly-teal)"
                    borderRadius="16px"
                    p="12px 16px"
                  >
                    <Text color="var(--whaly-purple)">
                      {mensajePlan}
                    </Text>
                    {segurosParaDeshacer.length > 0 && (
                      <Button
                        onClick={deshacerQuitarSeguro}
                        variant="ghost"
                        color="var(--whaly-purple)"
                        textDecoration="underline"
                        minH="44px"
                        aria-label={`Deshacer y recuperar ${segurosParaDeshacer[segurosParaDeshacer.length - 1].seguro.titulo}`}
                      >
                        Deshacer
                      </Button>
                    )}
                  </Stack>
                )}


                {plan.length > 0 ? (

                  <SimpleGrid
                    columns={{
                      base: 1,
                      md: 2,
                    }}
                    gap="15px"
                  >

                    {plan.map((seguro) => (
                      <Box
                        key={seguro.codigo}
                        border="2px solid var(--whaly-purple)"
                        borderRadius="22px"
                        p="20px"
                      >
                        <Stack
                          direction={{ base: "column", sm: "row" }}
                          gap="15px"
                          align={{ base: "stretch", sm: "flex-start" }}
                        >
                          <Box
                            width="42px"
                            height="42px"
                            minW="42px"
                            borderRadius="50%"
                            backgroundColor="var(--whaly-mint)"
                            border="2px solid var(--whaly-purple)"
                            color="var(--whaly-purple)"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                          >
                            <FaCheck />
                          </Box>

                          <Stack
                            direction={{ base: "column", md: "row" }}
                            align={{ base: "stretch", md: "flex-start" }}
                            justify="space-between"
                            flex="1"
                            minW="0"
                            gap="12px"
                          >
                            <Box>
                              <Text
                                color="var(--whaly-purple)"
                                fontWeight="800"
                              >
                                {seguro.titulo}
                              </Text>

                              <Text
                                color="var(--whaly-purple)"
                                opacity="0.7"
                                fontSize="14px"
                                mt="5px"
                              >
                                {seguro.descripcion}
                              </Text>
                            </Box>

                            {editandoSeguros && (
                              <Button
                                onClick={() => quitarSeguro(seguro)}
                                variant="outline"
                                borderColor="var(--whaly-purple)"
                                borderRadius="22px"
                                color="var(--whaly-purple)"
                                minH="44px"
                                flexShrink="0"
                                alignSelf={{
                                  base: "flex-start",
                                  md: "center",
                                }}
                                aria-label={
                                  `Quitar ${seguro.titulo} de tu plan`
                                }
                              >
                                <FaTrashCan aria-hidden="true" />
                                Quitar
                              </Button>
                            )}
                          </Stack>
                        </Stack>
                      </Box>
                    ))}

                    {plan.length % 2 === 1 && (
                      <Box
                        as="aside"
                        aria-labelledby="perfil-plan-ayuda-titulo"
                        display={{ base: "none", md: "flex" }}
                        flexDirection="column"
                        justifyContent="center"
                        minH="100%"
                        border="2px dashed var(--whaly-border)"
                        borderRadius="22px"
                        p="20px"
                        backgroundColor="rgba(191, 234, 193, 0.18)"
                      >
                        <Box
                          width="42px"
                          height="42px"
                          mb="14px"
                          borderRadius="50%"
                          backgroundColor="rgba(191, 234, 193, 0.55)"
                          color="var(--whaly-purple)"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <FaCirclePlus aria-hidden="true" />
                        </Box>
                        <Heading
                          as="h3"
                          id="perfil-plan-ayuda-titulo"
                          color="var(--whaly-purple)"
                          fontSize="18px"
                        >
                          Tu plan puede crecer contigo
                        </Heading>
                        <Text
                          color="var(--whaly-purple)"
                          opacity="0.75"
                          fontSize="14px"
                          mb="0"
                        >
                          Cuando quieras, explora otras opciones desde
                          «Agregar seguros» en la parte superior.
                        </Text>
                      </Box>
                    )}

                  </SimpleGrid>

                ) : (

                  <Stack
                    align="center"
                    textAlign="center"
                    gap="12px"
                    border="2px dashed var(--whaly-purple)"
                    borderRadius="22px"
                    p="24px"
                  >
                    <Text color="var(--whaly-purple)">
                      Actualmente no tienes seguros en tu plan.
                    </Text>
                  </Stack>

                )}

              </Stack>

            </Card.Body>

          </Card.Root>


          {/* =========================
              ACCIONES
          ========================= */}

          <Stack
            direction="column"
            justify="center"
            gap="15px"
          >

            <Button
              className="whaly-button-raised"
              onClick={volverAHacerCuestionario}
              backgroundColor="var(--whaly-mint)"
              color="var(--whaly-purple)"
              border="2px solid var(--whaly-purple)"
              borderRadius="30px"
              minW={{
                base: "180px",
                md: "260px",
              }}
              height="56px"
              px="30px"
              fontWeight="800"
              transition="all 0.2s ease"
              _hover={{
                backgroundColor: "var(--whaly-purple)",
                color: "var(--whaly-white)",
                transform: "translateY(-2px)",
              }}
            >
              Volver a hacer el cuestionario
            </Button>

            <Button
              onClick={() => setMostrarConfirmacionEliminar(true)}
              backgroundColor="var(--whaly-white)"
              color="var(--whaly-purple)"
              border="2px solid var(--whaly-purple)"
              borderRadius="30px"
              minW={{
                base: "180px",
                md: "260px",
              }}
              height="56px"
              px="30px"
              fontWeight="800"
              transition="all 0.2s ease"
              _hover={{
                backgroundColor: "var(--whaly-lavender)",
                transform: "translateY(-2px)",
              }}
            >
              Eliminar perfil
            </Button>

          </Stack>

        </Stack>

      </Container>

      <Dialog.Root
        open={mostrarConfirmacionEliminar}
        onOpenChange={(event) =>
          setMostrarConfirmacionEliminar(event.open)
        }
      >
        <Portal>
          <Dialog.Backdrop
            background="rgba(40, 24, 72, 0.72)"
            backdropFilter="blur(4px)"
          />
          <Dialog.Positioner p="20px">
            <Dialog.Content
              maxW="480px"
              backgroundColor="var(--whaly-white)"
              border="2px solid var(--whaly-purple)"
              borderRadius="30px"
              boxShadow="0 20px 60px rgba(35, 20, 60, 0.3)"
            >
              <Dialog.Header pb="0">
                <Dialog.Title
                  color="var(--whaly-purple)"
                  fontSize="25px"
                  fontWeight="800"
                >
                  ¿Eliminar tu perfil?
                </Dialog.Title>
              </Dialog.Header>

              <Dialog.Body>
                <Text color="var(--whaly-purple)" opacity="0.8">
                  Se borrarán tus datos y resultados guardados en este
                  navegador. Esta acción no se puede deshacer.
                </Text>
              </Dialog.Body>

              <Dialog.Footer
                direction={{
                  base: "column",
                  sm: "row",
                }}
                gap="12px"
              >
                <Button
                  onClick={() => setMostrarConfirmacionEliminar(false)}
                  backgroundColor="var(--whaly-white)"
                  color="var(--whaly-purple)"
                  border="2px solid var(--whaly-purple)"
                  borderRadius="30px"
                  minH="50px"
                  fontWeight="800"
                  _hover={{
                    backgroundColor: "var(--whaly-lavender)",
                  }}
                >
                  Cancelar
                </Button>

                <Button
                  className="whaly-button-raised"
                  onClick={eliminarPerfil}
                  backgroundColor="var(--whaly-mint)"
                  color="var(--whaly-purple)"
                  border="2px solid var(--whaly-purple)"
                  borderRadius="30px"
                  minH="50px"
                  fontWeight="800"
                  _hover={{
                    backgroundColor: "var(--whaly-purple)",
                    color: "var(--whaly-white)",
                  }}
                >
                  Sí, eliminar perfil
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      <SelectorSegurosDialog
        open={mostrarSelectorSeguros}
        onOpenChange={(event) =>
          setMostrarSelectorSeguros(event.open)
        }
        segurosRecomendados={segurosPriorizados}
        otrosSeguros={otrosSegurosDisponibles}
        onAgregar={agregarSeguro}
        error={errorPlan}
      />

    </Box>

  );

}


/* ========================================
   COMPONENTE REUTILIZABLE PARA DATOS
======================================== */

function DatoPerfil({
  titulo,
  valor,
}) {

  return (

    <Box
      backgroundColor="var(--whaly-mint)"
      border="2px solid var(--whaly-purple)"
      borderRadius="20px"
      p="18px"
    >

      <Text
        color="var(--whaly-purple)"
        fontSize="12px"
        fontWeight="800"
        opacity="0.7"
        textTransform="uppercase"
      >
        {titulo}
      </Text>


      <Text
        color="var(--whaly-purple)"
        fontWeight="800"
        mt="3px"
      >
        {valor}
      </Text>

    </Box>

  );

}


export default Perfil;