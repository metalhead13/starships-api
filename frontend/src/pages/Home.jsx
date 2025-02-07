import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
      <div>
        <h1>Welcome to the Home Page</h1>
        <nav>
          <ul>
            <li>
              <Link to="/ships">Ships</Link>
            </li>
            <li>
              <Link to="/pilots">Pilots</Link>
            </li>
            <li>
              <Link to="/update-ship">Update Ship</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
  
  export default Home;