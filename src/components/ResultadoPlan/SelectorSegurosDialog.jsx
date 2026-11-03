import {
  Box,
  Button,
  Dialog,
  Heading,
  IconButton,
  Portal,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";

import { useState } from "react";

import {
  FaXmark,
} from "react-icons/fa6";

import TarjetaSeguroDisponible
  from "./TarjetaSeguroDisponible";

function SelectorSegurosDialog({
  open,
  onOpenChange,
  segurosRecomendados,
  otrosSeguros,
  onAgregar,
  error,
}) {
  const [mensaje, setMensaje] = useState("");

  const cambiarApertura = (event) => {
    if (!event.open) {
      setMensaje("");
    }
    onOpenChange(event);
  };

  const agregarSeguro = (seguro) => {
    if (onAgregar(seguro)) {
      setMensaje(`${seguro.titulo} se agregó a tu plan.`);
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={cambiarApertura}
      scrollBehavior="inside"
      size="xl"
    >
      <Portal>
        <Dialog.Backdrop
          background="rgba(40, 24, 72, 0.72)"
          backdropFilter="blur(4px)"
        />
        <Dialog.Positioner
          alignItems="center"
          overflowY="auto"
          p="16px"
        >
          <Dialog.Content
            display="flex"
            flexDirection="column"
            height="calc(100dvh - 32px)"
            maxH="calc(100dvh - 32px)"
            overflow="hidden"
            backgroundColor="var(--whaly-white)"
            border="2px solid var(--whaly-purple)"
            borderRadius="28px"
            boxShadow="0 20px 60px rgba(35, 20, 60, 0.3)"
          >
            <Dialog.Header
              alignItems="flex-start"
              justifyContent="space-between"
              gap="16px"
              pb="12px"
            >
              <Box>
                <Text
                  color="var(--whaly-teal)"
                  fontSize="12px"
                  fontWeight="800"
                  letterSpacing="2px"
                >
                  PERSONALIZA TU PLAN
                </Text>
                <Dialog.Title
                  color="var(--whaly-purple)"
                  fontSize={{ base: "22px", md: "28px" }}
                  fontWeight="800"
                >
                  Explora seguros para ti
                </Dialog.Title>
                <Dialog.Description>
                  Agrega opciones a tu plan sin perder de vista tus recomendaciones.
                </Dialog.Description>
              </Box>
              <Dialog.CloseTrigger asChild>
                <IconButton
                  aria-label="Cerrar selector de seguros"
                  variant="ghost"
                  color="var(--whaly-purple)"
                  size="sm"
                >
                  <FaXmark aria-hidden="true" />
                </IconButton>
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body
              flex="1"
              minH="0"
              overflowY="auto"
              pt="0"
            >
              <Stack gap="24px">
                {mensaje && (
                  <Text
                    role="status"
                    aria-live="polite"
                    color="var(--whaly-teal)"
                    fontWeight="700"
                  >
                    {mensaje}
                  </Text>
                )}

                {error && (
                  <Text
                    role="alert"
                    color="red.700"
                    fontWeight="700"
                  >
                    {error}
                  </Text>
                )}

                {segurosRecomendados.length > 0 && (
                  <Stack gap="12px">
                    <Heading
                      as="h3"
                      color="var(--whaly-purple)"
                      fontSize="18px"
                    >
                      Recomendados para ti
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap="12px">
                      {segurosRecomendados.map((seguro) => (
                        <TarjetaSeguroDisponible
                          key={seguro.codigo}
                          seguro={seguro}
                          onAgregar={agregarSeguro}
                        />
                      ))}
                    </SimpleGrid>
                  </Stack>
                )}

                {otrosSeguros.length > 0 && (
                  <Stack gap="12px">
                    <Heading
                      as="h3"
                      color="var(--whaly-purple)"
                      fontSize="18px"
                    >
                      {segurosRecomendados.length > 0
                        ? "Otras opciones"
                        : "Seguros disponibles"}
                    </Heading>
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap="12px">
                      {otrosSeguros.map((seguro) => (
                        <TarjetaSeguroDisponible
                          key={seguro.codigo}
                          seguro={seguro}
                          onAgregar={agregarSeguro}
                        />
                      ))}
                    </SimpleGrid>
                  </Stack>
                )}

                {segurosRecomendados.length === 0 &&
                  otrosSeguros.length === 0 && (
                    <Text color="var(--whaly-purple)">
                      Ya agregaste todos los seguros disponibles a tu plan.
                    </Text>
                  )}
              </Stack>
            </Dialog.Body>

            <Dialog.Footer
              flexShrink="0"
              pt="12px"
            >
              <Button
                onClick={() => cambiarApertura({ open: false })}
                backgroundColor="var(--whaly-white)"
                color="var(--whaly-purple)"
                border="2px solid var(--whaly-purple)"
                borderRadius="24px"
              >
                Listo
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default SelectorSegurosDialog;
