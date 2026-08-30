import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

function Footer() {
  return (
    <Box
      as="footer"
      backgroundColor="var(--whaly-purple)"
      color="var(--whaly-white)"
    >
      {/* =========================
          FRANJA SUPERIOR
      ========================= */}
      <Box
        height="16px"
        backgroundColor="var(--whaly-lavender)"
      />

      <Container
        maxW="1200px"
        py={{
          base: "55px",
          md: "70px",
        }}
        px={{
          base: "20px",
          md: "24px",
        }}
      >
        {/* =========================
            COLUMNAS
        ========================= */}
        <SimpleGrid
          columns={{
            base: 1,
            md: 3,
          }}
          gap={{
            base: "45px",
            md: "80px",
          }}
        >
          {/* MARCA */}
          <Stack
            gap="18px"
            align={{
              base: "center",
              md: "flex-start",
            }}
            textAlign={{
              base: "center",
              md: "left",
            }}
          >
            <Text
              color="var(--whaly-mint)"
              fontSize="32px"
              fontWeight="800"
              lineHeight="1"
            >
              whaly
            </Text>

            <Text
              color="var(--whaly-lavender)"
              fontSize="14px"
            >
              +30 años protegiendo tu tranquilidad
            </Text>
          </Stack>

          {/* ENLACES RÁPIDOS */}
          <Stack
            gap="14px"
            align={{
              base: "center",
              md: "flex-start",
            }}
          >
            <Text
              color="var(--whaly-white)"
              fontSize="15px"
              fontWeight="700"
              marginBottom="4px"
            >
              Enlaces rápidos
            </Text>

            <Box
              as="a"
              href="#inicio"
              color="var(--whaly-lavender)"
              fontSize="14px"
              transition="color 0.2s ease"
              _hover={{
                color: "var(--whaly-mint)",
              }}
            >
              Inicio
            </Box>

            <Box
              as="a"
              href="#servicios"
              color="var(--whaly-lavender)"
              fontSize="14px"
              transition="color 0.2s ease"
              _hover={{
                color: "var(--whaly-mint)",
              }}
            >
              Servicios
            </Box>

            <Box
              as="a"
              href="#contacto"
              color="var(--whaly-lavender)"
              fontSize="14px"
              transition="color 0.2s ease"
              _hover={{
                color: "var(--whaly-mint)",
              }}
            >
              Contacto
            </Box>
          </Stack>

          {/* LEGAL */}
          <Stack
            gap="14px"
            align={{
              base: "center",
              md: "flex-start",
            }}
          >
            <Text
              color="var(--whaly-white)"
              fontSize="15px"
              fontWeight="700"
              marginBottom="4px"
            >
              Legal
            </Text>

            <Box
              as="a"
              href="#"
              color="var(--whaly-lavender)"
              fontSize="14px"
              transition="color 0.2s ease"
              _hover={{
                color: "var(--whaly-mint)",
              }}
            >
              Términos y condiciones
            </Box>

            <Box
              as="a"
              href="#"
              color="var(--whaly-lavender)"
              fontSize="14px"
              transition="color 0.2s ease"
              _hover={{
                color: "var(--whaly-mint)",
              }}
            >
              Política de privacidad
            </Box>

            <Box
              as="a"
              href="#"
              color="var(--whaly-lavender)"
              fontSize="14px"
              transition="color 0.2s ease"
              _hover={{
                color: "var(--whaly-mint)",
              }}
            >
              Política de cookies
            </Box>
          </Stack>
        </SimpleGrid>

        {/* =========================
            PARTE INFERIOR
        ========================= */}
        <Box
          marginTop={{
            base: "55px",
            md: "70px",
          }}
          paddingTop="24px"
          borderTop="1px solid rgba(255,255,255,0.15)"
        >
          <Text
            textAlign="center"
            color="var(--whaly-lavender)"
            fontSize={{
              base: "12px",
              md: "13px",
            }}
          >
            © 2026 Whaly Seguros. Todos los derechos reservados. |{" "}
            <Box
              as="span"
              color="var(--whaly-mint)"
              fontWeight="700"
            >
              Diferentes de verdad
            </Box>
          </Text>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;