import React, { useState } from "react";
import cultures from "../data/calendrier.json";
import "./Calendrier.css";

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

  const getJourInfo = (jour) => {
    const actions = {};
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
              if (!actions[action]) actions[action] = [];
              actions[action].push(c["Nom / Variété"]);
            }
          }
        }
      });
    });
    return actions;
  };

  const firstDay = new Date(2023, moisMap[moisSelectionne], 1).getDay();
  const lastDay = new Date(2023, moisMap[moisSelectionne] + 1, 0).getDate();
  const semaines = [];
  let semaine = Array(firstDay).fill(null);

  for (let d = 1; d <= lastDay; d++) {
    semaine.push(d);
    if (semaine.length === 7 || d === lastDay) {
      while (semaine.length < 7) semaine.push(null);
      semaines.push(semaine);
      semaine = [];
    }
  }

  return (
    <div className="calendar-container">
      <h1>📅 Calendrier Interactif</h1>

      {/* Navbar pour les mois */}
      <div className="month-navbar">
        {moisNoms.map((m) => (
          <button
            key={m}
            className={moisSelectionne === m ? "active" : ""}
            onClick={() => {
              setMoisSelectionne(m);
              setJourClique(null);
            }}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      <div className="calendar">
        <div className="calendar-header">
          {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((d) => (
            <div key={d} className="calendar-header-day">
              {d}
            </div>
          ))}
        </div>

        <div className="calendar-body">
          {semaines.map((s, i) => (
            <div key={i} className="calendar-week">
              {s.map((jour, idx) => {
                if (!jour)
                  return <div key={idx} className="calendar-day empty"></div>;
                const actions = getJourInfo(jour);
                return (
                  <div
                    key={idx}
                    className={`calendar-day ${
                      Object.keys(actions).length > 0 ? "has-event" : ""
                    }`}
                    onClick={() =>
                      Object.keys(actions).length > 0 &&
                      setJourClique({ jour, actions })
                    }
                  >
                    <div className="day-number">{jour}</div>
                    {Object.keys(actions).map((a) => (
                      <span
                        key={a}
                        className={`event-badge ${a
                          .replace(" ", "-")
                          .toLowerCase()}`}
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {jourClique && (
        <div className="popup-overlay" onClick={() => setJourClique(null)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Jour {jourClique.jour}</h2>
            {Object.entries(jourClique.actions).map(([action, cultures]) => (
              <div key={action}>
                <strong>{action}</strong> : {cultures.join(", ")}
              </div>
            ))}
            <button onClick={() => setJourClique(null)}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendrier;
