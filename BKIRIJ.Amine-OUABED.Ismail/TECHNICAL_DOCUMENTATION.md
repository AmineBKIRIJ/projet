# Documentation Technique - Système de Gestion des Événements INPT

## Table des Matières
1. [Technologies et Langages](#technologies-et-langages)
2. [Structure du Projet](#structure-du-projet)
3. [Modèles de Données](#modèles-de-données)
4. [Routes API](#routes-api)
5. [Authentification](#authentification)
6. [Gestion des Événements](#gestion-des-événements)
7. [Gestion des Clubs](#gestion-des-clubs)

## Technologies et Langages

### Backend
- **Langage Principal**: Python 3.8+
- **Framework Web**: Flask 2.0+
- **ORM**: SQLAlchemy
- **Base de Données**: SQLite (développement) / PostgreSQL (production)
- **Authentification**: JWT (JSON Web Tokens)
- **Validation**: Flask-WTF, Marshmallow
- **Tests**: pytest

### Frontend
- **Langages**: HTML5, CSS3, JavaScript (ES6+)
- **Frameworks CSS**: 
  - Bootstrap 5.0
  - Custom CSS pour les composants spécifiques
- **JavaScript**:
  - Vanilla JavaScript
  - Fetch API pour les requêtes HTTP
  - LocalStorage pour la gestion du cache
- **Icons**: Font Awesome 5.0

### Outils de Développement
- **Version Control**: Git
- **Environnement Virtuel**: venv
- **Gestion des Dépendances**: pip
- **Linting**: flake8
- **Formatage**: black
- **Documentation**: Markdown

## Structure du Projet

### Organisation des Dossiers
```
devos/
├── app/
│   ├── __init__.py          # Initialisation de l'application Flask
│   ├── models/              # Modèles de données
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── event.py
│   │   └── club.py
│   │
│   ├── routes/             # Routes de l'application
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── events.py
│   │   └── admin.py
│   │
│   ├── static/            # Fichiers statiques
│   │   ├── css/
│   │   │   ├── style.css
│   │   │   └── admin.css
│   │   ├── js/
│   │   │   ├── events.js
│   │   │   ├── auth.js
│   │   │   └── admin.js
│   │   └── images/
│   │
│   └── templates/         # Templates HTML
│       ├── auth.html
│       ├── events.html
│       └── admin.html
│
├── tests/                # Tests unitaires et d'intégration
│   ├── __init__.py
│   ├── test_auth.py
│   ├── test_events.py
│   └── test_models.py
│
├── config.py            # Configuration de l'application
├── requirements.txt     # Dépendances Python
└── run.py              # Point d'entrée de l'application
```

### Architecture MVC
- **Models**: Définition des structures de données et relations
- **Views**: Templates HTML et fichiers statiques
- **Controllers**: Routes et logique métier

### Flux de Données
1. **Requête Client**
   - Le client envoie une requête HTTP
   - Les middlewares traitent la requête (auth, validation)

2. **Traitement Backend**
   - La route appropriée est appelée
   - Les données sont validées
   - Les modèles sont mis à jour
   - Une réponse est générée

3. **Réponse Client**
   - Les données sont renvoyées au client
   - Le frontend met à jour l'interface

### Gestion des États
- **Frontend**: 
  - LocalStorage pour les données persistantes
  - Variables JavaScript pour l'état temporaire
- **Backend**:
  - Session Flask pour les données de session
  - Base de données pour les données permanentes

### Sécurité
- **Authentification**: JWT avec refresh tokens
- **Validation**: Double validation (frontend + backend)
- **CORS**: Configuration pour les requêtes cross-origin
- **CSRF**: Protection contre les attaques CSRF

## Modèles de Données

### Modèle User
```python
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    role = db.Column(db.String(20), default='student')  # student, organizer, admin
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    events = db.relationship('Event', backref='organizer', lazy=True)
    participations = db.relationship('Event', secondary='event_participants')
```

### Modèle Event
```python
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(50), nullable=False)
    expected_attendees = db.Column(db.Integer, nullable=False)
    club_name = db.Column(db.String(50), nullable=False)
    status = db.Column(db.String(20), default='pending_approval')  # pending_approval, approved, rejected, deleted
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    organizer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    participants = db.relationship('User', secondary='event_participants')
```

### Modèle Club
```python
class Club(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    events = db.relationship('Event', backref='club', lazy=True)
```

## Routes API

### Authentification

#### POST /api/register
- **Description**: Inscription d'un nouvel utilisateur
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string",
    "first_name": "string",
    "last_name": "string"
  }
  ```
- **Réponse**: Token JWT et informations utilisateur

#### POST /api/login
- **Description**: Connexion d'un utilisateur
- **Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Réponse**: Token JWT et informations utilisateur

### Gestion des Événements

#### GET /api/events
- **Description**: Récupérer tous les événements
- **Query Parameters**:
  - `category`: Filtre par club
  - `date`: Filtre par date
- **Réponse**: Liste des événements

#### POST /api/events
- **Description**: Créer un nouvel événement
- **Body**:
  ```json
  {
    "title": "string",
    "description": "string",
    "date": "datetime",
    "location": "string",
    "expected_attendees": "integer",
    "club_name": "string"
  }
  ```
- **Réponse**: Détails de l'événement créé

#### GET /api/events/<id>
- **Description**: Récupérer les détails d'un événement
- **Réponse**: Détails de l'événement

#### PUT /api/events/<id>
- **Description**: Modifier un événement
- **Body**: Mêmes champs que POST /api/events
- **Réponse**: Détails de l'événement modifié

#### DELETE /api/events/<id>
- **Description**: Supprimer un événement
- **Réponse**: Message de confirmation

### Participation aux Événements

#### POST /api/events/<id>/participate
- **Description**: Participer à un événement
- **Réponse**: Confirmation de participation

#### POST /api/events/<id>/cancel-participation
- **Description**: Annuler la participation à un événement
- **Réponse**: Confirmation d'annulation

### Administration

#### PUT /api/events/<id>/approve
- **Description**: Approuver un événement
- **Rôle Requis**: Admin
- **Réponse**: Détails de l'événement approuvé

#### PUT /api/events/<id>/reject
- **Description**: Rejeter un événement
- **Rôle Requis**: Admin
- **Réponse**: Détails de l'événement rejeté

## Validation des Données

### Événements
- Titre: 3-100 caractères
- Description: Minimum 10 caractères
- Date: Doit être dans le futur
- Lieu: Doit être dans la liste des lieux autorisés
- Participants attendus: Doit respecter la capacité du lieu

### Utilisateurs
- Email: Format valide et unique
- Mot de passe: Minimum 8 caractères, doit contenir des lettres et des chiffres
- Nom et prénom: 2-50 caractères

## Gestion des Erreurs

### Codes d'Erreur
- 400: Requête invalide
- 401: Non authentifié
- 403: Non autorisé
- 404: Ressource non trouvée
- 409: Conflit (ex: email déjà utilisé)
- 500: Erreur serveur

### Format de Réponse d'Erreur
```json
{
  "error": "Message d'erreur",
  "details": "Détails supplémentaires (optionnel)"
}
```

## Sécurité

### Authentification
- Utilisation de JWT (JSON Web Tokens)
- Tokens expirant après 24 heures
- Refresh tokens pour maintenir la session

### Validation
- Validation des données côté serveur
- Protection contre les injections SQL
- Sanitization des entrées utilisateur

### Autorisation
- Vérification des rôles pour les routes sensibles
- Validation des propriétaires pour les modifications
- Protection des routes d'administration 