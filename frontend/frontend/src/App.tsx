import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Ships from "./pages/Ships";
import Pilots from "./pages/Pilots";
import UpdateShip from "./pages/UpdateShip";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ships" element={<Ships />} />
        <Route path="/pilots" element={<Pilots />} />
        <Route path="/update-ship" element={<UpdateShip />} />
      </Routes>
    </Router>
  );
}

export default App;
