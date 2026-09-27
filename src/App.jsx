import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {
  useEffect,
} from "react";

import Navbar
  from "./components/Navbar/Navbar";

import PaginaInicio
  from "./pages/PaginaInicio/PaginaInicio";

import SolucionesPersonas
  from "./pages/SolucionesPersonas/SolucionesPersonas";

import SolucionesEmpresas
  from "./pages/SolucionesEmpresas/SolucionesEmpresas";

import Personas
  from "./pages/Personas/Personas";

import Empresas
  from "./pages/Empresas/Empresas";

import Cuestionario
  from "./pages/Cuestionario/Cuestionario";

import Perfil
  from "./pages/Perfil/Perfil";

import "./App.css";


function App() {

  const location =
    useLocation();


  useEffect(() => {

    if (
      !location?.pathname
    ) {
      return;
    }


    window.scrollTo(
      0,
      0
    );

  }, [
    location.pathname,
  ]);


  return (

    <>

      <Navbar />


      <Routes>

        <Route
          path="/"
          element={
            <PaginaInicio />
          }
        />


        <Route
          path="/soluciones-personas"
          element={
            <SolucionesPersonas />
          }
        />


        <Route
          path="/personas"
          element={
            <Personas />
          }
        />


        <Route
          path="/soluciones-empresas"
          element={
            <SolucionesEmpresas />
          }
        />


        <Route
          path="/empresas"
          element={
            <Empresas />
          }
        />


        <Route
          path="/cuestionario"
          element={
            <Cuestionario />
          }
        />


        <Route
          path="/perfil"
          element={
            <Perfil />
          }
        />

      </Routes>

    </>

  );

}


export default App;