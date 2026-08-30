import {
  Box,
  Card,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import {
  FaBuilding,
  FaPeopleGroup,
  FaShieldHalved,
} from "react-icons/fa6";

import Footer from "../../components/Footer/Footer";


function SolucionesEmpresas() {
  const razones = [
    {
      id: 1,
      icono: FaBuilding,
      titulo: "Proteges lo que has construido",
      descripcion:
        "Tu empresa representa tiempo, inversión y mucho esfuerzo. Una buena protección ayuda a cuidar todo ese trabajo.",
    },
    {
      id: 2,
      icono: FaPeopleGroup,
      titulo: "Cuidas a tu equipo",
      descripcion:
        "Las personas hacen posible tu negocio. Contar con soluciones de protección también puede ayudarte a cuidar a quienes trabajan contigo.",
    },
    {
      id: 3,
      icono: FaShieldHalved,
      titulo: "Estás mejor preparado",
      descripcion:
        "Un imprevisto no tiene por qué detener tu operación. Tener respaldo puede ayudarte a responder mejor cuando algo cambia.",
    },
  ];


  return (
    <>
      <Box
        as="main"
        backgroundColor="var(--whaly-light-blue)"
      >

        {/* HERO */}
        <Box
          backgroundColor="var(--whaly-lavender)"
          py={{
            base: "70px",
            md: "110px",
          }}
          px={{
            base: "18px",
            md: "24px",
          }}
        >
          <Container maxW="1100px">

            <Stack
              textAlign="center"
              align="center"
              gap="22px"
            >
              <Text
                color="var(--whaly-purple)"
                fontSize="14px"
                fontWeight="700"
                letterSpacing="5px"
              >
                SOLUCIONES PARA EMPRESAS
              </Text>

              <Heading
                as="h1"
                maxW="900px"
                color="var(--whaly-purple)"
                fontSize={{
                  base: "42px",
                  md: "60px",
                  lg: "70px",
                }}
                lineHeight="1"
                fontWeight="800"
              >
                Tu negocio también merece estar tranquilo
              </Heading>

              <Text
                maxW="760px"
                color="var(--whaly-purple)"
                fontSize={{
                  base: "17px",
                  md: "20px",
                }}
                lineHeight="1.7"
              >
                Construir una empresa requiere esfuerzo todos los días.
                Tener una buena protección te ayuda a cuidar tu equipo,
                tus activos y la continuidad de tu negocio.
              </Text>
            </Stack>

          </Container>
        </Box>


        {/* RAZONES */}
        <Box
          py={{
            base: "70px",
            md: "100px",
          }}
          px={{
            base: "18px",
            md: "24px",
          }}
        >
          <Container maxW="1200px">

            <Stack
              textAlign="center"
              align="center"
              gap="18px"
              marginBottom="60px"
            >
              <Text
                color="var(--whaly-purple)"
                fontSize="14px"
                fontWeight="700"
                letterSpacing="4px"
              >
                PROTEGER TU EMPRESA
              </Text>

              <Heading
                color="var(--whaly-purple)"
                fontSize={{
                  base: "34px",
                  md: "48px",
                }}
                fontWeight="800"
              >
                Te permite concentrarte en hacerla crecer
              </Heading>
            </Stack>


            <SimpleGrid
              columns={{
                base: 1,
                md: 3,
              }}
              gap="28px"
            >
              {razones.map((razon) => {
                const Icono = razon.icono;

                return (
                  <Card.Root
                    key={razon.id}
                    backgroundColor="var(--whaly-white)"
                    border="none"
                    borderRadius="20px"
                    boxShadow="0 6px 18px rgba(0, 0, 0, 0.08)"
                  >
                    <Card.Body padding="32px">
                      <Stack gap="20px">

                        <Box
                          width="58px"
                          height="58px"
                          borderRadius="50%"
                          backgroundColor="var(--whaly-teal)"
                          color="var(--whaly-white)"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icono size={24} />
                        </Box>

                        <Heading
                          color="var(--whaly-purple)"
                          fontSize="24px"
                          fontWeight="800"
                        >
                          {razon.titulo}
                        </Heading>

                        <Text
                          color="var(--whaly-purple)"
                          lineHeight="1.7"
                        >
                          {razon.descripcion}
                        </Text>

                      </Stack>
                    </Card.Body>
                  </Card.Root>
                );
              })}
            </SimpleGrid>

          </Container>
        </Box>


        {/* CTA */}
        <Box
          py={{
            base: "80px",
            md: "110px",
          }}
          px="20px"
        >
          <Container maxW="900px">

            <Stack
              align="center"
              textAlign="center"
              gap="22px"
            >
              <Heading
                color="var(--whaly-purple)"
                fontSize={{
                  base: "34px",
                  md: "48px",
                }}
                fontWeight="800"
              >
                Conoce las soluciones para proteger tu empresa
              </Heading>

              <Text
                maxW="700px"
                color="var(--whaly-purple)"
                fontSize="18px"
                lineHeight="1.7"
              >
                Tenemos alternativas para diferentes tipos de riesgos,
                operaciones y necesidades empresariales.
              </Text>

              <Box
                as={Link}
                to="/empresas"
                marginTop="10px"
                backgroundColor="var(--whaly-purple)"
                color="var(--whaly-white)"
                padding="16px 30px"
                borderRadius="12px"
                fontWeight="700"
                transition="transform 0.2s ease"
                _hover={{
                  transform: "translateY(-3px)",
                  textDecoration: "none",
                }}
              >
                Conoce nuestros seguros para empresas →
              </Box>

            </Stack>

          </Container>
        </Box>

      </Box>

      <Footer />
    </>
  );
}


export default SolucionesEmpresas;