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
  FaHeart,
  FaHouse,
  FaUmbrella,
} from "react-icons/fa6";

import Footer from "../../components/Footer/Footer";


function SolucionesPersonas() {
  const razones = [
    {
      id: 1,
      icono: FaHeart,
      titulo: "Cuidas a quienes más quieres",
      descripcion:
        "Un seguro puede ayudarte a proteger a tu familia cuando ocurre algo que no estaba en los planes.",
    },
    {
      id: 2,
      icono: FaHouse,
      titulo: "Proteges lo que has construido",
      descripcion:
        "Tu hogar, tu vehículo y tu patrimonio representan años de esfuerzo. Tener respaldo te ayuda a cuidarlos.",
    },
    {
      id: 3,
      icono: FaUmbrella,
      titulo: "Vives con más tranquilidad",
      descripcion:
        "No podemos controlar todos los imprevistos, pero sí podemos estar mejor preparados para enfrentarlos.",
    },
  ];


  return (
    <>
      <Box
        as="main"
        backgroundColor="var(--whaly-light-blue)"
      >

        {/* =========================
            HERO
        ========================= */}
        <Box
          backgroundColor="var(--whaly-mint)"
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
              align="center"
              textAlign="center"
              gap="22px"
            >

              <Text
                color="var(--whaly-purple)"
                fontSize="14px"
                fontWeight="700"
                letterSpacing="5px"
              >
                SOLUCIONES PARA PERSONAS
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
                Estar protegido también es una forma de vivir tranquilo
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
                La vida está llena de planes, momentos increíbles y también
                uno que otro imprevisto. Tener un seguro no significa esperar
                que algo malo pase, sino saber que cuentas con respaldo si
                algún día lo necesitas.
              </Text>

            </Stack>

          </Container>
        </Box>


        {/* =========================
            INTRODUCCIÓN
        ========================= */}
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
              marginBottom={{
                base: "45px",
                md: "65px",
              }}
            >
              <Text
                color="var(--whaly-purple)"
                fontSize="14px"
                fontWeight="700"
                letterSpacing="4px"
              >
                ¿POR QUÉ TENER UN SEGURO?
              </Text>

              <Heading
                as="h2"
                maxW="850px"
                color="var(--whaly-purple)"
                fontSize={{
                  base: "34px",
                  md: "48px",
                }}
                lineHeight="1.1"
                fontWeight="800"
              >
                Porque hay cosas que vale la pena cuidar
              </Heading>

              <Text
                maxW="760px"
                color="var(--whaly-purple)"
                fontSize={{
                  base: "16px",
                  md: "18px",
                }}
                lineHeight="1.7"
              >
                No todos necesitamos la misma protección. Lo importante es
                encontrar opciones que realmente tengan sentido para tu vida,
                tus planes y las personas que te importan.
              </Text>
            </Stack>


            {/* =========================
                CARDS
            ========================= */}
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
                    transition="
                      transform 0.25s ease,
                      box-shadow 0.25s ease
                    "
                    _hover={{
                      transform: "translateY(-6px)",
                      boxShadow:
                        "0 14px 28px rgba(0, 0, 0, 0.12)",
                    }}
                  >
                    <Card.Body
                      padding={{
                        base: "28px",
                        md: "32px",
                      }}
                    >
                      <Stack
                        gap="20px"
                        align="flex-start"
                      >

                        <Box
                          width="58px"
                          height="58px"
                          borderRadius="50%"
                          backgroundColor="var(--whaly-purple)"
                          color="var(--whaly-white)"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <Icono size={24} />
                        </Box>


                        <Heading
                          as="h3"
                          color="var(--whaly-purple)"
                          fontSize="24px"
                          lineHeight="1.2"
                          fontWeight="800"
                        >
                          {razon.titulo}
                        </Heading>


                        <Text
                          color="var(--whaly-purple)"
                          fontSize="16px"
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


        {/* =========================
            MENSAJE CERCANO
        ========================= */}
        <Box
          py={{
            base: "30px",
            md: "50px",
          }}
          px={{
            base: "18px",
            md: "24px",
          }}
        >
          <Container maxW="1000px">

            <Box
              backgroundColor="var(--whaly-lavender)"
              borderRadius="24px"
              padding={{
                base: "35px 25px",
                md: "55px",
              }}
            >
              <Stack
                textAlign="center"
                align="center"
                gap="18px"
              >
                <Heading
                  as="h2"
                  color="var(--whaly-purple)"
                  fontSize={{
                    base: "30px",
                    md: "42px",
                  }}
                  lineHeight="1.1"
                  fontWeight="800"
                >
                  No se trata de tener todos los seguros
                </Heading>

                <Text
                  maxW="720px"
                  color="var(--whaly-purple)"
                  fontSize={{
                    base: "16px",
                    md: "18px",
                  }}
                  lineHeight="1.7"
                >
                  Se trata de entender cuáles pueden ayudarte de verdad.
                  Queremos que puedas conocer tus opciones sin palabras
                  complicadas y elegir con tranquilidad lo que funciona
                  mejor para ti.
                </Text>
              </Stack>
            </Box>

          </Container>
        </Box>


        {/* =========================
            CTA
        ========================= */}
        <Box
          py={{
            base: "80px",
            md: "110px",
          }}
          px={{
            base: "18px",
            md: "24px",
          }}
        >
          <Container maxW="900px">

            <Stack
              textAlign="center"
              align="center"
              gap="22px"
            >

              <Text
                color="var(--whaly-purple)"
                fontSize="14px"
                fontWeight="700"
                letterSpacing="4px"
              >
                ENCUENTRA TU PROTECCIÓN
              </Text>


              <Heading
                as="h2"
                color="var(--whaly-purple)"
                fontSize={{
                  base: "34px",
                  md: "48px",
                }}
                lineHeight="1.1"
                fontWeight="800"
              >
                Ahora sí, conoce las opciones que tenemos para ti
              </Heading>


              <Text
                maxW="700px"
                color="var(--whaly-purple)"
                fontSize={{
                  base: "16px",
                  md: "18px",
                }}
                lineHeight="1.7"
              >
                Vida, hogar, salud, viajes, mascotas y mucho más.
                Revisa las alternativas y descubre cuáles se adaptan
                mejor a lo que necesitas.
              </Text>


              <Box
                as={Link}
                to="/personas"
                marginTop="10px"
                backgroundColor="var(--whaly-purple)"
                color="var(--whaly-white)"
                padding="16px 30px"
                borderRadius="12px"
                fontSize="16px"
                fontWeight="700"
                display="inline-block"
                transition="
                  transform 0.2s ease,
                  background-color 0.2s ease
                "
                _hover={{
                  transform: "translateY(-3px)",
                  backgroundColor: "var(--whaly-mint)",
                  color: "var(--whaly-purple)",
                  textDecoration: "none",
                }}
              >
                Conoce nuestros seguros para personas →
              </Box>

            </Stack>

          </Container>
        </Box>

      </Box>

      <Footer />
    </>
  );
}


export default SolucionesPersonas;