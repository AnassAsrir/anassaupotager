// src/pages/Home.js
import React from "react";
import { Header } from "../components/Header";
import { NavBar } from "../components/NavBar";
import { Section } from "../components/Section";
import { ButtonLink } from "../components/ButtonLink";

export class Home extends React.Component {
  render() {
    const navLinks = [
      { to: "/", label: "Accueil" },
      { to: "/calendrier", label: "Calendrier" },
      { to: "/ressources", label: "Ressources" },
    ];

    return (
      <div className="home-container">
        <Header
          title="🌱 Anass au Potager"
          subtitle="Ton compagnon pour semer, entretenir et récolter ton potager, au rythme des saisons."
        />
        <NavBar links={navLinks} />

        <Section>
          <h2>Le potager de tes rêves</h2>
          <p>
            Ici, retrouve des conseils personnalisés mois par mois pour semer,
            planter et récolter au meilleur moment. Tout est là pour te guider
            pas à pas, même si tu débutes.
          </p>
        </Section>

        <Section className="calendar-preview">
          <h3>Calendrier du potager</h3>
          <p>
            Chaque mois, découvre quoi semer, planter, récolter ou préparer pour
            faire fructifier ton potager efficacement.
          </p>
          <ButtonLink to="/calendrier">Voir le calendrier</ButtonLink>
        </Section>

        <Section>
          <p className="resources-placeholder">
            [À venir : fiches pratiques, articles et guides facilement
            consultables]
          </p>
        </Section>

        <Section className="cta-section">
          <ButtonLink to="/potager">Accéder à mon potager</ButtonLink>
        </Section>
      </div>
    );
  }
}
