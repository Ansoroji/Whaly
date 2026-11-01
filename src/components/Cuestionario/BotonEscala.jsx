import {
  Button,
} from "@chakra-ui/react";


function BotonEscala({
  valor,
  seleccionada,
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
      width={{
        base: "58px",
        md: "72px",
      }}
      height={{
        base: "58px",
        md: "72px",
      }}
      minW="0"
      padding="0"
      borderRadius="50%"
      border="3px solid var(--whaly-purple)"
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
      fontSize={{
        base: "20px",
        md: "24px",
      }}
      fontWeight="800"
      boxShadow={
        seleccionada
          ? "0 8px 0 rgba(53, 30, 115, 0.2)"
          : "0 6px 0 rgba(53, 30, 115, 0.12)"
      }
      transition="all 0.2s ease"
      _hover={{
        transform:
          "translateY(-3px)",
        boxShadow:
          "0 10px 0 rgba(53, 30, 115, 0.2)",
        backgroundColor:
          "var(--whaly-purple)",
        color:
          "var(--whaly-white)",
      }}
      _focusVisible={{
        outline: "none",
        boxShadow: "0 0 0 4px rgba(79, 111, 113, 0.25)",
      }}
    >
      {valor}
    </Button>
  );

}


export default BotonEscala;