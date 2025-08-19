// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home" style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🌱 Bienvenue sur Anass au Potager</h1>
      <p>
        Ton assistant pour semer, arroser et récolter ton potager en toute
        simplicité.
      </p>
      <Link to="/potager">
        <button
          style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px" }}
        >
          Aller à mon potager
        </button>
      </Link>
    </div>
  );
}

export default Home;
