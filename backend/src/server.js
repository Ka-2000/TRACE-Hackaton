const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Healthcheck (utilisé par Docker et la CI)
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// Routes métier
app.use('/api', require('./routes/tyres')(pool));

// Gestion d'erreurs centralisée
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Une erreur est survenue. Réessaie dans un instant.' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`TRACE API en écoute sur le port ${PORT}`));

module.exports = app;
