// src/pages/Calendrier.js
import React, { useState } from "react";
import cultures from "../data/calendrier.json";

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

// Pour simplifier, on mappe mois français en chiffre
const moisMap = {
  janvier: 0,
  février: 1,
  mars: 2,
  avril: 3,
  mai: 4,
  juin: 5,
  juillet: 6,
  août: 7,
  septembre: 8,
  octobre: 9,
  novembre: 10,
  décembre: 11,
};

function Calendrier() {
  const [moisSelectionne, setMoisSelectionne] = useState("mars");
  const [jourClique, setJourClique] = useState(null);

  // Génère les infos par jour
  const getJourInfo = (jour) => {
    const info = [];
    cultures.forEach((c) => {
      [
        "Semis en godet/alvéole",
        "Semis direct en terre",
        "Repiquage en godet",
        "Plantation en pleine terre",
        "Date de récolte",
      ].forEach((type) => {
        if (c[type]) {
          const regex = /(\d{1,2})\s+(\w+)/g;
          let match;
          while ((match = regex.exec(c[type])) !== null) {
            const day = parseInt(match[1], 10);
            const month = match[2].toLowerCase();
            if (month === moisSelectionne && day === jour) {
              let action = "";
              switch (type) {
                case "Semis en godet/alvéole":
                case "Semis direct en terre":
                  action = "Semis 🌱";
                  break;
                case "Repiquage en godet":
                case "Plantation en pleine terre":
                  action = "Plantation 🌿";
                  break;
                case "Date de récolte":
                  action = "Récolte 🥕";
                  break;
                default:
                  break;
              }
              info.push({ nom: c["Nom / Variété"], action });
            }
          }
        }
      });
    });
    return info;
  };

  // Générer la structure des semaines du mois
  const firstDay = new Date(2023, moisMap[moisSelectionne], 1).getDay(); // 0 = dimanche
  const lastDay = new Date(2023, moisMap[moisSelectionne] + 1, 0).getDate(); // dernier jour du mois
  const semaines = [];
  let semaine = Array(firstDay).fill(null); // compléter le début avec des cases vides

  for (let d = 1; d <= lastDay; d++) {
    semaine.push(d);
    if (semaine.length === 7 || d === lastDay) {
      while (semaine.length < 7) semaine.push(null);
      semaines.push(semaine);
      semaine = [];
    }
  }

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#2a7f32" }}>
        📅 Calendrier interactif
      </h1>

      <div style={{ textAlign: "center", margin: "20px 0" }}>
        <label>Mois: </label>
        <select
          value={moisSelectionne}
          onChange={(e) => {
            setMoisSelectionne(e.target.value);
            setJourClique(null);
          }}
        >
          {moisNoms.map((m) => (
            <option key={m} value={m}>
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7,1fr)",
          gap: "2px",
          background: "#ccc",
        }}
      >
        {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((j) => (
          <div
            key={j}
            style={{
              padding: "10px",
              background: "#eee",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {j}
          </div>
        ))}
      </div>

      {semaines.map((s, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7,1fr)",
            gap: "2px",
          }}
        >
          {s.map((jour, idx) => {
            const info = jour ? getJourInfo(jour) : [];
            return (
              <div
                key={idx}
                onClick={() =>
                  jour && info.length > 0 ? setJourClique({ jour, info }) : null
                }
                style={{
                  minHeight: "80px",
                  padding: "5px",
                  background: "#fff",
                  border: "1px solid #ddd",
                  position: "relative",
                  cursor: info.length > 0 ? "pointer" : "default",
                  overflow: "hidden",
                }}
              >
                {jour && <div style={{ fontWeight: "bold" }}>{jour}</div>}
                {info.map((i, idx) => (
                  <div
                    key={idx}
                    style={{
                      fontSize: "10px",
                      background: i.action.includes("Semis")
                        ? "#d1e7dd"
                        : i.action.includes("Plantation")
                        ? "#ffe5b4"
                        : "#f8d7da",
                      margin: "1px 0",
                      padding: "2px",
                      borderRadius: "3px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {i.nom} ({i.action})
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      ))}

      {jourClique && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
          onClick={() => setJourClique(null)}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              minWidth: "300px",
              maxWidth: "500px",
              boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ marginTop: 0 }}>Jour {jourClique.jour}</h2>
            {jourClique.info.map((i, idx) => (
              <div key={idx} style={{ marginBottom: "10px" }}>
                <strong>{i.action}</strong>: {i.nom}
              </div>
            ))}
            <button
              onClick={() => setJourClique(null)}
              style={{ marginTop: "10px", padding: "5px 10px" }}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendrier;
