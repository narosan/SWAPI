import { Schema, model, Document } from 'mongoose'

interface PlanetaInterface extends Document{
    nome?: String,
    clima?: String,
    terreno?: String,
    aparicoes?: Number
}

const PlanetaSchema = new Schema({
    nome: {
        type: String,
        trim: true,
        required: true
    },
    clima: {
        type: String,
        trim: true,
        required: true
    },
    terreno: {
        type: String,
        trim: true,
        required: true
    },
    aparicoes: Number
}, {
    timestamps: true,
    collection: 'Planeta'
})

export default model<PlanetaInterface>('Planeta', PlanetaSchema)