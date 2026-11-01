import {
  Button,
  Heading,
  Input,
  NativeSelect,
  Stack,
  Text,
} from "@chakra-ui/react";

import CampoFormulario from "./CampoFormulario";
import ContenedorCuestionario from "./ContenedorCuestionario";


function FormularioDatos({
  datos,
  onChange,
  ciudades,
  cargandoCiudades,
  errorCiudades,
  formularioCompleto,
  onComenzar,
  modoCuestionario,
  onCambiarModo,
  onVolver,
}) {

  return (

    <ContenedorCuestionario
      maxW="820px"
    >

      <Stack
        as="form"
        gap="32px"
        onSubmit={(event) => {
          event.preventDefault();
          onComenzar();
        }}
      >


        {/* ENCABEZADO */}

        <Stack
          textAlign="center"
          align="stretch"
          gap="12px"
        >

          <Text
            color="var(--whaly-purple)"
            fontSize="14px"
            fontWeight="800"
            letterSpacing="3px"
            backgroundColor="rgba(191, 234, 193, 0.7)"
            border="1px solid rgba(53, 30, 115, 0.16)"
            borderRadius="999px"
            px="18px"
            py="8px"
            alignSelf="center"
          >
            TU PERFIL WHALY
          </Text>


          <Heading
            as="h1"
            color="var(--whaly-purple)"
            fontSize={{
              base: "36px",
              md: "46px",
            }}
            fontWeight="800"
            lineHeight="1.1"
            textAlign="center"
          >
            Antes de empezar
          </Heading>


          <Stack
            as="section"
            aria-label="Acerca del cuestionario"
            gap="12px"
            backgroundColor="rgba(191, 234, 193, 0.3)"
            border="1px solid rgba(53, 30, 115, 0.16)"
            borderRadius="20px"
            p={{
              base: "16px",
              md: "22px",
            }}
            textAlign="left"
          >
            <Text
              color="var(--whaly-purple)"
              fontSize={{
                base: "18px",
                md: "20px",
              }}
              fontWeight="800"
              lineHeight="1.4"
            >
              Cada vida se construye diferente. Queremos conocer un poco de la tuya.
            </Text>

            <Text
              color="var(--whaly-purple)"
              opacity="0.8"
              lineHeight="1.7"
            >
              A continuación encontrarás algunas situaciones y afirmaciones relacionadas con tu momento de vida, tus responsabilidades y la forma en la que tomas decisiones.
            </Text>

            <Text
              color="var(--whaly-purple)"
              opacity="0.8"
              lineHeight="1.7"
            >
              No necesitas saber de seguros y no existen respuestas correctas o incorrectas. Responde pensando en cómo eres y qué harías hoy, no en lo que crees que deberías responder.
            </Text>

            <Text
              color="var(--whaly-purple)"
              opacity="0.8"
              lineHeight="1.7"
            >
              Tu resultado es una orientación sobre tu momento actual. No busca encasillarte y puede cambiar a medida que también cambia tu vida.
            </Text>
          </Stack>

          <Text
            color="var(--whaly-purple)"
            fontSize="14px"
            fontWeight="700"
            mt="8px"
            opacity="0.85"
          >
            Para personalizar tu experiencia, cuéntanos también algunos datos.
          </Text>

        </Stack>


        {/* CAMPOS */}

        <Stack gap="22px">


          <CampoFormulario
            label="¿Cuál es tu nombre?"
            name="nombre"
            value={datos.nombre}
            onChange={onChange}
            placeholder="Tu nombre completo"
          />


          <CampoFormulario
            label="¿Cuántos años tienes?"
            name="edad"
            type="number"
            min="1"
            max="120"
            value={datos.edad}
            onChange={onChange}
            placeholder="Ej. 28"
          />


          {/* CIUDAD */}

          <Stack gap="8px">

            <Text
              as="label"
              htmlFor="ciudad"
              color="var(--whaly-purple)"
              fontWeight="700"
            >
              ¿En qué ciudad vives?
            </Text>


            {!errorCiudades ? (

              <NativeSelect.Root
                disabled={
                  cargandoCiudades
                }
              >

                <NativeSelect.Field
                  id="ciudad"
                  name="ciudad"
                  value={datos.ciudad}
                  onChange={onChange}
                  height="62px"
                  border="2px solid var(--whaly-purple)"
                  borderRadius="32px"
                  px="24px"
                  fontSize="17px"
                  color="var(--whaly-purple)"
                >

                  <option value="">
                    {cargandoCiudades
                      ? "Cargando ciudades..."
                      : "Selecciona tu ciudad"}
                  </option>


                  {ciudades.map(
                    (ciudad) => (

                      <option
                        key={ciudad.id}
                        value={ciudad.name}
                      >
                        {ciudad.name}
                      </option>

                    )
                  )}

                </NativeSelect.Field>


                <NativeSelect.Indicator />

              </NativeSelect.Root>

            ) : (

              <Input
                id="ciudad"
                name="ciudad"
                value={datos.ciudad}
                onChange={onChange}
                placeholder="Escribe tu ciudad"
                height="62px"
                border="2px solid var(--whaly-purple)"
                borderRadius="32px"
                px="24px"
                fontSize="17px"
                color="var(--whaly-purple)"
              />

            )}


            {errorCiudades && (

              <Text
                color="var(--whaly-purple)"
                fontSize="13px"
                opacity="0.75"
              >
                No pudimos cargar las ciudades
                automáticamente. Puedes escribirla
                manualmente.
              </Text>

            )}

          </Stack>


          <CampoFormulario
            label="¿Cuál es tu número de teléfono?"
            name="telefono"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={datos.telefono}
            onChange={onChange}
            placeholder="Ej. 300 123 4567"
          />

        </Stack>

        <Stack
          as="section"
          aria-labelledby="modo-cuestionario"
          gap="14px"
        >
          <Stack gap="4px">
            <Heading
              id="modo-cuestionario"
              as="h2"
              color="var(--whaly-purple)"
              fontSize="20px"
            >
              Elige cómo quieres conocerte
            </Heading>
            <Text color="var(--whaly-purple)" opacity="0.75" fontSize="14px">
              Puedes completar una orientación breve o responder el cuestionario completo.
            </Text>
          </Stack>

          <Stack
            direction={{
              base: "column",
              md: "row",
            }}
            gap="14px"
            role="group"
            aria-label="Duración del cuestionario"
          >
            <Button
              className={
                modoCuestionario === "breve"
                  ? "whaly-button-raised"
                  : undefined
              }
              type="button"
              onClick={() => onCambiarModo("breve")}
              aria-pressed={modoCuestionario === "breve"}
              height="auto"
              minH="108px"
              flex="1"
              whiteSpace="normal"
              textAlign="left"
              justifyContent="flex-start"
              alignItems="flex-start"
              flexDirection="column"
              gap="6px"
              p="18px"
              border="2px solid var(--whaly-purple)"
              borderRadius="20px"
              backgroundColor={
                modoCuestionario === "breve"
                  ? "var(--whaly-mint)"
                  : "var(--whaly-white)"
              }
              color="var(--whaly-purple)"
            >
              <Text fontWeight="800">Ruta breve · 15 preguntas</Text>
              <Text fontSize="14px" fontWeight="400" whiteSpace="normal">
                Una orientación rápida si ya tienes una idea de seguros o quieres avanzar en menos tiempo.
              </Text>
            </Button>

            <Button
              className={
                modoCuestionario === "completo"
                  ? "whaly-button-raised"
                  : undefined
              }
              type="button"
              onClick={() => onCambiarModo("completo")}
              aria-pressed={modoCuestionario === "completo"}
              height="auto"
              minH="108px"
              flex="1"
              whiteSpace="normal"
              textAlign="left"
              justifyContent="flex-start"
              alignItems="flex-start"
              flexDirection="column"
              gap="6px"
              p="18px"
              border="2px solid var(--whaly-purple)"
              borderRadius="20px"
              backgroundColor={
                modoCuestionario === "completo"
                  ? "var(--whaly-mint)"
                  : "var(--whaly-white)"
              }
              color="var(--whaly-purple)"
            >
              <Text fontWeight="800">Ruta completa · 37 preguntas</Text>
              <Text fontSize="14px" fontWeight="400" whiteSpace="normal">
                Explora tus prioridades con más detalle, tengas o no experiencia en seguros.
              </Text>
            </Button>
          </Stack>
        </Stack>


        {/* NAVEGACIÓN */}

        <Stack
          direction="row"
          justify="space-between"
          align="center"
          gap="15px"
        >

          <Button
            type="button"
            onClick={onVolver}
            backgroundColor="transparent"
            color="var(--whaly-purple)"
            border="2px solid var(--whaly-purple)"
            borderRadius="30px"
            minW={{
              base: "110px",
              md: "125px",
            }}
            height="56px"
            fontWeight="700"
            _hover={{
              backgroundColor:
                "var(--whaly-lavender)",
            }}
          >
            ← Atrás
          </Button>


          <Button
            className="whaly-button-raised"
            type="submit"
            disabled={!formularioCompleto}
            backgroundColor="var(--whaly-mint)"
            color="var(--whaly-purple)"
            border="2px solid var(--whaly-purple)"
            borderRadius="30px"
            minW={{
              base: "140px",
              md: "155px",
            }}
            height="56px"
            fontWeight="800"
            opacity={
              formularioCompleto
                ? 1
                : 0.4
            }
            cursor={
              formularioCompleto
                ? "pointer"
                : "not-allowed"
            }
            transition="all 0.2s ease"
            _hover={
              formularioCompleto
                ? {
                    backgroundColor:
                      "var(--whaly-purple)",
                    color:
                      "var(--whaly-white)",
                    transform:
                      "translateY(-2px)",
                  }
                : {}
            }
          >
            Comenzar →
          </Button>

        </Stack>

      </Stack>

    </ContenedorCuestionario>

  );

}


export default FormularioDatos;