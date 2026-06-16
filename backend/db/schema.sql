-- TRACE by Michelin — schéma PostgreSQL
-- Exécuté automatiquement au démarrage du conteneur db (voir docker-compose.yml)

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email        TEXT UNIQUE NOT NULL,
    name         TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    trace_points INT DEFAULT 0,
    created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE tyres (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL,
    line        TEXT NOT NULL,
    discipline  TEXT NOT NULL,          -- route | gravel | vtt | ville
    price       NUMERIC(6,2) NOT NULL,
    lifespan_km INT NOT NULL            -- km estimés de durée de vie
);

CREATE TABLE bikes (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
    name       TEXT NOT NULL,
    discipline TEXT NOT NULL
);

CREATE TABLE bike_tyres (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    bike_id    UUID REFERENCES bikes(id) ON DELETE CASCADE,
    tyre_id    UUID REFERENCES tyres(id),
    km_ridden  INT DEFAULT 0,
    mounted_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE orders (
    id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id    UUID REFERENCES users(id),
    tyre_id    UUID REFERENCES tyres(id),
    retailer   TEXT NOT NULL,
    amount     NUMERIC(6,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Catalogue Michelin (échantillon — à vérifier sur le catalogue officiel à jour)
INSERT INTO tyres (name, line, discipline, price, lifespan_km) VALUES
 ('Power Road',  'Route — Performance',    'route',  54.90, 5000),
 ('Power Cup',   'Route — Compétition',    'route',  64.90, 3500),
 ('Lithion 4',   'Route — Endurance',      'route',  32.90, 7000),
 ('Power Gravel','Gravel — Polyvalence',   'gravel', 49.90, 4500),
 ('Wild XC',     'VTT — Cross-country',    'vtt',    44.90, 3000),
 ('Wild Enduro', 'VTT — Enduro / Gravity', 'vtt',    59.90, 2500),
 ('Protek Max',  'Urbain — Fiabilité',     'ville',  27.90, 8000);

-- ---------------------------------------------------------------------------
-- Données de démo : un utilisateur et son garage (pour la démo sans auth)
-- ---------------------------------------------------------------------------
INSERT INTO users (id, email, name, password_hash, trace_points) VALUES
 ('11111111-1111-1111-1111-111111111111', 'theo@trace.app', 'Théo', 'demo', 340);

INSERT INTO bikes (id, user_id, name, discipline) VALUES
 ('22222222-2222-2222-2222-222222222221', '11111111-1111-1111-1111-111111111111', 'Specialized Tarmac SL7', 'route'),
 ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Canyon Grizl', 'gravel');

INSERT INTO bike_tyres (bike_id, tyre_id, km_ridden)
SELECT '22222222-2222-2222-2222-222222222221', id, 4300 FROM tyres WHERE name = 'Power Road';
INSERT INTO bike_tyres (bike_id, tyre_id, km_ridden)
SELECT '22222222-2222-2222-2222-222222222222', id, 1530 FROM tyres WHERE name = 'Power Gravel';
