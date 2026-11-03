import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  METADATOS_POR_RUTA,
  RUTAS_PUBLICAS_INDEXABLES,
  URL_SITIO,
  obtenerDatosEstructuradosWhaly,
  obtenerMetadatosSEO,
} from "../src/datos/metadatosSEO.js";

test("cada página pública tiene título y descripción únicos", () => {
  const paginasPublicas = Object.values(METADATOS_POR_RUTA)
    .filter((pagina) => pagina.indexable);
  const titulos = paginasPublicas.map((pagina) => pagina.title);

  assert.equal(new Set(titulos).size, paginasPublicas.length);

  for (const pagina of paginasPublicas) {
    assert.ok(pagina.title.length > 10);
    assert.ok(pagina.description.length >= 100);
    assert.ok(pagina.description.length <= 170);
  }
});

test("el cuestionario público es indexable y el perfil o rutas desconocidas no", () => {
  assert.equal(
    obtenerMetadatosSEO("/cuestionario").metadatos.indexable,
    true
  );
  assert.equal(
    obtenerMetadatosSEO("/perfil").metadatos.indexable,
    false
  );
  assert.equal(
    obtenerMetadatosSEO("/ruta-inexistente").metadatos.indexable,
    false
  );
});

test("el sitemap contiene todas y solo las rutas públicas indexables", async () => {
  const sitemap = await readFile(
    new URL("../public/sitemap.xml", import.meta.url),
    "utf8"
  );
  const rutasEnSitemap = [
    ...sitemap.matchAll(
      /<loc>https:\/\/whaly-7d8e3\.web\.app(.*?)<\/loc>/g
    ),
  ].map(([, ruta]) => ruta || "/");
  const rutasEsperadas = RUTAS_PUBLICAS_INDEXABLES
    .map((ruta) => (ruta === "/" ? "/" : ruta))
    .sort();

  assert.deepEqual(rutasEnSitemap.sort(), rutasEsperadas);
  assert.ok(sitemap.includes("/cuestionario"));
  assert.ok(!sitemap.includes("/perfil"));
});

test("los datos estructurados usan información pública de Whaly", () => {
  const datos = obtenerDatosEstructuradosWhaly();

  assert.equal(datos.url, `${URL_SITIO}/`);
  assert.equal(datos.telephone, "+573163206697");
  assert.equal(datos.email, "comercial@whalyseguros.com");
  assert.equal(datos.areaServed.name, "Colombia");
});
