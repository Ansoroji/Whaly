import {
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import SeccionServicios from "./components/SeccionServicios/SeccionServicios";
import SeccionContacto from "./components/SeccionContacto/SeccionContacto";
import Footer from "./components/Footer/Footer";

import SolucionesPersonas from "./pages/SolucionesPersonas/SolucionesPersonas";
import SolucionesEmpresas from "./pages/SolucionesEmpresas/SolucionesEmpresas";

import Personas from "./pages/Personas/Personas";
import Empresas from "./pages/Empresas/Empresas";

import "./App.css";


function PaginaInicio() {
  return (
    <div className="landing-container">

      {/* =========================
          HERO
      ========================= */}
      <main
        className="hero"
        id="inicio"
      >
        <span className="greeting">
          HELLOOO ¿CÓMO VAS?
        </span>

        <h1 className="title">
          Bienvenido a
          <br />

          <span className="brand-highlight">
            Whaly
          </span>
        </h1>

        <p className="subtitle">
          La agencia de seguros más cool de Colombia
        </p>

        <p className="description">
          Tenemos más de 30 años de experiencia ayudando a las personas
        </p>


        {/* =========================
            BOTONES
        ========================= */}
        <div className="button-group">

          <Link
            to="/soluciones-personas"
            className="btn-personas"
          >
            Soluciones para personas
          </Link>

          <Link
            to="/soluciones-empresas"
            className="btn-empresas"
          >
            Soluciones para empresas
          </Link>

        </div>

      </main>


      <SeccionServicios />

      <SeccionContacto />

      <Footer />

    </div>
  );
}


function App() {
  return (
    <>

      {/* =========================
          NAVBAR GLOBAL
      ========================= */}
      <Navbar />


      {/* =========================
          RUTAS
      ========================= */}
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