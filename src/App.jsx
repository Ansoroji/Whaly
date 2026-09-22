import {
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import PaginaInicio from "./pages/PaginaInicio/PaginaInicio";
import SolucionesPersonas from "./pages/SolucionesPersonas/SolucionesPersonas";
import SolucionesEmpresas from "./pages/SolucionesEmpresas/SolucionesEmpresas";
import Personas from "./pages/Personas/Personas";
import Empresas from "./pages/Empresas/Empresas";
import Cuestionario from "./pages/Cuestionario/Cuestionario";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./App.css";


function App() {
  const location = useLocation();

  useEffect(() => {
    if (!location?.pathname) return;

    window.scrollTo(0, 0);
  }, [location.pathname]);


  return (
    <>

      {/* NAVBAR GLOBAL */}
      <Navbar />


      {/* RUTAS */}
      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<PaginaInicio />}
        />


        {/* EXPLICACIÓN PERSONAS */}
        <Route
          path="/soluciones-personas"
          element={<SolucionesPersonas />}
        />


        {/* CATÁLOGO PERSONAS */}
        <Route
          path="/personas"
          element={<Personas />}
        />


        {/* EXPLICACIÓN EMPRESAS */}
        <Route
          path="/soluciones-empresas"
          element={<SolucionesEmpresas />}
        />


        {/* CATÁLOGO EMPRESAS */}
        <Route
          path="/empresas"
          element={<Empresas />}
        />


        {/* CUESTIONARIO */}
        <Route
          path="/Cuestionario"
          element={<Cuestionario />}
        />

      </Routes>

    </>
  );
}


export default App;