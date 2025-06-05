from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(100), nullable=False)
    prenom = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    niveau = db.Column(db.String(50), nullable=False)
    filiere = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), default='user')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relations avec les événements
    organized_events = db.relationship('Event', 
                                     foreign_keys='Event.organizer_id',
                                     backref='organizer',
                                     lazy=True)
    
    approved_events = db.relationship('Event',
                                    foreign_keys='Event.approved_by_id',
                                    backref='approver',
                                    lazy=True)
    
    def __init__(self, **kwargs):
        super(User, self).__init__(**kwargs)
        if 'password' in kwargs:
            self.set_password(kwargs['password'])

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'nom': self.nom,
            'prenom': self.prenom,
            'email': self.email,
            'niveau': self.niveau,
            'filiere': self.filiere,
            'role': self.role
        }

class Event(db.Model):
    __tablename__ = 'events'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(200), nullable=False)
    expected_attendees = db.Column(db.Integer, nullable=False)
    club_name = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='pending')  # pending, approved, rejected
    
    # Clés étrangères
    organizer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    approved_by_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    
    # Relation avec les participants
    participants = db.relationship('User', secondary='event_participants', 
                                 backref=db.backref('participated_events', lazy='dynamic'))
    
    def __init__(self, **kwargs):
        super(Event, self).__init__(**kwargs)
        self.created_at = datetime.utcnow()
        self.updated_at = datetime.utcnow()

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'date': self.date.isoformat(),
            'location': self.location,
            'expected_attendees': self.expected_attendees,
            'club_name': self.club_name,
            'created_at': self.created_at.isoformat(),
            'status': self.status,
            'organizer': self.organizer.to_dict() if self.organizer else None,
            'approver': self.approver.to_dict() if self.approver else None,
            'participants_count': len(self.participants) if self.participants else 0
        }

# Table d'association pour la relation many-to-many entre Event et User
event_participants = db.Table('event_participants',
    db.Column('event_id', db.Integer, db.ForeignKey('events.id'), primary_key=True),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
) 