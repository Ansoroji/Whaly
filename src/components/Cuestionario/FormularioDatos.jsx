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
  onVolver,
}) {

  return (

    <ContenedorCuestionario
      maxW="820px"
    >

      <Stack gap="32px">


        {/* ENCABEZADO */}

        <Stack
          textAlign="center"
          align="center"
          gap="12px"
        >

          <Text
            color="var(--whaly-purple)"
            fontSize="14px"
            fontWeight="800"
            letterSpacing="3px"
          >
            ANTES DE EMPEZAR
          </Text>


          <Heading
            as="h1"
            color="var(--whaly-purple)"
            fontSize={{
              base: "36px",
              md: "46px",
            }}
            fontWeight="800"
          >
            Cuéntanos sobre ti
          </Heading>


          <Text
            color="var(--whaly-purple)"
            opacity="0.7"
            maxW="550px"
            lineHeight="1.6"
          >
            Esta información nos ayudará
            a personalizar mejor tu experiencia.
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
            value={datos.telefono}
            onChange={onChange}
            placeholder="Ej. 300 123 4567"
          />

        </Stack>


        {/* NAVEGACIÓN */}

        <Stack
          direction="row"
          justify="space-between"
          align="center"
          gap="15px"
        >

          <Button
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
            onClick={onComenzar}
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