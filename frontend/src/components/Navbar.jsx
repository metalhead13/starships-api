import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/ships">Naves</Link>
        </li>
        <li>
          <Link to="/pilots">Pilotos</Link>
        </li>
        <li>
          <Link to="/update-ship">Actualizar Nave</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
