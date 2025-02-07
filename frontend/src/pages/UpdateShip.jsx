import { useState } from "react";
import { updateShip } from "../api/api";

const UpdateShip = () => {
  const [nombre, setNombre] = useState("");
  const [costo, setCosto] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = () => {
    updateShip(nombre, {
      nombre,
      modelo: "Desconocido",
      costo,
      velocidad: "Desconocido",
      capacidad_personal: "N/A",
      capacidad_pasajeros: "N/A",
      pilotos_asignados: [],
    })
      .then(() => setMensaje("Nave actualizada con éxito"))
      .catch(() => setMensaje("Error al actualizar"));
  };

  return (
    <div>
      <h1>Actualizar Nave</h1>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre de la nave"
      />
      <input
        type="text"
        value={costo}
        onChange={(e) => setCosto(e.target.value)}
        placeholder="Costo"
      />
      <button onClick={handleSubmit}>Actualizar</button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default UpdateShip;
