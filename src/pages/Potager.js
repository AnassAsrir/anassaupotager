// src/pages/Potager.js
import React from "react";
import { Header } from "../components/Header";
import { Section } from "../components/Section";

export class Potager extends React.Component {
  render() {
    return (
      <div className="main-container">
        <Header title="🥕 Mon Potager" />
        <Section>
          <p></p>
        </Section>
      </div>
    );
  }
}
