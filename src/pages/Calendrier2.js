// src/pages/Calendrier.js
import React from "react";
import cultures from "../data/calendrier.json";

function Calendrier() {
  const moisNoms = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  // Crée un objet vide pour chaque mois
  const initMois = () => {
    const obj = {};
    moisNoms.forEach((mois) => {
      obj[mois] = [];
    });
    return obj;
  };

  const semis = initMois();
  const plantation = initMois();
  const recolte = initMois();

  cultures.forEach((c) => {
    // Semis en godet/alvéole
    if (c["Semis en godet/alvéole"]) {
      const mois = c["Semis en godet/alvéole"].split(" ")[1]?.toLowerCase();
      if (mois && semis[mois]) semis[mois].push(c["Nom / Variété"]);
    }
    // Semis direct en terre
    if (c["Semis direct en terre"]) {
      const mois = c["Semis direct en terre"].split(" ")[1]?.toLowerCase();
      if (mois && semis[mois]) semis[mois].push(c["Nom / Variété"]);
    }
    // Repiquage en godet
    if (c["Repiquage en godet"]) {
      const mois = c["Repiquage en godet"].split(" ")[1]?.toLowerCase();
      if (mois && plantation[mois]) plantation[mois].push(c["Nom / Variété"]);
    }
    // Plantation en pleine terre
    if (c["Plantation en pleine terre"]) {
      const mois = c["Plantation en pleine terre"].split(" ")[1]?.toLowerCase();
      if (mois && plantation[mois]) plantation[mois].push(c["Nom / Variété"]);
    }
    // Récolte
    if (c["Date de récolte"]) {
      const dates = c["Date de récolte"].split("-");
      if (dates.length === 2) {
        const startMonth = dates[0].trim().split(" ")[1]?.toLowerCase();
        const endMonth = dates[1].trim().split(" ")[1]?.toLowerCase();
        const startIndex = moisNoms.indexOf(startMonth);
        const endIndex = moisNoms.indexOf(endMonth);
        if (startIndex !== -1 && endIndex !== -1) {
          for (let i = startIndex; i <= endIndex; i++) {
            recolte[moisNoms[i]].push(c["Nom / Variété"]);
          }
        }
      }
    }
  });

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        📆 Vue calendrier (adaptée à Reims)
      </h1>
      <p style={{ textAlign: "center", marginBottom: "40px", color: "#555" }}>
        Visualise mois par mois ce qu’il faut semer, planter ou récolter.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {moisNoms.map((mois) => (
          <div
            key={mois}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "20px",
              background: "#f9f9f9",
            }}
          >
            <h2
              style={{
                textTransform: "capitalize",
                textAlign: "center",
                color: "#2a7f32",
              }}
            >
              {mois}
            </h2>
            <div>
              <strong>🌱 Semis :</strong>
              <ul>
                {semis[mois].length > 0 ? (
                  semis[mois].map((item, i) => <li key={i}>{item}</li>)
                ) : (
                  <li>Aucun</li>
                )}
              </ul>
            </div>
            <div>
              <strong>🌿 Plantation :</strong>
              <ul>
                {plantation[mois].length > 0 ? (
                  plantation[mois].map((item, i) => <li key={i}>{item}</li>)
                ) : (
                  <li>Aucune</li>
                )}
              </ul>
            </div>
            <div>
              <strong>🥕 Récolte :</strong>
              <ul>
                {recolte[mois].length > 0 ? (
                  recolte[mois].map((item, i) => <li key={i}>{item}</li>)
                ) : (
                  <li>Aucune</li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendrier;
