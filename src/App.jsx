import './App.css'

function App() {
  return (
    <div className="landing-container">
      {/* Navbar Header */}
      <header className="navbar">
        <div className="logo">
          <span className="logo-text">whaly</span>
        </div>
        <nav className="nav-links">
          <a href="#inicio">Inicio</a>
          <a href="#servicios">Servicios</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <button className="btn-contact">Escríbenos</button>
      </header>
      

      {/* Hero Section */}
      <main className="hero">
        <span className="greeting">HELLOOO ¿CÓMO VAS?</span>
        
        <h1 className="title">
          Bienvenido a <br />
          <span className="brand-highlight">Whaly</span>
        </h1>

        <p className="subtitle">
          La agencia de seguros más cool de Colombia
        </p>

        <p className="description">
          Tenemos más de 30 años de experiencia ayudando a las personas
        </p>

        {/* Botones de Acción */}
        <div className="button-group">
          <button className="btn-primary">Soluciones para personas</button>
          <button className="btn-secondary">Soluciones para empresas</button>
        </div>
      </main>
    </div>
  )
}

export default App