// src/pages/Calendrier.js
import React, { useState } from "react";
import cultures from "../data/calendrier.json";
import "../styles/Calendrier.css";

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
  // Regrouper par type d'action
  const grouped = infos.reduce((acc, curr) => {
    if (!acc[curr.action]) acc[curr.action] = [];
    acc[curr.action].push(curr.nom);
    return acc;
  }, {});

  return (
    <div
      className={`calendar-day ${infos.length > 0 ? "has-event" : ""}`}
      onClick={() => infos.length > 0 && onClick(grouped, day)}
    >
      {day && <div className="day-number">{day}</div>}
      {Object.keys(grouped).map((action, idx) => (
        <span
          key={idx}
          className={`event-badge ${action.replace(" ", "-").toLowerCase()}`}
        >
          {action}
        </span>
      ))}
    </div>
  );
};

const Modal = ({ day, data, onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h2>Jour {day}</h2>
      {Object.entries(data).map(([action, noms], idx) => (
        <div key={idx} className="modal-item">
          <strong>{action}</strong> : {noms.join(", ")}
        </div>
      ))}
      <button onClick={onClose} className="close-btn">
        Fermer
      </button>
    </div>
  </div>
);

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
              info.push({ nom: c["Nom / Variété"], action });
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
                  onClick={(data, day) => setModalData({ day, data })}
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
