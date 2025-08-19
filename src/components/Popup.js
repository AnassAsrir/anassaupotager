import React from "react";

export default function Popup({ jour, events, onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>Jour {jour}</h2>
        {events.map((e, i) => (
          <div key={i}>
            <strong>{e.action}</strong>: {e.nom}
          </div>
        ))}
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
}
