import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  Link,
} from "react-router-dom";

function Footer() {
  return (
    <Box
      as="footer"
      backgroundColor="var(--whaly-purple)"
      color="var(--whaly-white)"
    >
      {/*FRANJA SUPERIOR */}
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
        {/*COLUMNAS*/}
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
          {/*MARCA*/}
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

          {/*ENLACES RÁPIDOS*/}
          <Box
            as="nav"
            aria-label="Enlaces rápidos"
          >
            <Stack
              gap="14px"
              align={{
                base: "center",
                md: "flex-start",
              }}
            >
              <Text
                as="h2"
                color="var(--whaly-white)"
                fontSize="15px"
                fontWeight="700"
                marginBottom="4px"
              >
                Enlaces rápidos
              </Text>

              {[
                { label: "Inicio", to: "/" },
                { label: "Servicios", to: "/#servicios" },
                { label: "Contacto", to: "/#contacto" },
              ].map((link) => (
                <Box
                  key={link.label}
                  as={Link}
                  to={link.to}
                  color="var(--whaly-lavender)"
                  fontSize="14px"
                  transition="color 0.2s ease"
                  _hover={{
                    color: "var(--whaly-mint)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </Box>
              ))}
            </Stack>
          </Box>

          {/*LEGAL*/}
          <Box
            as="section"
            aria-labelledby="footer-legal"
          >
            <Stack
              gap="14px"
              align={{
                base: "center",
                md: "flex-start",
              }}
            >
              <Text
                as="h2"
                id="footer-legal"
                color="var(--whaly-white)"
                fontSize="15px"
                fontWeight="700"
                marginBottom="4px"
              >
                Legal
              </Text>

              <Text
                color="var(--whaly-lavender)"
                fontSize="14px"
              >
                Términos y condiciones
              </Text>

              <Text
                color="var(--whaly-lavender)"
                fontSize="14px"
              >
                Política de privacidad
              </Text>

              <Text
                color="var(--whaly-lavender)"
                fontSize="14px"
              >
                Política de cookies
              </Text>
            </Stack>
          </Box>
        </SimpleGrid>

        {/*PARTE INFERIOR*/}
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