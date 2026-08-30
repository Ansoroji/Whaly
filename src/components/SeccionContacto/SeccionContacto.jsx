import {
  Box,
  Card,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaInstagram,
} from "react-icons/fa";

function SeccionContacto() {
  const contactos = [
    {
      id: 1,
      titulo: "TELÉFONO",
      valor: "3163206697",
      enlace: "tel:+573163206697",
      icono: FaPhone,
      color: "var(--whaly-purple)",
    },
    {
      id: 2,
      titulo: "WHATSAPP",
      valor: "Chat directo",
      enlace: "https://wa.me/573163206697",
      icono: FaWhatsapp,
      color: "var(--whaly-teal)",
    },
    {
      id: 3,
      titulo: "CORREO",
      valor: "comercial@whalyseguros.com",
      enlace: "mailto:comercial@whalyseguros.com",
      icono: FaEnvelope,
      color: "var(--whaly-purple)",
    },
    {
      id: 4,
      titulo: "INSTAGRAM",
      valor: "@whaly.seguros",
      enlace: "https://www.instagram.com/whaly.seguros/",
      icono: FaInstagram,
      color: "var(--whaly-teal)",
    },
  ];

  return (
    <Box
      as="section"
      id="contacto"
      backgroundColor="var(--whaly-lavender)"
      py={{ base: "70px", md: "100px" }}
      px={{ base: "16px", md: "24px" }}
    >
      <Container maxW="1200px">

        {/* =========================
            ENCABEZADO
        ========================= */}
        <Stack
          gap="16px"
          align="center"
          textAlign="center"
          marginBottom={{ base: "45px", md: "65px" }}
        >
          <Text
            color="var(--whaly-purple)"
            fontSize="14px"
            fontWeight="700"
            letterSpacing="5px"
          >
            CONTACTO
          </Text>

          <Heading
            as="h2"
            color="var(--whaly-purple)"
            fontSize={{
              base: "38px",
              md: "52px",
              lg: "60px",
            }}
            lineHeight="1"
            fontWeight="800"
            maxW="700px"
          >
            Estas a nada de saber
            <br />
            que es vivir tranquilo
          </Heading>

          <Text
            color="var(--whaly-purple)"
            fontSize={{
              base: "16px",
              md: "18px",
            }}
            lineHeight="1.7"
            maxW="700px"
          >
            Escríbenos por donde te parezca más fácil y susi te va a ayudar
            con todo lo que necesites
          </Text>
        </Stack>

        {/* =========================
            CARDS DE CONTACTO
        ========================= */}
        <SimpleGrid
          columns={{
            base: 1,
            sm: 2,
            lg: 4,
          }}
          gap="24px"
        >
          {contactos.map((contacto) => {
            const Icono = contacto.icono;

            return (
              <Box
                key={contacto.id}
                as="a"
                href={contacto.enlace}
                target={
                  contacto.titulo === "WHATSAPP" ||
                  contacto.titulo === "INSTAGRAM"
                    ? "_blank"
                    : undefined
                }
                rel={
                  contacto.titulo === "WHATSAPP" ||
                  contacto.titulo === "INSTAGRAM"
                    ? "noopener noreferrer"
                    : undefined
                }
                textDecoration="none"
              >
                <Card.Root
                  height="100%"
                  minHeight="240px"
                  backgroundColor="var(--whaly-white)"
                  border="none"
                  borderRadius="16px"
                  boxShadow="0 3px 10px rgba(0, 0, 0, 0.08)"
                  transition="transform 0.25s ease, box-shadow 0.25s ease"
                  cursor="pointer"
                  _hover={{
                    transform: "translateY(-6px)",
                    boxShadow: "0 10px 22px rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <Card.Body
                    padding={{
                      base: "26px",
                      md: "30px",
                    }}
                  >
                    <Stack
                      height="100%"
                      align="flex-start"
                      gap="16px"
                    >

                      {/* CÍRCULO DEL ICONO */}
                      <Box
                        width="54px"
                        height="54px"
                        borderRadius="50%"
                        backgroundColor={contacto.color}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="var(--whaly-white)"
                        flexShrink="0"
                      >
                        <Icono size={23} />
                      </Box>

                      {/* TIPO DE CONTACTO */}
                      <Text
                        color="var(--whaly-purple)"
                        fontSize="13px"
                        fontWeight="600"
                        letterSpacing="0.5px"
                      >
                        {contacto.titulo}
                      </Text>

                      {/* DATO */}
                      <Text
                        color="var(--whaly-purple)"
                        fontSize="17px"
                        fontWeight="600"
                        lineHeight="1.4"
                        overflowWrap="anywhere"
                      >
                        {contacto.valor}
                      </Text>

                      {/* LÍNEA DECORATIVA */}
                      <Box
                        marginTop="auto"
                        width="62px"
                        height="4px"
                        borderRadius="10px"
                        backgroundColor={contacto.color}
                      />
                    </Stack>
                  </Card.Body>
                </Card.Root>
              </Box>
            );
          })}
        </SimpleGrid>

        {/* =========================
            CARD INFERIOR
        ========================= */}
        <Card.Root
          marginTop="40px"
          backgroundColor="var(--whaly-white)"
          border="none"
          borderRadius="16px"
          boxShadow="0 3px 10px rgba(0, 0, 0, 0.08)"
        >
          <Card.Body
            padding={{
              base: "30px 24px",
              md: "38px",
            }}
          >
            <Stack
              align="center"
              textAlign="center"
              gap="10px"
            >
              <Text
                color="var(--whaly-purple)"
                fontSize={{
                  base: "17px",
                  md: "18px",
                }}
                fontWeight="700"
              >
                Te respondemos lo más rápido posible
              </Text>

              <Text
                color="var(--whaly-purple)"
                fontSize={{
                  base: "15px",
                  md: "17px",
                }}
              >
                Estamos para ti en horario comercial y emergencias las 24 horas
              </Text>
            </Stack>
          </Card.Body>
        </Card.Root>

      </Container>
    </Box>
  );
}

export default SeccionContacto;