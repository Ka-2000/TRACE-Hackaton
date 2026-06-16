/**
 * Tyre Match — moteur de recommandation.
 * Crée la demande en traduisant le profil du cycliste en gomme Michelin idéale.
 */

// Règles de mapping profil -> ligne de pneu (clé = name dans la table tyres)
function pickTyreName({ discipline, priority }) {
  if (discipline === 'route') {
    if (priority === 'vitesse') return 'Power Cup';
    if (priority === 'durabilite') return 'Lithion 4';
    return 'Power Road';
  }
  if (discipline === 'gravel') return 'Power Gravel';
  if (discipline === 'vtt') return priority === 'vitesse' ? 'Wild XC' : 'Wild Enduro';
  if (discipline === 'ville') return 'Protek Max';
  return 'Power Road';
}

// Score de compatibilité (90-98) — renforcé quand terrain et priorité s'alignent
function matchScore({ terrain, priority }) {
  let score = 90;
  if (terrain === 'humide' && priority === 'grip') score += 7;
  else if (terrain === 'sec' && priority === 'vitesse') score += 6;
  else score += 3;
  return Math.min(score, 98);
}

const REASONS = {
  'Power Road':  ['Meilleur compromis vitesse / longévité sur route', 'Gomme bi-densité, sec comme mouillé', 'Validé par les pros sur les classiques'],
  'Power Cup':   ['Rendement maximal pour le jour de course', 'Adhérence extrême en virage rapide', 'Quand chaque watt compte'],
  'Lithion 4':   ['Résistance à la crevaison renforcée', 'Longévité idéale pour gros volumes', 'Meilleur rapport km / euro'],
  'Power Gravel':['Crampons bas pour rouler vite sur chemins', 'Flancs renforcés contre les coupures', 'Du bitume à la piste sans compromis'],
  'Wild XC':     ['Rapide et léger pour le XC et le marathon', 'Bonne accroche en montée', 'Tubeless-ready'],
  'Wild Enduro': ['Accroche maximale en descente engagée', 'Carcasse anti-pincement', 'Pensé pour le pilotage agressif'],
  'Protek Max':  ['Ceinture anti-crevaison épaisse', 'Bande réfléchissante pour la nuit', 'Conçu pour durer en ville'],
};

/**
 * @param {object} profile { discipline, terrain, priority }
 * @param {function} findTyreByName  async (name) => row tyre
 * @returns {object} recommandation complète
 */
async function recommend(profile, findTyreByName) {
  const name = pickTyreName(profile);
  const tyre = await findTyreByName(name);
  return {
    tyre,
    score: matchScore(profile),
    reasons: REASONS[name] || [],
  };
}

module.exports = { recommend, pickTyreName, matchScore };
