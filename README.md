# Whaly

Aplicación web de seguros desarrollada con React y Vite.

## Requisitos

- Node.js 20.19+ o 22.12+
- npm

## Desarrollo local

```sh
npm install
npm run dev
```

## Comprobaciones

```sh
npm run lint
npm test
npm run build
```

- ESLint revisa el código de la aplicación y las pruebas.
- Las pruebas unitarias usan el runner integrado de Node.js; no requieren instalar un framework de testing.
- La compilación de producción genera sus archivos en `dist`.

## Organización de `src`

- `layouts/`: composición compartida de navegación, contenido público y footer.
- `pages/`: vistas asociadas a rutas.
- `components/`: componentes reutilizables de interfaz, organizados por dominio.
- `datos/`: contenido y configuración del cuestionario, perfiles y seguros.
- `hooks/`: lógica reutilizable basada en hooks de React.
- `utils/`: cálculo de perfiles, selección de preguntas y validación/persistencia del perfil.

Las pruebas en `tests/` cubren el cálculo de puntajes, las modalidades del cuestionario y la validación del perfil persistido.
