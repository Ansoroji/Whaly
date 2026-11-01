import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  useState,
} from "react";

import { obtenerUsuarioWhaly } from "../../utils/perfilStorage.js";
import "./Navbar.css";

function Navbar() {
  const [menuAbierto, setMenuAbierto] =
    useState(false);

  const usuarioTienePerfil =
    obtenerUsuarioWhaly()?.cuestionarioCompletado === true;

  const navLinks = [
    {
      id: 1,
      label: "Inicio",
      to: "/",
    },
    {
      id: 2,
      label: "Servicios",
      to: "/#servicios",
    },
    {
      id: 3,
      label: "Contacto",
      to: "/#contacto",
    },
  ];

  return (
    <nav
      className="navbar navbar-expand-lg whaly-navbar"
      aria-label="Navegación principal"
    >
      <div className="container-fluid whaly-navbar__container">

        {/* LOGO */}
        <Link
          className="navbar-brand whaly-navbar__brand"
          to="/"
          aria-label="Whaly, inicio"
        >
          whaly
        </Link>

        {/* BOTÓN MENÚ MÓVIL */}
        <button
          className="navbar-toggler whaly-navbar__toggler"
          type="button"
          onClick={() =>
            setMenuAbierto((abierto) => !abierto)
          }
          aria-controls="whalyNavbar"
          aria-expanded={menuAbierto}
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* CONTENIDO DEL NAVBAR */}
        <div
          className={`collapse navbar-collapse${menuAbierto ? " show" : ""}`}
          id="whalyNavbar"
        >
          {/* ENLACES */}
          <div className="navbar-nav mx-auto whaly-navbar__links">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.to}
                className="nav-link whaly-navbar__link"
                onClick={() => setMenuAbierto(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* BOTÓN CONTACTO */}
          <div className="whaly-navbar__actions">
            <Button
              className="whaly-button-raised"
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
              <Link
                to={usuarioTienePerfil ? "/perfil" : "/cuestionario"}
                onClick={() => setMenuAbierto(false)}
              >
                {usuarioTienePerfil ? "Mi perfil" : "Hacer cuestionario"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;