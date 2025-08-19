import React from "react";
import CalendarDay from "./CalendarDay";

export default function Calendar({ month, plantes, moisMap, onDayClick }) {
  const firstDay = new Date(2023, moisMap[month], 1).getDay();
  const lastDay = new Date(2023, moisMap[month] + 1, 0).getDate();
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

  const getJourEvents = (jour) => {
    let events = [];
    plantes.forEach((p) => {
      events = [
        ...events,
        ...p.getEventsForMonth(month).filter((e) => e.day === jour),
      ];
    });
    return events;
  };

  return (
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
            {s.map((j, idx) => {
              const events = j ? getJourEvents(j) : [];
              return (
                <CalendarDay
                  key={idx}
                  jour={j}
                  events={events}
                  onClick={onDayClick}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
