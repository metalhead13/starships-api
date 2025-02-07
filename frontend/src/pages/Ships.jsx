import { useEffect, useState } from "react";
import { getShips } from "../api/api";

const Ships = () => {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    getShips().then(setShips);
  }, []);

  return (
    <div>
      <h1>Lista de Naves</h1>
      <ul>
        {ships.map((ship, index) => (
          <li key={index}>
            <strong>{ship.nombre}</strong> - {ship.modelo} - Costo: {ship.costo}{" "}
            - Velocidad: {ship.velocidad}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ships;
