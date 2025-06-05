from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os
from datetime import datetime, timedelta
from flask_cors import CORS
import logging
import traceback
import re
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from dotenv import load_dotenv
from models import db, User, Event

# Chargement des variables d'environnement
load_dotenv()

# Configuration du logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create instance directory if it doesn't exist
instance_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'instance')
os.makedirs(instance_path, exist_ok=True)

app = Flask(__name__, static_folder='.', static_url_path='', instance_path=instance_path)

# Configuration CORS
CORS(app, resources={
    r"/*": {
        "origins": ["http://127.0.0.1:5000", "http://localhost:5000"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "Accept", "X-Requested-With"],
        "expose_headers": ["Content-Type", "Authorization"],
        "supports_credentials": True,
        "max_age": 3600
    }
})

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'votre_cle_secrete_ici')
app.config['JWT_SECRET_KEY'] = 'votre_jwt_secret_ici'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
app.config['JWT_TOKEN_LOCATION'] = ['headers']
app.config['JWT_HEADER_NAME'] = 'Authorization'
app.config['JWT_HEADER_TYPE'] = 'Bearer'
app.config['JWT_ERROR_MESSAGE_KEY'] = 'error'
app.config['JWT_JSON_KEY'] = 'access_token'
app.config['JWT_IDENTITY_CLAIM'] = 'sub'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)
app.config['JWT_BLACKLIST_ENABLED'] = True
app.config['JWT_BLACKLIST_TOKEN_CHECKS'] = ['access', 'refresh']

