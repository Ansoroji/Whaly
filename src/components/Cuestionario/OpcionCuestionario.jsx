import {
  Button,
} from "@chakra-ui/react";


function OpcionCuestionario({
  children,
  seleccionada,
  onClick,
}) {

  return (
    <Button
      onClick={onClick}
      width="100%"
      minHeight="60px"
      height="auto"
      whiteSpace="normal"
      padding="14px 22px"
      backgroundColor={
        seleccionada
          ? "var(--whaly-purple)"
          : "var(--whaly-mint)"
      }
      color={
        seleccionada
          ? "var(--whaly-white)"
          : "var(--whaly-purple)"
      }
      border="3px solid var(--whaly-purple)"
      borderRadius="30px"
      fontSize={{
        base: "15px",
        md: "17px",
      }}
      fontWeight="700"
      transition="all 0.2s ease"
      _hover={{
        transform:
          "translateY(-2px)",
        backgroundColor:
          "var(--whaly-purple)",
        color:
          "var(--whaly-white)",
      }}
    >
      {children}
    </Button>
  );

}


export default OpcionCuestionario;