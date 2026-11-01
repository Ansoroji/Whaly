import {
  Box,
  Button,
  Card,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

import {
  FaChevronDown,
  FaChevronUp,
  FaPen,
  FaRotateLeft,
} from "react-icons/fa6";

import TarjetaSeguroPlan
  from "./TarjetaSeguroPlan";


function PlanRecomendado({
  plan,
  editando,
  onAlternarEdicion,
  onEliminar,
  onRestaurar,
  mostrarSeguros,
  onAlternarSeguros,
  onCrearNuevoPaquete,
}) {

  return (

    <Card.Root
      as="section"
      className="whaly-card"
      id="plan-recomendado"
      scrollMarginTop="24px"
      width="100%"
      backgroundColor="var(--whaly-white)"
      border="2px solid var(--whaly-purple)"
      borderRadius="30px"
      overflow="hidden"
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

          <Stack
            direction={{
              base: "column",
              md: "row",
            }}
            justify="space-between"
            align={{
              base: "flex-start",
              md: "center",
            }}
            gap="15px"
          >

            <Box>

              <Text
                color="var(--whaly-purple)"
                fontSize="13px"
                fontWeight="800"
                letterSpacing="2px"
              >
                TU PLAN
              </Text>


              <Heading
                as="h2"
                color="var(--whaly-purple)"
                fontSize={{
                  base: "26px",
                  md: "32px",
                }}
              >
                Seguros recomendados
              </Heading>

            </Box>


            <Stack
              direction="row"
              wrap="wrap"
              gap="10px"
            >
              <Button
                onClick={onAlternarEdicion}
                backgroundColor={
                  editando
                    ? "var(--whaly-purple)"
                    : "transparent"
                }
                color={
                  editando
                    ? "var(--whaly-white)"
                    : "var(--whaly-purple)"
                }
                border="2px solid var(--whaly-purple)"
                borderRadius="25px"
                fontWeight="700"
              >
                <FaPen />
                {editando ? "Terminar" : "Editar"}
              </Button>

              <Button
                onClick={onAlternarSeguros}
                aria-expanded={mostrarSeguros}
                aria-controls="seguros-disponibles"
                backgroundColor="var(--whaly-purple)"
                color="var(--whaly-white)"
                border="2px solid var(--whaly-purple)"
                borderRadius="25px"
                fontWeight="700"
                size="sm"
                minH="40px"
                px="16px"
                _hover={{
                  backgroundColor: "var(--whaly-white)",
                  color: "var(--whaly-purple)",
                }}
              >
                Agregar seguros
                {mostrarSeguros
                  ? <FaChevronUp aria-hidden="true" />
                  : <FaChevronDown aria-hidden="true" />}
              </Button>

              <Button
                onClick={onCrearNuevoPaquete}
                variant="outline"
                borderColor="var(--whaly-purple)"
                color="var(--whaly-purple)"
                borderRadius="25px"
                fontWeight="700"
                size="sm"
                minH="40px"
                px="16px"
              >
                Empezar sin recomendaciones
              </Button>
            </Stack>

          </Stack>


          {/* PLAN */}

          {plan.length > 0 ? (

            <Stack
              gap="14px"
            >

              {plan.map(
                (seguro) => (

                  <TarjetaSeguroPlan
                    key={
                      seguro.codigo
                    }
                    seguro={
                      seguro
                    }
                    editando={
                      editando
                    }
                    onEliminar={
                      onEliminar
                    }
                  />

                )
              )}

            </Stack>

          ) : (

            <Box
              textAlign="center"
              border="2px dashed var(--whaly-purple)"
              borderRadius="24px"
              py="40px"
              px="20px"
            >

              <Text
                color="var(--whaly-purple)"
                fontWeight="700"
              >
                Tu plan está vacío.
              </Text>


              <Text
                color="var(--whaly-purple)"
                opacity="0.7"
                mt="5px"
              >
                Agrega uno o más seguros
                para continuar.
              </Text>

            </Box>

          )}


          {/* RESTAURAR */}

          <Button
            onClick={
              onRestaurar
            }
            variant="ghost"
            color="var(--whaly-purple)"
            alignSelf="flex-start"
          >

            <FaRotateLeft />

            Restaurar recomendaciones

          </Button>

        </Stack>

      </Card.Body>

    </Card.Root>

  );

}


export default PlanRecomendado;