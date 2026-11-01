import { Link } from "react-router-dom";

import SeccionServicios from "../../components/SeccionServicios/SeccionServicios";
import SeccionContacto from "../../components/SeccionContacto/SeccionContacto";

function PaginaInicio() {
  return (
    <main className="landing-container">
      <section
        className="hero"
        id="inicio"
        aria-labelledby="inicio-titulo"
      >
        <span className="greeting">
          HELLOOO ¿CÓMO VAS?
        </span>

        <h1 className="title" id="inicio-titulo">
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
      </section>

      <SeccionServicios />
      <SeccionContacto />
    </main>
  );
}

export default PaginaInicio;