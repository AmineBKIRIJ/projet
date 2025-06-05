// DOM Elements
const eventsGrid = document.getElementById('eventsGrid');
const categoryFilter = document.getElementById('categoryFilter');
const dateFilter = document.getElementById('dateFilter');
const createEventModal = document.getElementById('createEventModal');
const becomeOrganizerModal = document.getElementById('becomeOrganizerModal');
const participateModal = document.getElementById('participateModal');
const createEventForm = document.getElementById('createEventForm');
const becomeOrganizerForm = document.getElementById('becomeOrganizerForm');
const participateForm = document.getElementById('participateForm');
const createEventLink = document.getElementById('createEventLink');
const becomeOrganizerLink = document.getElementById('becomeOrganizerLink');
const logoutLink = document.getElementById('logoutLink');
const locationSelect = document.getElementById('location');
const detailsModal = document.getElementById('detailsModal');

// Club images configuration with Unsplash random images
const CLUB_IMAGES = {
    'CIT': 'https://yt3.googleusercontent.com/ytc/AIdro_l76ubha-KqaHYPdiyekdfOtNfv6svYI7Bl9rgcItShmEa7=s900-c-k-c0x00ffffff-no-rj',
    'CAS': 'https://www.inpt.ac.ma/sites/default/files/DocSite/Clubs/Club%20Affaires%20Sociales%20INPT.jpg',
    'ENACTUS': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQDUvFn-nPprMJSvyullV3a5UcXWgKUq90Ww&s',
    'CESE': 'https://www.inpt.ac.ma/sites/default/files/DocSite/Clubs/CESE%20INPT.jpg',
    'Sports': 'https://img.freepik.com/vecteurs-libre/concept-equipement-sport_1284-13034.jpg?semt=ais_hybrid&w=740',
    'Mosque': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0R-aJNA1lLbeRbuq2p-Bp8Kldg-sKtoxV4A&s'
};

// Default image if club image is not found
const DEFAULT_IMAGE = 'https://picsum.photos/800/450?random=7';

// Location configuration
const LOCATIONS = {
    CLASSROOMS: ['CC01', 'CC02', 'CC03', 'CC04', 'CC05', 'CC06'],
    ROOMS_B: ['B100', 'B101', 'B102', 'B200', 'B201', 'B202'],
    AMPHITHEATERS: ['E1', 'E2', 'E3', 'Zlafa']
};

// Location capacities
const LOCATION_CAPACITIES = {
    'CC01': 30, 'CC02': 30, 'CC03': 30, 'CC04': 30, 'CC05': 30, 'CC06': 30,
    'B100': 50, 'B101': 50, 'B102': 50, 'B200': 50, 'B201': 50, 'B202': 50,
    'E1': 100, 'E2': 100, 'E3': 100, 'Zlafa': 300
};

