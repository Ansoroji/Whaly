import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {
  lazy,
  Suspense,
  useEffect,
} from "react";

import {
  Box,
} from "@chakra-ui/react";

import AppLayout
  from "./layouts/AppLayout";

import PublicLayout
  from "./layouts/PublicLayout";

import {
  actualizarMetadatosSEO,
} from "./utils/actualizarMetadatosSEO.js";

import "./App.css";

const PaginaInicio = lazy(
  () => import("./pages/PaginaInicio/PaginaInicio")
);
const SolucionesPersonas = lazy(
  () => import("./pages/SolucionesPersonas/SolucionesPersonas")
);
const SolucionesEmpresas = lazy(
  () => import("./pages/SolucionesEmpresas/SolucionesEmpresas")
);
const Personas = lazy(
  () => import("./pages/Personas/Personas")
);
const Empresas = lazy(
  () => import("./pages/Empresas/Empresas")
);
const Cuestionario = lazy(
  () => import("./pages/Cuestionario/Cuestionario")
);
const Perfil = lazy(
  () => import("./pages/Perfil/Perfil")
);
const NotFound = lazy(
  () => import("./pages/NotFound/NotFound")
);


function App() {

  const location =
    useLocation();


  useEffect(() => {

    if (
      !location?.pathname
    ) {
      return;
    }

    actualizarMetadatosSEO(location.pathname);

    if (location.hash) {
      const targetId =
        location.hash.slice(1);

      const animationFrame =
        window.requestAnimationFrame(() => {
          document
            .getElementById(targetId)
            ?.scrollIntoView();
        });

      return () =>
        window.cancelAnimationFrame(animationFrame);
    }

    window.scrollTo(0, 0);

  }, [
    location.pathname,
    location.hash,
  ]);


  return (

    <Suspense
      fallback={
        <Box
          as="main"
          role="status"
          aria-live="polite"
          minHeight="50vh"
          display="grid"
          placeItems="center"
          color="var(--whaly-purple)"
        >
          Cargando página…
        </Box>
      }
    >
      <Routes>
        <Route element={<AppLayout />}>
          <Route element={<PublicLayout />}>
            <Route
              path="/"
              element={<PaginaInicio />}
            />
            <Route
              path="/soluciones-personas"
              element={<SolucionesPersonas />}
            />
            <Route
              path="/personas"
              element={<Personas />}
            />
            <Route
              path="/soluciones-empresas"
              element={<SolucionesEmpresas />}
            />
            <Route
              path="/empresas"
              element={<Empresas />}
            />
          </Route>

          <Route
            path="/cuestionario"
            element={<Cuestionario />}
          />
          <Route
            path="/perfil"
            element={<Perfil />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
      </Routes>
    </Suspense>

  );

}


export default App;