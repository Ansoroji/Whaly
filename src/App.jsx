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

import "./App.css";




function App() {
  return (
    <>

      {/*NAVBAR GLOBAL*/}
      <Navbar />


      {/*RUTAS*/}
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

      </Routes>

    </>
  );
}


export default App;