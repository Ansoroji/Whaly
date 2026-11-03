import {
  Box,
  Card,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  Link,
} from "react-router-dom";


function TarjetaSeguro({
  titulo,
  descripcion,
  imagen,
}) {
  return (
    <Card.Root
      className="whaly-card"
      height="100%"
      overflow="hidden"
      backgroundColor="var(--whaly-white)"
      border="none"
    >

      {/*IMAGEN*/}
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
          decoding="async"
        />
      </Box>


      {/*CONTENIDO*/}
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
            as="h2"
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
            as={Link}
            to="/#contacto"
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