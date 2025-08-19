import React, { useState } from "react";
import Plante from "../models/Plante";
import Header from "../components/Header";
import MonthNavbar, { moisNoms } from "../components/MonthNavbar";
import Calendar from "../components/Calendar";
import Popup from "../components/Popup";
import culturesJson from "../data/calendrier.json";
import "../styles/Calendrier.css";

const plantes = culturesJson.map(
  (c) =>
    new Plante({
      famille: c["Famille"],
      nomVariete: c["Nom / Variété"],
      semisGodet: c["Semis en godet/alvéole"],
      repiquageGodet: c["Repiquage en godet"],
      plantationPleineTerre: c["Plantation en pleine terre"],
      semisDirect: c["Semis direct en terre"],
      dateRecolte: c["Date de récolte"],
    })
);

const moisMap = moisNoms.reduce((acc, m, i) => ({ ...acc, [m]: i }), {});

export default function CalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState("mars");
  const [popupData, setPopupData] = useState(null);

  const handleDayClick = (jour, events) => setPopupData({ jour, events });

  return (
    <div className="calendar-container">
      <Header title="📅 Calendrier interactif" />
      <MonthNavbar
        selectedMonth={selectedMonth}
        onSelectMonth={setSelectedMonth}
      />
      <Calendar
        month={selectedMonth}
        plantes={plantes}
        moisMap={moisMap}
        onDayClick={handleDayClick}
      />
      {popupData && (
        <Popup
          jour={popupData.jour}
          events={popupData.events}
          onClose={() => setPopupData(null)}
        />
      )}
    </div>
  );
}
