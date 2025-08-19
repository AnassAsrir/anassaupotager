// src/data/plantes.js
import culturesJson from "./calendrier.json"; // ton fichier JSON existant
import { Plante } from "../models/Plante"; // la classe Plante

export const plantes = culturesJson.map(
  (c) =>
    new Plante({
      famille: c["Famille"],
      nomVariete: c["Nom / Variété"],
      semisGodet: c["Semis en godet/alvéole"],
      repiquageGodet: c["Repiquage en godet"],
      plantationPleineTerre: c["Plantation en pleine terre"],
      semisDirect: c["Semis direct en terre"],
      dateRecolte: c["Date de récolte"],
      arrosageNormal: c["Arrosage normal"],
      arrosageChaleur: c["Arrosage forte chaleur"],
      quantiteEau: c["Quantité d'eau"],
    })
);
