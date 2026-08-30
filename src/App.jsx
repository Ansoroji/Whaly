import Navbar from "./components/Navbar/Navbar";

import "./App.css";


function App() {
  return (
    <div className="landing-container">

      <Navbar />


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


        <div className="button-group">

          <button className="btn-personas">
            Soluciones para personas
          </button>

          <button className="btn-empresas">
            Soluciones para empresas
          </button>

        </div>

      </main>

    </div>
  );
}


export default App;