const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true
    },
    prenom: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    niveau: {
        type: String,
        required: true,
        enum: ['INE1', 'INE2', 'INE3', 'laureat']
    },
    filiere: {
        type: String,
        required: true,
        enum: ['SESNUM', 'ASEDS', 'Smart-ICT', 'ICCN', 'DATA', 'AMOA', 'CLOUD']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
});

// Hash le mot de passe avant de sauvegarder
userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

// Créer un compte admin par défaut s'il n'existe pas
const createDefaultAdmin = async () => {
    try {
        const adminExists = await User.findOne({ email: 'admin@inpt.ac.ma' });
        if (!adminExists) {
            const admin = new User({
                nom: 'Admin',
                prenom: 'System',
                email: 'admin@inpt.ac.ma',
                password: 'Admin@123',
                niveau: 'laureat',
                filiere: 'SESNUM',
                role: 'admin'
            });
            await admin.save();
            console.log('Compte admin créé avec succès');
        }
    } catch (error) {
        console.error('Erreur lors de la création du compte admin:', error);
    }
};

createDefaultAdmin();

module.exports = User; 