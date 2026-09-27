import {
  Badge,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";


function AccionesPlan({
  planVacio,
  guardando,
  onVolver,
  onContinuar,
}) {

  const puedeContinuar =
    !planVacio &&
    !guardando;


  return (

    <Stack
      gap="25px"
    >


      {/* INFORMACIÓN */}

      <Stack
        align="center"
        textAlign="center"
        gap="8px"
      >

        <Badge
          backgroundColor="var(--whaly-purple)"
          color="var(--whaly-white)"
          borderRadius="20px"
          px="15px"
          py="6px"
        >
          Plan personalizado
        </Badge>


        <Text
          color="var(--whaly-purple)"
          opacity="0.7"
          maxW="700px"
          fontSize="14px"
        >
          Este plan se construyó a partir
          de tus respuestas y puedes
          personalizarlo antes de continuar.
        </Text>

      </Stack>


      {/* BOTONES */}

      <Stack
        direction={{
          base: "column",
          sm: "row",
        }}
        justify="space-between"
        gap="15px"
      >

        <Button
          onClick={
            onVolver
          }
          backgroundColor="transparent"
          color="var(--whaly-purple)"
          border="2px solid var(--whaly-purple)"
          borderRadius="30px"
          height="56px"
          px="30px"
          fontWeight="700"
        >
          ← Revisar respuestas
        </Button>


        <Button
          onClick={
            onContinuar
          }
          disabled={
            !puedeContinuar
          }
          backgroundColor="var(--whaly-purple)"
          color="var(--whaly-white)"
          border="2px solid var(--whaly-purple)"
          borderRadius="30px"
          height="56px"
          px="35px"
          fontWeight="800"
          opacity={
            planVacio
              ? 0.5
              : 1
          }
          cursor={
            puedeContinuar
              ? "pointer"
              : "not-allowed"
          }
          _hover={
            puedeContinuar
              ? {
                  backgroundColor:
                    "var(--whaly-white)",
                  color:
                    "var(--whaly-purple)",
                }
              : {}
          }
        >

          {guardando
            ? "Creando perfil..."
            : "Continuar con mi plan →"}

        </Button>

      </Stack>

    </Stack>

  );

}


export default AccionesPlan;