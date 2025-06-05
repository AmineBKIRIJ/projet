// Fonction pour vérifier l'authentification
function checkAuth() {
    const token = localStorage.getItem('access_token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token || !user || user.role !== 'admin') {
        // Rediriger vers la page de connexion si non authentifié ou non admin
        window.location.replace('auth.html');
        return false;
    }
    return true;
}

// Vérifier l'authentification au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    if (!checkAuth()) {
        return;
    }
    loadEvents();
});

async function loadEvents() {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            window.location.replace('auth.html');
            return;
        }

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
            throw new Error('Erreur lors du chargement des événements');
        }

        const events = await response.json();
        console.log('Événements chargés:', events);

        const eventsTable = document.getElementById('eventsTable');
        const tbody = eventsTable.querySelector('tbody');
        tbody.innerHTML = '';

        events.forEach(event => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${event.title}</td>
                <td>${event.club_name}</td>
                <td>${new Date(event.date).toLocaleDateString('fr-FR')}</td>
                <td>${event.location}</td>
                <td>${event.expected_attendees}</td>
                <td>
                    <span class="status-badge ${event.status}">${event.status}</span>
                </td>
                <td>
                    <div class="action-buttons">
                        ${event.status === 'pending' ? `
                            <button onclick="handleEventAction('${event.id}', 'approve')" class="approve-btn">
                                <i class="fas fa-check"></i> Approuver
                            </button>
                            <button onclick="handleEventAction('${event.id}', 'reject')" class="reject-btn">
                                <i class="fas fa-times"></i> Rejeter
                            </button>
                        ` : ''}
                        <button onclick="handleEventAction('${event.id}', 'delete')" class="delete-btn">
                            <i class="fas fa-trash"></i> Supprimer
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });

    } catch (error) {
        console.error('Erreur:', error);
        showError('Erreur lors du chargement des événements');
    }
}

async function handleEventAction(eventId, action) {
    try {
        const token = localStorage.getItem('access_token');
        if (!token) {
            window.location.replace('auth.html');
            return;
        }

        const response = await fetch(`http://127.0.0.1:5000/api/admin/events/${eventId}/${action}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors'
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'action sur l\'événement');
        }

        showSuccess(`Événement ${action === 'approve' ? 'approuvé' : action === 'reject' ? 'rejeté' : 'supprimé'} avec succès`);
        await loadEvents(); // Recharger la liste des événements

    } catch (error) {
        console.error('Erreur:', error);
        showError(error.message);
    }
}

// Fonctions utilitaires
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
} 