import {
  Box,
  Card,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";


function TarjetaSeguro({
  titulo,
  descripcion,
  imagen,
}) {
  return (
    <Card.Root
      height="100%"
      overflow="hidden"
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
        boxShadow: "0 14px 28px rgba(0, 0, 0, 0.12)",
      }}
    >

      {/* =========================
          IMAGEN
      ========================= */}
      <Box
        height={{
          base: "220px",
          md: "250px",
        }}
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor="var(--whaly-white)"
        padding="20px"
        overflow="hidden"
      >
        <Image
          src={imagen}
          alt={`Ilustración de ${titulo}`}
          width="100%"
          height="100%"
          objectFit="contain"
          objectPosition="center"
          loading="lazy"
        />
      </Box>


      {/* =========================
          CONTENIDO
      ========================= */}
      <Card.Body
        padding={{
          base: "24px",
          md: "28px",
        }}
      >
        <Stack
          height="100%"
          gap="16px"
          align="flex-start"
        >

          <Heading
            as="h3"
            color="var(--whaly-purple)"
            fontSize={{
              base: "23px",
              md: "25px",
            }}
            lineHeight="1.2"
            fontWeight="800"
          >
            {titulo}
          </Heading>


          <Text
            color="var(--whaly-purple)"
            fontSize="16px"
            lineHeight="1.65"
          >
            {descripcion}
          </Text>


          <Box
            as="a"
            href="/#contacto"
            marginTop="auto"
            paddingTop="6px"
            color="var(--whaly-purple)"
            fontWeight="700"
            fontSize="15px"
            display="inline-block"
            transition="transform 0.2s ease"
            _hover={{
              transform: "translateX(5px)",
              textDecoration: "none",
            }}
          >
            Ver más →
          </Box>

        </Stack>
      </Card.Body>

    </Card.Root>
  );
}


export default TarjetaSeguro;