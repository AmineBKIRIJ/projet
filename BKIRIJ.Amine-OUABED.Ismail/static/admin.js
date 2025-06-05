let events = []; // Variable globale pour stocker les événements

document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
});

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

        // Vérifier si l'utilisateur est un administrateur
        if (currentUser.role !== 'admin') {
            console.error('Accès non autorisé : rôle administrateur requis');
            showError('Accès non autorisé. Vous devez être administrateur pour accéder à cette page.');
            setTimeout(() => {
                window.location.replace('events.html');
            }, 2000);
            return;
        }

        console.log('User loaded:', currentUser);

        const response = await fetch('http://127.0.0.1:5000/api/admin/events', {
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
            if (response.status === 403) {
                showError('Accès non autorisé. Vous devez être administrateur pour accéder à cette page.');
                setTimeout(() => {
                    window.location.replace('events.html');
                }, 2000);
                return;
            }
            throw new Error('Erreur lors du chargement des événements');
        }

        events = await response.json(); // Stocker les événements dans la variable globale
        console.log('Événements chargés:', events);
        
        // S'assurer que chaque événement a une liste de participants
        events.forEach(event => {
            if (!event.participants) {
                event.participants = [];
            }
        });
        
        // Utiliser displayEvents au lieu de createEventCard
            displayEvents(events);

    } catch (error) {
        console.error('Erreur:', error);
        showError('Erreur lors du chargement des données');
    }
}

function displayEvents(events) {
    const container = document.getElementById('eventsContainer');
    container.innerHTML = '';

    // Créer le tableau
    const table = document.createElement('table');
    table.className = 'events-table';
    
    // Créer l'en-tête du tableau
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Club</th>
            <th>Titre</th>
            <th>Date</th>
            <th>Lieu</th>
            <th>Participants</th>
            <th>Statut</th>
            <th>Actions</th>
        </tr>
    `;
    table.appendChild(thead);

    // Créer le corps du tableau
    const tbody = document.createElement('tbody');
    events.forEach(event => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${event.club_name}</td>
            <td>${event.title}</td>
            <td>${formatDate(event.date)}</td>
            <td>${event.location}</td>
            <td>${event.expected_attendees}</td>
            <td>
                <span class="status-badge ${event.status}">${event.status}</span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="details-btn" onclick="showEventDetails(${event.id})">
                        <i class="fas fa-info-circle"></i> Détails
                    </button>
                    ${(event.status === 'pending' || event.status === 'pending_approval') ? `
                        <button class="approve-btn" onclick="handleEventAction(${event.id}, 'approve')">
                            <i class="fas fa-check"></i> Approuver
                        </button>
                        <button class="reject-btn" onclick="handleEventAction(${event.id}, 'reject')">
                            <i class="fas fa-times"></i> Rejeter
                        </button>
                    ` : ''}
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    container.appendChild(table);
}

function showEventDetails(eventId) {
    console.log('Recherche de l\'événement:', eventId);
    console.log('Événements disponibles:', events);
    
    // Trouver l'événement dans le tableau des événements
    const event = events.find(e => e.id === parseInt(eventId));
    if (!event) {
        console.error('Événement non trouvé:', eventId);
        return;
    }

    // Mettre à jour le contenu de la modal
    document.getElementById('detailsTitle').textContent = event.title;
    document.getElementById('detailsDate').textContent = formatDate(event.date);
    document.getElementById('detailsLocation').textContent = event.location;
    document.getElementById('detailsAttendees').textContent = `${event.expected_attendees} participants attendus`;
    document.getElementById('detailsClub').textContent = event.club_name;
    document.getElementById('detailsDescription').textContent = event.description;

    // Afficher la modal
    const modal = document.getElementById('detailsModal');
    if (modal) {
        modal.classList.add('active');
    } else {
        console.error('Modal non trouvée');
    }
}

function hideModal(modal) {
    modal.classList.remove('active');
}

function formatDate(dateString) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

async function handleEventAction(eventId, action) {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            window.location.href = '/auth.html';
            return;
        }

        // Récupérer l'événement actuel
        const event = events.find(e => e.id === parseInt(eventId));
        if (!event) {
            showError('Événement non trouvé');
            return;
        }

        // Vérifier si l'événement a des modifications en attente
        if (event.pending_modifications) {
            // Stocker l'ID de l'événement actuel pour la gestion des modifications
            window.currentEventId = eventId;
            
            // Afficher la modal des modifications
            const modal = document.getElementById('modificationsModal');
            if (modal) {
                document.getElementById('modificationsTitle').textContent = `Modifications en attente - ${event.title}`;
                document.getElementById('modificationsContent').innerHTML = `
                    <div class="modification-details">
                        <h3>Modifications proposées :</h3>
                        <div class="modification-item">
                            <strong>Titre :</strong> 
                            <span class="current-value">${event.title}</span>
                            <i class="fas fa-arrow-right"></i>
                            <span class="new-value">${event.pending_modifications.title}</span>
                        </div>
                        <div class="modification-item">
                            <strong>Date :</strong>
                            <span class="current-value">${formatDate(event.date)}</span>
                            <i class="fas fa-arrow-right"></i>
                            <span class="new-value">${formatDate(event.pending_modifications.date)}</span>
                        </div>
                        <div class="modification-item">
                            <strong>Lieu :</strong>
                            <span class="current-value">${event.location}</span>
                            <i class="fas fa-arrow-right"></i>
                            <span class="new-value">${event.pending_modifications.location}</span>
                        </div>
                        <div class="modification-item">
                            <strong>Participants attendus :</strong>
                            <span class="current-value">${event.expected_attendees}</span>
                            <i class="fas fa-arrow-right"></i>
                            <span class="new-value">${event.pending_modifications.expected_attendees}</span>
                        </div>
                        <div class="modification-item">
                            <strong>Description :</strong>
                            <span class="current-value">${event.description}</span>
                            <i class="fas fa-arrow-right"></i>
                            <span class="new-value">${event.pending_modifications.description}</span>
                        </div>
                    </div>
                `;
                modal.classList.add('active');
            }
            return; // Arrêter ici pour attendre l'approbation de l'admin
        }

        // Si pas de modifications en attente, procéder normalement
        const response = await fetch(`http://127.0.0.1:5000/api/admin/events/${eventId}/${action}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });

        if (response.ok) {
            showSuccess(`Événement ${action === 'approve' ? 'approuvé' : 'rejeté'} avec succès`);
            loadEvents(); // Recharger la liste des événements
        } else {
            const data = await response.json();
            showError(data.error || `Erreur lors de l'action ${action}`);
        }
    } catch (error) {
        console.error('Erreur:', error);
        showError('Une erreur est survenue lors de l\'action');
    }
}

