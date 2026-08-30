import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import TarjetaSeguro from "../../components/TarjetaSeguro/TarjetaSeguro";
import Footer from "../../components/Footer/Footer";

import { segurosEmpresas } from "../../datos/seguros";


function Empresas() {
  return (
    <>
      <Box
        as="main"
        minHeight="100vh"
        backgroundColor="var(--whaly-lavender)"
        py={{
          base: "50px",
          md: "80px",
        }}
        px={{
          base: "16px",
          md: "24px",
        }}
      >
        <Container maxW="1200px">

          {/* =========================
              VOLVER
          ========================= */}
          <Box
            marginBottom={{
              base: "40px",
              md: "55px",
            }}
          >
            <Box
              as={Link}
              to="/"
              color="var(--whaly-purple)"
              fontWeight="700"
              fontSize="16px"
              display="inline-block"
              transition="transform 0.2s ease"
              _hover={{
                transform: "translateX(-4px)",
                textDecoration: "none",
              }}
            >
              ← Volver al inicio
            </Box>
          </Box>


          {/* =========================
              ENCABEZADO
          ========================= */}
          <Stack
            align="center"
            textAlign="center"
            gap="18px"
            marginBottom={{
              base: "50px",
              md: "75px",
            }}
          >
            <Text
              color="var(--whaly-purple)"
              fontSize="14px"
              fontWeight="700"
              letterSpacing="5px"
            >
              SOLUCIONES PARA TU NEGOCIO
            </Text>

            <Heading
              as="h1"
              color="var(--whaly-purple)"
              fontSize={{
                base: "42px",
                md: "58px",
                lg: "68px",
              }}
              lineHeight="1"
              fontWeight="800"
            >
              Seguros para Empresas
            </Heading>

            <Text
              maxW="750px"
              color="var(--whaly-purple)"
              fontSize={{
                base: "17px",
                md: "20px",
              }}
              lineHeight="1.7"
            >
              Soluciones completas para proteger tu negocio y activos.
            </Text>
          </Stack>


          {/* =========================
              CARDS DE SEGUROS
          ========================= */}
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            gap="30px"
          >
            {segurosEmpresas.map((seguro) => (
              <TarjetaSeguro
                key={seguro.id}
                titulo={seguro.titulo}
                descripcion={seguro.descripcion}
                imagen={seguro.imagen}
              />
            ))}
          </SimpleGrid>


          {/* =========================
              CTA FINAL
          ========================= */}
          <Box
            marginTop={{
              base: "60px",
              md: "90px",
            }}
            backgroundColor="var(--whaly-mint)"
            borderRadius="22px"
            padding={{
              base: "35px 25px",
              md: "50px",
            }}
            textAlign="center"
          >
            <Stack
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
                fontWeight="800"
              >
                ¿Listo para proteger tu negocio?
              </Heading>

              <Text
                maxW="700px"
                color="var(--whaly-purple)"
                fontSize={{
                  base: "16px",
                  md: "18px",
                }}
                lineHeight="1.6"
              >
                Contáctanos hoy para una asesoría personalizada
                y descubre el plan perfecto para tu empresa.
              </Text>

              <Box
                as="a"
                href="/#contacto"
                marginTop="8px"
                backgroundColor="var(--whaly-purple)"
                color="var(--whaly-white)"
                padding="14px 26px"
                borderRadius="10px"
                fontWeight="700"
                display="inline-block"
                transition="
                  transform 0.2s ease,
                  background-color 0.2s ease
                "
                _hover={{
                  transform: "translateY(-3px)",
                  backgroundColor: "var(--whaly-white)",
                  color: "var(--whaly-purple)",
                  textDecoration: "none",
                }}
              >
                Escríbenos ahora
              </Box>
            </Stack>
          </Box>

        </Container>
      </Box>

      <Footer />
    </>
  );
}


export default Empresas;