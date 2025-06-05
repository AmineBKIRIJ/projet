// DOM Elements
let eventsGrid;
let categoryFilter;
let dateFilter;
let createEventModal;
let editEventModal;
let participateModal;
let createEventForm;
let editEventForm;
let participateForm;
let createEventLink;
let becomeOrganizerLink;
let logoutLink;
let locationSelect;
let expectedAttendeesInput;

// Club images configuration
const CLUB_IMAGES = {
    'CIT': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMP6UqVxzOP3ZWjTGVE2n0wTjx7UQuPvvSq07Xb7oHiTlp7VPtBlfw0NVbyiWKSqsDcvs&usqp=CAU',
    'CAS': 'https://www.assohelp.org/association/club-affaires-sociales-inpt/cas.jpg',
    'ENACTUS': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQDUvFn-nPprMJSvyullV3a5UcXWgKUq90Ww&s',
    'CESE': 'https://media.licdn.com/dms/image/v2/C5603AQEJG4y98bdIMQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1604346465234?e=2147483647&v=beta&t=-e2VNLM5q49Law38mT5I2IQ_5RMxJMOBGdeT_XoSy1A',
    'Sports': 'https://img.freepik.com/premium-vector/logo-sports-is-shown-white-background_575769-394.jpg?semt=ais_items_boosted&w=740',
    'Mosque': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0R-aJNA1lLbeRbuq2p-Bp8Kldg-sKtoxV4A&s',
    // Image pour tous les groupes d'étude
    'SESNUM-INE1': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'SESNUM-INE2': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'SESNUM-INE3': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'ASEDS-INE1': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'ASEDS-INE2': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'ASEDS-INE3': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'SMART-INE1': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'SMART-INE2': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'SMART-INE3': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'ICT-INE1': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'ICT-INE2': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'ICT-INE3': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'ICCN-INE1': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'ICCN-INE2': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'ICCN-INE3': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'DATA-INE1': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'DATA-INE2': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'DATA-INE3': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'AMOA-INE1': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'AMOA-INE2': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'AMOA-INE3': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'CLOUD-INE1': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'CLOUD-INE2': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg',
    'CLOUD-INE3': 'https://img.freepik.com/premium-vector/pencil-logostudy-group-logo-education-logo-student_304830-118.jpg'
};

// Default image if club image is not found
const DEFAULT_IMAGE = 'https://placehold.co/400x150/2196F3/FFFFFF/png?text=Event+Image';
const DEFAULT_CLUB_LOGO = 'https://placehold.co/100x100/2196F3/FFFFFF/png?text=Club';

// Location configuration
const LOCATIONS = {
    CLASSROOMS: ['CC01', 'CC02', 'CC03', 'CC04', 'CC05', 'CC06'],
    ROOMS_B: ['B100', 'B101', 'B102', 'B200', 'B201', 'B202'],
    AMPHITHEATERS: ['E1', 'E2', 'E3', 'Zlafa'],
    SPORTS: ['Terrain Foot', 'Terrain Basket', 'Terrain Basket Mles', 'Gradins']
};

// Location capacities
const LOCATION_CAPACITIES = {
    'CC01': 30, 'CC02': 30, 'CC03': 30, 'CC04': 30, 'CC05': 30, 'CC06': 30,
    'B100': 50, 'B101': 50, 'B102': 50, 'B200': 50, 'B201': 50, 'B202': 50,
    'E1': 100, 'E2': 100, 'E3': 100, 'Zlafa': 300,
    'Terrain Foot': 200, 'Terrain Basket': 100, 'Terrain Basket Mles': 100, 'Gradins': 500
};

// Configuration de l'API
const API_URL = 'http://127.0.0.1:5000/api';

// Stocker les événements chargés globalement
let lastLoadedEvents = [];

// Fonction pour précharger les images
function preloadImages() {
    // Précharger les images des clubs
    Object.values(CLUB_IMAGES).forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Fonction pour afficher les messages de succès
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    successDiv.textContent = message;
    document.body.appendChild(successDiv);

    // Ajouter l'animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Supprimer le message après 5 secondes
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(successDiv);
            document.head.removeChild(style);
        }, 300);
    }, 5000);
}

// Fonction pour afficher les messages d'erreur
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #f44336;
        color: white;
        padding: 15px 25px;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);

    // Ajouter l'animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Supprimer le message après 5 secondes
    setTimeout(() => {
        errorDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(errorDiv);
            document.head.removeChild(style);
        }, 300);
    }, 5000);
}

// Ajouter les styles pour les notifications
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    .success-message,
    .error-message {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    }

    .success-message {
        background-color: #4CAF50;
        color: white;
    }

    .error-message {
        background-color: #f44336;
        color: white;
    }

    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyle);

// Event Listeners
document.addEventListener('DOMContentLoaded', async () => {
    console.log('Script events.js chargé');
    
    // Vérifier si l'utilisateur est connecté
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'auth.html';
        return;
    }
    
    console.log('User from localStorage:', user);
    
    // Initialiser les éléments
    initializeElements();
    
    // Charger les événements
    await loadEvents();
    
    // Gestion du formulaire de création d'événement
    const createEventLink = document.getElementById('createEventLink');
    if (createEventLink) {
        createEventLink.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.getElementById('createEventModal');
            if (modal) {
                modal.style.display = 'block';
                // Initialiser les éléments du formulaire après l'affichage de la modale
                setTimeout(() => {
                    locationSelect = document.getElementById('location');
                    expectedAttendeesInput = document.getElementById('expected_attendees');
                    if (locationSelect && expectedAttendeesInput) {
                        setupLocationValidation();
                    }
                }, 100);
            } else {
                console.error('Modal de création d\'événement non trouvée');
            }
        });
    } else {
        console.error('Lien de création d\'événement non trouvé');
    }
    
    // Gestion du formulaire de création d'événement
    const eventForm = document.getElementById('createEventForm');
    if (eventForm) {
        eventForm.addEventListener('submit', handleCreateEvent);
    } else {
        console.error('Formulaire de création d\'événement non trouvé');
    }
    
    // Gestion des filtres
    const filterForm = document.getElementById('filterForm');
    if (filterForm) {
        filterForm.addEventListener('submit', handleFilter);
    }

    // Gestion de la déconnexion
    const logoutButton = document.getElementById('logoutLink');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            showLogoutConfirmation();
        });
    }
});

