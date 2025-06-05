const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Middleware pour vérifier si l'utilisateur est admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Accès non autorisé' });
    }
};

// Récupérer tous les événements en attente
router.get('/events/pending', auth, isAdmin, async (req, res) => {
    try {
        const pendingEvents = await Event.find({ status: 'pending' })
            .sort({ createdAt: -1 });
        res.json(pendingEvents);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des événements' });
    }
});

// Approuver un événement
router.post('/events/:id/approve', auth, isAdmin, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Événement non trouvé' });
        }

        event.status = 'approved';
        await event.save();

        res.json({ message: 'Événement approuvé avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'approbation de l\'événement' });
    }
});

// Rejeter un événement
router.post('/events/:id/reject', auth, isAdmin, async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: 'Événement non trouvé' });
        }

        event.status = 'rejected';
        await event.save();

        res.json({ message: 'Événement rejeté avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors du rejet de l\'événement' });
    }
});

module.exports = router; 