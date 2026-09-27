import {
  Badge,
  Box,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  FaCheck,
  FaXmark,
} from "react-icons/fa6";


function TarjetaSeguroPlan({
  seguro,
  editando,
  onEliminar,
}) {

  return (

    <Box
      border="2px solid var(--whaly-purple)"
      borderRadius="22px"
      padding={{
        base: "16px",
        md: "20px",
      }}
      backgroundColor="var(--whaly-white)"
    >

      <Stack
        direction="row"
        align="center"
        justify="space-between"
        gap="15px"
      >

        <Stack
          direction="row"
          align="center"
          gap="15px"
          flex="1"
        >

          {/* CHECK */}

          <Box
            width="42px"
            height="42px"
            minW="42px"
            borderRadius="50%"
            backgroundColor="var(--whaly-mint)"
            border="2px solid var(--whaly-purple)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="var(--whaly-purple)"
          >
            <FaCheck />
          </Box>


          {/* INFORMACIÓN */}

          <Box>

            <Stack
              direction={{
                base: "column",
                sm: "row",
              }}
              align={{
                base: "flex-start",
                sm: "center",
              }}
              gap="8px"
            >

              <Text
                color="var(--whaly-purple)"
                fontWeight="800"
                fontSize="17px"
              >
                {seguro.titulo}
              </Text>


              {seguro.puntos > 0 && (

                <Badge
                  backgroundColor="var(--whaly-mint)"
                  color="var(--whaly-purple)"
                  borderRadius="15px"
                  px="10px"
                >
                  Recomendado
                </Badge>

              )}

            </Stack>


            <Text
              color="var(--whaly-purple)"
              opacity="0.7"
              fontSize="14px"
              mt="4px"
            >
              {seguro.descripcion}
            </Text>

          </Box>

        </Stack>


        {/* ELIMINAR */}

        {editando && (

          <IconButton
            aria-label={
              `Eliminar ${seguro.titulo}`
            }
            onClick={() =>
              onEliminar(
                seguro.codigo
              )
            }
            borderRadius="50%"
            backgroundColor="transparent"
            color="var(--whaly-purple)"
            border="2px solid var(--whaly-purple)"
          >
            <FaXmark />
          </IconButton>

        )}

      </Stack>

    </Box>

  );

}


export default TarjetaSeguroPlan;