function initializeElements() {
    eventsGrid = document.getElementById('eventsGrid');
    categoryFilter = document.getElementById('categoryFilter');
    dateFilter = document.getElementById('dateFilter');
    createEventModal = document.getElementById('createEventModal');
    editEventModal = document.getElementById('editEventModal');
    participateModal = document.getElementById('participateModal');
    createEventForm = document.getElementById('createEventForm');
    editEventForm = document.getElementById('editEventForm');
    participateForm = document.getElementById('participateForm');
    createEventLink = document.getElementById('createEventLink');
    becomeOrganizerLink = document.getElementById('becomeOrganizerLink');
    logoutLink = document.getElementById('logoutLink');
}

function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('User from localStorage:', user);
    
    if (!user) {
        console.log('No user found, redirecting to login');
        window.location.href = '/auth.html';
        return false;
    }

    // Cacher le bouton devenir organisateur
    if (becomeOrganizerLink) {
        becomeOrganizerLink.style.display = 'none';
    }

    // Toujours afficher le bouton créer événement
    if (createEventLink) {
        createEventLink.addEventListener('click', () => {
            showModal(createEventModal);
            // Initialiser les éléments du formulaire après l'affichage de la modale
            setTimeout(() => {
                locationSelect = document.getElementById('location');
                expectedAttendeesInput = document.getElementById('expected_attendees');
                if (locationSelect && expectedAttendeesInput) {
                    setupLocationValidation();
                }
            }, 100);
        });
    }

    return true;
}

function setupEventListeners() {
    // Filter listeners
    if (categoryFilter) {
    categoryFilter.addEventListener('change', loadEvents);
    }
    if (dateFilter) {
    dateFilter.addEventListener('change', loadEvents);
    }

    // Modal triggers
    if (createEventLink) {
        createEventLink.addEventListener('click', () => {
            showModal(createEventModal);
            // Initialiser les éléments du formulaire après l'affichage de la modale
            setTimeout(() => {
                locationSelect = document.getElementById('location');
                expectedAttendeesInput = document.getElementById('expected_attendees');
                if (locationSelect && expectedAttendeesInput) {
                    setupLocationValidation();
                }
            }, 100);
        });
    }
    if (becomeOrganizerLink) {
    becomeOrganizerLink.addEventListener('click', () => showModal(becomeOrganizerModal));
    }

    // Form submissions
    if (createEventForm) {
    createEventForm.addEventListener('submit', handleCreateEvent);
    }
    if (editEventForm) {
    editEventForm.addEventListener('submit', handleEditEvent);
    }
    if (participateForm) {
    participateForm.addEventListener('submit', handleParticipate);
    }

    // Logout
    const logoutButton = document.getElementById('logoutLink');
    if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            const confirmLogout = confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
            if (confirmLogout) {
                localStorage.removeItem('user');
                localStorage.removeItem('access_token');
                window.location.href = 'auth.html';
            }
        });
    }
}

function setupLocationValidation() {
    if (!locationSelect || !expectedAttendeesInput) {
        console.warn('Éléments de validation de localisation non trouvés');
        return;
    }

    // Supprimer les anciens écouteurs s'ils existent
    locationSelect.removeEventListener('change', validateLocationCapacity);
    expectedAttendeesInput.removeEventListener('input', validateLocationCapacity);

    // Ajouter les nouveaux écouteurs
    locationSelect.addEventListener('change', validateLocationCapacity);
    expectedAttendeesInput.addEventListener('input', validateLocationCapacity);
}

function validateLocationCapacity() {
    if (!locationSelect || !expectedAttendeesInput || !createEventForm) {
        return true;
    }

    const submitButton = createEventForm.querySelector('button[type="submit"]');
    if (!submitButton) {
        return true;
    }

    const location = locationSelect.value;
    const expectedAttendees = expectedAttendeesInput.value;
    
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
    if (modal) {
    modal.style.display = 'block';
    }
}

function hideModal(modal) {
    if (modal) {
    modal.style.display = 'none';
    }
}

// Event loading and display
async function loadEvents() {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            window.location.replace('auth.html');
            return;
        }

        // Récupérer l'utilisateur actuel depuis le localStorage
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (!currentUser || !currentUser.id) {
            console.error('Utilisateur non connecté ou ID manquant');
            window.location.replace('auth.html');
            return;
        }

        console.log('User loaded:', currentUser);

        const response = await fetch('http://127.0.0.1:5000/api/events', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
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
        
        // S'assurer que chaque événement a une liste de participants
        events.forEach(event => {
            if (!event.participants) {
                event.participants = [];
            }
            // Vérifier si l'utilisateur actuel participe à cet événement
            const isParticipating = event.participants.some(p => p.id === currentUser.id);
            console.log(`Événement ${event.id} - Participation: ${isParticipating}`);
        });
        
        lastLoadedEvents = events; // Stocker les événements pour un accès ultérieur
    
    const eventsContainer = document.getElementById('eventsContainer');
        
    if (!eventsContainer) {
            console.error('Conteneur d\'événements non trouvé');
        return;
    }
    
    // Vider le conteneur
    eventsContainer.innerHTML = '';
    
        // Vérifier s'il y a des événements
    if (!events || events.length === 0) {
            eventsContainer.innerHTML = '<div class="no-events">Aucun événement disponible</div>';
        return;
    }
    
        // Filtrer les événements selon le rôle de l'utilisateur
        const isAdmin = currentUser.role === 'admin';
        
        // Si l'utilisateur est admin, afficher tous les événements
        // Sinon, n'afficher que les événements approuvés
        const filteredEvents = isAdmin ? events : events.filter(event => event.status === 'approved');
        
        // Afficher les événements
        filteredEvents.forEach(event => {
            const isOrganizer = event.organizer && event.organizer.id === currentUser.id;
            const eventCard = document.createElement('div');
            eventCard.innerHTML = createEventCard(event, isOrganizer);
            eventsContainer.appendChild(eventCard);
            
            // Mettre à jour l'apparence du bouton de participation
            const isParticipating = event.participants && event.participants.some(p => p.id === currentUser.id);
            if (isParticipating) {
                updateParticipateButton(event.id, true);
            }
        });

        // Initialiser les filtres
        initializeFilters();

    } catch (error) {
        console.error('Erreur:', error);
        showError('Erreur lors du chargement des données');
    }
}

