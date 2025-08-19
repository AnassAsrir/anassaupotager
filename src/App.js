// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Potager from "./pages/Potager";
import Calendrier from "./pages/Calendrier";

function App() {
  return (
    <Router>
      {/* Navbar simple */}
      <nav
        style={{ background: "#2a7f32", padding: "10px", textAlign: "center" }}
      >
        <Link to="/" style={linkStyle}>
          Accueil
        </Link>
        <Link to="/potager" style={linkStyle}>
          Mon Potager
        </Link>
        <Link to="/calendrier" style={linkStyle}>
          Calendrier
        </Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/potager" element={<Potager />} />
        <Route path="/calendrier" element={<Calendrier />} />
      </Routes>
    </Router>
  );
}

const linkStyle = {
  color: "white",
  margin: "0 15px",
  textDecoration: "none",
  fontWeight: "bold",
};

export default App;
