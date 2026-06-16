// Données statiques de présentation (le métier vient de l'API).

export const QUESTIONS = [
  {
    key: 'discipline', title: 'Tu roules surtout en…', sub: 'On adapte la recommandation à ta pratique.',
    opts: [
      { v: 'route', ic: '🚴', b: 'Route', sub: 'Vitesse, bitume, longues sorties' },
      { v: 'gravel', ic: '🌾', b: 'Gravel', sub: 'Chemins, polyvalence, aventure' },
      { v: 'vtt', ic: '⛰️', b: 'VTT', sub: 'Sentiers, descente, technique' },
      { v: 'ville', ic: '🏙️', b: 'Urbain', sub: 'Trajets quotidiens, fiabilité' },
    ],
  },
  {
    key: 'terrain', title: 'Ton terrain dominant ?', sub: 'Le sol détermine le grip dont tu as besoin.',
    opts: [
      { v: 'sec', ic: '☀️', b: 'Sec & roulant', sub: 'Routes lisses, conditions sèches' },
      { v: 'mixte', ic: '⛅', b: 'Mixte', sub: 'Un peu de tout, toutes saisons' },
      { v: 'humide', ic: '🌧️', b: 'Humide & cassant', sub: 'Pluie, gravillons, terrain dur' },
    ],
  },
  {
    key: 'priority', title: 'Ta priorité n°1 ?', sub: 'Ce qui compte le plus pour toi.',
    opts: [
      { v: 'vitesse', ic: '⚡', b: 'Performance', sub: 'Le rendement avant tout' },
      { v: 'durabilite', ic: '🛡️', b: 'Durabilité', sub: 'Rouler longtemps sans soucis' },
      { v: 'grip', ic: '🎯', b: 'Adhérence', sub: 'Sécurité et contrôle maximal' },
    ],
  },
];

// Specs d'affichage par modèle (complément visuel du catalogue API).
export const SPECS = {
  'Power Road':   { Usage: 'Route', Profil: 'Slick', Poids: '235 g' },
  'Power Cup':    { Usage: 'Course', Profil: 'Slick', Poids: '215 g' },
  'Lithion 4':    { Usage: 'Entraînement', Profil: 'Slick', Poids: '270 g' },
  'Power Gravel': { Usage: 'Gravel', Profil: 'Mixte', Poids: '420 g' },
  'Wild XC':      { Usage: 'XC', Profil: 'Crampons', Poids: '645 g' },
  'Wild Enduro':  { Usage: 'Enduro', Profil: 'Crampons+', Poids: '1230 g' },
  'Protek Max':   { Usage: 'Ville', Profil: 'Anti-crevaison', Poids: '720 g' },
};

export const euro = (n) => Number(n).toFixed(2).replace('.', ',') + ' €';

export function wearColor(w) {
  return w >= 80 ? 'var(--red)' : w >= 55 ? 'var(--yellow-deep)' : 'var(--green)';
}
