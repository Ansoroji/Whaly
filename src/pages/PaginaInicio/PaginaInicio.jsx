import { Link } from "react-router-dom";

import SeccionServicios from "../../components/SeccionServicios/SeccionServicios";
import SeccionContacto from "../../components/SeccionContacto/SeccionContacto";
import Footer from "../../components/Footer/Footer";

function PaginaInicio() {
  return (
    <div className="landing-container">
      {/* HERO */}
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

        {/* BOTONES */}
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

export default PaginaInicio;