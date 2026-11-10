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
      className="whaly-navbar"
      aria-label="Navegación principal"
    >
      <div className="whaly-navbar__container">

        {/* LOGO */}
        <Link
          className="whaly-navbar__brand"
          to="/"
          aria-label="Whaly, inicio"
        >
          <img
            className="whaly-navbar__brand-mark"
            src="/images/brand/whaly-mark-mint.png"
            alt=""
            aria-hidden="true"
          />
          <span>whaly</span>
        </Link>

        {/* BOTÓN MENÚ MÓVIL */}
        <button
          className="whaly-navbar__toggler"
          type="button"
          onClick={() =>
            setMenuAbierto((abierto) => !abierto)
          }
          aria-controls="whalyNavbar"
          aria-expanded={menuAbierto}
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
        >
          <span className="whaly-navbar__icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        {/* CONTENIDO DEL NAVBAR */}
        <div
          className={`whaly-navbar__content${menuAbierto ? " is-open" : ""}`}
          id="whalyNavbar"
        >
          {/* ENLACES */}
          <div className="whaly-navbar__links">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.to}
                className="whaly-navbar__link"
                onClick={() => setMenuAbierto(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* BOTÓN CONTACTO */}
          <div className="whaly-navbar__actions">
            <Button
              className="whaly-navbar__contact-button whaly-button-raised"
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