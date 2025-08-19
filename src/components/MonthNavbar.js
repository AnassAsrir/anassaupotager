import React from "react";
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

export default function MonthNavbar({ selectedMonth, onSelectMonth }) {
  return (
    <div className="month-navbar">
      {moisNoms.map((m) => (
        <button
          key={m}
          onClick={() => onSelectMonth(m)}
          className={selectedMonth === m ? "active" : ""}
        >
          {m.charAt(0).toUpperCase() + m.slice(1)}
        </button>
      ))}
    </div>
  );
}

export { moisNoms };