// Stockage local des événements
let events = [
    {
        id: '1',
        title: 'Hackathon CIT 2024',
        description: 'Un hackathon de 48h pour développer des solutions innovantes en équipe. Venez mettre à l\'épreuve vos compétences en programmation !',
        date: '2024-04-15',
        time: '09:00',
        location: 'Zlafa',
        club_name: 'CIT',
        expected_attendees: 150,
        isCreated: false
    },
    {
        id: '2',
        title: 'Tournoi de Football',
        description: 'Tournoi de football inter-clubs. Inscrivez votre équipe et venez défier les autres clubs !',
        date: '2024-04-20',
        time: '14:00',
        location: 'B100',
        club_name: 'Sports',
        expected_attendees: 40,
        isCreated: false
    },
    {
        id: '3',
        title: 'Conférence sur l\'IA',
        description: 'Une conférence sur l\'intelligence artificielle et ses applications dans le monde moderne.',
        date: '2024-04-25',
        time: '15:30',
        location: 'E1',
        club_name: 'CIT',
        expected_attendees: 80,
        isCreated: false
    },
    {
        id: '4',
        title: 'Journée Portes Ouvertes',
        description: 'Découvrez les activités et projets du club CAS. Présentation des réalisations et opportunités de rejoindre l\'équipe.',
        date: '2024-05-01',
        time: '10:00',
        location: 'CC01',
        club_name: 'CAS',
        expected_attendees: 30,
        isCreated: false
    },
    {
        id: '5',
        title: 'Projet Social ENACTUS',
        description: 'Présentation du nouveau projet social et recrutement de nouveaux membres pour l\'équipe ENACTUS.',
        date: '2024-05-05',
        time: '16:00',
        location: 'E2',
        club_name: 'ENACTUS',
        expected_attendees: 60,
        isCreated: false
    },
    {
        id: '6',
        title: 'Séminaire CESE',
        description: 'Séminaire sur le développement durable et l\'entrepreneuriat social.',
        date: '2024-05-10',
        time: '14:00',
        location: 'E3',
        club_name: 'CESE',
        expected_attendees: 70,
        isCreated: false
    },
    {
        id: '7',
        title: 'Cours de Coran',
        description: 'Cours hebdomadaire de Coran et Tajweed pour tous les niveaux.',
        date: '2024-05-15',
        time: '17:00',
        location: 'CC02',
        club_name: 'Mosque',
        expected_attendees: 25,
        isCreated: false
    },
    {
        id: '8',
        title: 'Workshop Web Development',
        description: 'Apprenez les bases du développement web avec HTML, CSS et JavaScript.',
        date: '2024-05-20',
        time: '13:00',
        location: 'B101',
        club_name: 'CIT',
        expected_attendees: 35,
        isCreated: false
    },
    {
        id: '9',
        title: 'Tournoi de Basketball',
        description: 'Tournoi de basketball 3x3. Inscriptions ouvertes pour toutes les équipes !',
        date: '2024-05-25',
        time: '15:00',
        location: 'B200',
        club_name: 'Sports',
        expected_attendees: 45,
        isCreated: false
    },
    {
        id: '10',
        title: 'Conférence sur l\'Innovation',
        description: 'Conférence sur l\'innovation et l\'entrepreneuriat avec des intervenants de renom.',
        date: '2024-06-01',
        time: '10:00',
        location: 'Zlafa',
        club_name: 'CESE',
        expected_attendees: 200,
        isCreated: false
    }
];

// Ajouter un tableau pour stocker les participations
let userParticipations = [];

// Ajouter des événements de groupe d'étude
const studyGroupEvents = [
    {
        id: '11',
        title: 'Révision Mathématiques',
        description: 'Session de révision pour le prochain examen de mathématiques. Venez réviser ensemble !',
        date: '2024-04-18',
        time: '15:00',
        location: 'CC03',
        club_name: 'SESNUM-INE1',
        expected_attendees: 20,
        isCreated: false
    },
    {
        id: '12',
        title: 'Projet Web Development',
        description: 'Réunion de groupe pour le projet de développement web. Discussion sur l\'architecture et la répartition des tâches.',
        date: '2024-04-22',
        time: '14:00',
        location: 'B101',
        club_name: 'ICT-INE2',
        expected_attendees: 15,
        isCreated: false
    },
    {
        id: '13',
        title: 'Présentation Cloud Computing',
        description: 'Présentation des concepts de cloud computing et des services AWS.',
        date: '2024-04-25',
        time: '16:00',
        location: 'CC05',
        club_name: 'CLOUD-INE3',
        expected_attendees: 25,
        isCreated: false
    },
    {
        id: '14',
        title: 'Workshop Data Science',
        description: 'Introduction aux concepts de data science et aux outils d\'analyse de données.',
        date: '2024-04-28',
        time: '10:00',
        location: 'CC02',
        club_name: 'DATA-INE1',
        expected_attendees: 30,
        isCreated: false
    },
    {
        id: '15',
        title: 'Séance Python',
        description: 'Exercices pratiques en Python pour débutants.',
        date: '2024-05-02',
        time: '15:30',
        location: 'B102',
        club_name: 'SMART-INE2',
        expected_attendees: 20,
        isCreated: false
    }
];

