# Flashboard - Mini-app de gestion d'événements

Application full-stack permettant de gérer et visualiser des événements avec leurs statistiques (litres consommés, chiffre d'affaires).

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Lancement rapide](#lancement-rapide)
- [Développement local](#développement-local)
- [API Endpoints](#api-endpoints)
- [Docker Registry (Bonus)](#docker-registry-bonus)
- [Améliorations futures](#améliorations-futures)

## Fonctionnalités

- **Backend API REST** (Node.js + Express)
  - GET `/events` : Liste complète des événements
  - GET `/stats/summary` : Statistiques globales (total litres, CA, lieux distincts)

- **Frontend** (Next.js 16 + React + TypeScript + Tailwind CSS)
  - Affichage des événements dans un tableau
  - Cartes de statistiques (total litres, CA, nombre de lieux)
  - **Graphiques interactifs** (Recharts)
    - Graphique en barres : CA et litres par événement
    - Graphique en camembert : Distribution du CA par lieu
  - Filtres par lieu et date
  - Gestion des états de chargement et d'erreur
  - Interface responsive

## Technologies utilisées

### Backend
- **Node.js 20** avec modules ES6
- **Express 4** pour l'API REST
- **CORS** pour permettre les requêtes cross-origin

### Frontend
- **Next.js 16** avec App Router
- **React 19** avec hooks
- **TypeScript 5** pour le typage statique
- **Tailwind CSS 4** pour le styling
- **Recharts** pour les graphiques interactifs

### Infrastructure
- **Docker** et **Docker Compose** pour la conteneurisation
- **Multi-stage builds** pour optimiser les images

## Lancement rapide

### Avec Docker Compose (recommandé)

1. Clonez le projet et naviguez dans le dossier :
```bash
cd my-app
```

2. Lancez l'application :
```bash
docker-compose up --build
```

3. Accédez à l'application :
   - Frontend : [http://localhost:3000](http://localhost:3000)
   - API : [http://localhost:8080](http://localhost:8080)

### Sans Docker

#### Lancer le backend

```bash
cd api
npm install
npm start
```

L'API sera disponible sur [http://localhost:8080](http://localhost:8080)

#### Lancer le frontend

```bash
# À la racine du projet
npm install
npm run dev
```

Le frontend sera disponible sur [http://localhost:3000](http://localhost:3000)

## Développement local

### Variables d'environnement

Copiez le fichier `.env.example` en `.env.local` :

```bash
cp .env.example .env.local
```

Contenu par défaut :
```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Structure du projet

```
my-app/
├── api/                    # Backend Express
│   ├── server.js          # Serveur API avec données
│   ├── package.json
│   └── Dockerfile
├── src/
│   └── app/
│       ├── page.tsx       # Page principale avec tableau et filtres
│       ├── layout.tsx
│       └── globals.css
├── docker-compose.yml     # Configuration Docker Compose
├── Dockerfile            # Dockerfile frontend
├── .env.example
└── README.md
```

## API Endpoints

### GET /events
Retourne la liste complète des événements.

**Réponse :**
```json
[
  {
    "id": 1,
    "name": "OM vs Brest",
    "date": "2025-06-15",
    "venue": "Orange Vélodrome",
    "liters": 780.5,
    "revenue_eur": 40250
  },
  ...
]
```

### GET /stats/summary
Retourne les statistiques globales.

**Réponse :**
```json
{
  "total_liters": 2236.4,
  "total_revenue_eur": 116250,
  "distinct_venues": ["Orange Vélodrome", "Marseille", "Montpellier", "Nantes"]
}
```

### GET /health
Health check endpoint.

**Réponse :**
```json
{
  "status": "ok"
}
```

## Docker Registry (Bonus)

Pour pousser l'image du backend sur le registre Harbor :

### 1. Installer les dépendances du backend
```bash
cd api
npm install
```

### 2. Build l'image
```bash
docker build -t harbor.mydrinkee.com/devtest/votre-prenom:v1.0.0 .
```

### 3. Login au registre
```bash
docker login harbor.mydrinkee.com
# Username: xxxxxx
# Password: xxxxxx
```

### 4. Push l'image
```bash
docker push harbor.mydrinkee.com/devtest/votre-prenom:v1.0.0
```

**Note :** Remplacez `votre-prenom` par votre prénom réel.

## Décisions techniques

### Backend
- **Node.js avec modules ES6** : Code moderne et plus lisible
- **Données en mémoire** : Simplifie l'implémentation pour ce test (pas de base de données nécessaire)
- **Express minimal** : Framework léger et rapide à mettre en place
- **CORS activé** : Permet au frontend de communiquer avec l'API

### Frontend
- **Next.js 16 avec App Router** : Framework React moderne avec SSR/SSG
- **Client Component** : Nécessaire pour les hooks (useState, useEffect)
- **Tailwind CSS** : Styling rapide et responsive
- **TypeScript** : Typage fort pour éviter les erreurs
- **Filtres côté client** : Performant pour petit dataset, évite les requêtes API

### Infrastructure
- **Docker multi-stage builds** : Réduit la taille des images finales
- **Docker Compose** : Orchestre facilement API + Frontend
- **Réseau interne** : Les containers communiquent via un réseau Docker bridge

## Améliorations futures

Si j'avais plus de temps, j'ajouterais :

### Fonctionnalités
- **Graphiques supplémentaires** :
  - Timeline des événements sur une échelle temporelle
  - Graphique en ligne pour l'évolution du CA
  - Graphique combiné litres/CA avec tendances
- **Tri des colonnes** : Permettre de trier le tableau par n'importe quelle colonne
- **Pagination** : Pour gérer de grands volumes de données
- **Recherche full-text** : Rechercher dans tous les champs
- **Export CSV/Excel** : Télécharger les données filtrées
- **Mode sombre** : Améliorer l'expérience utilisateur

### Technique
- **Tests** : Jest pour le backend, React Testing Library pour le frontend
- **Validation** : Schémas Zod pour valider les données
- **Base de données** : PostgreSQL ou MongoDB pour la persistence
- **Cache** : Redis pour optimiser les performances
- **API pagination** : Endpoint avec limit/offset
- **Logging** : Winston ou Pino pour les logs structurés
- **Monitoring** : Prometheus + Grafana
- **CI/CD** : GitHub Actions pour automatiser tests et déploiement
- **Variables d'env sécurisées** : Secrets management avec Docker secrets

### Sécurité
- **Rate limiting** : Protéger l'API contre les abus
- **Helmet.js** : Headers de sécurité
- **Input validation** : Valider toutes les entrées utilisateur
- **HTTPS** : Certificats SSL en production

## Licence

Projet de test technique - Tous droits réservés