// Fonction pour initialiser les filtres
function initializeFilters() {
    console.log('Initialisation des filtres...');
    
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const filterForm = document.getElementById('filterForm');

    console.log('Éléments trouvés:', {
        categoryFilter: !!categoryFilter,
        dateFilter: !!dateFilter,
        filterForm: !!filterForm
    });

    if (!categoryFilter || !dateFilter || !filterForm) {
        console.error('Éléments de filtrage non trouvés');
        return;
    }

    // Ajouter l'écouteur d'événements pour le formulaire
    filterForm.addEventListener('submit', (event) => {
        console.log('Formulaire soumis');
        event.preventDefault();
        handleFilter(event);
    });

    console.log('Filtres initialisés avec succès');
}

// Fonction pour gérer le filtrage des événements
async function handleFilter(event) {
    event.preventDefault();
    console.log('Début du filtrage...');
    
    try {
        const categoryFilter = document.getElementById('categoryFilter');
        const dateFilter = document.getElementById('dateFilter');
        
        if (!categoryFilter || !dateFilter) {
            throw new Error('Éléments de filtrage non trouvés');
        }

        const category = categoryFilter.value;
        const date = dateFilter.value;
        
        console.log('Filtres sélectionnés:', { category, date });
        
        // Filtrer les événements déjà chargés
        let filteredEvents = [...lastLoadedEvents];
        console.log('Nombre total d\'événements:', filteredEvents.length);
        
        // Récupérer l'utilisateur actuel
        const currentUser = JSON.parse(localStorage.getItem('user'));
        
        // Filtrer par catégorie (club)
        if (category && category !== 'all') {
            if (category === 'my_participations') {
                // Filtrer pour n'afficher que les événements auxquels l'utilisateur participe
                filteredEvents = filteredEvents.filter(event => 
                    event.participants && event.participants.some(p => p.id === currentUser.id)
                );
            } else {
                // Filtrer par club normal
                filteredEvents = filteredEvents.filter(event => event.club_name === category);
            }
            console.log('Événements après filtrage par catégorie:', filteredEvents.length);
        }
        
        // Filtrer par date
        if (date) {
            const selectedDate = new Date(date);
            filteredEvents = filteredEvents.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.toDateString() === selectedDate.toDateString();
            });
            console.log('Événements après filtrage par date:', filteredEvents.length);
        }
        
        // Vider le conteneur
        const eventsContainer = document.getElementById('eventsContainer');
        if (!eventsContainer) {
            throw new Error('Conteneur d\'événements non trouvé');
        }
        
        eventsContainer.innerHTML = '';
        
        // Afficher les événements filtrés
        if (filteredEvents.length === 0) {
            eventsContainer.innerHTML = '<div class="no-events">Aucun événement ne correspond à vos critères</div>';
            return;
        }
        
        // Afficher les événements filtrés
        filteredEvents.forEach(event => {
            const isOrganizer = event.organizer && event.organizer.id === currentUser.id;
            const eventCard = document.createElement('div');
            eventCard.innerHTML = createEventCard(event, isOrganizer);
            eventsContainer.appendChild(eventCard);
        });
        
        console.log('Filtrage terminé avec succès');
        
    } catch (error) {
        console.error('Erreur lors du filtrage:', error);
        showError('Erreur lors du filtrage des événements');
    }
}

// Exposer la fonction dans le scope global
window.handleFilter = handleFilter;

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Fonction pour afficher les détails de l'événement
async function showEventDetails(eventId) {
    try {
        console.log('Tentative d\'affichage des détails pour l\'événement ID:', eventId);
        
        // Convertir l'ID en nombre si c'est une chaîne
        const numericId = parseInt(eventId);
        console.log('ID numérique:', numericId);
        
        // Chercher l'événement dans le tableau lastLoadedEvents
        const event = lastLoadedEvents.find(e => e.id === numericId);
        if (!event) {
            throw new Error('Événement non trouvé');
        }

        // Mettre à jour le contenu de la modale
        const modal = document.getElementById('detailsModal');
        if (!modal) {
            throw new Error('Modal de détails non trouvée');
        }

        // Mettre à jour les éléments de la modale
        modal.querySelector('#detailsTitle').textContent = event.title;
        modal.querySelector('#detailsDate').textContent = new Date(event.date).toLocaleString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
        modal.querySelector('#detailsLocation').textContent = event.location;
        modal.querySelector('#detailsAttendees').textContent = `${event.expected_attendees} participants attendus`;
        modal.querySelector('#detailsClub').textContent = event.club_name;
        modal.querySelector('#detailsDescription').textContent = event.description;

        // Mettre à jour l'image
        const detailsImage = modal.querySelector('#detailsImage');
        detailsImage.src = CLUB_IMAGES[event.club_name] || DEFAULT_IMAGE;
        detailsImage.alt = event.title;

        // Cacher le bouton de participation
        const participateBtn = modal.querySelector('#detailsParticipateBtn');
        if (participateBtn) {
            participateBtn.style.display = 'none';
        }

        // Afficher la modale
        modal.style.display = 'block';
        modal.classList.add('active');

    } catch (error) {
        console.error('Erreur:', error);
        showError('Erreur lors du chargement des détails de l\'événement');
    }
}

