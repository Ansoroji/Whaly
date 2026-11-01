import {
  Box,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";


function EncabezadoPerfil({
  nombre,
  perfil,
  modoCuestionario,
  perfilesComplementarios,
}) {

  const nombreCompleto =
    nombre?.trim();

  const normalizarClave =
    (valor = "") =>
      valor
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z]/g, "");

  const descripcionPorPerfil = {
    protectorEsencial:
      "Te mueves con foco en la estabilidad, la protección de lo que ya construiste y el cuidado de quienes dependen de ti.",
    protectordeloesencial:
      "Te mueves con foco en la estabilidad, la protección de lo que ya construiste y el cuidado de quienes dependen de ti.",
    constructorIndependencia:
      "Priorizas decisiones simples, adaptables y alineadas con tu realidad actual, sin comprometerte con escenarios demasiado lejanos.",
    constructordependencia:
      "Priorizas decisiones simples, adaptables y alineadas con tu realidad actual, sin comprometerte con escenarios demasiado lejanos.",
    constructordeindependencia:
      "Priorizas decisiones simples, adaptables y alineadas con tu realidad actual, sin comprometerte con escenarios demasiado lejanos.",
    pragmatico:
      "Buscas entender bien el valor, costo y condiciones antes de decidir, para elegir con claridad y criterio.",
    planificadorFuturo:
      "Piensas en cómo cada decisión de hoy puede abrirte mejores escenarios mañana y darte más tranquilidad.",
    planificadorfuturo:
      "Piensas en cómo cada decisión de hoy puede abrirte mejores escenarios mañana y darte más tranquilidad.",
    planificadordelfuturo:
      "Piensas en cómo cada decisión de hoy puede abrirte mejores escenarios mañana y darte más tranquilidad.",
    digitalInformado:
      "Investigas, comparas y revisas información antes de elegir, para decidir con más confianza y criterio.",
    digitalinformado:
      "Investigas, comparas y revisas información antes de elegir, para decidir con más confianza y criterio.",
  };

  const descripcionPerfil =
    descripcionPorPerfil[perfil] ||
    descripcionPorPerfil[
      normalizarClave(perfil)
    ] ||
    "Este resultado refleja cómo te relacionas hoy con tus decisiones y prioridades.";


  return (

    <Stack
      as="section"
      aria-labelledby="resultado-perfil-titulo"
      textAlign="center"
      align="center"
      gap="10px"
    >

      <Text
        color="var(--whaly-purple)"
        fontWeight="800"
        letterSpacing="3px"
        fontSize="13px"
      >
        TU PERFIL WHALY
      </Text>


      <Text
        as="p"
        color="var(--whaly-purple)"
        fontSize={{
          base: "34px",
          md: "48px",
        }}
        fontWeight="800"
      >

        {nombreCompleto
          ? `${nombreCompleto}, eres`
          : "Eres"}

      </Text>


      <Heading
        as="h1"
        id="resultado-perfil-titulo"
        color="var(--whaly-purple)"
        fontSize={{
          base: "28px",
          md: "38px",
        }}
        fontWeight="800"
      >
        {perfil}
      </Heading>

      <Text
        color="var(--whaly-purple)"
        maxW="650px"
        opacity="0.9"
        lineHeight="1.7"
        fontWeight="700"
        fontSize="17px"
      >
        {descripcionPerfil}
      </Text>

      <Text
        color="var(--whaly-purple)"
        maxW="650px"
        opacity="0.75"
        lineHeight="1.7"
      >
        Este resultado refleja cómo te relacionas hoy con tus decisiones y prioridades. No es una etiqueta permanente: tu Perfil Whaly puede cambiar a medida que también cambia tu vida.
      </Text>

      {modoCuestionario === "breve" && (
        <Text
          color="var(--whaly-purple)"
          maxW="650px"
          opacity="0.75"
          lineHeight="1.6"
          fontSize="14px"
        >
          Elegiste la ruta breve: este resultado es una orientación inicial basada en una selección de tus respuestas.
        </Text>
      )}

      {perfilesComplementarios.length > 0 && (

        <Stack
          gap="12px"
          width="100%"
          maxW="750px"
          pt="8px"
        >
          <Text
            color="var(--whaly-purple)"
            fontWeight="700"
          >
            También podrías identificarte con:
          </Text>

          <SimpleGrid
            columns={
              perfilesComplementarios.length === 1
                ? 1
                : {
                    base: 1,
                    sm: 2,
                  }
            }
            gap="12px"
            width="100%"
            maxW={
              perfilesComplementarios.length === 1
                ? "420px"
                : "100%"
            }
            justifyItems="center"
          >
            {perfilesComplementarios.map(
              (perfilComplementario) => (
                <Box
                  key={perfilComplementario.id}
                  border="2px solid var(--whaly-purple)"
                  borderRadius="18px"
                  px="18px"
                  py="12px"
                  backgroundColor="var(--whaly-white)"
                >
                  <Text
                    color="var(--whaly-purple)"
                    fontWeight="700"
                  >
                    {perfilComplementario.nombre}
                  </Text>
                  <Text
                    color="var(--whaly-purple)"
                    fontSize="14px"
                    opacity="0.82"
                    fontWeight="600"
                    mt="4px"
                  >
                    {descripcionPorPerfil[perfilComplementario.id] ||
                      descripcionPorPerfil[normalizarClave(perfilComplementario.nombre)] ||
                      "Se alinea con tu forma de evaluar decisiones y prioridades."}
                  </Text>
                </Box>
              )
            )}
          </SimpleGrid>
        </Stack>

      )}

    </Stack>

  );

}


export default EncabezadoPerfil;