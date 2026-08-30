import { Button } from "@chakra-ui/react";

import "./Navbar.css";


function Navbar() {
  const navLinks = [
    {
      id: 1,
      label: "Inicio",
      href: "/",
    },
    {
      id: 2,
      label: "Servicios",
      href: "/#servicios",
    },
    {
      id: 3,
      label: "Contacto",
      href: "/#contacto",
    },
  ];


  return (
    <nav className="navbar navbar-expand-lg whaly-navbar">

      <div className="container-fluid whaly-navbar__container">

        {/* =========================
            LOGO
        ========================= */}
        <a
          className="navbar-brand whaly-navbar__brand"
          href="/"
        >
          whaly
        </a>


        {/* =========================
            BOTÓN MENÚ MÓVIL
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

          {/* ENLACES */}
          <div className="navbar-nav mx-auto whaly-navbar__links">

            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="nav-link whaly-navbar__link"
              >
                {link.label}
              </a>
            ))}

          </div>


          {/* =========================
              BOTÓN CONTACTO
          ========================= */}
          <div className="whaly-navbar__actions">

            <Button
              asChild
              background="var(--whaly-mint)"
              color="var(--whaly-purple)"
              borderRadius="12px"
              paddingInline="28px"
              height="50px"
              fontWeight="700"
              border="none"
              _hover={{
                background: "var(--whaly-white)",
                color: "var(--whaly-purple)",
                transform: "translateY(-2px)",
              }}
            >
              <a href="/#contacto">
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