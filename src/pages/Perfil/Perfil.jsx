import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  useNavigate,
} from "react-router-dom";

import {
  FaCheck,
  FaUser,
} from "react-icons/fa6";

import {
  obtenerUsuarioWhaly,
} from "../../utils/perfilStorage";


function Perfil() {

  const navigate =
    useNavigate();


  /* ========================================
     OBTENER USUARIO LOCAL
  ======================================== */

  const usuario =
    obtenerUsuarioWhaly();


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
                  onClick={() =>
                    navigate(
                      "/cuestionario"
                    )
                  }
                  backgroundColor="var(--whaly-purple)"
                  color="var(--whaly-white)"
                  borderRadius="30px"
                  px="30px"
                >
                  Crear mi perfil
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
    plan,
  } = usuario;


  const primerNombre =
    datosPersonales.nombre
      ?.trim()
      .split(" ")[0];


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
              color="var(--whaly-purple)"
              fontSize={{
                base: "34px",
                md: "46px",
              }}
            >
              Hola, {primerNombre}
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

          </Stack>


          {/* =========================
              INFORMACIÓN PERSONAL
          ========================= */}

          <Card.Root
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
                    MI PLAN
                  </Text>

                  <Heading
                    color="var(--whaly-purple)"
                    fontSize="27px"
                  >
                    Tus seguros
                  </Heading>

                </Box>


                {plan.length > 0 ? (

                  <SimpleGrid
                    columns={{
                      base: 1,
                      md: 2,
                    }}
                    gap="15px"
                  >

                    {plan.map(
                      (seguro) => (

                        <Box
                          key={
                            seguro.codigo
                          }
                          border="2px solid var(--whaly-purple)"
                          borderRadius="22px"
                          p="20px"
                        >

                          <Stack
                            direction="row"
                            gap="15px"
                            align="flex-start"
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


                            <Box>

                              <Text
                                color="var(--whaly-purple)"
                                fontWeight="800"
                              >
                                {
                                  seguro.titulo
                                }
                              </Text>


                              <Text
                                color="var(--whaly-purple)"
                                opacity="0.7"
                                fontSize="14px"
                                mt="5px"
                              >
                                {
                                  seguro.descripcion
                                }
                              </Text>

                            </Box>

                          </Stack>

                        </Box>

                      )
                    )}

                  </SimpleGrid>

                ) : (

                  <Text
                    color="var(--whaly-purple)"
                  >
                    Actualmente no tienes
                    seguros en tu plan.
                  </Text>

                )}

              </Stack>

            </Card.Body>

          </Card.Root>


          {/* =========================
              ACCIONES
          ========================= */}

          <Stack
            direction={{
              base: "column",
              sm: "row",
            }}
            justify="center"
            gap="15px"
          >

            <Button
            onClick={() =>
                navigate("/")
            }

            backgroundColor="var(--whaly-mint)"
            color="var(--whaly-purple)"

            border="2px solid var(--whaly-purple)"
            borderRadius="30px"

            minW={{
                base: "180px",
                md: "210px",
            }}

            height="56px"

            px="30px"

            fontWeight="800"

            transition="all 0.2s ease"

            _hover={{
                backgroundColor:
                "var(--whaly-purple)",

                color:
                "var(--whaly-white)",

                transform:
                "translateY(-2px)",
            }}
            >
            ← Volver al inicio
            </Button>

          </Stack>

        </Stack>

      </Container>

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