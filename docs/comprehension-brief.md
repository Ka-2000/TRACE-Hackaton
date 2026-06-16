# TRACE by Michelin — Compréhension du brief client

**Hackathon ESGI 2026 · Réseau Skolae × Michelin LB 2 Wheels**
**Client / Product Owner :** Abdellatif Ghachi (Global Account Manager E‑retail 2W)
**Livrable :** Document de compréhension du brief — Lundi 15 juin

---

## 1. Notre lecture du problème client

Michelin est une référence mondiale en performance et mobilité, mais sur le **marché du vélo**, la marque n'est pas encore un réflexe d'achat pour les cyclistes. Le client est pris dans un **cercle vicieux** :

> Faible demande consommateur → faible intérêt des revendeurs → disponibilité limitée → achat plus difficile → ce qui entretient la faible demande.

Le constat clé : **les produits sont excellents, mais la traction commerciale est faible.** Le problème n'est pas la qualité du pneu, c'est la *demande* et la *conversion*.

La mission qui nous est confiée se résume à une question :

> **Comment créer une forte demande chez les cyclistes premium ET la convertir en ventes rapides (6–12 mois), en faisant du e‑retail le levier central ?**

## 2. L'insight consommateur qui guide notre solution

Le cycliste premium investit énormément de temps et d'argent dans l'optimisation de son vélo (cadre, transmission, capteurs…). Pourtant, **le pneu reste un achat subi** : décidé en urgence quand il est usé ou crevé, sur ce qui est disponible, rarement en connaissance de cause.

Conséquence : **l'expertise pneumatique de Michelin — son principal atout — est totalement invisible au moment de l'achat.** Le cycliste ne voit qu'un prix et une disponibilité, pas la valeur.

**Notre pari :** transformer le pneu d'un achat-corvée en **décision de performance assumée**, et capter le cycliste au **moment exact du besoin**.

## 3. Le concept : TRACE

Une application mobile/web compagnon du cycliste, articulée autour de trois piliers qui répondent directement aux attentes du brief.

| Pilier | Ce que ça fait | Ce que ça résout |
|---|---|---|
| **Tyre Match** | Configurateur intelligent : discipline, terrain, météo, priorités → la bonne gomme Michelin recommandée, avec le *pourquoi*. | **Crée la demande** par l'expertise et la personnalisation. Michelin devient le conseiller, pas un nom dans un catalogue. |
| **Wear Tracker → Réassort** | Suit le kilométrage (saisie ou Strava), estime l'usure, et alerte le rider quand le pneu approche de sa fin de vie. | **Le moteur de ventes court terme.** On capte le cycliste au moment précis du besoin → ventes en semaines, demande récurrente et prévisible. |
| **Checkout e‑retail 2 clics** | Disponibilité temps réel chez les e‑revendeurs partenaires, prix, livraison, achat immédiat. | **La conversion.** Supprime la barrière de distribution. Parcours intérêt → clic → achat explicite. |

Le tout enveloppé d'une **couche communauté** (défis kilométriques, segments sponsorisés, contenus athlètes) qui entretient l'engagement et la demande dans la durée, avec des récompenses qui poussent à l'achat (réductions, échantillons).

## 4. Pourquoi ça génère des ventes rapidement (critère n°1 Michelin)

Le **Wear Tracker** est le cœur du dispositif de vente. Là où un site e‑commerce attend passivement que le cycliste pense à Michelin, TRACE :

1. **Anticipe le besoin** — l'usure est calculée, le rider est prévenu *avant* la panne ou la crevaison.
2. **Déclenche au bon moment** — la notification arrive quand le pneu est à 80‑85 %, juste avant la prochaine grosse sortie.
3. **Convertit sans friction** — 2 clics jusqu'au panier d'un e‑revendeur en stock.

Résultat : un **flux de ventes récurrent et prévisible**, déclenché par la donnée et non par le hasard. C'est mesurable dès les premières semaines de déploiement.

## 5. Le parcours de conversion e‑retail

```
Intérêt                 Clic                    Achat
   │                      │                       │
Tyre Match  ──►  Recommandation  ──►  Choix e-revendeur  ──►  Panier  ──►  Livraison
(ou alerte usure)   + "pourquoi"     (stock temps réel)      partenaire
```

Le point d'achat est **toujours explicite** : un e‑revendeur partenaire (Alltricks, Probikeshop, Decathlon…) avec stock, prix et délai affichés. TRACE crée la demande et oriente, le partenaire encaisse — modèle non concurrent du réseau existant, qui peut **débloquer le retail physique plus tard** (les revendeurs voient la demande arriver et commandent davantage de stock Michelin).

## 6. Cible prioritaire

Cyclistes **premium**, passionnés et digital‑natives :

- **Route** → performance, vitesse (Power Road, Power Cup).
- **Gravel / VTT** → contrôle, durabilité, aventure (Power Gravel, Wild XC/Enduro).
- **Urbain premium** → fiabilité, anti‑crevaison (Protek Max).

Priorité aux **riders fréquents** (km élevés = usure rapide = réassort fréquent) et aux **segments communautaires** (effet de recommandation entre pairs).

## 7. Périmètre du MVP (ce que nous livrons cette semaine)

| Inclus dans le MVP | Hors périmètre (V2) |
|---|---|
| Tyre Match (configurateur + recommandation) | Sync Strava temps réel (simulée dans le MVP) |
| Garage + Wear Tracker avec alerte de réassort | Paiement intégré natif (redirection e‑revendeur) |
| Parcours checkout e‑retail (intérêt→clic→achat) | App mobile native (PWA responsive pour le MVP) |
| Couche communauté (défis, segments, contenu) | Programme de fidélité complet |

**Principe de priorisation :** on construit d'abord la boucle qui génère des ventes (Match → Wear → Checkout). La communauté est l'accélérateur, pas le cœur.

## 8. Go‑to‑market (6–12 mois)

1. **Mois 0‑3** — Lancement PWA, partenariats avec 3‑4 e‑revendeurs clés, acquisition via clubs et communautés Strava.
2. **Mois 3‑6** — Activation du Wear Tracker sur la base installée → premières ventes de réassort, défis sponsorisés pour la croissance virale.
3. **Mois 6‑12** — Données de demande partagées avec les revendeurs physiques → augmentation du stock Michelin en boutique.

## 9. Comment nous répondons à la grille d'évaluation

- **Réponse métier (6 pts)** — dispositif qui popularise réellement la gamme : cible claire, demande créée par l'expertise, conversion directe.
- **Sales impact (critère n°1)** — le Wear Tracker est un générateur de ventes court terme, mesurable.
- **E‑retail / digital** — au cœur, pas en option : c'est le point d'achat de tout le parcours.
- **Créativité (4 pts)** — l'angle « usure-comme-déclencheur-de-vente » est inattendu et défendable.
- **UX & identité (3 pts)** — design cohérent avec la marque Michelin (jaune signature, codes performance).
- **Feasibility & scalabilité** — une app + un moteur de reco + des liens e‑retail : simple à dupliquer par pays.

---

*Document de compréhension — Équipe TRACE · à compléter avec l'ébauche d'architecture, les maquettes Figma et le dépôt GitHub (public).*