// Ajouter la fonction pour fermer la modale
function closeDetailsModal() {
    const modal = document.getElementById('detailsModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
}

// Exposer la fonction dans le scope global
window.closeDetailsModal = closeDetailsModal;

// Fonction pour gérer la création d'un événement
async function handleCreateEvent(event) {
    event.preventDefault();
    
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            window.location.href = '/auth.html';
            return;
        }

        const formData = new FormData(event.target);
        
        // Récupérer et formater la date et l'heure
        const dateTime = formData.get('date');
        
        console.log('DateTime:', dateTime);
        
        // Vérifier que la date est valide
        if (!dateTime) {
            throw new Error('La date et l\'heure sont requises');
        }

        const eventData = {
            title: formData.get('title'),
            description: formData.get('description'),
            date: dateTime,
            location: formData.get('location'),
            expected_attendees: parseInt(formData.get('expected_attendees')),
            club_name: formData.get('club_name'),
            status: 'pending_approval'
        };

        console.log('Données de l\'événement à envoyer:', eventData);

        const response = await fetch('http://127.0.0.1:5000/api/events', {
            method: 'POST',
        headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData),
            credentials: 'include',
            mode: 'cors'
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erreur lors de la création de l\'événement');
        }

        const result = await response.json();
        console.log('Réponse du serveur:', result);

        // Afficher le message de succès
        showSuccess('Événement créé avec succès et envoyé à l\'administrateur pour approbation');

        // Fermer la modale
        const modal = document.getElementById('createEventModal');
        if (modal) {
            modal.style.display = 'none';
        }

        // Réinitialiser le formulaire
        event.target.reset();

        // Recharger la liste des événements
        await loadEvents();

    } catch (error) {
        console.error('Erreur lors de la création de l\'événement:', error);
        showError(error.message || 'Une erreur est survenue lors de la création de l\'événement');
    }
}

// Fonction pour initialiser le formulaire de création d'événement
function initializeCreateEventForm() {
    const form = document.getElementById('createEventForm');
    if (!form) return;

    // Ajouter les écouteurs d'événements pour la validation
    form.addEventListener('submit', handleCreateEvent);

    // Initialiser le champ de date et heure
    const dateTimeInput = form.querySelector('input[type="datetime-local"]');

    if (dateTimeInput) {
        // Définir la date minimale à maintenant
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        dateTimeInput.min = `${year}-${month}-${day}T${hours}:${minutes}`;

        // Ajouter l'écouteur pour la validation
        dateTimeInput.addEventListener('change', validateDateTime);
    }
}

// Fonction pour valider la date et l'heure
function validateDateTime() {
    const form = document.getElementById('createEventForm');
    if (!form) return;

    const dateTimeInput = form.querySelector('input[type="datetime-local"]');
    const submitButton = form.querySelector('button[type="submit"]');

    if (!dateTimeInput || !submitButton) return;

    const isValid = dateTimeInput.value;
    submitButton.disabled = !isValid;
}

// Ajouter l'initialisation du formulaire au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    initializeCreateEventForm();
});

// Ajouter les styles pour le formulaire de création d'événement
const createEventFormStyle = document.createElement('style');
createEventFormStyle.textContent = `
    #createEventModal {
        display: none;
                position: fixed;
        z-index: 1000;
                left: 0;
        top: 0;
                width: 100%;
                height: 100%;
        background-color: rgba(0,0,0,0.7);
        overflow-y: auto;
    }

    #createEventModal .modal-content {
        background-color: #fefefe;
        margin: 2% auto;
        padding: 0;
        border-radius: 12px;
        width: 85%;
        max-width: 700px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        animation: modalFadeIn 0.3s ease-out;
    }

    #createEventModal .modal-header {
        padding: 25px 30px;
        background-color: #2196F3;
        border-bottom: 1px solid #e0e0e0;
        border-radius: 12px 12px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 1;
    }

    #createEventModal .modal-header h2 {
        margin: 0;
        color: white;
        font-size: 28px;
        font-weight: 600;
    }

    #createEventModal .close-button {
        background: none;
        border: none;
        color: white;
        font-size: 28px;
        cursor: pointer;
        padding: 8px 12px;
        border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
        transition: all 0.3s ease;
    }

    #createEventModal .close-button:hover {
        background-color: rgba(255, 255, 255, 0.2);
        transform: rotate(90deg);
    }

    #createEventModal .modal-body {
        padding: 30px;
        max-height: 90vh;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: #2196F3 #f1f1f1;
    }

    .event-form {
        max-width: 100%;
        margin: 0 auto;
        padding-bottom: 20px;
    }

    .event-form .form-group {
        margin-bottom: 25px;
    }

    .event-form .form-row {
        display: flex;
        gap: 25px;
        margin-bottom: 25px;
    }

    .event-form .form-row .form-group {
        flex: 1;
        margin-bottom: 0;
    }

    .event-form .form-group label {
        display: block;
        margin-bottom: 10px;
        color: #333;
        font-weight: 500;
        font-size: 16px;
    }

    .event-form .form-group label i {
        margin-right: 10px;
        color: #2196F3;
        font-size: 18px;
    }

    .event-form .form-group input,
    .event-form .form-group select,
    .event-form .form-group textarea {
        width: 100%;
        padding: 12px 15px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 16px;
        transition: all 0.3s ease;
        background-color: #f8f9fa;
    }

    .event-form .form-group input:focus,
    .event-form .form-group select:focus,
    .event-form .form-group textarea:focus {
        border-color: #2196F3;
        box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
        outline: none;
        background-color: white;
    }

    .event-form .form-group textarea {
        min-height: 200px;
        resize: vertical;
        line-height: 1.6;
    }

    .event-form .form-actions {
        display: flex;
        gap: 15px;
        margin-top: 35px;
        padding-top: 25px;
        border-top: 1px solid #e0e0e0;
        position: sticky;
        bottom: 0;
        background-color: #fefefe;
        padding-bottom: 10px;
    }

    .event-form .submit-btn,
    .event-form .cancel-btn {
        padding: 14px 28px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
                display: flex;
                align-items: center;
                gap: 10px;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .event-form .submit-btn {
        background-color: #4CAF50;
        color: white;
        flex: 2;
    }

    .event-form .submit-btn:hover {
        background-color: #45a049;
                transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
    }

    .event-form .submit-btn:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
    }

    .event-form .cancel-btn {
        background-color: #f44336;
        color: white;
        flex: 1;
    }

    .event-form .cancel-btn:hover {
        background-color: #da190b;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(244, 67, 54, 0.2);
    }

    /* Styles pour le champ de date et heure */
    .event-form input[type="datetime-local"] {
        font-family: inherit;
        cursor: pointer;
        background-color: white;
    }

    .event-form input[type="datetime-local"]::-webkit-calendar-picker-indicator {
        cursor: pointer;
        padding: 8px;
        margin-right: 8px;
        background-color: #2196F3;
        border-radius: 4px;
        color: white;
    }

    /* Style pour les champs invalides */
    .event-form input:invalid,
    .event-form select:invalid,
    .event-form textarea:invalid {
        border-color: #f44336;
        background-color: #fff8f8;
    }

    /* Message d'erreur */
    .error-message {
        color: #f44336;
        font-size: 14px;
        margin-top: 6px;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .error-message i {
        font-size: 16px;
    }

    /* Animation pour la modale */
    @keyframes modalFadeIn {
        from { 
            opacity: 0; 
            transform: translateY(-30px); 
        }
        to { 
            opacity: 1; 
            transform: translateY(0); 
        }
    }

    /* Style pour le scrollbar */
    #createEventModal .modal-body::-webkit-scrollbar {
        width: 8px;
    }

    #createEventModal .modal-body::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 4px;
    }

    #createEventModal .modal-body::-webkit-scrollbar-thumb {
        background: #2196F3;
        border-radius: 4px;
    }

    #createEventModal .modal-body::-webkit-scrollbar-thumb:hover {
        background: #1976D2;
    }

    /* Style pour Firefox */
    #createEventModal .modal-body {
        scrollbar-width: thin;
        scrollbar-color: #2196F3 #f1f1f1;
    }
`;
document.head.appendChild(createEventFormStyle);

