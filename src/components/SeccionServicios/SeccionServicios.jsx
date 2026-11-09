import {
  Box,
  Card,
  Container,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  Link,
} from "react-router-dom";


function SeccionServicios() {

  const servicios = [
    {
      id: 1,
      etiqueta: "PERSONAS",
      titulo: "Seguros para Personas",
      descripcion:
        "Protección integral para ti y tu familia con coberturas personalizadas",
      imagen: "/images/personas-card.webp",
      ruta: "/personas",
    },

    {
      id: 2,
      etiqueta: "EMPRESAS",
      titulo: "Seguros para Empresas",
      descripcion:
        "Soluciones completas para proteger tu negocio y activos",
      imagen: "/images/empresas-card.webp",
      ruta: "/empresas",
    },
  ];


  return (

    <Box
      as="section"
      id="servicios"
      backgroundColor="var(--whaly-light-blue)"
      py={{
        base: "70px",
        md: "100px",
      }}
      px={{
        base: "16px",
        md: "24px",
      }}
    >

      <Container
        maxW="1200px"
      >


        {/* =========================
            ENCABEZADO
        ========================= */}

        <Stack
          gap="16px"
          align="center"
          textAlign="center"
          marginBottom={{
            base: "45px",
            md: "70px",
          }}
        >

          <Text
            color="var(--whaly-purple)"
            fontSize="14px"
            fontWeight="700"
            letterSpacing="5px"
          >
            NUESTROS SERVICIOS
          </Text>


          <Heading
            as="h2"
            color="var(--whaly-purple)"
            fontSize={{
              base: "36px",
              md: "48px",
              lg: "58px",
            }}
            lineHeight="1.1"
            fontWeight="800"
            maxW="1100px"
          >
            Soluciones que protegen tu vida
            y tu patrimonio
          </Heading>


          <Text
            color="var(--whaly-purple)"
            fontSize={{
              base: "16px",
              md: "18px",
            }}
            lineHeight="1.6"
            maxW="720px"
            opacity="0.8"
          >
            Te recomendamos lo que deberías
            tener de acuerdo a tus necesidades
            y presupuesto
          </Text>

        </Stack>


        {/* =========================
            CARDS
        ========================= */}

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
          }}
          gap={{
            base: "35px",
            md: "45px",
          }}
        >

          {servicios.map(
            (servicio) => (

              <Card.Root
                key={servicio.id}
                role="group"
                position="relative"
                overflow="hidden"
                backgroundColor="var(--whaly-white)"
                border="2px solid var(--whaly-purple)"
                borderRadius={{
                  base: "26px",
                  md: "32px",
                }}
                boxShadow="
                  0 10px 0
                  var(--whaly-purple)
                "
                transition="
                  transform 0.25s ease,
                  box-shadow 0.25s ease
                "
                _hover={{
                  transform:
                    "translateY(-7px)",
                  boxShadow:
                    "0 17px 0 var(--whaly-purple)",
                }}
              >


                {/* =========================
                    BARRA SUPERIOR
                ========================= */}

                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  width="100%"
                  height="8px"
                  backgroundColor="var(--whaly-mint)"
                  zIndex="3"
                />


                {/* =========================
                    IMAGEN
                ========================= */}

                <Box
                  position="relative"
                  height={{
                    base: "230px",
                    md: "290px",
                  }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  padding={{
                    base: "28px",
                    md: "34px",
                  }}
                  backgroundColor="var(--whaly-white)"
                >

                  <Image
                    src={servicio.imagen}
                    alt={servicio.titulo}
                    width="100%"
                    height="100%"
                    maxW="360px"
                    objectFit="contain"
                    loading="lazy"
                    decoding="async"
                    transition="
                      transform 0.3s ease
                    "
                    _groupHover={{
                      transform:
                        "scale(1.04)",
                    }}
                  />

                </Box>


                {/* =========================
                    CONTENIDO
                ========================= */}

                <Card.Body
                  padding={{
                    base: "26px",
                    md: "34px",
                  }}
                  paddingTop={{
                    base: "20px",
                    md: "22px",
                  }}
                >

                  <Stack
                    gap="18px"
                    align="flex-start"
                  >


                    {/* ETIQUETA */}

                    <Box
                      backgroundColor="var(--whaly-mint)"
                      color="var(--whaly-purple)"
                      borderRadius="20px"
                      px="14px"
                      py="6px"
                      fontSize="12px"
                      fontWeight="800"
                      letterSpacing="2px"
                    >
                      {servicio.etiqueta}
                    </Box>


                    {/* TÍTULO */}

                    <Heading
                      as="h3"
                      color="var(--whaly-purple)"
                      fontSize={{
                        base: "27px",
                        md: "32px",
                      }}
                      fontWeight="800"
                      lineHeight="1.15"
                      maxW="90%"
                    >
                      {servicio.titulo}
                    </Heading>


                    {/* DESCRIPCIÓN */}

                    <Text
                      color="var(--whaly-purple)"
                      fontSize={{
                        base: "16px",
                        md: "17px",
                      }}
                      lineHeight="1.7"
                      opacity="0.8"
                      maxW="440px"
                    >
                      {servicio.descripcion}
                    </Text>


                    {/* =========================
                        BOTÓN
                    ========================= */}

                    <Box
                      as={Link}
                      to={servicio.ruta}
                      marginTop="8px"
                      display="inline-flex"
                      alignItems="center"
                      justifyContent="center"
                      gap="10px"
                      backgroundColor="var(--whaly-mint)"
                      color="var(--whaly-purple)"
                      border="2px solid var(--whaly-purple)"
                      borderRadius="30px"
                      minW="145px"
                      height="48px"
                      px="22px"
                      fontSize="15px"
                      fontWeight="800"
                      transition="
                        transform 0.2s ease,
                        background-color 0.2s ease,
                        color 0.2s ease
                      "
                      _hover={{
                        transform:
                          "translateX(4px)",
                        backgroundColor:
                          "var(--whaly-purple)",
                        color:
                          "var(--whaly-white)",
                        textDecoration:
                          "none",
                      }}
                    >

                      Ver más

                      <Text
                        as="span"
                        fontSize="19px"
                        lineHeight="1"
                      >
                        →
                      </Text>

                    </Box>

                  </Stack>

                </Card.Body>

              </Card.Root>

            )
          )}

        </SimpleGrid>


      </Container>

    </Box>

  );

}


export default SeccionServicios;