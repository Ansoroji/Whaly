export const URL_SITIO = "https://whaly-7d8e3.web.app";

export const METADATOS_POR_RUTA = {
  "/": {
    title: "Whaly Seguros | Protección para personas y empresas en Colombia",
    description:
      "Conoce seguros y soluciones de protección para personas, familias y empresas en Colombia. Explora tus opciones con orientación clara y cercana.",
    indexable: true,
  },
  "/soluciones-personas": {
    title: "Protección y seguros para personas | Whaly Seguros",
    description:
      "Descubre cómo proteger tu salud, familia, hogar y patrimonio. Conoce soluciones de seguros para personas y encuentra opciones para tu momento de vida.",
    indexable: true,
  },
  "/soluciones-empresas": {
    title: "Protección para empresas y negocios | Whaly Seguros",
    description:
      "Conoce soluciones para proteger tu empresa, tus activos y tu equipo. Explora alternativas de seguros empresariales en Colombia con Whaly.",
    indexable: true,
  },
  "/personas": {
    title: "Catálogo de seguros para personas | Whaly Seguros",
    description:
      "Explora opciones de seguros de vida, movilidad, salud, viaje, hogar y mascotas para cuidar tu bienestar, tu familia y tu patrimonio.",
    indexable: true,
  },
  "/empresas": {
    title: "Catálogo de seguros para empresas | Whaly Seguros",
    description:
      "Conoce alternativas para proteger empresas, activos y operaciones. Revisa las opciones de seguros empresariales disponibles con Whaly.",
    indexable: true,
  },
  "/cuestionario": {
    title: "Cuestionario de orientación de seguros | Whaly",
    description:
      "Responde el cuestionario Whaly para conocer una orientación sobre tus prioridades y explorar seguros que pueden ajustarse a tu situación.",
    indexable: true,
  },
  "/perfil": {
    title: "Mi perfil Whaly",
    description: "Consulta tu perfil y plan personalizado de Whaly.",
    indexable: false,
  },
};

export const METADATOS_NO_ENCONTRADO = {
  title: "Página no encontrada | Whaly Seguros",
  description: "La página que buscas no existe o ya no está disponible.",
  indexable: false,
};

export const RUTAS_PUBLICAS_INDEXABLES = Object.entries(
  METADATOS_POR_RUTA
)
  .filter(([, metadatos]) => metadatos.indexable)
  .map(([ruta]) => ruta);

export function obtenerMetadatosSEO(pathname) {
  const rutaNormalizada =
    pathname.replace(/\/+$/, "") || "/";

  return {
    ruta: rutaNormalizada,
    metadatos:
      METADATOS_POR_RUTA[rutaNormalizada] ||
      METADATOS_NO_ENCONTRADO,
    esRutaConocida: rutaNormalizada in METADATOS_POR_RUTA,
  };
}

export function obtenerDatosEstructuradosWhaly() {
  return {
    "@context": "https://schema.org",
    "@type": ["InsuranceAgency", "Organization"],
    "@id": `${URL_SITIO}/#organization`,
    name: "Whaly Seguros",
    url: `${URL_SITIO}/`,
    description:
      "Agencia de seguros con soluciones de protección para personas y empresas en Colombia.",
    telephone: "+573163206697",
    email: "comercial@whalyseguros.com",
    areaServed: {
      "@type": "Country",
      name: "Colombia",
    },
    sameAs: [
      "https://www.instagram.com/whaly.seguros/",
    ],
  };
}