// Fonction pour éditer un événement
async function editEvent(eventId) {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            window.location.href = '/auth.html';
            return;
        }

        // Utiliser les événements déjà chargés
        const event = lastLoadedEvents.find(e => e.id === eventId);
        if (!event) {
            throw new Error('Événement non trouvé');
        }

        // Créer la modale d'édition
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.zIndex = '1000';

        // Créer le contenu de la modale
        modal.innerHTML = `
            <div class="modal-content" style="
                background-color: white;
                margin: 5% auto;
                padding: 20px;
                border-radius: 8px;
                width: 90%;
                max-width: 600px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            ">
                <div class="modal-header" style="
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #eee;
                ">
                    <h2 style="margin: 0; color: #333;">Modifier l'événement</h2>
                    <button class="close-button" style="
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                        color: #666;
                    ">&times;</button>
                </div>
                <form id="editEventForm" class="event-form">
                    <div class="form-group">
                        <label for="edit-title">
                            <i class="fas fa-heading"></i> Titre
                        </label>
                        <input type="text" id="edit-title" name="title" value="${event.title}" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-description">
                            <i class="fas fa-align-left"></i> Description
                        </label>
                        <textarea id="edit-description" name="description" required>${event.description}</textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="edit-date">
                                <i class="fas fa-calendar"></i> Date
                            </label>
                            <input type="date" id="edit-date" name="date" value="${event.date.split('T')[0]}" required>
                        </div>
                        <div class="form-group">
                            <label for="edit-time">
                                <i class="fas fa-clock"></i> Heure
                            </label>
                            <input type="time" id="edit-time" name="time" value="${event.date.split('T')[1].substring(0, 5)}" required>
                        </div>
                    </div>
                        <div class="form-group">
                        <label for="edit-location">
                            <i class="fas fa-map-marker-alt"></i> Lieu
                        </label>
                        <select id="edit-location" name="location" required>
                            ${Object.values(LOCATIONS).flat().map(loc => 
                                `<option value="${loc}" ${loc === event.location ? 'selected' : ''}>${loc}</option>`
                            ).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                        <label for="edit-expected-attendees">
                            <i class="fas fa-users"></i> Participants attendus
                        </label>
                        <input type="number" id="edit-expected-attendees" name="expected_attendees" value="${event.expected_attendees}" min="1" required>
                    </div>
                    <div class="form-group">
                        <label for="edit-club">
                            <i class="fas fa-building"></i> Club
                        </label>
                        <select id="edit-club" name="club_name" required>
                            ${Object.keys(CLUB_IMAGES).map(club => 
                                `<option value="${club}" ${club === event.club_name ? 'selected' : ''}>${club}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="form-actions" style="
                        display: flex;
                        gap: 10px;
                        margin-top: 20px;
                        padding-top: 20px;
                        border-top: 1px solid #eee;
                    ">
                        <button type="submit" class="submit-btn" style="
                            padding: 10px 20px;
                            background-color: #4CAF50;
                            color: white;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                            flex: 1;
                        ">
                            <i class="fas fa-save"></i> Valider
                        </button>
                        <button type="button" class="cancel-btn" style="
                            padding: 10px 20px;
                            background-color: #f44336;
                            color: white;
                            border: none;
                            border-radius: 4px;
                            cursor: pointer;
                            flex: 1;
                        ">
                            <i class="fas fa-times"></i> Annuler
                        </button>
                    </div>
                </form>
            </div>
        `;

        // Ajouter la modale au document
        document.body.appendChild(modal);

        // Gérer la fermeture de la modale
        const closeBtn = modal.querySelector('.close-button');
        closeBtn.onclick = function() {
            document.body.removeChild(modal);
        };

        // Gérer la soumission du formulaire
        const form = modal.querySelector('#editEventForm');
        form.onsubmit = async function(e) {
    e.preventDefault();

            try {
                const formData = new FormData(form);
    const eventData = {
        title: formData.get('title'),
        description: formData.get('description'),
                    date: `${formData.get('date')}T${formData.get('time')}`,
        location: formData.get('location'),
        expected_attendees: parseInt(formData.get('expected_attendees')),
                    club_name: formData.get('club_name'),
                    status: 'pending_approval'
    };

        const response = await fetch(`http://127.0.0.1:5000/api/events/${eventId}`, {
            method: 'PUT',
            headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(eventData),
                    credentials: 'include',
                    mode: 'cors'
                });

                if (!response.ok) {
            const data = await response.json();
                    throw new Error(data.error || 'Erreur lors de la modification de l\'événement');
        }

                showSuccess('Modifications soumises à l\'administrateur pour approbation');
                document.body.removeChild(modal);
                await loadEvents();
    } catch (error) {
        console.error('Erreur:', error);
                showError(error.message || 'Une erreur est survenue lors de la modification de l\'événement');
            }
        };

        // Gérer le bouton Annuler
        const cancelBtn = modal.querySelector('.cancel-btn');
        cancelBtn.onclick = function() {
            document.body.removeChild(modal);
        };

        // Fermer la modale si on clique en dehors
        modal.onclick = function(event) {
            if (event.target === modal) {
                document.body.removeChild(modal);
            }
        };
        } catch (error) {
            console.error('Erreur:', error);
        showError('Erreur lors du chargement des détails de l\'événement');
    }
}

