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

import { Link } from "react-router-dom";


function SeccionServicios() {
  const servicios = [
    {
      id: 1,
      titulo: "Seguros para Personas",
      descripcion:
        "Protección integral para ti y tu familia con coberturas personalizadas",
      imagen: "/images/personas-card.webp",
      ruta: "/personas",
    },

    {
      id: 2,
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
      <Container maxW="1200px">

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
            Soluciones que protegen tu vida y tu patrimonio
          </Heading>

          <Text
            color="var(--whaly-purple)"
            fontSize={{
              base: "16px",
              md: "18px",
            }}
            lineHeight="1.6"
            maxW="720px"
          >
            Te recomendamos lo que deberías tener de acuerdo
            a tus necesidades y presupuesto
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
            base: "30px",
            md: "40px",
          }}
        >
          {servicios.map((servicio) => (
            <Card.Root
              key={servicio.id}
              overflow="hidden"
              backgroundColor="var(--whaly-white)"
              border="none"
              borderRadius="18px"
              boxShadow="0 8px 18px rgba(0, 0, 0, 0.12)"
              transition="
                transform 0.25s ease,
                box-shadow 0.25s ease
              "
              _hover={{
                transform: "translateY(-6px)",
                boxShadow:
                  "0 14px 28px rgba(0, 0, 0, 0.14)",
              }}
            >

              {/* IMAGEN */}
              <Box
                height={{
                  base: "240px",
                  md: "300px",
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                padding="24px"
                backgroundColor="var(--whaly-white)"
              >
                <Image
                  src={servicio.imagen}
                  alt={servicio.titulo}
                  width="100%"
                  height="100%"
                  objectFit="contain"
                />
              </Box>


              {/* CONTENIDO */}
              <Card.Body
                padding={{
                  base: "24px",
                  md: "30px",
                }}
              >
                <Stack
                  gap="16px"
                  align="flex-start"
                >
                  <Heading
                    as="h3"
                    color="var(--whaly-purple)"
                    fontSize={{
                      base: "25px",
                      md: "29px",
                    }}
                    fontWeight="800"
                  >
                    {servicio.titulo}
                  </Heading>

                  <Text
                    color="var(--whaly-purple)"
                    fontSize={{
                      base: "16px",
                      md: "17px",
                    }}
                    lineHeight="1.6"
                  >
                    {servicio.descripcion}
                  </Text>

                  <Box
                    as={Link}
                    to={servicio.ruta}
                    color="var(--whaly-purple)"
                    fontSize="16px"
                    fontWeight="700"
                    display="inline-block"
                    transition="transform 0.2s ease"
                    _hover={{
                      transform: "translateX(4px)",
                      textDecoration: "none",
                    }}
                  >
                    Ver más →
                  </Box>
                </Stack>
              </Card.Body>

            </Card.Root>
          ))}
        </SimpleGrid>

      </Container>
    </Box>
  );
}


export default SeccionServicios;