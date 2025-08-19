import React from "react";
import EventBadge from "./EventBadge";

export default function CalendarDay({ jour, events, onClick }) {
  if (!jour) return <div className="calendar-day empty" />;

  const actions = [...new Set(events.map((e) => e.action))]; // unique actions par jour

  return (
    <div
      className={`calendar-day ${events.length > 0 ? "has-event" : ""}`}
      onClick={() => events.length > 0 && onClick(jour, events)}
    >
      <div className="day-number">{jour}</div>
      {actions.map((a, i) => (
        <EventBadge key={i} action={a} />
      ))}
    </div>
  );
}
