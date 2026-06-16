/**
 * Wear Tracker — le moteur de ventes court terme.
 * Estime l'usure d'un pneu et déclenche l'alerte de réassort au bon moment.
 */

const REORDER_THRESHOLD = 80; // % d'usure à partir duquel on propose le réassort

/** Usure en % à partir des km parcourus et de la durée de vie du pneu. */
function wearPct(kmRidden, lifespanKm) {
  if (!lifespanKm) return 0;
  return Math.min(Math.round((kmRidden / lifespanKm) * 100), 100);
}

/** Un pneu doit-il être réassorti ? */
function needsReorder(kmRidden, lifespanKm) {
  return wearPct(kmRidden, lifespanKm) >= REORDER_THRESHOLD;
}

/**
 * Enrichit une ligne bike_tyre (jointe au pneu) avec usure + statut.
 * @param {object} row { km_ridden, lifespan_km, ... }
 */
function decorate(row) {
  const wear = wearPct(row.km_ridden, row.lifespan_km);
  return {
    ...row,
    wear_pct: wear,
    status: wear >= REORDER_THRESHOLD ? 'reorder' : wear >= 55 ? 'watch' : 'ok',
    alert: wear >= REORDER_THRESHOLD,
  };
}

module.exports = { wearPct, needsReorder, decorate, REORDER_THRESHOLD };
