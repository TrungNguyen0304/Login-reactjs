import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    civilite: { // Thêm civilité
        type: String,
        required: true
    },
    lastname: { // Thêm Nom
        type: String,
        required: true
    },
    firstname: { // Thêm Prénom
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    maison: { // Thêm Maison
        type: String,
        required: true
    },
    droitGroupe: { // Thêm Croupe de droits
        type: String,
        required: true
    },
    lastConnection: { // Thêm Dernière connexion
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