// Fonction pour afficher la confirmation de déconnexion
function showLogoutConfirmation() {
    // Créer la modale de confirmation
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.zIndex = '1000';

    // Créer le contenu de la modale
    modal.innerHTML = `
        <div class="modal-content" style="
            background-color: white;
            margin: 15% auto;
            padding: 20px;
            border-radius: 8px;
            width: 80%;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            animation: modalFadeIn 0.3s ease-out;
        ">
            <h2 style="color: #333; margin-bottom: 20px;">Confirmation de déconnexion</h2>
            <p style="color: #666; margin-bottom: 30px;">Êtes-vous sûr de vouloir vous déconnecter ?</p>
            <div style="display: flex; justify-content: center; gap: 15px;">
                <button id="confirmLogout" style="
                    padding: 10px 20px;
                    background-color: #f44336;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: background-color 0.2s;
                ">Déconnecter</button>
                <button id="cancelLogout" style="
                    padding: 10px 20px;
                    background-color: #9e9e9e;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: background-color 0.2s;
                ">Annuler</button>
            </div>
        </div>
    `;

    // Ajouter la modale au document
    document.body.appendChild(modal);

    // Ajouter les styles d'animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes modalFadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // Gérer le clic sur le bouton de confirmation
    const confirmButton = modal.querySelector('#confirmLogout');
    confirmButton.onclick = function() {
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        window.location.href = 'auth.html';
    };

    // Gérer le clic sur le bouton d'annulation
    const cancelButton = modal.querySelector('#cancelLogout');
    cancelButton.onclick = function() {
        document.body.removeChild(modal);
        document.head.removeChild(style);
    };

    // Gérer le clic en dehors de la modale
    modal.onclick = function(event) {
        if (event.target === modal) {
            document.body.removeChild(modal);
            document.head.removeChild(style);
        }
    };
}

// Ajouter le style pour les cartes d'événements
const eventCardStyle = document.createElement('style');
eventCardStyle.textContent = `
    .event-card {
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        margin-bottom: 20px;
        position: relative;
        width: 100%;
        height: 500px;
        display: flex;
        flex-direction: column;
    }

    .event-btn {
        padding: 8px 12px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        transition: all 0.3s ease;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        width: 100%;
        min-width: 100px;
        white-space: nowrap;
    }

    .event-btn.primary {
        background-color: #4CAF50;
        color: white;
    }

    .event-btn.primary:hover {
        background-color: #45a049;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
    }

    .event-btn.secondary {
        background-color: #2196F3;
        color: white;
    }

    .event-btn.secondary:hover {
        background-color: #1976D2;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(33, 150, 243, 0.2);
    }

    .event-btn.modify {
        background-color: #FFC107;
        color: white;
    }

    .event-btn.modify:hover {
        background-color: #FFA000;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 193, 7, 0.2);
    }

    .event-btn.delete {
        background-color: #f44336;
        color: white;
    }

    .event-btn.delete:hover {
        background-color: #d32f2f;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(244, 67, 54, 0.2);
    }

    .event-btn.approve {
        background-color: #4CAF50;
        color: white;
    }

    .event-btn.approve:hover {
        background-color: #45a049;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.2);
    }

    .event-btn.reject {
        background-color: #f44336;
        color: white;
    }

    .event-btn.reject:hover {
        background-color: #d32f2f;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(244, 67, 54, 0.2);
    }

    .event-btn i {
        font-size: 14px;
    }

    .event-btn.primary.participated {
        background-color: #9e9e9e !important;
        color: white !important;
        cursor: not-allowed !important;
        opacity: 0.8;
    }

    .event-btn.primary.participated:hover {
        background-color: #9e9e9e !important;
        transform: none !important;
        box-shadow: none !important;
    }

    .event-date {
        color: #2196F3;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .event-date i {
        color: #2196F3;
    }

    .event-info {
        color: #2196F3;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 5px;
        margin: 5px 0;
    }

    .event-info i {
        color: #2196F3;
    }

    .club-name {
        color: #2196F3;
        font-weight: 600;
        font-size: 16px;
    }
`;
document.head.appendChild(eventCardStyle);

