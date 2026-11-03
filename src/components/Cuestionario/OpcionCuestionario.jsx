function OpcionCuestionario({
  children,
  name,
  checked,
  seleccionada,
  deshabilitada = false,
  tipo = "radio",
  onChange,
}) {
  return (
    <label
      className={`whaly-choice${seleccionada ? " is-selected" : ""}${deshabilitada ? " is-disabled" : ""}`}
    >
      <input
        className="whaly-choice__input"
        type={tipo}
        name={name}
        checked={checked}
        disabled={deshabilitada}
        onChange={onChange}
      />
      <span className="whaly-choice__content">{children}</span>
    </label>
  );
}

export default OpcionCuestionario;