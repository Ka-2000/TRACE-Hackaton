const express = require('express');
const router = express.Router();
const { recommend } = require('../services/tyreMatch');
const { decorate } = require('../services/wearTracker');

module.exports = (pool) => {
  const findTyreByName = async (name) => {
    const { rows } = await pool.query('SELECT * FROM tyres WHERE name = $1', [name]);
    return rows[0];
  };

  // Tyre Match — crée la demande
  router.post('/match', async (req, res, next) => {
    try {
      const { discipline, terrain, priority } = req.body;
      const result = await recommend({ discipline, terrain, priority }, findTyreByName);
      res.json(result);
    } catch (e) { next(e); }
  });

  // Catalogue
  router.get('/tyres', async (_req, res, next) => {
    try {
      const { rows } = await pool.query('SELECT * FROM tyres ORDER BY discipline, price');
      res.json(rows);
    } catch (e) { next(e); }
  });

  // Ajouter un vélo
  router.post('/bikes', async (req, res, next) => {
    try {
      const { userId, name, discipline } = req.body;
      const { rows } = await pool.query(
        'INSERT INTO bikes (user_id, name, discipline) VALUES ($1, $2, $3) RETURNING *',
        [userId, name, discipline]
      );
      res.status(201).json(rows[0]);
    } catch (e) { next(e); }
  });

  // Supprimer un vélo (cascade sur bike_tyres)
  router.delete('/bikes/:bikeId', async (req, res, next) => {
    try {
      await pool.query('DELETE FROM bikes WHERE id = $1', [req.params.bikeId]);
      res.json({ ok: true });
    } catch (e) { next(e); }
  });

  // Monter un pneu sur un vélo (remplace le pneu existant)
  router.post('/garage/mount', async (req, res, next) => {
    try {
      const { bikeId, tyreId } = req.body;
      await pool.query('DELETE FROM bike_tyres WHERE bike_id = $1', [bikeId]);
      const { rows } = await pool.query(
        'INSERT INTO bike_tyres (bike_id, tyre_id, km_ridden) VALUES ($1, $2, 0) RETURNING *',
        [bikeId, tyreId]
      );
      res.status(201).json(rows[0]);
    } catch (e) { next(e); }
  });

  // Garage : vélos + pneus + usure (LEFT JOIN pour inclure les vélos sans pneu)
  router.get('/garage/:userId', async (req, res, next) => {
    try {
      const { rows } = await pool.query(
        `SELECT b.id AS bike_id, bt.id, t.id AS tyre_id, b.name AS bike, b.discipline,
                t.name AS tyre, t.price, COALESCE(bt.km_ridden, 0) AS km_ridden, t.lifespan_km
           FROM bikes b
           LEFT JOIN bike_tyres bt ON bt.bike_id = b.id
           LEFT JOIN tyres t ON t.id = bt.tyre_id
          WHERE b.user_id = $1`, [req.params.userId]);
      res.json(rows.map(decorate));
    } catch (e) { next(e); }
  });

  // Alertes de réassort (le moteur de ventes)
  router.get('/garage/:userId/alerts', async (req, res, next) => {
    try {
      const { rows } = await pool.query(
        `SELECT bt.id, t.id AS tyre_id, b.name AS bike, t.name AS tyre, t.price,
                bt.km_ridden, t.lifespan_km
           FROM bike_tyres bt
           JOIN bikes b ON b.id = bt.bike_id
           JOIN tyres t ON t.id = bt.tyre_id
          WHERE b.user_id = $1`, [req.params.userId]);
      res.json(rows.map(decorate).filter(r => r.alert));
    } catch (e) { next(e); }
  });

  // Disponibilité e-revendeurs (intégration à brancher — mock crédible ici)
  router.get('/retailers/:tyreId', async (req, res, next) => {
    try {
      const { rows } = await pool.query('SELECT price FROM tyres WHERE id = $1', [req.params.tyreId]);
      const base = rows[0] ? Number(rows[0].price) : 0;
      res.json([
        { name: 'Alltricks',     price: base,        stock: true, delivery: '24-48h' },
        { name: 'Probikeshop',   price: base + 1.10, stock: true, delivery: '48h' },
        { name: 'Bike-Discount', price: base - 2.00, stock: true, delivery: '3-4j' },
        { name: 'Decathlon',     price: base + 2.00, stock: true, delivery: 'Retrait 1h' },
      ]);
    } catch (e) { next(e); }
  });

  // Loguer une sortie : met à jour les km parcourus sur le pneu actif
  router.post('/rides', async (req, res, next) => {
    try {
      const { userId, bikeId, km } = req.body;
      const { rows } = await pool.query(
        `UPDATE bike_tyres SET km_ridden = km_ridden + $1
          WHERE bike_id = $2
          RETURNING id, bike_id, km_ridden, tyre_id`,
        [km, bikeId]
      );
      const bt = rows[0];
      if (bt) {
        const { rows: tyreRows } = await pool.query(
          'SELECT lifespan_km FROM tyres WHERE id = $1', [bt.tyre_id]
        );
        const lifespan = tyreRows[0]?.lifespan_km || 1;
        bt.wear_pct = Math.min(Math.round((bt.km_ridden / lifespan) * 100), 100);
      }
      await pool.query(
        'UPDATE users SET trace_points = trace_points + 5 WHERE id = $1', [userId]
      );
      res.json(bt || {});
    } catch (e) { next(e); }
  });

  // Participer à un défi communauté
  router.post('/challenges/join', async (req, res, next) => {
    try {
      const { userId, points } = req.body;
      await pool.query(
        'UPDATE users SET trace_points = trace_points + $1 WHERE id = $2', [points, userId]
      );
      res.json({ ok: true });
    } catch (e) { next(e); }
  });

  // Achat : enregistre la commande et réinitialise l'usure du pneu
  router.post('/orders', async (req, res, next) => {
    try {
      const { userId, tyreId, retailer, amount, bikeTyreId } = req.body;
      const { rows } = await pool.query(
        `INSERT INTO orders (user_id, tyre_id, retailer, amount)
         VALUES ($1,$2,$3,$4) RETURNING *`, [userId, tyreId, retailer, amount]);
      if (bikeTyreId) {
        await pool.query('UPDATE bike_tyres SET km_ridden = 0 WHERE id = $1', [bikeTyreId]);
      }
      await pool.query('UPDATE users SET trace_points = trace_points + 120 WHERE id = $1', [userId]);
      res.status(201).json(rows[0]);
    } catch (e) { next(e); }
  });

  return router;
};
