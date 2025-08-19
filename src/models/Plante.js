// src/models/Plante.js
export class Plante {
  constructor({
    famille,
    nomVariete,
    semisGodet,
    repiquageGodet,
    plantationPleineTerre,
    semisDirect,
    dateRecolte,
    arrosageNormal,
    arrosageChaleur,
    quantiteEau,
  }) {
    this.famille = famille; // "Tomate"
    this.nomVariete = nomVariete; // "Rose de Berne"
    this.semisGodet = semisGodet; // "15 mars"
    this.repiquageGodet = repiquageGodet; // "10 avril"
    this.plantationPleineTerre = plantationPleineTerre; // "20 mai"
    this.semisDirect = semisDirect; // ""
    this.dateRecolte = dateRecolte; // "15 juillet - 15 octobre"
    this.arrosageNormal = arrosageNormal; // "2-3 jours"
    this.arrosageChaleur = arrosageChaleur; // "tous les jours"
    this.quantiteEau = quantiteEau; // "1 arrosoir / pied / semaine"
  }

  // Méthode pour vérifier si un jour correspond à un semis ou récolte
  actionsPourJour(jour, mois) {
    const actions = [];

    if (this.semisGodet.includes(jour))
      actions.push({ type: "Semis 🌱", date: this.semisGodet });
    if (this.repiquageGodet.includes(jour))
      actions.push({ type: "Repiquage 🌿", date: this.repiquageGodet });
    if (this.plantationPleineTerre.includes(jour))
      actions.push({ type: "Plantation 🌿", date: this.plantationPleineTerre });
    if (this.dateRecolte.includes(jour))
      actions.push({ type: "Récolte 🥕", date: this.dateRecolte });

    return actions;
  }
}
