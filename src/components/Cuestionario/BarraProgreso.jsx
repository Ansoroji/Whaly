import {
  Box,
  Stack,
  Text,
} from "@chakra-ui/react";


function BarraProgreso({
  actual,
  total,
}) {

  const porcentaje =
    (actual / total) * 100;


  return (
    <Stack gap="8px">

      <Stack
        direction="row"
        justify="space-between"
        align="center"
      >

        <Text
          color="var(--whaly-purple)"
          fontWeight="700"
          fontSize="14px"
        >
          Pregunta {actual} de {total}
        </Text>


        <Text
          color="var(--whaly-purple)"
          fontWeight="700"
          fontSize="14px"
        >
          {Math.round(porcentaje)}%
        </Text>

      </Stack>


      <Box
        width="100%"
        height="8px"
        backgroundColor="#E5E1F3"
        borderRadius="20px"
        overflow="hidden"
      >

        <Box
          width={`${porcentaje}%`}
          height="100%"
          backgroundColor="var(--whaly-purple)"
          borderRadius="20px"
          transition="width 0.3s ease"
        />

      </Box>

    </Stack>
  );

}


export default BarraProgreso;