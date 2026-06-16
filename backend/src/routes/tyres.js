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

  // Garage : vélos + pneus + usure
  router.get('/garage/:userId', async (req, res, next) => {
    try {
      const { rows } = await pool.query(
        `SELECT bt.id, t.id AS tyre_id, b.name AS bike, b.discipline,
                t.name AS tyre, t.price, bt.km_ridden, t.lifespan_km
           FROM bike_tyres bt
           JOIN bikes b ON b.id = bt.bike_id
           JOIN tyres t ON t.id = bt.tyre_id
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
