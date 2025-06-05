// Configuration de l'API
const API_URL = 'http://127.0.0.1:5000/api';

// Gestion de l'authentification
document.addEventListener('DOMContentLoaded', () => {
    console.log('Script auth.js chargé');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');
    const loginSection = document.getElementById('loginSection');
    const registerSection = document.getElementById('registerSection');

    // Gestion du slider d'images
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Afficher la première slide
    showSlide(0);

    // Changer de slide toutes les 5 secondes
    setInterval(nextSlide, 5000);

    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginSection.style.display = 'none';
            registerSection.style.display = 'block';
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            registerSection.style.display = 'none';
            loginSection.style.display = 'block';
        });
    }

    if (loginForm) {
        console.log('Formulaire de connexion trouvé');
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        console.log('Formulaire d\'inscription trouvé');
        registerForm.addEventListener('submit', handleSignup);
    }
});

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    console.log('Tentative de connexion avec:', { email });
    
    try {
        const loginData = { email, password };
        console.log('Données envoyées:', loginData);
        
        const API_URL = 'http://127.0.0.1:5000/api/auth/login';
        console.log('URL de l\'API:', API_URL);
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(loginData),
            credentials: 'include',
            mode: 'cors'
        });
        
        console.log('Status de la réponse:', response.status);
        const data = await response.json();
        console.log('Réponse du serveur:', data);
        
        if (response.ok) {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            if (data.user.role === 'admin') {
                window.location.href = '/admin.html';
            } else {
                window.location.href = '/events.html';
            }
        } else {
            showError(data.error || 'Email ou mot de passe incorrect');
        }
    } catch (error) {
        console.error('Erreur de connexion:', error);
        showError('Une erreur est survenue lors de la connexion');
    }
}

async function handleSignup(e) {
    e.preventDefault();
    
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const niveau = document.getElementById('niveau').value;
    const filiere = document.getElementById('filiere').value;
    
    // Log des données avant envoi
    console.log('Données du formulaire:', {
        nom,
        prenom,
        email,
        password: '***',
        niveau,
        filiere
    });
    
    try {
        const API_URL = 'http://127.0.0.1:5000/api/auth/register';
        console.log('URL de l\'API:', API_URL);
        
        const requestData = {
            nom,
            prenom,
            email,
            password,
            niveau,
            filiere
        };
        
        console.log('Données envoyées au serveur:', requestData);
        
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestData),
            credentials: 'include',
            mode: 'cors'
        });
        
        console.log('Status de la réponse:', response.status);
        const data = await response.json();
        console.log('Réponse du serveur:', data);
        
        if (response.ok) {
            showSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
            setTimeout(() => {
                document.getElementById('registerSection').style.display = 'none';
                document.getElementById('loginSection').style.display = 'block';
            }, 2000);
        } else {
            showError(data.error || 'Erreur lors de l\'inscription');
        }
    } catch (error) {
        console.error('Erreur d\'inscription:', error);
        showError('Une erreur est survenue lors de l\'inscription');
    }
}

function showError(message) {
    alert(message);
}

function showSuccess(message) {
    alert(message);
} 