// Ajouter les événements de groupe d'étude à la liste principale
events = [...events, ...studyGroupEvents];

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier l'authentification avant de charger les événements
    if (!checkAuth()) {
        return;
    }

    // Vérifier si l'utilisateur est admin
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role === 'admin') {
        window.location.replace('admin.html');
        return;
    }

    loadEvents();
    setupEventListeners();
    setupLocationValidation();
});

function setupEventListeners() {
    // Filter listeners
    categoryFilter.addEventListener('change', loadEvents);
    dateFilter.addEventListener('change', loadEvents);

    // Modal triggers
    createEventLink.addEventListener('click', () => showModal(createEventModal));
    becomeOrganizerLink.addEventListener('click', () => showModal(becomeOrganizerModal));

    // Form submissions
    createEventForm.addEventListener('submit', handleCreateEvent);
    becomeOrganizerForm.addEventListener('submit', handleBecomeOrganizer);
    participateForm.addEventListener('submit', handleParticipate);

    // Logout
    logoutLink.addEventListener('click', handleLogout);

    // Location validation
    locationSelect.addEventListener('change', validateLocationCapacity);
}

function setupLocationValidation() {
    const expectedAttendeesInput = document.getElementById('expected_attendees');
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    const locationSelect = document.getElementById('location');
    
    expectedAttendeesInput.addEventListener('input', validateLocationCapacity);
    
    // Valider la sélection de date et heure
    dateInput.addEventListener('change', function() {
        validateDateTimeSelection(this.value, timeInput.value, locationSelect.value);
    });
    
    timeInput.addEventListener('change', function() {
        validateDateTimeSelection(dateInput.value, this.value, locationSelect.value);
    });
}

function validateLocationCapacity() {
    const location = locationSelect.value;
    const expectedAttendees = document.getElementById('expected_attendees').value;
    const submitButton = createEventForm.querySelector('button[type="submit"]');
    
    if (location && expectedAttendees) {
        const capacity = LOCATION_CAPACITIES[location];
        if (parseInt(expectedAttendees) > capacity) {
            showError(`La capacité maximale pour ${location} est de ${capacity} personnes`);
            submitButton.disabled = true;
            return false;
        }
    }
    submitButton.disabled = false;
    return true;
}

// Modal functions
function showModal(modal) {
    modal.style.display = 'block';
}

function hideModal(modal) {
    modal.style.display = 'none';
}

// Event loading and display
async function loadEvents() {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            window.location.replace('auth.html');
            return;
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };

        const response = await fetch('http://127.0.0.1:5000/api/events', {
            method: 'GET',
            headers: headers,
            credentials: 'include',
            mode: 'cors'
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('user');
                window.location.replace('auth.html');
                return;
            }
            throw new Error('Erreur lors du chargement des événements');
        }
        
        const events = await response.json();
        console.log('Événements chargés:', events);
        
        const category = categoryFilter.value;
        const date = dateFilter.value;
        
        let filteredEvents = [...events];
        
        if (category === 'participating') {
            filteredEvents = filteredEvents.filter(event => userParticipations.includes(event.id));
        } else if (category) {
            filteredEvents = filteredEvents.filter(event => event.club_name === category);
        }
        
        if (date) {
            filteredEvents = filteredEvents.filter(event => event.date === date);
        }
        
        displayEvents(filteredEvents);
    } catch (error) {
        console.error('Erreur:', error);
        showError('Erreur lors du chargement des événements');
    }
}

function displayEvents(eventsToDisplay) {
    eventsGrid.innerHTML = '';
    
    if (eventsToDisplay.length === 0) {
        eventsGrid.innerHTML = '<p class="no-events">Aucun événement disponible</p>';
        return;
    }
    
    eventsToDisplay.forEach(event => {
        const eventCard = createEventCard(event);
        eventsGrid.appendChild(eventCard);
    });
}

