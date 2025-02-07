import { useState } from "react";
import { getPilots } from "../api/api";

const Pilots = () => {
  const [id, setId] = useState("");
  const [pilot, setPilot] = useState(null);

  const fetchPilot = () => {
    getPilots(id)
      .then(setPilot)
      .catch(() => setPilot(null));
  };

  return (
    <div>
      <h1>Buscar Piloto</h1>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="ID del piloto"
      />
      <button onClick={fetchPilot}>Buscar</button>
      {pilot && (
        <div>
          <h2>{pilot.nombre}</h2>
          <p>Altura: {pilot.altura}</p>
          <p>Peso: {pilot.peso}</p>
          <p>Género: {pilot.genero}</p>
          <p>Planeta: {pilot.nombre_planeta_origen}</p>
        </div>
      )}
    </div>
  );
};

export default Pilots;