async function submitModification(eventId) {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            window.location.href = '/auth.html';
            return;
        }

        const response = await fetch(`http://127.0.0.1:5000/api/events/${eventId}/submit-modification`, {
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
            throw new Error(data.error || 'Erreur lors de la soumission des modifications');
        }

        const result = await response.json();
        showSuccess('Modifications soumises avec succès');
        loadEvents(); // Recharger la liste des événements
    } catch (error) {
        console.error('Erreur:', error);
        showError(error.message || 'Une erreur est survenue lors de la soumission des modifications');
    }
}

function showError(message) {
    alert(message); // Vous pouvez remplacer cela par une meilleure notification UI
}

function showSuccess(message) {
    alert(message); // Vous pouvez remplacer cela par une meilleure notification UI
} 

// Ajouter le style pour la table et les modifications en attente
const style = document.createElement('style');
style.textContent = `
    #eventsContainer {
        width: 100%;
        height: 100vh;
        padding: 20px;
        box-sizing: border-box;
        overflow: auto;
    }

    .events-table {
        width: 100%;
        border-collapse: collapse;
        background: white;
    }

    .events-table th,
    .events-table td {
        padding: 12px;
        text-align: left;
        border: 1px solid #ddd;
    }

    .events-table th {
        background-color: #f5f5f5;
        font-weight: bold;
    }

    .events-table tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    .events-table tr:hover {
        background-color: #f0f0f0;
    }

    .action-buttons {
        display: flex;
        gap: 5px;
    }

    .action-buttons button {
        padding: 5px 10px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .details-btn {
        background-color: #2196F3;
        color: white;
    }

    .approve-btn {
        background-color: #4CAF50;
        color: white;
    }

    .reject-btn {
        background-color: #f44336;
        color: white;
    }

    .status-badge {
        padding: 3px 8px;
        border-radius: 3px;
        font-size: 12px;
        font-weight: bold;
    }

    .status-badge.pending {
        background-color: #ffc107;
        color: #000;
    }

    .status-badge.pending_approval {
        background-color: #ff9800;
        color: white;
    }

    .status-badge.approved {
        background-color: #4caf50;
        color: white;
    }

    .status-badge.rejected {
        background-color: #f44336;
        color: white;
    }
`;
document.head.appendChild(style);