function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    
    const locationType = getLocationType(event.location);
    const capacity = LOCATION_CAPACITIES[event.location];
    const isParticipating = userParticipations.includes(event.id);
    
    // Obtenir l'image du club
    const clubImage = CLUB_IMAGES[event.club_name] || DEFAULT_IMAGE;
    
    // Déterminer le statut de l'événement
    let statusBadge = '';
    if (event.status === 'pending') {
        statusBadge = '<div class="status-badge pending">En attente de validation</div>';
    } else if (event.status === 'approved') {
        statusBadge = '<div class="status-badge approved">Validé</div>';
    } else if (event.status === 'rejected') {
        statusBadge = '<div class="status-badge rejected">Refusé</div>';
    }
    
    card.innerHTML = `
        <div class="event-image-container">
            <img src="${clubImage}" alt="${event.club_name}" class="event-image" onerror="this.onerror=null; this.src='${DEFAULT_IMAGE}';">
            <div class="event-club-badge">${event.club_name}</div>
            ${statusBadge}
        </div>
        <div class="event-content">
            <h3 class="event-title">${event.title}</h3>
            <div class="event-details">
                <p><strong>Date:</strong> ${formatDate(event.date)}</p>
                <p><strong>Heure:</strong> ${event.time}</p>
                <p><strong>Lieu:</strong> ${event.location} (${locationType})</p>
                <p><strong>Capacité:</strong> ${capacity} personnes</p>
                <p><strong>Organisateur:</strong> ${event.organizer ? event.organizer.nom + ' ' + event.organizer.prenom : 'Non spécifié'}</p>
                <p><strong>Participants attendus:</strong> ${event.expected_attendees}</p>
            </div>
            <div class="event-actions">
                <button onclick="showEventDetails('${event.id}')" class="details-btn">Détails</button>
                ${event.status === 'approved' && !isParticipating 
                    ? `<button onclick="handleParticipateClick('${event.id}')" class="primary-btn">Participer</button>`
                    : isParticipating
                        ? `<div>
                            <button class="participated-btn" disabled>Participé</button>
                            <button onclick="handleCancelParticipation('${event.id}')" class="cancel-btn">Annuler</button>
                           </div>`
                        : ''
                }
            </div>
        </div>
    `;
    
    return card;
}

function getLocationType(location) {
    if (LOCATIONS.CLASSROOMS.includes(location)) return 'Salle de classe';
    if (LOCATIONS.ROOMS_B.includes(location)) return 'Salle B';
    if (LOCATIONS.AMPHITHEATERS.includes(location)) return 'Amphithéâtre';
    return 'Lieu non spécifié';
}

// Form handlers
async function handleCreateEvent(e) {
    e.preventDefault();
    
    // Vérifier l'authentification
    if (!checkAuth()) {
        return;
    }
    
    try {
        // Récupérer les valeurs du formulaire
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const location = document.getElementById('location').value;
        const expectedAttendees = parseInt(document.getElementById('expected_attendees').value);
        const clubName = document.getElementById('club_name').value;

        // Validation des champs requis
        if (!title || !description || !date || !time || !location || !expectedAttendees || !clubName) {
            showError('Veuillez remplir tous les champs requis');
            return;
        }

        // Validation de la date et de l'heure
        const eventDateTime = new Date(`${date}T${time}`);
        if (eventDateTime <= new Date()) {
            showError('La date et l\'heure de l\'événement doivent être dans le futur');
            return;
        }

        // Validation de la capacité du lieu
        const locationCapacity = LOCATION_CAPACITIES[location];
        if (expectedAttendees > locationCapacity) {
            showError(`Le nombre de participants ne peut pas dépasser la capacité du lieu (${locationCapacity} personnes)`);
            return;
        }

        // Récupérer le token JWT
        const token = localStorage.getItem('access_token');
        if (!token) {
        showError('Vous devez être connecté pour créer un événement');
            window.location.href = 'auth.html';
        return;
    }
    
        // Préparer les données
        const eventData = {
            title: title.trim(),
            description: description.trim(),
            date: `${date}T${time}`,
            location: location.trim(),
            expected_attendees: expectedAttendees,
            club_name: clubName.trim()
        };

        console.log('Envoi des données:', eventData);

        // Envoyer la requête
        const response = await fetch('http://127.0.0.1:5000/api/events/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(eventData)
        });
        
            const data = await response.json();
        console.log('Réponse du serveur:', data);

        if (!response.ok) {
            if (response.status === 401) {
                // Token expiré ou invalide
                localStorage.removeItem('access_token');
                localStorage.removeItem('user');
                window.location.href = 'auth.html';
                return;
            }
            throw new Error(data.error || 'Erreur lors de la création de l\'événement');
        }

        // Afficher le message de succès
        showSuccess('Événement créé avec succès ! En attente de validation par l\'administrateur.');
        
        // Fermer le modal et recharger les événements
        hideModal(createEventModal);
        createEventForm.reset();
        await loadEvents();
        
    } catch (error) {
        console.error('Erreur:', error);
        showError(error.message || 'Une erreur est survenue lors de la création de l\'événement');
    }
}

