import {
  Box,
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

    <Box
      role="group"

      position="relative"

      backgroundColor="var(--whaly-white)"

      borderRadius="22px"

      overflow="hidden"

      width="100%"

      height="100%"

      border="none"

      boxShadow="
        0 5px 0
        rgba(53, 30, 115, 0.14)
      "

      transition="
        transform 0.25s ease,
        box-shadow 0.25s ease
      "

      _hover={{
        transform: "translateY(-4px)",

        boxShadow:
          "0 8px 18px rgba(53, 30, 115, 0.14)",
      }}
    >


      {/* =========================
          DETALLE SUPERIOR
      ========================= */}

      <Box
        position="absolute"

        top="0"

        left="0"

        width="100%"

        height="5px"

        backgroundColor="var(--whaly-mint)"

        zIndex="2"
      />


      {/* =========================
          IMAGEN
      ========================= */}

      {imagen && (

        <Box
          width="100%"

          height={{
            base: "210px",
            md: "230px",
          }}

          display="flex"

          alignItems="center"

          justifyContent="center"

          overflow="hidden"

          padding={{
            base: "20px",
            md: "22px",
          }}

          backgroundColor="var(--whaly-white)"
        >

          <Image
            src={imagen}

            alt={`Ilustración de ${titulo}`}

            width="100%"

            height="100%"

            objectFit="contain"

            transition="
              transform 0.3s ease
            "

            _groupHover={{
              transform: "scale(1.025)",
            }}
          />

        </Box>

      )}


      {/* =========================
          INFORMACIÓN
      ========================= */}

      <Stack
        gap="13px"

        padding={{
          base: "22px",
          md: "26px",
        }}

        paddingTop={{
          base: "20px",
          md: "22px",
        }}
      >


        {/* DETALLE MINT */}

        <Box
          width="34px"

          height="4px"

          backgroundColor="var(--whaly-mint)"

          borderRadius="20px"
        />


        {/* TÍTULO */}

        <Heading
          as="h3"

          color="var(--whaly-purple)"

          fontSize={{
            base: "22px",
            md: "25px",
          }}

          lineHeight="1.2"

          fontWeight="800"
        >
          {titulo}
        </Heading>


        {/* DESCRIPCIÓN */}

        <Text
          color="var(--whaly-purple)"

          fontSize={{
            base: "15px",
            md: "16px",
          }}

          lineHeight="1.65"

          opacity="0.78"
        >
          {descripcion}
        </Text>


      </Stack>

    </Box>

  );

}


export default TarjetaSeguro;