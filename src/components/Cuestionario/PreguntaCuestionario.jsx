import {
  Button,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

import BarraProgreso from "./BarraProgreso";
import BotonEscala from "./BotonEscala";
import ContenedorCuestionario from "./ContenedorCuestionario";
import OpcionCuestionario from "./OpcionCuestionario";


function PreguntaCuestionario({
  pregunta,
  numero,
  total,
  estaSeleccionada,
  seleccionarRespuesta,
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
          textAlign="center"
          align="center"
          gap="10px"
        >

          <Text
            color="var(--whaly-purple)"
            fontSize="13px"
            fontWeight="800"
            letterSpacing="3px"
          >
            PREGUNTA {numero}
          </Text>


          <Heading
            as="h1"
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
            >
              {pregunta.ayuda}
            </Text>

          )}

        </Stack>


        {/* ESCALA */}

        {pregunta.tipo === "escala" ? (

          <Stack
            direction="row"
            justify="center"
            gap={{
              base: "10px",
              md: "20px",
            }}
            flexWrap="wrap"
          >

            {pregunta.opciones.map(
              (opcion) => (

                <BotonEscala
                  key={opcion}
                  valor={opcion}
                  seleccionada={
                    estaSeleccionada(
                      opcion
                    )
                  }
                  onClick={() =>
                    seleccionarRespuesta(
                      opcion
                    )
                  }
                />

              )
            )}

          </Stack>

        ) : (

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

        )}


        {/* NAVEGACIÓN */}

        <Stack
          direction="row"
          justify="space-between"
          align="center"
          marginTop="8px"
        >

          <Button
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