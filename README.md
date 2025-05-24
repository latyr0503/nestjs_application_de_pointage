# Documentation du Projet NestJS - Application de Gestion de Budget

### Introduction

Ce projet est une application backend développée avec le framework **NestJS**. Elle permet de gérer les pointages des employés, les justifications d'absence, et d'autres fonctionnalités liées à la gestion des utilisateurs.

L'application utilise **TypeORM** pour la gestion de la base de données et expose une API REST documentée avec **Swagger**.

---

### Fonctionnalités principales

1. **Gestion des utilisateurs** :
   - Création de comptes utilisateurs.
   - Authentification avec JWT.

2. **Gestion des pointages** :
   - Création, mise à jour, suppression et récupération des pointages.
   - Gestion des horaires d'arrivée et de départ.

3. **Gestion des justifications d'absence** :
   - Création, mise à jour, suppression et récupération des justifications d'absence.
   - Association des justifications à des utilisateurs.

4. **Documentation API** :
   - Documentation interactive via Swagger disponible à `/api-docs`.

---

### Installation et démarrage

#### Prérequis
- **Node.js** (version 16 ou supérieure)
- **PostgreSQL** (base de données utilisée)
- **pnpm** (gestionnaire de paquets)

#### Étapes

1. **Cloner le projet** :
   ```bash
   git clone https://github.com/latyr0503/nestjs_application_de_pointage
   ```

2. **Installer les dépendances** :
   ```bash
   pnpm install
   ```

3. **Configurer la base de données** :
   - Créer une base de données PostgreSQL.
   - Copiez le fichier `.env.example` vers `.env`
- Remplissez les variables d'environnement nécessaires

4. **Démarrer l'application** :
   ```bash
   pnpm run start:dev
   ```

5. **Accéder à l'API** :
   - L'API sera disponible sur `http://localhost:3000`.
   - La documentation Swagger sera accessible sur `http://localhost:3000/api-docs`.

## Gestion des Rôles Utilisateurs

### Rôles Disponibles

Le système utilise deux niveaux de rôles principaux :

- **USER** : Rôle par défaut pour tous les utilisateurs inscrits
- **ADMIN** : Rôle avec accès aux fonctionnalités administratives

### Inscription et Attribution des Rôles

1. **Inscription Standard**

   - Tous les utilisateurs s'inscrivant via la page d'inscription (`/register`) sont automatiquement attribués au rôle `USER`
   - Ce rôle permet l'accès aux fonctionnalités de base :
     - Pointage (entrée/sortie)
     - Consultation de son historique
     - Modification de son profil

2. **Promotion en Administrateur**
   - La promotion d'un utilisateur en administrateur ne peut se faire que via l'API
   - Utilisation de la documentation Swagger pour modifier le rôle :
   1. Accéder à l'interface Swagger (`/api-docs`)
   2. Acceder a l'endpoint (`/auth/signup`)
   3. Changer le role de `USER` à `ADMIN`

### Exemple de Modification de Rôle via Swagger

```json
{
  "role": "ADMIN"
}
```
---
