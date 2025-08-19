// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      className="home"
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
        lineHeight: 1.6,
      }}
    >
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1>🌱 Anass au Potager</h1>
        <p style={{ fontSize: "1.2em", color: "#555" }}>
          Ton compagnon pour semer, entretenir et récolter ton potager, au
          rythme des saisons.
        </p>
      </header>

      {/* Navigation menu */}
      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#2a7f32",
            fontWeight: "bold",
          }}
        >
          Accueil
        </Link>
        <Link
          to="/calendrier"
          style={{ textDecoration: "none", color: "#2a7f32" }}
        >
          Calendrier
        </Link>
        <Link
          to="/ressources"
          style={{ textDecoration: "none", color: "#2a7f32" }}
        >
          Ressources
        </Link>
      </nav>

      {/* Intro Section */}
      <section style={{ marginBottom: "30px" }}>
        <h2>Le potager de tes rêves</h2>
        <p>
          Ici, retrouve des conseils personnalisés mois par mois pour semer,
          planter et récolter au meilleur moment. Tout est là pour te guider pas
          à pas, même si tu débutes.
        </p>
      </section>

      {/* Aperçu Calendrier */}
      <section
        style={{
          marginBottom: "30px",
          background: "#f0f8f0",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h3>Calendrier du potager</h3>
        <p>
          Chaque mois, découvre quoi semer, planter, récolter ou préparer pour
          faire fructifier ton potager efficacement.
        </p>
        <Link to="/calendrier">
          <button
            style={{
              padding: "10px 20px",
              fontSize: "1em",
              background: "#2a7f32",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Voir le calendrier
          </button>
        </Link>
      </section>

      {/* Ressources recommandées */}
      <section style={{ marginBottom: "30px" }}>
        <p style={{ fontSize: "0.9em", color: "#666" }}>
          [À venir : fiches pratiques, articles et guides facilement
          consultables]
        </p>
      </section>

      {/* Call to Action */}
      <section style={{ textAlign: "center", marginTop: "40px" }}>
        <Link to="/potager">
          <button
            style={{
              padding: "15px 30px",
              fontSize: "1.1em",
              background: "#2a7f32",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Accéder à mon potager
          </button>
        </Link>
      </section>
    </div>
  );
}

export default Home;
