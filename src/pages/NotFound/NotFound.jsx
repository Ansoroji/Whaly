import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  Link,
} from "react-router-dom";


function NotFound() {
  return (

    <Box
      as="main"
      minHeight="100vh"

      backgroundColor="var(--whaly-lavender)"

      display="flex"
      alignItems="center"
      justifyContent="center"

      px="20px"
      py="60px"
    >

      <Container
        maxW="700px"
      >

        <Stack
          align="center"
          textAlign="center"
          gap="22px"
        >

          <Text
            color="var(--whaly-purple)"
            fontSize={{
              base: "80px",
              md: "120px",
            }}
            fontWeight="900"
            lineHeight="1"
          >
            404
          </Text>


          <Heading
            as="h1"
            color="var(--whaly-purple)"
            fontSize={{
              base: "30px",
              md: "42px",
            }}
            fontWeight="800"
          >
            Ups! Parece que te perdiste
          </Heading>


          <Text
            color="var(--whaly-purple)"
            opacity="0.75"

            maxW="520px"

            fontSize={{
              base: "16px",
              md: "18px",
            }}

            lineHeight="1.7"
          >
            La página que estás buscando
            no existe o pudo haber cambiado
            de ubicación, no te preocupes, 
            puedes volver al inicio y 
            seguir explorando.
          </Text>


          <Button
            className="whaly-button-raised"
            asChild
            backgroundColor="var(--whaly-mint)"

            color="var(--whaly-purple)"

            border="2px solid var(--whaly-purple)"

            borderRadius="30px"

            minW="210px"

            height="56px"

            px="30px"

            fontWeight="800"

            transition="all 0.2s ease"

            _hover={{
              backgroundColor:
                "var(--whaly-purple)",

              color:
                "var(--whaly-white)",

              transform:
                "translateY(-2px)",
            }}
          >
            <Link to="/">
              ← Volver al inicio
            </Link>
          </Button>

        </Stack>

      </Container>

    </Box>

  );

}


export default NotFound;