# Configuration de la base de données avec chemin absolu
db_path = os.path.join(instance_path, 'campus_events.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['UPLOAD_FOLDER'] = 'static/uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Initialisation des extensions
db.init_app(app)
jwt = JWTManager(app)

# Création des tables
with app.app_context():
    try:
        db.create_all()
        logger.info("Base de données créée avec succès")
    except Exception as e:
        logger.error(f"Erreur lors de la création de la base de données: {str(e)}")
        logger.error(traceback.format_exc())
        raise

# Routes d'authentification
@app.route('/api/auth/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        data = request.get_json()
        logger.info(f"Données d'inscription reçues: {data}")
        
        # Validation des données requises
        required_fields = ['nom', 'prenom', 'email', 'password', 'niveau', 'filiere']
        for field in required_fields:
            if field not in data:
                logger.error(f"Champ manquant: {field}")
                return jsonify({'error': f'Le champ {field} est requis'}), 400
            if not data[field]:
                logger.error(f"Champ vide: {field}")
                return jsonify({'error': f'Le champ {field} ne peut pas être vide'}), 400
        
        # Vérification si l'email existe déjà
        if User.query.filter_by(email=data['email']).first():
            logger.error(f"Email déjà utilisé: {data['email']}")
            return jsonify({'error': 'Cet email est déjà utilisé'}), 400
        
        # Création de l'utilisateur
        user = User(
            nom=data['nom'],
            prenom=data['prenom'],
            email=data['email'],
            niveau=data['niveau'],
            filiere=data['filiere']
        )
        user.set_password(data['password'])
        
        db.session.add(user)
        db.session.commit()
        logger.info(f"Utilisateur créé avec succès: {user.email}")
        
        return jsonify({'message': 'Inscription réussie'}), 201
    except Exception as e:
        db.session.rollback()
        logger.error(f"Erreur lors de l'inscription: {str(e)}")
        logger.error(traceback.format_exc())
        return jsonify({'error': str(e)}), 400

@app.route('/api/auth/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        
        if not user or not user.check_password(data['password']):
            return jsonify({'error': 'Email ou mot de passe incorrect'}), 401
            
        access_token = create_access_token(identity=user.id)
        return jsonify({
            'access_token': access_token,
            'user': user.to_dict()
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Routes des événements
@app.route('/api/events', methods=['GET', 'OPTIONS'])
@jwt_required()
def get_events():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'Utilisateur non trouvé'}), 404

        # Si l'utilisateur est admin, il peut voir tous les événements
        if user.role == 'admin':
            events = Event.query.order_by(Event.date.desc()).all()
        else:
            # Pour les utilisateurs normaux, on n'affiche que les événements approuvés
            events = Event.query.filter_by(status='approved').order_by(Event.date.desc()).all()
        
        return jsonify([event.to_dict() for event in events])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/events', methods=['POST', 'OPTIONS'])
@jwt_required()
def create_event():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        current_user_id = int(get_jwt_identity())
        data = request.get_json()
        
        event = Event(
            title=data['title'],
            description=data['description'],
            date=datetime.fromisoformat(data['date']),
            location=data['location'],
            expected_attendees=data['expected_attendees'],
            club_name=data['club_name'],
            organizer_id=current_user_id,
            status='pending'  # Tous les événements commencent en attente
        )
        
        db.session.add(event)
        db.session.commit()
        
        return jsonify(event.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400

# Routes admin
@app.route('/api/admin/events', methods=['GET', 'OPTIONS'])
@jwt_required()
def admin_get_events():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        
        if not user or user.role != 'admin':
            return jsonify({'error': 'Accès non autorisé'}), 403
            
        events = Event.query.order_by(Event.date.desc()).all()
        return jsonify([event.to_dict() for event in events])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/events/<int:event_id>/approve', methods=['POST', 'OPTIONS'])
@jwt_required()
def approve_event(event_id):
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        
        if not user or user.role != 'admin':
            return jsonify({'error': 'Accès non autorisé'}), 403
            
        event = Event.query.get_or_404(event_id)
        event.status = 'approved'
        event.approved_by_id = current_user_id
        db.session.commit()
        
        return jsonify(event.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/events/<int:event_id>/reject', methods=['POST', 'OPTIONS'])
@jwt_required()
def reject_event(event_id):
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        
        if not user or user.role != 'admin':
            return jsonify({'error': 'Accès non autorisé'}), 403
            
        event = Event.query.get_or_404(event_id)
        event.status = 'rejected'
        event.approved_by_id = current_user_id
        db.session.commit()
        
        return jsonify(event.to_dict())
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Routes statiques
@app.route('/')
def index():
    return send_from_directory('.', 'auth.html')

@app.route('/admin')
def admin():
    return send_from_directory('.', 'admin.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

def create_default_user():
    try:
        default_user = User.query.filter_by(email='admin@inpt.ac.ma').first()
        if not default_user:
            default_user = User(
                nom='Admin',
                prenom='System',
                email='admin@inpt.ac.ma',
                password=generate_password_hash('Admin@123'),  # Hash le mot de passe
                niveau='laureat',
                filiere='SESNUM',
                role='admin'
            )
            db.session.add(default_user)
            db.session.commit()
            logger.info("Compte administrateur créé avec succès")
        return default_user
    except Exception as e:
        logger.error(f"Erreur lors de la création du compte administrateur: {str(e)}")
        return None

def init_db():
    try:
        db_path = os.path.join(instance_path, 'campus_events.db')
        
        # Créer les tables si elles n'existent pas
        with app.app_context():
            if not os.path.exists(db_path):
                logger.info("Base de données non trouvée, création en cours...")
                db.create_all()
                logger.info("Base de données créée")
                
                # Créer l'utilisateur admin
                admin_user = create_default_user()
                if admin_user:
                    logger.info(f"Compte administrateur créé avec l'ID: {admin_user.id}")
                    # Vérifier que le mot de passe est correctement hashé
                    if admin_user.check_password('Admin@123'):
                        logger.info("Le mot de passe de l'admin est correctement hashé")
                    else:
                        logger.error("Le mot de passe de l'admin n'est pas correctement hashé")
                else:
                    logger.error("Échec de la création du compte administrateur")
            else:
                logger.info("Base de données existante trouvée")
            
    except Exception as e:
        logger.error(f"Erreur lors de l'initialisation de la base de données: {str(e)}")
        logger.error(traceback.format_exc())
        raise

@jwt.user_identity_loader
def user_identity_lookup(user):
    return str(user)

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.filter_by(id=int(identity)).one_or_none()

@jwt.unauthorized_loader
def unauthorized_callback(error_string):
    logger.error(f"Token manquant ou invalide: {error_string}")
    return jsonify({'error': 'Token manquant ou invalide'}), 401

@jwt.invalid_token_loader
def invalid_token_callback(error_string):
    logger.error(f"Token invalide: {error_string}")
    return jsonify({'error': 'Token invalide'}), 401

@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    logger.error(f"Token expiré: {jwt_payload}")
    return jsonify({'error': 'Token expiré'}), 401

@app.route('/api/events/<int:event_id>', methods=['PUT', 'OPTIONS'])
@jwt_required()
def update_event(event_id):
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'Utilisateur non trouvé'}), 404
            
        event = Event.query.get_or_404(event_id)
        
        # Vérifier si l'utilisateur est l'organisateur ou un admin
        if event.organizer_id != current_user_id and user.role != 'admin':
            return jsonify({'error': 'Accès non autorisé'}), 403
            
        data = request.get_json()
        
        # Sauvegarder les anciennes valeurs
        old_values = {
            'title': event.title,
            'description': event.description,
            'date': event.date,
            'location': event.location,
            'expected_attendees': event.expected_attendees,
            'club_name': event.club_name
        }
        
        # Mettre à jour les champs de l'événement
        event.title = data.get('title', event.title)
        event.description = data.get('description', event.description)
        event.date = datetime.fromisoformat(data.get('date', event.date.isoformat()))
        event.location = data.get('location', event.location)
        event.expected_attendees = data.get('expected_attendees', event.expected_attendees)
        event.club_name = data.get('club_name', event.club_name)
        
        # Si l'utilisateur n'est pas admin, mettre le statut en attente d'approbation
        if user.role != 'admin':
            event.status = 'pending_approval'
            event.modified_by = user.email
            event.modification_date = datetime.now()
            event.old_values = str(old_values)  # Stocker les anciennes valeurs
            
            # Envoyer la notification à l'admin
            logger.info(f"Modification d'événement en attente d'approbation: {event.id} par {user.email}")
        
        db.session.commit()
        
        return jsonify(event.to_dict())
    except Exception as e:
        db.session.rollback()
        logger.error(f"Erreur lors de la modification de l'événement: {str(e)}")
        return jsonify({'error': str(e)}), 400

@app.route('/api/events/<int:event_id>/submit-modification', methods=['POST', 'OPTIONS'])
@jwt_required()
def submit_modification(event_id):
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'Utilisateur non trouvé'}), 404
            
        event = Event.query.get_or_404(event_id)
        
        # Vérifier si l'utilisateur est l'organisateur
        if event.organizer_id != current_user_id:
            return jsonify({'error': 'Accès non autorisé'}), 403
            
        # Sauvegarder les anciennes valeurs
        old_values = {
            'title': event.title,
            'description': event.description,
            'date': event.date,
            'location': event.location,
            'expected_attendees': event.expected_attendees,
            'club_name': event.club_name
        }
        
        # Mettre à jour le statut et les informations de modification
        event.status = 'pending_approval'
        event.modified_by = user.email
        event.modification_date = datetime.now()
        event.old_values = str(old_values)
        
        db.session.commit()
        
        # Envoyer la notification à l'admin
        logger.info(f"Modification d'événement soumise pour approbation: {event.id} par {user.email}")
        
        return jsonify({
            'message': 'Modifications soumises avec succès',
            'event': event.to_dict()
        })
    except Exception as e:
        db.session.rollback()
        logger.error(f"Erreur lors de la soumission des modifications: {str(e)}")
        return jsonify({'error': str(e)}), 400

@app.route('/api/events/<int:event_id>/participate', methods=['POST'])
@jwt_required()
def participate_event(event_id):
    try:
        current_user_id = int(get_jwt_identity())
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'error': 'Utilisateur non trouvé'}), 404
            
        # Vérifier si l'événement existe
        event = Event.query.get_or_404(event_id)
        
        # Vérifier si l'utilisateur participe déjà
        if user in event.participants:
            return jsonify({'error': 'Vous participez déjà à cet événement'}), 400
            
        # Ajouter l'utilisateur aux participants
        event.participants.append(user)
        db.session.commit()
        
        return jsonify({'message': 'Participation enregistrée avec succès'}), 200
    except Exception as e:
        db.session.rollback()
        logger.error(f"Erreur lors de la participation à l'événement: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    with app.app_context():
        init_db()
    app.run(debug=True, port=5000) 