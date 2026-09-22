import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  NativeSelect,
  Stack,
  Text,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ResultadoPlan from "../../components/ResultadoPlan/ResultadoPlan";


function Cuestionario() {

  const navigate = useNavigate();


  /* ========================================
     DATOS PERSONALES
  ======================================== */

  const [datos, setDatos] = useState({
    nombre: "",
    edad: "",
    ciudad: "",
    telefono: "",
  });


  /* ========================================
     CIUDADES - API COLOMBIA
  ======================================== */

  const [ciudades, setCiudades] = useState([]);
  const [cargandoCiudades, setCargandoCiudades] = useState(true);
  const [errorCiudades, setErrorCiudades] = useState(false);


  useEffect(() => {

    let activo = true;


    const obtenerCiudades = async () => {

      try {

        setCargandoCiudades(true);
        setErrorCiudades(false);


        const respuesta = await fetch(
          "https://api-colombia.com/api/v1/City"
        );


        if (!respuesta.ok) {
          throw new Error(
            "No se pudieron cargar las ciudades"
          );
        }


        const data = await respuesta.json();


        if (!activo) return;


        /*
          Eliminamos ciudades repetidas
          y las ordenamos alfabéticamente.
        */

        const ciudadesUnicas = Array.from(
          new Map(
            data.map((ciudad) => [
              ciudad.name,
              ciudad,
            ])
          ).values()
        );


        ciudadesUnicas.sort((a, b) =>
          a.name.localeCompare(
            b.name,
            "es"
          )
        );


        setCiudades(ciudadesUnicas);

      } catch (error) {

        console.error(
          "Error cargando las ciudades:",
          error
        );


        if (activo) {
          setErrorCiudades(true);
        }

      } finally {

        if (activo) {
          setCargandoCiudades(false);
        }

      }

    };


    obtenerCiudades();


    return () => {
      activo = false;
    };

  }, []);


  /* ========================================
     ETAPAS
  ======================================== */

  const [etapa, setEtapa] = useState("datos");

  const [preguntaActual, setPreguntaActual] =
    useState(0);

  const [respuestas, setRespuestas] =
    useState({});


  /* ========================================
     PREGUNTAS
  ======================================== */

  const preguntas = [

    {
      id: "momentoVida",
      tipo: "unica",

      pregunta:
        "¿En qué momento de vida te encuentras?",

      opciones: [
        "Estoy empezando mi vida laboral",
        "Tengo ingresos estables",
        "Estoy formando una familia",
        "Tengo familia y responsabilidades económicas",
        "Estoy cerca a la jubilación",
      ],
    },


    {
      id: "posesiones",
      tipo: "multiple",

      pregunta:
        "¿Cuáles de estos tienes actualmente?",

      ayuda:
        "Selecciona todos los que apliquen",

      opciones: [
        "Vehículo",
        "Propiedad raíz",
        "Hijos",
        "Mascota",
        "Ninguno",
      ],
    },


    {
      id: "preocupacion",
      tipo: "unica",

      pregunta:
        "¿Qué te preocuparía más perder hoy?",

      opciones: [
        "Mis ingresos",
        "Mi salud",
        "Mi vivienda o bienes",
        "Mi estabilidad familiar",
      ],
    },


    {
      id: "preparacion",
      tipo: "escala",

      pregunta:
        "¿Qué tan preparado te sientes ante un imprevisto?",

      ayuda:
        "1 siendo poco preparado y 5 siendo completamente preparado",

      opciones: [
        1,
        2,
        3,
        4,
        5,
      ],
    },


    {
      id: "riesgos",
      tipo: "unica",

      pregunta:
        "¿Cómo sueles actuar frente a riesgos?",

      opciones: [
        "Prefiero evitarlos",
        "Los asumo si no son muy altos",
        "Prefiero estar cubierto siempre",
      ],
    },


    {
      id: "gastoSeguros",
      tipo: "unica",

      pregunta:
        "¿Cómo ves el gasto en seguros?",

      opciones: [
        "Es un gasto innecesario",
        "Solo lo pago si es obligatorio",
        "Es una inversión en tranquilidad",
      ],
    },


    {
      id: "mensualidad",
      tipo: "unica",

      pregunta:
        "¿Qué valoras más al pagar una mensualidad?",

      opciones: [
        "Que sea barato y accesible",
        "Que tenga beneficios claros",
        "Que me brinde seguridad a largo plazo",
      ],
    },


    {
      id: "eleccionSeguro",
      tipo: "unica",

      pregunta:
        "¿Cómo prefieres elegir un seguro?",

      opciones: [
        "Con alguien que me asesore",
        "Investigando por mi cuenta",
        "Por recomendación de alguien cercano",
      ],
    },


    {
      id: "largoPlazo",
      tipo: "escala",

      pregunta:
        "¿Qué tan importante es para ti planear a largo plazo?",

      ayuda:
        "1 siendo poco importante y 5 siendo muy importante",

      opciones: [
        1,
        2,
        3,
        4,
        5,
      ],
    },


    {
      id: "futuro",
      tipo: "multiple",

      pregunta:
        "¿Te interesa asegurar cosas a futuro (educación, pensión, etc.)?",

      ayuda:
        "Selecciona todos los que apliquen",

      opciones: [
        "La educación",
        "La pensión",
        "Seguro de vida",
        "Ninguno",
      ],
    },

  ];


  /* ========================================
     PREGUNTA ACTUAL
  ======================================== */

  const pregunta =
    preguntas[preguntaActual];


  /* ========================================
     MANEJAR DATOS PERSONALES
  ======================================== */

  const manejarCambioDatos = (e) => {

    const {
      name,
      value,
    } = e.target;


    setDatos((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  /* ========================================
     VALIDAR DATOS PERSONALES
  ======================================== */

  const formularioCompleto =
    datos.nombre.trim() !== "" &&
    datos.edad.trim() !== "" &&
    datos.ciudad.trim() !== "" &&
    datos.telefono.trim() !== "";


  /* ========================================
     COMENZAR CUESTIONARIO
  ======================================== */

  const comenzarCuestionario = () => {

    if (!formularioCompleto) {
      return;
    }


    setPreguntaActual(0);
    setEtapa("preguntas");

  };


  /* ========================================
     SELECCIONAR RESPUESTA
  ======================================== */

  const seleccionarRespuesta = (
    opcion
  ) => {

    /*
      PREGUNTAS DE SELECCIÓN MÚLTIPLE
    */

    if (pregunta.tipo === "multiple") {

      const actuales =
        respuestas[pregunta.id] || [];


      /*
        Si selecciona Ninguno,
        quitamos cualquier otra selección.
      */

      if (opcion === "Ninguno") {

        setRespuestas((prev) => ({
          ...prev,
          [pregunta.id]: [
            "Ninguno",
          ],
        }));


        return;

      }


      /*
        Al seleccionar una opción normal,
        quitamos "Ninguno".
      */

      let nuevas =
        actuales.filter(
          (item) =>
            item !== "Ninguno"
        );


      /*
        Si ya estaba seleccionada,
        la quitamos.
      */

      if (
        nuevas.includes(opcion)
      ) {

        nuevas =
          nuevas.filter(
            (item) =>
              item !== opcion
          );

      } else {

        nuevas = [
          ...nuevas,
          opcion,
        ];

      }


      setRespuestas((prev) => ({
        ...prev,
        [pregunta.id]: nuevas,
      }));


      return;

    }


    /*
      SELECCIÓN ÚNICA
      Y ESCALAS
    */

    setRespuestas((prev) => ({
      ...prev,
      [pregunta.id]: opcion,
    }));

  };


  /* ========================================
     SABER SI UNA OPCIÓN ESTÁ SELECCIONADA
  ======================================== */

  const estaSeleccionada = (
    opcion
  ) => {

    const respuesta =
      respuestas[pregunta.id];


    if (
      pregunta.tipo === "multiple"
    ) {

      return (
        Array.isArray(respuesta) &&
        respuesta.includes(opcion)
      );

    }


    return respuesta === opcion;

  };


  /* ========================================
     VALIDAR RESPUESTA ACTUAL
  ======================================== */

  const puedeContinuar = () => {

    if (!pregunta) {
      return false;
    }


    const respuestaActual =
      respuestas[pregunta.id];


    if (
      pregunta.tipo === "multiple"
    ) {

      return (
        Array.isArray(
          respuestaActual
        ) &&
        respuestaActual.length > 0
      );

    }


    return (
      respuestaActual !== undefined &&
      respuestaActual !== null &&
      respuestaActual !== ""
    );

  };


  /* ========================================
     SIGUIENTE
  ======================================== */

  const siguiente = () => {

    if (!puedeContinuar()) {
      return;
    }


    /*
      Si todavía quedan preguntas.
    */

    if (
      preguntaActual <
      preguntas.length - 1
    ) {

      setPreguntaActual(
        (actual) =>
          actual + 1
      );


      return;

    }


    /*
      Si terminó la pregunta 10,
      mostramos el plan.
    */

    console.log(
      "Datos personales:",
      datos
    );


    console.log(
      "Respuestas:",
      respuestas
    );


    setEtapa("resultado");

  };


  /* ========================================
     ATRÁS
  ======================================== */

  const anterior = () => {

    /*
      Si está en la primera pregunta,
      regresa al formulario inicial.
    */

    if (preguntaActual === 0) {

      setEtapa("datos");

      return;

    }


    setPreguntaActual(
      (actual) =>
        actual - 1
    );

  };


  /* ========================================
     RESULTADO / PLAN WHALY
  ======================================== */

  if (etapa === "resultado") {

    return (

      <ResultadoPlan

        datos={datos}

        respuestas={respuestas}

        onVolver={() => {

          /*
            Volvemos a la última pregunta
            para que pueda revisar
            sus respuestas.
          */

          setPreguntaActual(
            preguntas.length - 1
          );


          setEtapa(
            "preguntas"
          );

        }}

      />

    );

  }


  /* ========================================
     PREGUNTAS
  ======================================== */

  if (etapa === "preguntas") {

    const porcentaje =
      (
        (preguntaActual + 1) /
        preguntas.length
      ) * 100;


    return (

      <Box
        as="main"
        minHeight="100vh"
        backgroundColor="var(--whaly-lavender)"
        display="flex"
        alignItems="center"
        justifyContent="center"

        py={{
          base: "50px",
          md: "80px",
        }}

        px={{
          base: "18px",
          md: "24px",
        }}
      >

        <Container
          maxW="900px"
        >

          <Box
            width="100%"
            backgroundColor="var(--whaly-white)"

            border="2px solid var(--whaly-purple)"

            borderRadius={{
              base: "24px",
              md: "34px",
            }}

            boxShadow="0 14px 0 var(--whaly-purple)"

            padding={{
              base: "30px 20px",
              md: "45px 50px",
            }}
          >

            <Stack
              gap="32px"
            >


              {/* =========================
                  PROGRESO
              ========================= */}

              <Stack
                gap="8px"
              >

                <Stack
                  direction="row"
                  justify="space-between"
                  align="center"
                >

                  <Text
                    color="var(--whaly-purple)"
                    fontWeight="700"
                    fontSize="14px"
                  >
                    Pregunta{" "}
                    {preguntaActual + 1}
                    {" "}de{" "}
                    {preguntas.length}
                  </Text>


                  <Text
                    color="var(--whaly-purple)"
                    fontWeight="700"
                    fontSize="14px"
                  >
                    {Math.round(
                      porcentaje
                    )}
                    %
                  </Text>

                </Stack>


                <Box
                  width="100%"
                  height="8px"
                  backgroundColor="#E5E1F3"
                  borderRadius="20px"
                  overflow="hidden"
                >

                  <Box
                    width={`${porcentaje}%`}
                    height="100%"
                    backgroundColor="var(--whaly-purple)"
                    borderRadius="20px"
                    transition="width 0.3s ease"
                  />

                </Box>

              </Stack>


              {/* =========================
                  PREGUNTA
              ========================= */}

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
                  PREGUNTA{" "}
                  {preguntaActual + 1}
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


              {/* =========================
                  ESCALA 1 - 5
              ========================= */}

              {pregunta.tipo ===
              "escala" ? (

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
                    (opcion) => {

                      const seleccionada =
                        estaSeleccionada(
                          opcion
                        );


                      return (

                        <Button
                          key={opcion}

                          onClick={() =>
                            seleccionarRespuesta(
                              opcion
                            )
                          }

                          width={{
                            base: "56px",
                            md: "70px",
                          }}

                          height={{
                            base: "56px",
                            md: "70px",
                          }}

                          minW="0"
                          padding="0"

                          borderRadius="50%"

                          border="3px solid var(--whaly-purple)"

                          backgroundColor={
                            seleccionada
                              ? "var(--whaly-purple)"
                              : "var(--whaly-mint)"
                          }

                          color={
                            seleccionada
                              ? "var(--whaly-white)"
                              : "var(--whaly-purple)"
                          }

                          fontSize="21px"
                          fontWeight="800"

                          transition="all 0.2s ease"

                          _hover={{
                            transform:
                              "translateY(-3px)",

                            backgroundColor:
                              "var(--whaly-purple)",

                            color:
                              "var(--whaly-white)",
                          }}
                        >

                          {opcion}

                        </Button>

                      );

                    }
                  )}

                </Stack>

              ) : (

                /* =========================
                    OPCIONES NORMALES
                ========================= */

                <Stack
                  gap="14px"
                  width="100%"
                  maxW="620px"
                  alignSelf="center"
                >

                  {pregunta.opciones.map(
                    (opcion) => {

                      const seleccionada =
                        estaSeleccionada(
                          opcion
                        );


                      return (

                        <Button
                          key={opcion}

                          onClick={() =>
                            seleccionarRespuesta(
                              opcion
                            )
                          }

                          width="100%"
                          minHeight="60px"
                          height="auto"

                          whiteSpace="normal"

                          padding="14px 22px"

                          backgroundColor={
                            seleccionada
                              ? "var(--whaly-purple)"
                              : "var(--whaly-mint)"
                          }

                          color={
                            seleccionada
                              ? "var(--whaly-white)"
                              : "var(--whaly-purple)"
                          }

                          border="3px solid var(--whaly-purple)"

                          borderRadius="30px"

                          fontSize={{
                            base: "15px",
                            md: "17px",
                          }}

                          fontWeight="700"

                          transition="all 0.2s ease"

                          _hover={{
                            transform:
                              "translateY(-2px)",

                            backgroundColor:
                              "var(--whaly-purple)",

                            color:
                              "var(--whaly-white)",
                          }}
                        >

                          {opcion}

                        </Button>

                      );

                    }
                  )}

                </Stack>

              )}


              {/* =========================
                  NAVEGACIÓN
              ========================= */}

              <Stack
                direction="row"
                justify="space-between"
                align="center"
                marginTop="8px"
              >

                <Button
                  onClick={anterior}

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
                  onClick={siguiente}

                  disabled={
                    !puedeContinuar()
                  }

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
                    puedeContinuar()
                      ? 1
                      : 0.4
                  }

                  cursor={
                    puedeContinuar()
                      ? "pointer"
                      : "not-allowed"
                  }

                  transition="all 0.2s ease"

                  _hover={
                    puedeContinuar()
                      ? {
                          transform:
                            "translateX(3px)",
                        }
                      : {}
                  }
                >

                  {
                    preguntaActual ===
                    preguntas.length - 1
                      ? "Ver mi plan →"
                      : "Siguiente →"
                  }

                </Button>

              </Stack>

            </Stack>

          </Box>

        </Container>

      </Box>

    );

  }


  /* ========================================
     PANTALLA INICIAL
     DATOS PERSONALES
  ======================================== */

  return (

    <Box
      as="main"
      minHeight="100vh"

      backgroundColor="var(--whaly-lavender)"

      display="flex"
      alignItems="center"
      justifyContent="center"

      py={{
        base: "40px",
        md: "70px",
      }}

      px={{
        base: "18px",
        md: "24px",
      }}
    >

      <Container
        maxW="820px"
      >

        <Box
          width="100%"

          backgroundColor="var(--whaly-white)"

          border="2px solid var(--whaly-purple)"

          borderRadius={{
            base: "24px",
            md: "34px",
          }}

          padding={{
            base: "35px 24px",
            md: "48px",
          }}

          boxShadow="0 14px 0 var(--whaly-purple)"
        >

          <Stack
            gap="32px"
          >


            {/* =========================
                ENCABEZADO
            ========================= */}

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
                a personalizar mejor tu
                experiencia.
              </Text>

            </Stack>


            {/* =========================
                FORMULARIO
            ========================= */}

            <Stack
              gap="22px"
            >


              {/* NOMBRE */}

              <Stack
                gap="8px"
              >

                <Text
                  as="label"
                  htmlFor="nombre"

                  color="var(--whaly-purple)"

                  fontWeight="700"
                >
                  ¿Cuál es tu nombre?
                </Text>


                <Input
                  id="nombre"
                  name="nombre"

                  value={
                    datos.nombre
                  }

                  onChange={
                    manejarCambioDatos
                  }

                  placeholder="Tu nombre completo"

                  height="62px"

                  border="2px solid var(--whaly-purple)"

                  borderRadius="32px"

                  px="24px"

                  fontSize="17px"

                  color="var(--whaly-purple)"

                  _focus={{
                    borderColor:
                      "var(--whaly-purple)",

                    boxShadow:
                      "0 0 0 2px var(--whaly-mint)",
                  }}
                />

              </Stack>


              {/* EDAD */}

              <Stack
                gap="8px"
              >

                <Text
                  as="label"
                  htmlFor="edad"

                  color="var(--whaly-purple)"

                  fontWeight="700"
                >
                  ¿Cuántos años tienes?
                </Text>


                <Input
                  id="edad"
                  name="edad"

                  type="number"

                  min="1"
                  max="120"

                  value={
                    datos.edad
                  }

                  onChange={
                    manejarCambioDatos
                  }

                  placeholder="Ej. 28"

                  height="62px"

                  border="2px solid var(--whaly-purple)"

                  borderRadius="32px"

                  px="24px"

                  fontSize="17px"

                  color="var(--whaly-purple)"

                  _focus={{
                    borderColor:
                      "var(--whaly-purple)",

                    boxShadow:
                      "0 0 0 2px var(--whaly-mint)",
                  }}
                />

              </Stack>


              {/* =========================
                  CIUDAD - API
              ========================= */}

              <Stack
                gap="8px"
              >

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

                      value={
                        datos.ciudad
                      }

                      onChange={
                        manejarCambioDatos
                      }

                      height="62px"

                      border="2px solid var(--whaly-purple)"

                      borderRadius="32px"

                      px="24px"

                      fontSize="17px"

                      color="var(--whaly-purple)"
                    >

                      <option value="">

                        {
                          cargandoCiudades
                            ? "Cargando ciudades..."
                            : "Selecciona tu ciudad"
                        }

                      </option>


                      {ciudades.map(
                        (ciudad) => (

                          <option
                            key={
                              ciudad.id
                            }

                            value={
                              ciudad.name
                            }
                          >

                            {
                              ciudad.name
                            }

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

                    value={
                      datos.ciudad
                    }

                    onChange={
                      manejarCambioDatos
                    }

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
                    fontSize="13px"
                    color="var(--whaly-purple)"
                    opacity="0.75"
                  >
                    No pudimos cargar las
                    ciudades automáticamente.
                    Puedes escribirla manualmente.
                  </Text>

                )}

              </Stack>


              {/* TELÉFONO */}

              <Stack
                gap="8px"
              >

                <Text
                  as="label"
                  htmlFor="telefono"

                  color="var(--whaly-purple)"

                  fontWeight="700"
                >
                  ¿Cuál es tu número de teléfono?
                </Text>


                <Input
                  id="telefono"
                  name="telefono"

                  type="tel"

                  value={
                    datos.telefono
                  }

                  onChange={
                    manejarCambioDatos
                  }

                  placeholder="Ej. 300 123 4567"

                  height="62px"

                  border="2px solid var(--whaly-purple)"

                  borderRadius="32px"

                  px="24px"

                  fontSize="17px"

                  color="var(--whaly-purple)"

                  _focus={{
                    borderColor:
                      "var(--whaly-purple)",

                    boxShadow:
                      "0 0 0 2px var(--whaly-mint)",
                  }}
                />

              </Stack>

            </Stack>


            {/* =========================
                BOTONES
            ========================= */}

            <Stack
              direction="row"
              justify="space-between"
              align="center"
              gap="15px"
            >

              <Button
                onClick={() =>
                  navigate(-1)
                }

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
                onClick={
                  comenzarCuestionario
                }

                disabled={
                  !formularioCompleto
                }

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

        </Box>

      </Container>

    </Box>

  );

}


export default Cuestionario;