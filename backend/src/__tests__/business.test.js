const { pickTyreName, matchScore } = require('../services/tyreMatch');
const { wearPct, needsReorder, decorate } = require('../services/wearTracker');

describe('Tyre Match — moteur de recommandation', () => {
  test('route + vitesse -> Power Cup', () => {
    expect(pickTyreName({ discipline: 'route', priority: 'vitesse' })).toBe('Power Cup');
  });
  test('route + durabilité -> Lithion 4', () => {
    expect(pickTyreName({ discipline: 'route', priority: 'durabilite' })).toBe('Lithion 4');
  });
  test('gravel -> Power Gravel', () => {
    expect(pickTyreName({ discipline: 'gravel' })).toBe('Power Gravel');
  });
  test('vtt + grip -> Wild Enduro', () => {
    expect(pickTyreName({ discipline: 'vtt', priority: 'grip' })).toBe('Wild Enduro');
  });
  test('ville -> Protek Max', () => {
    expect(pickTyreName({ discipline: 'ville' })).toBe('Protek Max');
  });
  test('le score reste entre 90 et 98', () => {
    const s = matchScore({ terrain: 'humide', priority: 'grip' });
    expect(s).toBeGreaterThanOrEqual(90);
    expect(s).toBeLessThanOrEqual(98);
  });
});

describe('Wear Tracker — moteur de ventes', () => {
  test('usure plafonnée à 100%', () => {
    expect(wearPct(10000, 5000)).toBe(100);
  });
  test('calcul d usure standard', () => {
    expect(wearPct(2500, 5000)).toBe(50);
  });
  test('réassort déclenché à 80%', () => {
    expect(needsReorder(4000, 5000)).toBe(true);
    expect(needsReorder(3000, 5000)).toBe(false);
  });
  test('decorate ajoute statut et alerte', () => {
    const r = decorate({ km_ridden: 4300, lifespan_km: 5000 });
    expect(r.wear_pct).toBe(86);
    expect(r.status).toBe('reorder');
    expect(r.alert).toBe(true);
  });
});