// Ajouter le style pour la modal
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    .modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1000;
    }

    .modal.active {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        width: 80%;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
    }

    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .modal-title {
        font-size: 24px;
        font-weight: bold;
        color: #333;
    }

    .close-modal {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #666;
    }

    .modal-body {
        margin-bottom: 20px;
    }

    .modal-info {
        margin: 10px 0;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .modal-info i {
        color: #2196F3;
        width: 20px;
    }

    .modal-description {
        margin-top: 20px;
        line-height: 1.6;
    }
`;
document.head.appendChild(modalStyle);

// Ajouter la modal au HTML si elle n'existe pas
if (!document.getElementById('detailsModal')) {
    const modal = document.createElement('div');
    modal.id = 'detailsModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title" id="detailsTitle"></h2>
                <button class="close-modal" onclick="hideModal(document.getElementById('detailsModal'))">&times;</button>
            </div>
            <div class="modal-body">
                <div class="modal-info">
                    <i class="fas fa-calendar"></i>
                    <span id="detailsDate"></span>
                </div>
                <div class="modal-info">
                    <i class="fas fa-map-marker-alt"></i>
                    <span id="detailsLocation"></span>
                </div>
                <div class="modal-info">
                    <i class="fas fa-users"></i>
                    <span id="detailsAttendees"></span>
                </div>
                <div class="modal-info">
                    <i class="fas fa-building"></i>
                    <span id="detailsClub"></span>
                </div>
                <div class="modal-description">
                    <h3>Description</h3>
                    <p id="detailsDescription"></p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
} 

// Ajouter le style pour les boutons d'action
const actionStyle = document.createElement('style');
actionStyle.textContent = `
    .action-buttons {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
    }

    .action-buttons button {
        padding: 5px 10px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 5px;
        transition: all 0.3s ease;
    }

    .details-btn {
        background-color: #2196F3;
        color: white;
    }

    .approve-btn {
        background-color: #4CAF50;
        color: white;
    }

    .reject-btn {
        background-color: #f44336;
        color: white;
    }

    .action-buttons button:hover {
        opacity: 0.9;
        transform: translateY(-1px);
    }

    .status-badge {
        padding: 3px 8px;
        border-radius: 3px;
        font-size: 12px;
        font-weight: bold;
    }

    .status-badge.pending {
        background-color: #ffc107;
        color: #000;
    }

    .status-badge.pending_approval {
        background-color: #ff9800;
        color: white;
    }

    .status-badge.approved {
        background-color: #4caf50;
        color: white;
    }

    .status-badge.rejected {
        background-color: #f44336;
        color: white;
    }
`;
document.head.appendChild(actionStyle);

// Ajouter le style pour la modal des modifications
const modificationsModalStyle = document.createElement('style');
modificationsModalStyle.textContent = `
    .modification-details {
        padding: 20px;
        background-color: #f8f9fa;
        border-radius: 8px;
        margin-bottom: 20px;
    }

    .modification-item {
        margin: 10px 0;
        padding: 15px;
        background-color: white;
        border-radius: 4px;
        border-left: 4px solid #2196F3;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .modification-item strong {
        color: #2196F3;
        min-width: 150px;
    }

    .current-value {
        color: #666;
        text-decoration: line-through;
    }

    .new-value {
        color: #4CAF50;
        font-weight: bold;
    }

    .fa-arrow-right {
        color: #2196F3;
        margin: 0 10px;
    }

    .modal-actions {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
        margin-top: 20px;
    }

    .modal-actions button {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 5px;
        transition: all 0.3s ease;
    }

    .modal-actions .approve-btn {
        background-color: #4CAF50;
        color: white;
    }

    .modal-actions .reject-btn {
        background-color: #f44336;
        color: white;
    }

    .modal-actions button:hover {
        opacity: 0.9;
        transform: translateY(-1px);
    }
`;
document.head.appendChild(modificationsModalStyle); 