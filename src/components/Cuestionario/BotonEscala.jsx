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
      onClick={onClick}
      width={{
        base: "56px",
        md: "70px",
      }}
      height={{
        base: "56px",
        md: "70px",
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
      fontSize="21px"
      fontWeight="800"
      transition="all 0.2s ease"
      _hover={{
        transform:
          "translateY(-3px)",
        backgroundColor:
          "var(--whaly-purple)",
        color:
          "var(--whaly-white)",
      }}
    >
      {valor}
    </Button>
  );

}


export default BotonEscala;