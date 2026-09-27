import {
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";


function EncabezadoPerfil({
  nombre,
  perfil,
}) {

  const primerNombre =
    nombre
      ?.trim()
      .split(" ")[0];


  return (

    <Stack
      textAlign="center"
      align="center"
      gap="10px"
    >

      <Text
        color="var(--whaly-purple)"
        fontWeight="800"
        letterSpacing="3px"
        fontSize="13px"
      >
        TU PERFIL WHALY
      </Text>


      <Heading
        color="var(--whaly-purple)"
        fontSize={{
          base: "34px",
          md: "48px",
        }}
        fontWeight="800"
      >

        {primerNombre
          ? `${primerNombre}, eres`
          : "Eres"}

      </Heading>


      <Heading
        color="var(--whaly-purple)"
        fontSize={{
          base: "28px",
          md: "38px",
        }}
        fontWeight="800"
      >
        {perfil}
      </Heading>


      <Text
        color="var(--whaly-purple)"
        maxW="650px"
        opacity="0.75"
        lineHeight="1.7"
      >
        Creamos una propuesta inicial
        basada en tus respuestas.
        Puedes modificarla antes de
        continuar.
      </Text>

    </Stack>

  );

}


export default EncabezadoPerfil;