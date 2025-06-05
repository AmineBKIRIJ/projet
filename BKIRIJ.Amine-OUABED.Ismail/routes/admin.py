from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Event, User
from datetime import datetime
import logging

admin_bp = Blueprint('admin', __name__)
logger = logging.getLogger(__name__)

def admin_required(fn):
    def wrapper(*args, **kwargs):
        try:
            current_user_id = int(get_jwt_identity())
            logger.info(f"Tentative d'accès admin par l'utilisateur {current_user_id}")
            
            user = User.query.get(current_user_id)
            if not user:
                logger.error(f"Utilisateur {current_user_id} non trouvé")
                return jsonify({'error': 'Utilisateur non trouvé'}), 404
            
            if user.role != 'admin':
                logger.error(f"Accès refusé: l'utilisateur {current_user_id} n'est pas admin (rôle: {user.role})")
                return jsonify({'error': 'Accès non autorisé'}), 403
                
            logger.info(f"Accès admin autorisé pour l'utilisateur {current_user_id}")
            return fn(*args, **kwargs)
        except Exception as e:
            logger.error(f"Erreur lors de la vérification admin: {str(e)}")
            return jsonify({'error': str(e)}), 500
    wrapper.__name__ = fn.__name__
    return wrapper

@admin_bp.route('/events', methods=['GET', 'OPTIONS'])
@jwt_required()
@admin_required
def get_all_events():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        logger.info("Récupération de tous les événements par l'admin")
        events = Event.query.order_by(Event.date.desc()).all()
        return jsonify([event.to_dict() for event in events])
    except Exception as e:
        logger.error(f"Erreur lors de la récupération des événements: {str(e)}")
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/events/<int:event_id>/approve', methods=['POST', 'OPTIONS'])
@jwt_required()
@admin_required
def approve_event(event_id):
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        event = Event.query.get_or_404(event_id)
        current_user_id = int(get_jwt_identity())
        
        if event.status == 'approved':
            return jsonify({'error': 'Cet événement est déjà approuvé'}), 400
            
        event.status = 'approved'
        event.approved_by_id = current_user_id
        db.session.commit()
        
        return jsonify({
            'message': 'Événement approuvé avec succès',
            'event': event.to_dict()
        })
    except Exception as e:
        db.session.rollback()
        logger.error(f"Erreur lors de l'approbation de l'événement: {str(e)}")
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/events/<int:event_id>/reject', methods=['POST', 'OPTIONS'])
@jwt_required()
@admin_required
def reject_event(event_id):
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        event = Event.query.get_or_404(event_id)
        current_user_id = int(get_jwt_identity())
        
        if event.status == 'rejected':
            return jsonify({'error': 'Cet événement est déjà rejeté'}), 400
            
        event.status = 'rejected'
        event.approved_by_id = current_user_id
        db.session.commit()
        
        return jsonify({
            'message': 'Événement rejeté avec succès',
            'event': event.to_dict()
        })
    except Exception as e:
        db.session.rollback()
        logger.error(f"Erreur lors du rejet de l'événement: {str(e)}")
        return jsonify({'error': str(e)}), 500

@admin_bp.route('/users', methods=['GET', 'OPTIONS'])
@jwt_required()
@admin_required
def get_all_users():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        users = User.query.all()
        return jsonify([user.to_dict() for user in users])
    except Exception as e:
        logger.error(f"Erreur lors de la récupération des utilisateurs: {str(e)}")
        return jsonify({'error': str(e)}), 500 