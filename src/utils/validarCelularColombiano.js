export function esCelularColombianoValido(telefono) {
  return (
    typeof telefono === "string" &&
    /^3\d{9}$/.test(telefono) &&
    !/^(\d)\1{9}$/.test(telefono)
  );
}
