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
      background="linear-gradient(180deg, rgba(185, 192, 234, 0.9) 0%, rgba(191, 234, 193, 0.4) 100%)"
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
          boxShadow="0 16px 0 var(--whaly-purple)"
          padding={{
            base: "30px 22px",
            md: "48px",
          }}
          position="relative"
          _before={{
            content: '""',
            position: "absolute",
            inset: "12px",
            border: "1px solid rgba(53, 30, 115, 0.12)",
            borderRadius: "24px",
            pointerEvents: "none",
          }}
        >

          {children}

        </Box>

      </Container>

    </Box>
  );

}


export default ContenedorCuestionario;