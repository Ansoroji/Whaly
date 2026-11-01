import {
  Button,
} from "@chakra-ui/react";


function OpcionCuestionario({
  children,
  seleccionada,
  deshabilitada = false,
  onClick,
}) {

  return (
    <Button
      className={
        seleccionada
          ? undefined
          : "whaly-button-raised"
      }
      onClick={onClick}
      disabled={deshabilitada}
      width="100%"
      minHeight="62px"
      height="auto"
      whiteSpace="normal"
      padding="16px 22px"
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
      borderRadius="26px"
      fontSize={{
        base: "15px",
        md: "17px",
      }}
      fontWeight="700"
      textAlign="left"
      justifyContent="flex-start"
      boxShadow={
        seleccionada
          ? "0 10px 0 rgba(53, 30, 115, 0.12)"
          : "0 8px 0 rgba(53, 30, 115, 0.08)"
      }
      transition="all 0.2s ease"
      opacity={deshabilitada ? 0.45 : 1}
      cursor={deshabilitada ? "not-allowed" : "pointer"}
      _hover={{
        transform: deshabilitada
          ? "none"
          : "translateY(-2px)",
        backgroundColor: deshabilitada
          ? "var(--whaly-mint)"
          : "var(--whaly-purple)",
        color: deshabilitada
          ? "var(--whaly-purple)"
          : "var(--whaly-white)",
        boxShadow: deshabilitada
          ? "0 8px 0 rgba(53, 30, 115, 0.08)"
          : "0 10px 0 rgba(53, 30, 115, 0.12)",
      }}
      _focusVisible={{
        outline: "none",
        boxShadow: "0 0 0 4px rgba(79, 111, 113, 0.2)",
      }}
    >
      {children}
    </Button>
  );

}


export default OpcionCuestionario;