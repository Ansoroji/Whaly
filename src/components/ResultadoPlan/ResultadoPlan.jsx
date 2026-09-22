import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Heading,
  IconButton,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  FaCheck,
  FaPen,
  FaPlus,
  FaRotateLeft,
  FaXmark,
} from "react-icons/fa6";

import {
  useMemo,
  useState,
} from "react";

import segurosData from "../../datos/seguros.json";

import {
  calcularRecomendaciones,
  obtenerPerfilWhaly,
} from "../../utils/calcularRecomendaciones";


function ResultadoPlan({
  datos,
  respuestas,
  onVolver,
}) {

  /* =========================
     RECOMENDACIONES
  ========================= */

  const recomendacionesIniciales =
    useMemo(
      () =>
        calcularRecomendaciones(
          respuestas
        ),
      [respuestas]
    );


  const perfil =
    useMemo(
      () =>
        obtenerPerfilWhaly(
          respuestas
        ),
      [respuestas]
    );


  /* =========================
     ESTADOS
  ========================= */

  const [plan, setPlan] =
    useState(
      recomendacionesIniciales
    );

  const [editando, setEditando] =
    useState(false);

  const [mostrarSeguros, setMostrarSeguros] =
    useState(false);


  /* =========================
     SEGUROS DISPONIBLES
  ========================= */

  const segurosDisponibles =
    segurosData.segurosPersonas.filter(
      (seguro) =>
        !plan.some(
          (item) =>
            item.codigo ===
            seguro.codigo
        )
    );


  /* =========================
     ELIMINAR SEGURO
  ========================= */

  const eliminarSeguro = (
    codigo
  ) => {

    setPlan(
      plan.filter(
        (seguro) =>
          seguro.codigo !== codigo
      )
    );

  };


  /* =========================
     AGREGAR SEGURO
  ========================= */

  const agregarSeguro = (
    seguro
  ) => {

    setPlan([
      ...plan,
      seguro,
    ]);

  };


  /* =========================
     RESTAURAR PLAN
  ========================= */

  const restaurarPlan = () => {

    setPlan(
      recomendacionesIniciales
    );

    setMostrarSeguros(false);

  };


  /* =========================
     CREAR DESDE CERO
  ========================= */

  const crearNuevoPaquete = () => {

    setPlan([]);
    setEditando(true);
    setMostrarSeguros(true);

  };


  const primerNombre =
    datos.nombre
      ?.trim()
      .split(" ")[0];


  return (

    <Box
      as="main"
      minHeight="100vh"
      backgroundColor="var(--whaly-mint)"
      py={{
        base: "60px",
        md: "90px",
      }}
      px={{
        base: "18px",
        md: "24px",
      }}
    >

      <Container maxW="1100px">

        <Stack gap="45px">


          {/* =========================
              PERFIL
          ========================= */}

          <Stack
            textAlign="center"
            align="center"
            gap="10px"
          >

            <Text
              color="var(--whaly-purple)"
              fontSize="14px"
              fontWeight="800"
              letterSpacing="4px"
            >
              TU PERFIL WHALY
            </Text>


            <Heading
              color="var(--whaly-purple)"
              fontSize={{
                base: "36px",
                md: "52px",
              }}
              lineHeight="1.1"
              fontWeight="800"
            >
              {perfil}
            </Heading>


            <Text
              color="var(--whaly-purple)"
              fontSize={{
                base: "16px",
                md: "18px",
              }}
              maxW="680px"
              lineHeight="1.7"
            >
              {primerNombre
                ? `${primerNombre}, según tus respuestas preparamos una combinación de seguros que podría ajustarse a tus necesidades.`
                : "Según tus respuestas preparamos una combinación de seguros que podría ajustarse a tus necesidades."}
            </Text>

          </Stack>


          {/* =========================
              CONTENIDO PRINCIPAL
          ========================= */}

          <SimpleGrid
            columns={{
              base: 1,
              lg: 3,
            }}
            gap="28px"
            alignItems="start"
          >


            {/* =========================
                PLAN RECOMENDADO
            ========================= */}

            <Card.Root
              gridColumn={{
                base: "auto",
                lg: "span 2",
              }}
              backgroundColor="var(--whaly-white)"
              border="2px solid var(--whaly-purple)"
              borderRadius="26px"
              overflow="hidden"
              boxShadow="0 12px 0 rgba(60, 28, 125, 0.15)"
            >

              <Card.Body
                padding={{
                  base: "24px",
                  md: "35px",
                }}
              >

                <Stack gap="26px">


                  {/* CABECERA */}

                  <Stack
                    direction={{
                      base: "column",
                      sm: "row",
                    }}
                    justify="space-between"
                    align={{
                      base: "flex-start",
                      sm: "center",
                    }}
                    gap="15px"
                  >

                    <Box>

                      <Text
                        color="var(--whaly-purple)"
                        fontSize="13px"
                        fontWeight="800"
                        letterSpacing="2px"
                      >
                        TU PAQUETE
                      </Text>


                      <Heading
                        color="var(--whaly-purple)"
                        fontSize={{
                          base: "25px",
                          md: "30px",
                        }}
                        fontWeight="800"
                        marginTop="4px"
                      >
                        Seguros recomendados
                      </Heading>

                    </Box>


                    <Button
                      onClick={() =>
                        setEditando(
                          !editando
                        )
                      }
                      backgroundColor={
                        editando
                          ? "var(--whaly-purple)"
                          : "transparent"
                      }
                      color={
                        editando
                          ? "var(--whaly-white)"
                          : "var(--whaly-purple)"
                      }
                      border="2px solid var(--whaly-purple)"
                      borderRadius="30px"
                      fontWeight="700"
                      px="20px"
                      _hover={{
                        backgroundColor:
                          "var(--whaly-purple)",
                        color:
                          "var(--whaly-white)",
                      }}
                    >

                      <FaPen />

                      {editando
                        ? "Terminar edición"
                        : "Editar plan"}

                    </Button>

                  </Stack>


                  {/* =========================
                      LISTA DE SEGUROS
                  ========================= */}

                  <Stack gap="14px">

                    {plan.length === 0 ? (

                      <Box
                        textAlign="center"
                        padding="45px 20px"
                        border="2px dashed #B7AAD3"
                        borderRadius="20px"
                        backgroundColor="#FAF9FD"
                      >

                        <Heading
                          color="var(--whaly-purple)"
                          fontSize="20px"
                        >
                          Tu paquete está vacío
                        </Heading>


                        <Text
                          color="var(--whaly-purple)"
                          opacity="0.7"
                          marginTop="8px"
                        >
                          Puedes agregar los seguros
                          que quieras incluir.
                        </Text>

                      </Box>

                    ) : (

                      plan.map(
                        (seguro) => (

                          <Card.Root
                            key={
                              seguro.codigo
                            }
                            backgroundColor="#FBFAFD"
                            border="2px solid #D8CFEC"
                            borderRadius="18px"
                            boxShadow="none"
                          >

                            <Card.Body
                              padding="18px 20px"
                            >

                              <Stack
                                direction="row"
                                justify="space-between"
                                align="center"
                                gap="15px"
                              >

                                <Stack
                                  direction="row"
                                  align="center"
                                  gap="15px"
                                  minW="0"
                                >

                                  <Box
                                    width="44px"
                                    height="44px"
                                    minW="44px"
                                    borderRadius="50%"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    backgroundColor="var(--whaly-mint)"
                                    color="var(--whaly-purple)"
                                    border="2px solid var(--whaly-purple)"
                                  >

                                    <FaCheck />

                                  </Box>


                                  <Box>

                                    <Text
                                      color="var(--whaly-purple)"
                                      fontSize="17px"
                                      fontWeight="800"
                                    >
                                      {
                                        seguro.titulo
                                      }
                                    </Text>


                                    <Text
                                      color="var(--whaly-purple)"
                                      fontSize="14px"
                                      opacity="0.72"
                                      lineHeight="1.5"
                                      marginTop="3px"
                                    >
                                      {
                                        seguro.descripcion
                                      }
                                    </Text>


                                    {seguro.puntos >
                                      0 && (

                                      <Badge
                                        marginTop="8px"
                                        backgroundColor="var(--whaly-lavender)"
                                        color="var(--whaly-purple)"
                                        borderRadius="20px"
                                        px="10px"
                                        py="4px"
                                      >
                                        Recomendado para ti
                                      </Badge>

                                    )}

                                  </Box>

                                </Stack>


                                {editando && (

                                  <IconButton
                                    aria-label={`Eliminar ${seguro.titulo}`}
                                    onClick={() =>
                                      eliminarSeguro(
                                        seguro.codigo
                                      )
                                    }
                                    variant="ghost"
                                    color="var(--whaly-purple)"
                                    borderRadius="50%"
                                    minW="42px"
                                    _hover={{
                                      backgroundColor:
                                        "#EEE9F8",
                                    }}
                                  >
                                    <FaXmark />
                                  </IconButton>

                                )}

                              </Stack>

                            </Card.Body>

                          </Card.Root>

                        )
                      )

                    )}

                  </Stack>


                  {/* RESTAURAR */}

                  {editando && (

                    <Button
                      onClick={
                        restaurarPlan
                      }
                      alignSelf="flex-start"
                      backgroundColor="transparent"
                      color="var(--whaly-purple)"
                      fontWeight="700"
                      _hover={{
                        backgroundColor:
                          "#EEE9F8",
                      }}
                    >

                      <FaRotateLeft />

                      Restaurar recomendaciones

                    </Button>

                  )}

                </Stack>

              </Card.Body>

            </Card.Root>


            {/* =========================
                PERSONALIZAR
            ========================= */}

            <Card.Root
              backgroundColor="rgba(255,255,255,0.55)"
              border="2px solid var(--whaly-purple)"
              borderRadius="26px"
              boxShadow="0 12px 0 rgba(60, 28, 125, 0.1)"
            >

              <Card.Body
                padding={{
                  base: "25px",
                  md: "30px",
                }}
              >

                <Stack
                  gap="22px"
                  align="center"
                  textAlign="center"
                >

                  <Heading
                    color="var(--whaly-purple)"
                    fontSize="24px"
                    fontWeight="800"
                  >
                    Personaliza tu plan
                  </Heading>


                  <Text
                    color="var(--whaly-purple)"
                    opacity="0.75"
                    fontSize="15px"
                    lineHeight="1.6"
                  >
                    Agrega o elimina seguros
                    antes de continuar.
                  </Text>


                  <IconButton
                    aria-label="Agregar seguro"
                    onClick={() => {

                      setEditando(true);

                      setMostrarSeguros(
                        !mostrarSeguros
                      );

                    }}
                    width="90px"
                    height="90px"
                    borderRadius="24px"
                    backgroundColor="var(--whaly-mint)"
                    color="var(--whaly-purple)"
                    border="3px solid var(--whaly-purple)"
                    fontSize="34px"
                    _hover={{
                      transform:
                        "translateY(-4px)",
                      backgroundColor:
                        "var(--whaly-purple)",
                      color:
                        "var(--whaly-white)",
                    }}
                  >
                    <FaPlus />
                  </IconButton>


                  <Text
                    color="var(--whaly-purple)"
                    fontWeight="700"
                  >
                    Agregar otro seguro
                  </Text>


                  <Button
                    onClick={
                      crearNuevoPaquete
                    }
                    width="100%"
                    backgroundColor="transparent"
                    color="var(--whaly-purple)"
                    border="2px solid var(--whaly-purple)"
                    borderRadius="30px"
                    fontWeight="700"
                    _hover={{
                      backgroundColor:
                        "var(--whaly-purple)",
                      color:
                        "var(--whaly-white)",
                    }}
                  >
                    Crear paquete desde cero
                  </Button>

                </Stack>

              </Card.Body>

            </Card.Root>

          </SimpleGrid>


          {/* =========================
              SEGUROS PARA AGREGAR
          ========================= */}

          {mostrarSeguros && (

            <Card.Root
              backgroundColor="var(--whaly-white)"
              border="2px solid var(--whaly-purple)"
              borderRadius="26px"
              boxShadow="none"
            >

              <Card.Body
                padding={{
                  base: "25px",
                  md: "35px",
                }}
              >

                <Stack gap="24px">

                  <Box>

                    <Heading
                      color="var(--whaly-purple)"
                      fontSize="26px"
                      fontWeight="800"
                    >
                      Agrega seguros a tu plan
                    </Heading>


                    <Text
                      color="var(--whaly-purple)"
                      opacity="0.7"
                      marginTop="6px"
                    >
                      Puedes añadir cualquier
                      seguro disponible.
                    </Text>

                  </Box>


                  {segurosDisponibles.length >
                  0 ? (

                    <SimpleGrid
                      columns={{
                        base: 1,
                        md: 2,
                      }}
                      gap="14px"
                    >

                      {segurosDisponibles.map(
                        (seguro) => (

                          <Button
                            key={
                              seguro.codigo
                            }
                            onClick={() =>
                              agregarSeguro(
                                seguro
                              )
                            }
                            height="auto"
                            minHeight="62px"
                            padding="15px 20px"
                            whiteSpace="normal"
                            backgroundColor="var(--whaly-mint)"
                            color="var(--whaly-purple)"
                            border="2px solid var(--whaly-purple)"
                            borderRadius="18px"
                            fontWeight="700"
                            justifyContent="space-between"
                            _hover={{
                              backgroundColor:
                                "var(--whaly-purple)",
                              color:
                                "var(--whaly-white)",
                              transform:
                                "translateY(-2px)",
                            }}
                          >

                            {
                              seguro.titulo
                            }

                            <FaPlus />

                          </Button>

                        )
                      )}

                    </SimpleGrid>

                  ) : (

                    <Text
                      color="var(--whaly-purple)"
                      fontWeight="700"
                    >
                      Ya agregaste todos los
                      seguros disponibles.
                    </Text>

                  )}

                </Stack>

              </Card.Body>

            </Card.Root>

          )}


          {/* =========================
              MENSAJE
          ========================= */}

          <Box
            maxW="720px"
            alignSelf="center"
            textAlign="center"
          >

            <Badge
              backgroundColor="rgba(255,255,255,0.65)"
              color="var(--whaly-purple)"
              borderRadius="20px"
              px="15px"
              py="7px"
              fontWeight="700"
            >
              Plan personalizado
            </Badge>


            <Text
              color="var(--whaly-purple)"
              opacity="0.72"
              fontSize="14px"
              lineHeight="1.6"
              marginTop="10px"
            >
              Esta recomendación se construyó
              a partir de tus respuestas.
              Puedes modificarla antes de
              continuar.
            </Text>

          </Box>


          {/* =========================
              NAVEGACIÓN
          ========================= */}

          <Stack
            direction={{
              base: "column",
              sm: "row",
            }}
            justify="center"
            gap="14px"
          >

            <Button
              onClick={
                onVolver
              }
              backgroundColor="transparent"
              color="var(--whaly-purple)"
              border="2px solid var(--whaly-purple)"
              borderRadius="30px"
              px="28px"
              height="56px"
              fontWeight="700"
            >
              ← Revisar respuestas
            </Button>


            <Button
              backgroundColor="var(--whaly-purple)"
              color="var(--whaly-white)"
              border="2px solid var(--whaly-purple)"
              borderRadius="30px"
              px="35px"
              height="56px"
              fontWeight="700"
              _hover={{
                backgroundColor:
                  "var(--whaly-mint)",
                color:
                  "var(--whaly-purple)",
              }}
            >
              Continuar con mi plan →
            </Button>

          </Stack>

        </Stack>

      </Container>

    </Box>

  );

}


export default ResultadoPlan;