import {
  Box,
  Button,
  Card,
  Heading,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  FaPlus,
} from "react-icons/fa6";


function PanelPersonalizar({
  mostrarSeguros,
  onAlternarSeguros,
  onCrearNuevoPaquete,
}) {

  return (

    <Card.Root
      backgroundColor="var(--whaly-purple)"
      color="var(--whaly-white)"
      borderRadius="30px"
      overflow="hidden"
    >

      <Card.Body
        p="30px"
      >

        <Stack
          height="100%"
          align="center"
          justify="center"
          textAlign="center"
          gap="20px"
        >


          {/* ICONO */}

          <Box
            width="75px"
            height="75px"
            borderRadius="50%"
            backgroundColor="var(--whaly-mint)"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >

            <IconButton
              aria-label="Agregar seguros"
              onClick={
                onAlternarSeguros
              }
              variant="ghost"
              color="var(--whaly-purple)"
              fontSize="25px"
              borderRadius="50%"
            >
              <FaPlus />
            </IconButton>

          </Box>


          <Heading
            fontSize="25px"
          >
            Personaliza tu plan
          </Heading>


          <Text
            opacity="0.85"
            lineHeight="1.6"
          >
            Agrega otros seguros que
            consideres importantes para ti.
          </Text>


          <Button
            onClick={
              onAlternarSeguros
            }
            backgroundColor="var(--whaly-mint)"
            color="var(--whaly-purple)"
            borderRadius="25px"
            width="100%"
            fontWeight="800"
          >

            <FaPlus />

            {mostrarSeguros
              ? "Ocultar seguros"
              : "Agregar seguro"}

          </Button>


          <Button
            onClick={
              onCrearNuevoPaquete
            }
            variant="outline"
            borderColor="var(--whaly-white)"
            color="var(--whaly-white)"
            borderRadius="25px"
            width="100%"
          >
            Crear paquete desde cero
          </Button>

        </Stack>

      </Card.Body>

    </Card.Root>

  );

}


export default PanelPersonalizar;