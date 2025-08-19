// src/pages/Calendrier.js
import React from "react";
import cultures from "../data/calendrier.json";

function Calendrier() {
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
        📅 Calendrier des semis et récoltes (Reims)
      </h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr style={{ background: "#2a7f32", color: "white" }}>
            <th style={cellStyle}>Famille</th>
            <th style={cellStyle}>Nom / Variété</th>
            <th style={cellStyle}>Semis en godet/alvéole</th>
            <th style={cellStyle}>Repiquage en godet</th>
            <th style={cellStyle}>Plantation en pleine terre</th>
            <th style={cellStyle}>Semis direct en terre</th>
            <th style={cellStyle}>Date de récolte</th>
            <th style={cellStyle}>Arrosage normal</th>
            <th style={cellStyle}>Arrosage forte chaleur</th>
            <th style={cellStyle}>Quantité d'eau</th>
          </tr>
        </thead>
        <tbody>
          {cultures.map((c, i) => (
            <tr
              key={i}
              style={{ background: i % 2 === 0 ? "#f9f9f9" : "white" }}
            >
              <td style={cellStyle}>{c.Famille}</td>
              <td style={cellStyle}>{c["Nom / Variété"]}</td>
              <td style={cellStyle}>{c["Semis en godet/alvéole"]}</td>
              <td style={cellStyle}>{c["Repiquage en godet"]}</td>
              <td style={cellStyle}>{c["Plantation en pleine terre"]}</td>
              <td style={cellStyle}>{c["Semis direct en terre"]}</td>
              <td style={cellStyle}>{c["Date de récolte"]}</td>
              <td style={cellStyle}>{c["Arrosage normal"]}</td>
              <td style={cellStyle}>{c["Arrosage forte chaleur"]}</td>
              <td style={cellStyle}>{c["Quantité d'eau"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cellStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "center",
};

export default Calendrier;