// Modifier la fonction createEventCard
function createEventCard(event, isOrganizer) {
    console.log('Création de carte pour l\'événement:', event.id, event.title);
    
    // Vérifier si l'utilisateur participe déjà à l'événement
    const currentUser = JSON.parse(localStorage.getItem('user'));
    console.log('Utilisateur actuel:', currentUser);
    console.log('Participants de l\'événement:', event.participants);
    
    // Vérifier si l'utilisateur participe déjà
    const isParticipating = event.participants && event.participants.some(p => p.id === currentUser.id);
    console.log('L\'utilisateur participe déjà:', isParticipating);
    
    const isAdmin = currentUser.role === 'admin';
    const isAdminPage = window.location.pathname.includes('admin.html');
    
    // Formater la date correctement
    let formattedDate = 'Date non spécifiée';
    try {
        if (event.date) {
            const date = new Date(event.date);
            if (!isNaN(date.getTime())) {
                formattedDate = date.toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            }
        }
    } catch (error) {
        console.error('Erreur de formatage de date:', error);
    }
    
    // Déterminer les boutons à afficher
    let actionButtons = '';
    if (isOrganizer) {
        actionButtons = `
            <button class="event-btn modify" onclick="handleEventAction(${event.id}, 'modify')">
                <i class="fas fa-edit"></i> Modifier
            </button>
            <button class="event-btn delete" onclick="handleEventAction(${event.id}, 'delete')">
                <i class="fas fa-trash"></i> Supprimer
            </button>
        `;
    } else if (isAdminPage && isAdmin && event.status === 'pending_approval') {
        actionButtons = `
            <button class="event-btn approve" onclick="handleEventAction(${event.id}, 'approve')">
                <i class="fas fa-check"></i> Approuver
            </button>
            <button class="event-btn reject" onclick="handleEventAction(${event.id}, 'reject')">
                <i class="fas fa-times"></i> Rejeter
            </button>
        `;
    } else {
        if (isParticipating) {
            console.log('Affichage du bouton d\'annulation pour l\'événement:', event.id);
            actionButtons = `
                <button class="event-btn primary participated" disabled>
                    <i class="fas fa-check-circle"></i> Participé
                </button>
            `;
        } else {
            console.log('Affichage du bouton de participation pour l\'événement:', event.id);
            actionButtons = `
                <button class="event-btn primary" onclick="handleEventAction(${event.id}, 'participate')">
                    <i class="fas fa-user-plus"></i> Participer
                </button>
            `;
        }
    }
    
    return `
        <div class="event-card" data-event-id="${event.id}">
            <div class="event-image">
                <img src="${CLUB_IMAGES[event.club_name] || DEFAULT_IMAGE}" alt="${event.club_name}">
                <div class="event-status ${event.status}">${event.status}</div>
            </div>
            <div class="event-content">
                <div class="event-header">
                    <div class="club-info">
                        <div class="club-name">${event.club_name}</div>
                        <div class="event-date">
                            <i class="fas fa-calendar"></i>
                            ${formattedDate}
                        </div>
                    </div>
                </div>
                <h3 class="event-title">${event.title}</h3>
                <div class="event-info">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${event.location}</span>
                </div>
                <div class="event-info">
                    <i class="fas fa-users"></i>
                    <span>${event.expected_attendees} participants attendus</span>
                </div>
                <div class="event-actions">
                    <button class="event-btn secondary" onclick="showEventDetails(${event.id})">
                        <i class="fas fa-info-circle"></i> Détails
                    </button>
                    ${actionButtons}
                </div>
            </div>
        </div>
    `;
}

// Ajouter les fonctions pour approuver et rejeter les événements
async function approveEvent(eventId) {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            window.location.href = '/auth.html';
            return;
        }

        const response = await fetch(`http://127.0.0.1:5000/api/events/${eventId}/approve`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });

        if (!response.ok) {
        const data = await response.json();
            throw new Error(data.error || 'Erreur lors de l\'approbation de l\'événement');
        }

        showSuccess('Événement approuvé avec succès');
        await loadEvents();
    } catch (error) {
        console.error('Erreur:', error);
        showError(error.message || 'Une erreur est survenue lors de l\'approbation de l\'événement');
    }
}

async function rejectEvent(eventId) {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            window.location.href = '/auth.html';
            return;
        }

        const response = await fetch(`http://127.0.0.1:5000/api/events/${eventId}/reject`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Erreur lors du rejet de l\'événement');
        }

        showSuccess('Événement rejeté avec succès');
        await loadEvents();
    } catch (error) {
        console.error('Erreur:', error);
        showError(error.message || 'Une erreur est survenue lors du rejet de l\'événement');
    }
}

// Mettre à jour la fonction handleEventAction
function handleEventAction(eventId, action) {
    switch (action) {
        case 'modify':
            editEvent(eventId);
            break;
        case 'delete':
            deleteEvent(eventId);
            break;
        case 'participate':
            participateEvent(eventId);
            break;
        case 'cancel':
            if (confirm('Êtes-vous sûr de vouloir annuler votre participation à cet événement ?')) {
                cancelParticipation(eventId);
            }
            break;
        case 'approve':
            if (confirm('Êtes-vous sûr de vouloir approuver cet événement ?')) {
                approveEvent(eventId);
            }
            break;
        case 'reject':
            if (confirm('Êtes-vous sûr de vouloir rejeter cet événement ?')) {
                rejectEvent(eventId);
            }
            break;
        default:
            console.error('Action non reconnue:', action);
    }
}

// Exposer la fonction dans le scope global
window.handleEventAction = handleEventAction;

