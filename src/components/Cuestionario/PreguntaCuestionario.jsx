import {
  Button,
  Heading,
  SimpleGrid,
  Stack,
  Textarea,
  Text,
} from "@chakra-ui/react";

import BarraProgreso from "./BarraProgreso";
import BotonEscala from "./BotonEscala";
import ContenedorCuestionario from "./ContenedorCuestionario";
import OpcionCuestionario from "./OpcionCuestionario";


function PreguntaCuestionario({
  pregunta,
  respuestaAbierta,
  textoSeccion,
  etiquetasEscala,
  mostrarSeccion,
  numero,
  total,
  estaSeleccionada,
  seleccionarRespuesta,
  puedeSeleccionar,
  puedeContinuar,
  onAnterior,
  onSiguiente,
}) {

  return (

    <ContenedorCuestionario>

      <Stack gap="32px">


        {/* PROGRESO */}

        <BarraProgreso
          actual={numero}
          total={total}
        />


        {/* PREGUNTA */}

        <Stack
          as="section"
          aria-labelledby="pregunta-cuestionario-titulo"
          textAlign="center"
          align="center"
          gap="12px"
        >

          {mostrarSeccion && (

            <Stack
              gap="4px"
              mb="4px"
              align="center"
            >
              <Text
                color="var(--whaly-teal)"
                fontSize="13px"
                fontWeight="800"
                letterSpacing="2px"
                textTransform="uppercase"
              >
                {pregunta.seccion}
              </Text>

              <Text
                color="var(--whaly-purple)"
                fontSize="15px"
                opacity="0.75"
                maxW="620px"
                lineHeight="1.6"
              >
                {textoSeccion}
              </Text>
            </Stack>

          )}

          <Text
            color="var(--whaly-purple)"
            fontSize="13px"
            fontWeight="800"
            letterSpacing="3px"
            backgroundColor="rgba(191, 234, 193, 0.55)"
            border="1px solid rgba(53, 30, 115, 0.2)"
            borderRadius="999px"
            px="18px"
            py="8px"
          >
            PREGUNTA {numero}
          </Text>


          <Heading
            as="h1"
            id="pregunta-cuestionario-titulo"
            color="var(--whaly-purple)"
            fontSize={{
              base: "28px",
              md: "39px",
            }}
            fontWeight="800"
            lineHeight="1.2"
            maxW="750px"
          >
            {pregunta.pregunta}
          </Heading>


          {pregunta.ayuda && (

            <Text
              color="var(--whaly-purple)"
              fontSize="15px"
              fontWeight="600"
              opacity="0.7"
              maxW="620px"
            >
              {pregunta.ayuda}
            </Text>

          )}

        </Stack>


        {pregunta.tipo === "escalaPerfil" && (

          <SimpleGrid
            columns={5}
            justifyItems="center"
            gap={{
              base: "4px",
              md: "12px",
            }}
            maxW="620px"
            width="100%"
            alignSelf="center"
          >

            {(pregunta.opciones || [1, 2, 3, 4, 5]).map(
              (opcion, indice) => (

                <Stack
                  key={opcion}
                  align="center"
                  gap="8px"
                  width="100%"
                >
                  <BotonEscala
                    valor={opcion}
                    seleccionada={
                      estaSeleccionada(opcion)
                    }
                    onClick={() =>
                      seleccionarRespuesta(opcion)
                    }
                  />

                  <Text
                    color="var(--whaly-purple)"
                    fontSize={{
                      base: "10px",
                      md: "12px",
                    }}
                    fontWeight="600"
                    lineHeight="1.25"
                    textAlign="center"
                  >
                    {indice + 1} — {etiquetasEscala[indice]}
                  </Text>
                </Stack>

              )
            )}

          </SimpleGrid>

        )}


        {pregunta.tipo === "abierta" ? (

          <Stack
            gap="8px"
            width="100%"
            maxW="620px"
            alignSelf="center"
          >
            <Textarea
              value={respuestaAbierta}
              onChange={(event) =>
                seleccionarRespuesta(
                  event.target.value
                )
              }
              placeholder="Escribe tu respuesta aquí"
              minH="140px"
              border="2px solid var(--whaly-purple)"
              borderRadius="20px"
              color="var(--whaly-purple)"
              _focusVisible={{
                borderColor: "var(--whaly-teal)",
                boxShadow: "0 0 0 1px var(--whaly-teal)",
              }}
            />

            <Text
              color="var(--whaly-purple)"
              fontSize="13px"
              opacity="0.7"
            >
              Opcional
            </Text>
          </Stack>

        ) : pregunta.tipo !== "escalaPerfil" ? (

          /* OPCIONES NORMALES */

          <Stack
            gap="14px"
            width="100%"
            maxW="620px"
            alignSelf="center"
          >

            {pregunta.opciones.map(
              (opcion) => (

                <OpcionCuestionario
                  key={opcion}
                  seleccionada={
                    estaSeleccionada(
                      opcion
                    )
                  }
                  deshabilitada={
                    !puedeSeleccionar(opcion)
                  }
                  onClick={() =>
                    seleccionarRespuesta(
                      opcion
                    )
                  }
                >
                  {opcion}
                </OpcionCuestionario>

              )
            )}

          </Stack>

        ) : null}


        {/* NAVEGACIÓN */}

        <Stack
          direction="row"
          justify="space-between"
          align="center"
          marginTop="8px"
        >

          <Button
            className="whaly-button-raised"
            onClick={onAnterior}
            backgroundColor="var(--whaly-mint)"
            color="var(--whaly-purple)"
            border="3px solid var(--whaly-purple)"
            borderRadius="30px"
            minW={{
              base: "110px",
              md: "135px",
            }}
            height="56px"
            fontWeight="800"
            transition="all 0.2s ease"
            _hover={{
              transform:
                "translateX(-3px)",
            }}
          >
            ← Atrás
          </Button>


          <Button
            className="whaly-button-raised"
            onClick={onSiguiente}
            disabled={!puedeContinuar}
            backgroundColor="var(--whaly-mint)"
            color="var(--whaly-purple)"
            border="3px solid var(--whaly-purple)"
            borderRadius="30px"
            minW={{
              base: "125px",
              md: "160px",
            }}
            height="56px"
            fontWeight="800"
            opacity={
              puedeContinuar
                ? 1
                : 0.4
            }
            cursor={
              puedeContinuar
                ? "pointer"
                : "not-allowed"
            }
            transition="all 0.2s ease"
            _hover={
              puedeContinuar
                ? {
                    transform:
                      "translateX(3px)",
                  }
                : {}
            }
          >

            {numero === total
              ? "Ver mi plan →"
              : "Siguiente →"}

          </Button>

        </Stack>

      </Stack>

    </ContenedorCuestionario>

  );

}


export default PreguntaCuestionario;