async function handleBecomeOrganizer(e) {
    e.preventDefault();
    hideModal(becomeOrganizerModal);
    becomeOrganizerLink.style.display = 'none';
    createEventLink.style.display = 'block';
    showSuccess('Vous êtes maintenant organisateur');
}

async function handleParticipate(e) {
    e.preventDefault();
    const eventId = participateForm.querySelector('input[name="eventId"]').value;
    
    // Ajouter l'événement aux participations
    userParticipations.push(eventId);
    
    hideModal(participateModal);
    showSuccess('Participation confirmée');
    
    // Recharger les événements pour mettre à jour l'affichage
    loadEvents();
}

function handleParticipateClick(eventId) {
    participateForm.querySelector('input[name="eventId"]').value = eventId;
    showModal(participateModal);
}

// Ajouter les styles pour les nouveaux boutons et le modal de confirmation
const style = document.createElement('style');
style.textContent = `
    .participated-btn {
        background-color: #6c757d;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: not-allowed;
        font-size: 0.9rem;
        opacity: 0.7;
    }

    .cancel-btn {
        background-color: #dc3545;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background-color 0.3s;
    }

    .cancel-btn:hover {
        background-color: #c82333;
    }

    .confirmation-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
        justify-content: center;
        align-items: center;
    }

    .confirmation-content {
        background-color: white;
        padding: 2rem;
        border-radius: 8px;
        text-align: center;
        max-width: 400px;
        width: 90%;
    }

    .confirmation-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1.5rem;
    }

    .confirmation-btn {
        padding: 0.5rem 1.5rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        transition: all 0.3s ease;
    }

    .confirm-btn {
        background-color: #dc3545;
        color: white;
    }

    .confirm-btn:hover {
        background-color: #c82333;
    }

    .cancel-confirm-btn {
        background-color: #6c757d;
        color: white;
    }

    .cancel-confirm-btn:hover {
        background-color: #5a6268;
    }
`;
document.head.appendChild(style);

// Ajouter le modal de confirmation au HTML
const confirmationModal = document.createElement('div');
confirmationModal.className = 'confirmation-modal';
confirmationModal.innerHTML = `
    <div class="confirmation-content">
        <h3>Confirmation de déconnexion</h3>
        <p>Êtes-vous sûr de vouloir vous déconnecter ?</p>
        <div class="confirmation-buttons">
            <button class="confirmation-btn confirm-btn">Déconnexion</button>
            <button class="confirmation-btn cancel-confirm-btn">Annuler</button>
        </div>
    </div>
`;
document.body.appendChild(confirmationModal);

function handleLogout(e) {
    e.preventDefault();
    confirmationModal.style.display = 'flex';
    
    const confirmBtn = confirmationModal.querySelector('.confirm-btn');
    const cancelBtn = confirmationModal.querySelector('.cancel-confirm-btn');
    
    confirmBtn.onclick = () => {
        // Supprimer les données de session
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        // Rediriger vers la page de connexion
        window.location.replace('auth.html');
    };
    
    cancelBtn.onclick = () => {
        confirmationModal.style.display = 'none';
    };
}