// Fonction pour supprimer un événement
async function deleteEvent(eventId) {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            window.location.href = '/auth.html';
            return;
        }

        if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
            return;
        }

        // Au lieu de supprimer, on met à jour le statut à 'deleted'
        const response = await fetch(`http://127.0.0.1:5000/api/events/${eventId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: 'deleted'
            }),
            credentials: 'include',
            mode: 'cors'
        });

        if (response.ok) {
            showSuccess('Événement supprimé avec succès');
            loadEvents(); // Recharger la liste des événements
        } else {
            const data = await response.json();
            showError(data.error || 'Erreur lors de la suppression de l\'événement');
        }
    } catch (error) {
        console.error('Erreur:', error);
        showError('Une erreur est survenue lors de la suppression de l\'événement');
    }
}

// Fonction pour participer à un événement
async function participateEvent(eventId) {
    try {
        console.log('Tentative de participation à l\'événement:', eventId);
        
        const token = localStorage.getItem('access_token');
        if (!token) {
            window.location.href = '/auth.html';
            return;
        }

        // Vérifier si l'utilisateur participe déjà à l'événement
        const currentUser = JSON.parse(localStorage.getItem('user'));
        console.log('Utilisateur actuel:', currentUser);
        
        const event = lastLoadedEvents.find(e => e.id === parseInt(eventId));
        console.log('Événement trouvé:', event);
        
        if (!event) {
            showError('Événement non trouvé');
            return;
        }

        // Vérifier si l'utilisateur participe déjà
        const isParticipating = event.participants && event.participants.some(p => p.id === currentUser.id);
        console.log('L\'utilisateur participe déjà:', isParticipating);
        
        if (isParticipating) {
            showError('Vous participez déjà à cet événement');
            updateParticipateButton(eventId, true);
            return;
        }

        console.log('Envoi de la requête de participation...');
        
        // Envoyer la requête de participation
        const response = await fetch(`http://127.0.0.1:5000/api/events/${eventId}/participate`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });

        console.log('Réponse reçue:', response.status);
        
        let data;
        try {
            data = await response.json();
            console.log('Données de la réponse:', data);
        } catch (e) {
            console.error('Erreur lors de la lecture de la réponse:', e);
            throw new Error('Erreur lors de la lecture de la réponse du serveur');
        }

        if (!response.ok) {
            if (response.status === 400) {
                console.log('Erreur 400 détectée');
                // Mettre à jour l'état de participation dans lastLoadedEvents
                const eventIndex = lastLoadedEvents.findIndex(e => e.id === parseInt(eventId));
                if (eventIndex !== -1) {
                    if (!lastLoadedEvents[eventIndex].participants) {
                        lastLoadedEvents[eventIndex].participants = [];
                    }
                    if (!lastLoadedEvents[eventIndex].participants.some(p => p.id === currentUser.id)) {
                        lastLoadedEvents[eventIndex].participants.push(currentUser);
                    }
                }
                showError(data.error || 'Vous participez déjà à cet événement');
                updateParticipateButton(eventId, true);
                return;
            }
            throw new Error(data.error || 'Erreur lors de la participation à l\'événement');
        }

        console.log('Participation réussie');
        
        // Mettre à jour l'état de participation dans lastLoadedEvents
        const eventIndex = lastLoadedEvents.findIndex(e => e.id === parseInt(eventId));
        if (eventIndex !== -1) {
            if (!lastLoadedEvents[eventIndex].participants) {
                lastLoadedEvents[eventIndex].participants = [];
            }
            if (!lastLoadedEvents[eventIndex].participants.some(p => p.id === currentUser.id)) {
                lastLoadedEvents[eventIndex].participants.push(currentUser);
            }
        }
        
        // Mettre à jour l'apparence du bouton
        updateParticipateButton(eventId, true);

        // Afficher le message de succès
        showSuccess('Participation enregistrée avec succès');

        // Recharger les événements pour mettre à jour l'état
        await loadEvents();

    } catch (error) {
        console.error('Erreur complète:', error);
        showError(error.message || 'Une erreur est survenue lors de la participation à l\'événement');
    }
}

// Fonction utilitaire pour mettre à jour le bouton de participation
function updateParticipateButton(eventId, isParticipating) {
    const participateBtn = document.querySelector(`.event-card[data-event-id="${eventId}"] .event-btn.primary`);
    if (participateBtn) {
        if (isParticipating) {
            participateBtn.classList.add('participated');
            participateBtn.disabled = true;
            participateBtn.innerHTML = '<i class="fas fa-check-circle"></i> Participé';
            participateBtn.style.backgroundColor = '#9e9e9e';
            participateBtn.style.cursor = 'not-allowed';
        } else {
            participateBtn.classList.remove('participated');
            participateBtn.disabled = false;
            participateBtn.innerHTML = '<i class="fas fa-user-plus"></i> Participer';
            participateBtn.style.backgroundColor = '#4CAF50';
            participateBtn.style.cursor = 'pointer';
        }
    }
}

// Fonction pour annuler la participation à un événement
async function cancelParticipation(eventId) {
    try {
        console.log('Tentative d\'annulation de participation à l\'événement:', eventId);
        
        const token = localStorage.getItem('access_token');
        if (!token) {
            window.location.href = '/auth.html';
            return;
        }

        const currentUser = JSON.parse(localStorage.getItem('user'));
        const event = lastLoadedEvents.find(e => e.id === parseInt(eventId));
        
        if (!event) {
            showError('Événement non trouvé');
            return;
        }

        // Envoyer la requête d'annulation
        const response = await fetch(`http://127.0.0.1:5000/api/events/${eventId}/cancel-participation`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Erreur lors de l\'annulation de la participation');
        }

        // Mettre à jour l'état local
        const eventIndex = lastLoadedEvents.findIndex(e => e.id === parseInt(eventId));
        if (eventIndex !== -1) {
            lastLoadedEvents[eventIndex].participants = lastLoadedEvents[eventIndex].participants.filter(
                p => p.id !== currentUser.id
            );
        }

        // Mettre à jour l'apparence des boutons
        updateParticipateButton(eventId, false);

        // Afficher le message de succès
        showSuccess('Participation annulée avec succès');

        // Recharger les événements
        await loadEvents();

    } catch (error) {
        console.error('Erreur:', error);
        showError(error.message || 'Une erreur est survenue lors de l\'annulation de la participation');
    }
}