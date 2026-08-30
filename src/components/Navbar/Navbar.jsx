import { Button } from "@chakra-ui/react";
import "./Navbar.css";


const navLinks = [
  {
    label: "Inicio",
    href: "#inicio",
  },
  {
    label: "Servicios",
    href: "#servicios",
  },
  {
    label: "Contacto",
    href: "#contacto",
  },
];


function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg whaly-navbar">

      <div className="container-fluid whaly-navbar__container">

        {/* =========================
            LOGO
        ========================= */}

        <a
          className="navbar-brand whaly-navbar__brand"
          href="#inicio"
        >
          whaly
        </a>


        {/* =========================
            BOTON HAMBURGUESA
        ========================= */}

        <button
          className="navbar-toggler whaly-navbar__toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#whalyNavbar"
          aria-controls="whalyNavbar"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>


        {/* =========================
            CONTENIDO DEL NAVBAR
        ========================= */}

        <div
          className="collapse navbar-collapse"
          id="whalyNavbar"
        >

          {/* LINKS */}

          <div className="navbar-nav mx-auto whaly-navbar__links">

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link whaly-navbar__link"
              >
                {link.label}
              </a>
            ))}

          </div>


          {/* BOTON ESCRIBENOS */}

          <div className="whaly-navbar__actions">

            <Button
              asChild
              className="whaly-navbar__contact-button"
              background="var(--whaly-mint)"
              color="var(--whaly-purple)"
              borderRadius="12px"
              paddingInline="28px"
              height="50px"
              fontWeight="700"
              _hover={{
                background: "var(--whaly-white)",
                color: "var(--whaly-purple)",
              }}
            >
              <a href="#contacto">
                Escríbenos
              </a>
            </Button>

          </div>

        </div>

      </div>

    </nav>
  );
}


export default Navbar;