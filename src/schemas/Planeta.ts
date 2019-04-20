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
        required: [true, 'Nome não pode ser vázio.']
    },
    clima: {
        type: String,
        trim: true,
        required: [true, 'Clima não pode ser vázio.']
    },
    terreno: {
        type: String,
        trim: true,
        required: [true, 'Terreno não pode ser vázio.']
    },
    aparicoes: Number
}, {
    timestamps: true,
    collection: 'Planeta'
})

export default model<PlanetaInterface>('Planeta', PlanetaSchema)