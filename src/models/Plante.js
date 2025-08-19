// Plante.js
export default class Plante {
  constructor({
    famille,
    nomVariete,
    semisGodet,
    repiquageGodet,
    plantationPleineTerre,
    semisDirect,
    dateRecolte,
  }) {
    this.famille = famille;
    this.nomVariete = nomVariete;
    this.semisGodet = semisGodet;
    this.repiquageGodet = repiquageGodet;
    this.plantationPleineTerre = plantationPleineTerre;
    this.semisDirect = semisDirect;
    this.dateRecolte = dateRecolte;
  }

  getEventsForMonth(mois) {
    const events = [];
    const types = [
      { key: "semisGodet", label: "Semis 🌱" },
      { key: "semisDirect", label: "Semis 🌱" },
      { key: "repiquageGodet", label: "Plantation 🌿" },
      { key: "plantationPleineTerre", label: "Plantation 🌿" },
      { key: "dateRecolte", label: "Récolte 🥕" },
    ];

    types.forEach(({ key, label }) => {
      const val = this[key];
      if (!val) return;

      const regex = /(\d{1,2})\s+(\w+)/g;
      let match;
      while ((match = regex.exec(val)) !== null) {
        const day = parseInt(match[1], 10);
        const month = match[2].toLowerCase();
        if (month === mois) {
          events.push({ day, action: label, nom: this.nomVariete });
        }
      }
    });

    return events;
  }
}
