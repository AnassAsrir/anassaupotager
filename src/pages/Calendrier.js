// src/pages/Calendrier.js
import React, { useState } from "react";
import cultures from "../data/calendrier.json";
import "../styles/Calendrier.css";
import "../styles/Modal.css";

// ==== Composants réutilisables ====
const Header = ({ title }) => (
  <header className="calendar-header-main">
    <h1>{title}</h1>
  </header>
);

const MonthNav = ({ months, selectedMonth, onSelectMonth }) => (
  <nav className="month-nav">
    {months.map((m) => (
      <button
        key={m}
        className={`month-btn ${m === selectedMonth ? "active" : ""}`}
        onClick={() => onSelectMonth(m)}
      >
        {m.charAt(0).toUpperCase() + m.slice(1)}
      </button>
    ))}
  </nav>
);

const DayCell = ({ day, infos, onClick }) => {
  return (
    <div
      className={`calendar-day ${infos.length > 0 ? "has-event" : ""}`}
      onClick={() => infos.length > 0 && onClick(day, infos)}
    >
      {day && <div className="day-number">{day}</div>}
      {/* Affiche juste les types d'événements sur la case */}
      {["Semis 🌱", "Plantation 🌿", "Récolte 🥕"].map((action, idx) =>
        infos.some((i) => i.action === action) ? (
          <span
            key={idx}
            className={`event-badge ${
              action === "Semis 🌱"
                ? "event-semis"
                : action === "Plantation 🌿"
                ? "event-plantation"
                : "event-recolte"
            }`}
          >
            {action}
          </span>
        ) : null
      )}
    </div>
  );
};

const Modal = ({ day, data, onClose }) => {
  const actions = Object.keys(data);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content modal-grid"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Jour {day}
        </h2>
        <div className="modal-columns">
          {actions.map((action) => (
            <div
              key={action}
              className={`modal-column ${
                action === "Semis 🌱"
                  ? "event-semis"
                  : action === "Plantation 🌿"
                  ? "event-plantation"
                  : "event-recolte"
              }`}
            >
              <h3>{action}</h3>
              <ul>
                {data[action].map((famille, idx) => (
                  <li key={idx}>{famille}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={onClose} className="close-btn">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

// ==== Calendrier principal ====
export const Calendrier = () => {
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

  const moisMap = moisNoms.reduce((acc, m, i) => ({ ...acc, [m]: i }), {});

  const [moisSelectionne, setMoisSelectionne] = useState("mars");
  const [modalData, setModalData] = useState(null);

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
              info.push({ nom: c["Famille"], action });
            }
          }
        }
      });
    });
    return info;
  };

  // Générer les semaines du mois
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

  const handleDayClick = (day, infos) => {
    // Regrouper par action et supprimer doublons
    const grouped = infos.reduce((acc, curr) => {
      if (!acc[curr.action]) acc[curr.action] = [];
      if (!acc[curr.action].includes(curr.nom)) acc[curr.action].push(curr.nom);
      return acc;
    }, {});
    setModalData({ day, data: grouped });
  };

  return (
    <div className="main-container">
      <Header title="📅 Calendrier interactif" />
      <MonthNav
        months={moisNoms}
        selectedMonth={moisSelectionne}
        onSelectMonth={(m) => {
          setMoisSelectionne(m);
          setModalData(null);
        }}
      />

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
              {s.map((jour, idx) => (
                <DayCell
                  key={idx}
                  day={jour}
                  infos={jour ? getJourInfo(jour) : []}
                  onClick={handleDayClick}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {modalData && (
        <Modal
          day={modalData.day}
          data={modalData.data}
          onClose={() => setModalData(null)}
        />
      )}
    </div>
  );
};
