# Système de Gestion des Événements INPT

## Description
Ce projet est une application web de gestion des événements pour l'Institut National des Postes et Télécommunications (INPT). Il permet aux étudiants et aux clubs de créer, gérer et participer à des événements au sein de l'école.

## Fonctionnalités Principales

### Pour les Utilisateurs
- Création et gestion d'événements
- Participation aux événements
- Filtrage des événements par catégorie et date
- Visualisation des détails des événements
- Gestion des groupes d'étude

### Pour les Clubs
- Gestion des événements spécifiques au club
- Suivi des participants
- Personnalisation des images de club

### Pour les Administrateurs
- Approbation des événements
- Gestion des utilisateurs
- Supervision des clubs et événements

## Structure du Projet

### Frontend
- `static/events.js` : Gestion des événements côté client
- `static/auth.js` : Gestion de l'authentification
- `static/admin.js` : Interface d'administration

### Backend
- API RESTful pour la gestion des données
- Base de données pour le stockage des informations

### Structure Détaillée des Dossiers
```
devos/
├── app.py                    # Point d'entrée principal de l'application Flask
├── config.py                 # Configuration de l'application
├── requirements.txt          # Dépendances Python du projet
├── init_db.py               # Script d'initialisation de la base de données
│
├── static/                  # Dossier contenant les fichiers statiques
│   ├── css/                # Styles CSS
│   │   ├── style.css       # Styles principaux
│   │   └── admin.css       # Styles pour l'interface admin
│   │
│   ├── js/                 # Scripts JavaScript
│   │   ├── events.js       # Logique de gestion des événements
│   │   ├── auth.js         # Logique d'authentification
│   │   └── admin.js        # Logique de l'interface admin
│   │
│   ├── images/             # Images du projet
│   │   ├── clubs/          # Images des clubs
│   │   └── events/         # Images des événements
│   │
│   └── uploads/            # Dossier pour les fichiers uploadés
│
├── templates/              # Templates HTML
│   ├── auth.html          # Page d'authentification
│   ├── events.html        # Page des événements
│   ├── admin.html         # Interface d'administration
│   └── components/        # Composants réutilisables
│       ├── header.html    # En-tête commun
│       └── footer.html    # Pied de page commun
│
├── models/                # Modèles de données
│   ├── user.py           # Modèle utilisateur
│   ├── event.py          # Modèle événement
│   └── club.py           # Modèle club
│
├── routes/               # Routes de l'application
│   ├── auth.py          # Routes d'authentification
│   ├── events.py        # Routes des événements
│   └── admin.py         # Routes d'administration
│
├── utils/               # Utilitaires
│   ├── validators.py    # Fonctions de validation
│   └── helpers.py       # Fonctions d'aide
│
└── instance/           # Dossier d'instance (non versionné)
    └── devos.db       # Base de données SQLite
```

## Technologies Utilisées
- Frontend : HTML, CSS, JavaScript
- Backend : Python (Flask)
- Base de données : SQLite/PostgreSQL
- Authentification : JWT (JSON Web Tokens)

## Installation

1. Cloner le repository
```bash
git clone [URL_DU_REPO]
```

2. Installer les dépendances
```bash
pip install -r requirements.txt
```

3. Configurer la base de données
```bash
python init_db.py
```

4. Lancer l'application
```bash
python app.py
```

## Configuration

### Variables d'Environnement
- `SECRET_KEY` : Clé secrète pour l'application
- `DATABASE_URL` : URL de la base de données
- `JWT_SECRET_KEY` : Clé secrète pour les tokens JWT

### Images des Clubs
Les images des clubs sont configurées dans `static/events.js` :
```javascript
const CLUB_IMAGES = {
    'CIT': '...',
    'CAS': '...',
    'ENACTUS': '...',
    // ...
};
```

## Fonctionnalités Détaillées

### Gestion des Événements
- Création d'événements avec titre, description, date, lieu
- Validation de la capacité des salles
- Système d'approbation pour les nouveaux événements
- Gestion des participants

### Système d'Authentification
- Inscription et connexion des utilisateurs
- Gestion des rôles (étudiant, organisateur, administrateur)
- Protection des routes sensibles

### Interface d'Administration
- Tableau de bord pour les administrateurs
- Gestion des utilisateurs et des clubs
- Approbation des événements
- Statistiques d'utilisation

## Sécurité
- Authentification JWT
- Validation des données côté serveur
- Protection contre les injections SQL
- Gestion sécurisée des mots de passe

## Contribution
1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## Licence
Ce projet est sous licence [INSÉRER TYPE DE LICENCE]

## Contact
Pour toute question ou suggestion, veuillez contacter [INSÉRER CONTACT] 