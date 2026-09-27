import {
  Box,
  Container,
} from "@chakra-ui/react";


function ContenedorCuestionario({
  children,
  maxW = "900px",
}) {

  return (
    <Box
      as="main"
      minHeight="100vh"
      backgroundColor="var(--whaly-lavender)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      py={{
        base: "45px",
        md: "75px",
      }}
      px={{
        base: "18px",
        md: "24px",
      }}
    >

      <Container maxW={maxW}>

        <Box
          width="100%"
          backgroundColor="var(--whaly-white)"
          border="2px solid var(--whaly-purple)"
          borderRadius={{
            base: "24px",
            md: "34px",
          }}
          boxShadow="0 14px 0 var(--whaly-purple)"
          padding={{
            base: "30px 22px",
            md: "48px",
          }}
        >

          {children}

        </Box>

      </Container>

    </Box>
  );

}


export default ContenedorCuestionario;