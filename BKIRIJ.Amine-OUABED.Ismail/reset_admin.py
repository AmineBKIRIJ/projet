from app import app, db, User
from werkzeug.security import generate_password_hash

def reset_admin():
    with app.app_context():
        # Supprimer l'ancien compte admin s'il existe
        admin = User.query.filter_by(email='admin@inpt.ac.ma').first()
        if admin:
            db.session.delete(admin)
            db.session.commit()
            print("Ancien compte admin supprimé")
        
        # Créer un nouveau compte admin
        new_admin = User(
            nom='Admin',
            prenom='System',
            email='admin@inpt.ac.ma',
            password_hash=generate_password_hash('Admin@123'),
            niveau='laureat',
            filiere='SESNUM',
            role='admin'
        )
        db.session.add(new_admin)
        db.session.commit()
        print("Nouveau compte admin créé")
        
        # Vérifier que le compte a été créé correctement
        admin = User.query.filter_by(email='admin@inpt.ac.ma').first()
        if admin:
            print(f"Admin role: {admin.role}")
            print(f"Password check: {admin.check_password('Admin@123')}")

if __name__ == '__main__':
    reset_admin() 