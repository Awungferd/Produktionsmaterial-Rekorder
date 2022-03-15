import mongoose from 'mongoose';

const required = true;
const ArtikelSchema = new mongoose.Schema({
    material: {
        type: String,
        required,
        default: "Butter Toast Pouder"
    }, 
    chargenNr: {
        type: Number,
        required,
        default: 252634
    },
    menge: {
        type: Number,
        required,
        default: 100
    },
    fortlaufendeNr: {
        type: Number,       
        default: 25
    },
    createdAt: {
        type: Date,
        default: new Date()
    }

}, {timestamps: true})
const ArtikelModel = mongoose.model('artikel', ArtikelSchema);
export default ArtikelModel;
