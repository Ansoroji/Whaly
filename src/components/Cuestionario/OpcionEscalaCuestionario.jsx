function OpcionEscalaCuestionario({
  valor,
  nombre,
  seleccionada,
  etiqueta,
  onChange,
}) {
  return (
    <label className={`whaly-scale-choice${seleccionada ? " is-selected" : ""}`}>
      <input
        className="whaly-choice__input"
        type="radio"
        name={nombre}
        value={valor}
        checked={seleccionada}
        onChange={onChange}
      />
      <span className="whaly-scale-choice__number">{valor}</span>
      <span className="whaly-scale-choice__label">{etiqueta}</span>
    </label>
  );
}

export default OpcionEscalaCuestionario;