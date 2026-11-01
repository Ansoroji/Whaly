import {
  Box,
  Button,
  Card,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  FaArrowUp,
} from "react-icons/fa6";

import TarjetaSeguroDisponible
  from "./TarjetaSeguroDisponible";


function ListaSegurosDisponibles({
  id,
  hidden,
  seguros,
  onAgregar,
  onVolverAlPlan,
}) {

  return (

    <Card.Root
      as="section"
      className="whaly-card"
      id={id}
      aria-labelledby="seguros-disponibles-titulo"
      hidden={hidden}
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
              as="h2"
              id="seguros-disponibles-titulo"
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

          <Button
            onClick={onVolverAlPlan}
            variant="ghost"
            color="var(--whaly-purple)"
            alignSelf="flex-start"
          >
            <FaArrowUp aria-hidden="true" />
            Volver a seguros recomendados
          </Button>

        </Stack>

      </Card.Body>

    </Card.Root>

  );

}


export default ListaSegurosDisponibles;