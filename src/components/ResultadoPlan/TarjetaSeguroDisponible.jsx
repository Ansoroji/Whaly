import {
  Box,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  FaPlus,
} from "react-icons/fa6";


function TarjetaSeguroDisponible({
  seguro,
  onAgregar,
}) {

  return (

    <Box
      border="2px solid var(--whaly-purple)"
      borderRadius="22px"
      p="18px"
    >

      <Stack
        direction="row"
        justify="space-between"
        align="center"
        gap="15px"
      >

        <Box>

          <Text
            color="var(--whaly-purple)"
            fontWeight="800"
          >
            {seguro.titulo}
          </Text>


          <Text
            color="var(--whaly-purple)"
            opacity="0.7"
            fontSize="13px"
            mt="4px"
          >
            {seguro.descripcion}
          </Text>

        </Box>


        <IconButton
            aria-label={`Agregar ${seguro.titulo}`}
            onClick={() =>
                onAgregar(seguro)
            }

            boxSize="56px"
            minW="56px"
            minH="56px"

            padding="0"

            borderRadius="50%"

            backgroundColor="var(--whaly-mint)"
            color="var(--whaly-purple)"

            border="2px solid var(--whaly-purple)"

            fontSize="24px"

            flexShrink="0"

            _hover={{
                backgroundColor:
                "var(--whaly-purple)",

                color:
                "var(--whaly-white)",
            }}
            >
        <FaPlus />
        </IconButton>

      </Stack>

    </Box>

  );

}


export default TarjetaSeguroDisponible;