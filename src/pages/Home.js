import React from "react";
import { Header } from "../components/Header";
import { Section } from "../components/Section";

export const Home = () => {
  return (
    <div className="main-container">
      {" "}
      {/* même container que Calendrier.js */}
      <Header title="🌱 Anass au Potager" />
      <Section>
        <p>
          Bienvenue sur ce petit site amateur ! Ici, je partage mes notes, mes
          réussites et mes échecs dans mon potager, mes observations au fil des
          saisons, ainsi que des conseils et remarques pour ceux qui veulent se
          lancer. L’objectif : garder une trace et partager mes expériences de
          jardinage.
        </p>
      </Section>
    </div>
  );
};
