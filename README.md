# TRACE by Michelin 🟡

> **Roule sur la bonne gomme.**
> Le compagnon du cycliste qui transforme le pneu en décision de performance — et capte le rider au moment exact du besoin.

Projet réalisé pour le **Hackathon ESGI 2026 · Réseau Skolae × Michelin LB 2 Wheels**.

---

## 🎯 Le concept en 30 secondes

Michelin fait d'excellents pneus vélo, mais la marque n'est pas un réflexe d'achat. TRACE résout ça avec trois piliers :

1. **Tyre Match** — un configurateur qui recommande la bonne gomme Michelin selon ta pratique. *(crée la demande)*
2. **Wear Tracker** — suit l'usure de tes pneus et t'alerte avant la fin de vie. *(génère la vente)*
3. **Checkout e‑retail** — achat en 2 clics chez un e‑revendeur en stock. *(convertit)*

## 🧱 Stack

| Couche | Techno |
|---|---|
| Frontend | React (Vite, PWA) |
| API | Node.js / Express |
| Base de données | PostgreSQL |
| Infra | Docker + Docker Compose |
| CI/CD | GitHub Actions |

Architecture détaillée : [`docs/architecture.md`](docs/architecture.md).

## 🚀 Démarrage rapide

### Avec Docker (recommandé)

```bash
git clone https://github.com/<votre-org>/trace.git
cd trace
cp .env.example .env
docker compose up --build
```

- Frontend (React PWA) : http://localhost:3000
- API : http://localhost:4000
- Base : Postgres sur le port 5432 (schéma + catalogue + garage de démo chargés automatiquement)

> Les trois services démarrent ensemble. Le frontend appelle l'API via un proxy nginx
> (`/api` → service `api`), donc aucune configuration d'URL n'est nécessaire.

**Compte de démo (sans authentification)** : l'app utilise un utilisateur seedé (« Théo ») avec
deux vélos. Le Power Road est volontairement à 86 % d'usure pour montrer l'alerte de réassort.

### En local sans Docker

```bash
# Backend
cd backend && npm install && npm run dev   # http://localhost:4000

# Frontend (autre terminal)
cd frontend && npm install && npm run dev   # http://localhost:3000
```

## 🧪 Tests

```bash
cd backend && npm test
```

Couvre le moteur de recommandation (Tyre Match) et le moteur d'usure (Wear Tracker).

## 📡 API — endpoints principaux

| Méthode | Route | Rôle |
|---|---|---|
| `POST` | `/api/match` | Recommandation Tyre Match |
| `GET` | `/api/garage/:userId` | Vélos + pneus + usure |
| `GET` | `/api/garage/:userId/alerts` | Pneus à réassortir |
| `GET` | `/api/tyres` | Catalogue Michelin |
| `GET` | `/api/retailers/:tyreId` | Dispo e‑revendeurs |
| `POST` | `/api/orders` | Enregistre un achat |

Exemple :

```bash
curl -X POST http://localhost:4000/api/match \
  -H "Content-Type: application/json" \
  -d '{"discipline":"route","terrain":"sec","priority":"vitesse"}'
```

## 📂 Structure

```
trace/
├── docs/                  # architecture & guide utilisateur
├── frontend/              # React PWA (Vite)
│   ├── src/
│   │   ├── api.js         # client de l'API
│   │   ├── App.jsx        # navigation + état partagé
│   │   ├── screens/       # Accueil, Garage, Match, Boutique, Checkout…
│   │   └── components/    # éléments réutilisables
│   ├── nginx.conf         # service statique + proxy /api
│   └── Dockerfile
├── backend/
│   ├── src/
│   │   ├── server.js      # entrée Express
│   │   ├── routes/        # endpoints
│   │   ├── services/      # Tyre Match + Wear Tracker (cœur métier)
│   │   └── __tests__/     # tests
│   └── db/schema.sql      # schéma + catalogue + garage de démo
├── docker-compose.yml
└── .github/workflows/     # CI/CD
```

> 🔎 Un prototype statique autonome (sans backend) reste disponible dans `trace-app.html`.

## ☁️ Déploiement

Le pipeline `.github/workflows/ci-cd.yml` lance tests → build → déploiement à chaque push sur `main`.
Pour le déploiement, configure le secret `RENDER_DEPLOY_HOOK` (ou adapte à Railway / VPS).

## 👥 Équipe

Équipe TRACE — ESGI 5A Ingénierie du Web.
