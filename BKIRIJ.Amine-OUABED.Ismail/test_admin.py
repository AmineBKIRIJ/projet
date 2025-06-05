from app import app, db, User
from werkzeug.security import generate_password_hash

def test_admin():
    with app.app_context():
        # Vérifier si l'admin existe
        admin = User.query.filter_by(email='admin@inpt.ac.ma').first()
        print(f"Admin exists: {admin is not None}")
        
        if admin:
            print(f"Admin role: {admin.role}")
            print(f"Admin password hash: {admin.password}")
            
            # Tester le mot de passe
            test_password = 'Admin@123'
            is_valid = admin.check_password(test_password)
            print(f"Password test result: {is_valid}")
        else:
            # Créer l'admin s'il n'existe pas
            admin = User(
                nom='Admin',
                prenom='System',
                email='admin@inpt.ac.ma',
                password=generate_password_hash('Admin@123'),
                niveau='laureat',
                filiere='SESNUM',
                role='admin'
            )
            db.session.add(admin)
            db.session.commit()
            print("Admin account created")

if __name__ == '__main__':
    test_admin() 