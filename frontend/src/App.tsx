import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui"; // Removed unused Button import
import axios from 'axios';

function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Star Wars Inventory</h1>
      <p>Bienvenido al sistema de inventario del Imperio Galáctico.</p>
      <nav className="mt-4">
        <Link to="/ships" className="text-blue-600 underline mr-4">Ver Naves</Link>
        <Link to="/pilots" className="text-blue-600 underline">Ver Pilotos</Link>
      </nav>
    </div>
  );
}

function Ships() {
  const [ships, setShips] = useState([]);

  useEffect(() => {
    axios.get('/api/nave-general')
      .then(response => {
        if (Array.isArray(response.data)) {
          setShips(response.data);
        } else {
          console.error('La respuesta de la API no es un array:', response.data);
        }
      })
      .catch(error => console.error('Error al cargar naves:', error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Listado de Naves</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {ships.map((ship) => (
          <Card key={ship.id} className="shadow-lg p-4"> {/* Use a unique identifier for key */}
            <CardContent>
              <h3 className="text-lg font-bold">{ship.nombre}</h3>
              <p>Modelo: {ship.modelo}</p>
              <p>Costo: {ship.costo}</p>
              <p>Velocidad: {ship.velocidad}</p>
              <Link to={`/ship/${ship.id}`} className="text-blue-600 underline mt-2">Ver Detalles</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ShipDetails({ id }) {
  const [ship, setShip] = useState(null);

  useEffect(() => {
    axios.get(`/api/nave-especifica/${id}`)
      .then(response => setShip(response.data))
      .catch(error => console.error('Error al cargar detalles:', error));
  }, [id]);

  if (!ship) return <p>Cargando...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Detalles de la Nave</h2>
      <p>Nombre: {ship.nombre}</p>
      <p>Modelo: {ship.modelo}</p>
      <p>Costo: {ship.costo}</p>
      <p>Velocidad: {ship.velocidad}</p>
      <p>Capacidad de personal: {ship.capacidad_personal}</p>
      <p>Capacidad de pasajeros: {ship.capacidad_pasajeros}</p>
    </div>
  );
}

function Pilots() {
  const [pilots, setPilots] = useState([]);

  useEffect(() => {
    axios.get('/api/piloto/1') // Aquí se puede ajustar para obtener múltiples pilotos.
      .then(response => setPilots([response.data]))
      .catch(error => console.error('Error al cargar pilotos:', error));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Listado de Pilotos</h2>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {pilots.map((pilot) => (
          <Card key={pilot.id} className="shadow-lg p-4"> {/* Use a unique identifier for key */}
            <CardContent>
              <h3 className="text-lg font-bold">{pilot.nombre}</h3>
              <p>Altura: {pilot.altura}</p>
              <p>Género: {pilot.genero}</p>
              <p>Peso: {pilot.peso}</p>
              <p>Año de nacimiento: {pilot.año_nacimiento}</p>
              <p>Especie: {pilot.nombre_especie}</p>
              <p>Planeta de origen: {pilot.nombre_planeta_origen}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ships" element={<Ships />} />
        <Route path="/ship/:id" element={<ShipDetails />} />
        <Route path="/pilots" element={<Pilots />} />
      </Routes>
    </Router>
  );
}

export default App;