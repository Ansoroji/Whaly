import {
  Box,
  Card,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import TarjetaSeguroDisponible
  from "./TarjetaSeguroDisponible";


function ListaSegurosDisponibles({
  seguros,
  onAgregar,
}) {

  return (

    <Card.Root
      backgroundColor="var(--whaly-white)"
      border="2px solid var(--whaly-purple)"
      borderRadius="30px"
    >

      <Card.Body
        p={{
          base: "25px",
          md: "35px",
        }}
      >

        <Stack
          gap="25px"
        >


          {/* ENCABEZADO */}

          <Box>

            <Text
              color="var(--whaly-purple)"
              fontWeight="800"
              fontSize="13px"
              letterSpacing="2px"
            >
              PERSONALIZA TU PLAN
            </Text>


            <Heading
              color="var(--whaly-purple)"
              fontSize={{
                base: "25px",
                md: "31px",
              }}
            >
              Agrega otros seguros
            </Heading>

          </Box>


          {/* SEGUROS */}

          {seguros.length > 0 ? (

            <SimpleGrid
              columns={{
                base: 1,
                md: 2,
              }}
              gap="15px"
            >

              {seguros.map(
                (seguro) => (

                  <TarjetaSeguroDisponible
                    key={
                      seguro.codigo
                    }
                    seguro={
                      seguro
                    }
                    onAgregar={
                      onAgregar
                    }
                  />

                )
              )}

            </SimpleGrid>

          ) : (

            <Text
              color="var(--whaly-purple)"
            >
              Ya agregaste todos los
              seguros disponibles.
            </Text>

          )}

        </Stack>

      </Card.Body>

    </Card.Root>

  );

}


export default ListaSegurosDisponibles;