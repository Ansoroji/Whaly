import {
  obtenerDatosEstructuradosWhaly,
  obtenerMetadatosSEO,
  URL_SITIO,
} from "../datos/metadatosSEO.js";

function actualizarMeta(atributo, nombre, contenido) {
  let meta = document.head.querySelector(
    `meta[${atributo}="${nombre}"]`
  );

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(atributo, nombre);
    document.head.append(meta);
  }

  meta.setAttribute("content", contenido);
}

function actualizarCanonical(url) {
  let canonical = document.head.querySelector(
    'link[rel="canonical"]'
  );

  if (!url) {
    canonical?.remove();
    return;
  }

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.append(canonical);
  }

  canonical.setAttribute("href", url);
}

export function actualizarMetadatosSEO(pathname) {
  const { ruta, metadatos, esRutaConocida } =
    obtenerMetadatosSEO(pathname);
  const urlCanonica =
    metadatos.indexable
      ? `${URL_SITIO}${ruta === "/" ? "/" : ruta}`
      : null;

  document.documentElement.lang = "es-CO";
  document.title = metadatos.title;

  actualizarMeta(
    "name",
    "description",
    metadatos.description
  );
  actualizarMeta(
    "name",
    "robots",
    metadatos.indexable
      ? "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
      : "noindex,follow"
  );

  actualizarCanonical(urlCanonica);

  if (metadatos.indexable) {
    actualizarMeta("property", "og:type", "website");
    actualizarMeta("property", "og:locale", "es_CO");
    actualizarMeta("property", "og:site_name", "Whaly Seguros");
    actualizarMeta("property", "og:title", metadatos.title);
    actualizarMeta(
      "property",
      "og:description",
      metadatos.description
    );
    actualizarMeta("property", "og:url", urlCanonica);
    actualizarMeta("name", "twitter:card", "summary");
    actualizarMeta("name", "twitter:title", metadatos.title);
    actualizarMeta(
      "name",
      "twitter:description",
      metadatos.description
    );
  } else {
    document.head
      .querySelectorAll(
        'meta[property^="og:"], meta[name^="twitter:"]'
      )
      .forEach((meta) => meta.remove());
  }

  const datosEstructurados =
    document.getElementById("whaly-structured-data");

  if (ruta === "/" && esRutaConocida) {
    const script =
      datosEstructurados || document.createElement("script");

    script.id = "whaly-structured-data";
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(
      obtenerDatosEstructuradosWhaly()
    ).replace(/</g, "\\u003c");

    if (!datosEstructurados) {
      document.head.append(script);
    }
  } else {
    datosEstructurados?.remove();
  }
}
