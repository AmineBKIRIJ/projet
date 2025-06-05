from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from models import db, User
import logging

auth_bp = Blueprint('auth', __name__)
logger = logging.getLogger(__name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Vérifier si l'email existe déjà
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'error': 'Cet email est déjà utilisé'}), 400
        
        # Créer le nouvel utilisateur
        user = User(
            nom=data['nom'],
            prenom=data['prenom'],
            email=data['email'],
            password=data['password'],
            niveau=data['niveau'],
            filiere=data['filiere']
        )
        
        db.session.add(user)
        db.session.commit()
        
        # Créer le token JWT
        access_token = create_access_token(identity=user.id)
        
        return jsonify({
            'message': 'Inscription réussie',
            'access_token': access_token,
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        logger.error(f"Erreur lors de l'inscription: {str(e)}")
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        data = request.get_json()
        logger.info(f"Tentative de connexion avec les données: {data}")
        
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            logger.error("Email ou mot de passe manquant")
            return jsonify({'error': 'Email et mot de passe requis'}), 400

        user = User.query.filter_by(email=email).first()
        logger.info(f"Utilisateur trouvé: {user.to_dict() if user else 'Non trouvé'}")

        if not user or not user.check_password(password):
            logger.error("Email ou mot de passe incorrect")
            return jsonify({'error': 'Email ou mot de passe incorrect'}), 401

        # Créer le token JWT avec l'ID en tant que chaîne
        access_token = create_access_token(
            identity=str(user.id),
            additional_claims={'role': user.role}
        )
        logger.info(f"Token créé pour l'utilisateur {user.id} avec le rôle {user.role}")
        
        # Préparer les données utilisateur
        user_data = {
            'id': user.id,
            'nom': user.nom,
            'prenom': user.prenom,
            'email': user.email,
            'niveau': user.niveau,
            'filiere': user.filiere,
            'role': user.role
        }

        response = jsonify({
            'access_token': access_token,
            'user': user_data
        })
        
        # Ajouter les en-têtes CORS
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        
        return response, 200

    except Exception as e:
        logger.error(f"Erreur lors de la connexion: {str(e)}")
        return jsonify({'error': str(e)}), 500 