// Ajouter la fonction de suppression d'événement
function handleDeleteEvent(eventId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
        // Supprimer l'événement de la liste
        events = events.filter(event => event.id !== eventId);
        // Recharger les événements
        loadEvents();
        showSuccess('Événement supprimé avec succès');
    }
}

// Fonction pour afficher le modal d'édition
function showEditModal(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    // Remplir le formulaire avec les données de l'événement
    document.getElementById('editTitle').value = event.title;
    document.getElementById('editDescription').value = event.description;
    document.getElementById('editDate').value = event.date;
    document.getElementById('editTime').value = event.time;
    document.getElementById('editLocation').value = event.location;
    document.getElementById('editExpectedAttendees').value = event.expected_attendees;
    
    // Stocker l'ID de l'événement dans le formulaire
    document.querySelector('#editEventForm input[name="eventId"]').value = eventId;
    
    // Afficher le modal
    document.getElementById('editEventModal').style.display = 'block';
}

// Gestionnaire de soumission du formulaire d'édition
document.getElementById('editEventForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const eventId = this.querySelector('input[name="eventId"]').value;
    const updatedEvent = {
        title: document.getElementById('editTitle').value,
        description: document.getElementById('editDescription').value,
        date: document.getElementById('editDate').value,
        time: document.getElementById('editTime').value,
        location: document.getElementById('editLocation').value,
        expected_attendees: document.getElementById('editExpectedAttendees').value
    };

    // Mettre à jour l'événement dans le tableau des événements
    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex !== -1) {
        events[eventIndex] = { ...events[eventIndex], ...updatedEvent };
        
        // Mettre à jour l'affichage
        displayEvents();
        
        // Fermer le modal
        hideModal(document.getElementById('editEventModal'));
        
        // Afficher un message de succès
        alert('Événement modifié avec succès !');
    }
});

// Ajouter une fonction pour annuler la participation
function handleCancelParticipation(eventId) {
    if (confirm('Êtes-vous sûr de vouloir annuler votre participation ?')) {
        // Retirer l'événement des participations
        userParticipations = userParticipations.filter(id => id !== eventId);
        
        // Recharger les événements
        loadEvents();
        showSuccess('Participation annulée');
    }
}

// Utility functions
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

function showSuccess(message) {
    alert(message);
}

function showError(message) {
    alert(message);
}

// Fonction pour vérifier si une date et heure sont disponibles
function isDateTimeAvailable(date, time, location) {
    return !events.some(event => 
        event.date === date && 
        event.time === time && 
        event.location === location
    );
}

// Fonction pour valider la sélection de date et heure
function validateDateTimeSelection(date, time, location) {
    const submitButton = document.querySelector('#createEventForm button[type="submit"]');
    
    if (date && time && location) {
        if (!isDateTimeAvailable(date, time, location)) {
            showError('Ce créneau est déjà réservé. Veuillez choisir une autre date ou heure.');
            submitButton.disabled = true;
            return false;
        }
    }
    
    submitButton.disabled = false;
    return true;
}

// Ajouter la fonction pour afficher les détails de l'événement
function showEventDetails(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    // Remplir les détails dans la modal
    document.getElementById('detailsTitle').textContent = event.title;
    document.getElementById('detailsDate').textContent = formatDate(event.date);
    document.getElementById('detailsTime').textContent = event.time;
    document.getElementById('detailsLocation').textContent = `${event.location} (${getLocationType(event.location)})`;
    document.getElementById('detailsAttendees').textContent = `${event.expected_attendees} participants attendus`;
    document.getElementById('detailsClub').textContent = event.club_name;
    document.getElementById('detailsDescription').textContent = event.description;

    // Afficher la modal
    showModal(detailsModal);
}

// Fonction pour vérifier l'authentification
function checkAuth() {
    const token = localStorage.getItem('access_token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token || !user) {
        // Rediriger vers la page de connexion si non authentifié
        window.location.replace('auth.html');
        return false;
    }
    return true;
} 