import { Schema, model, Document, Collection, Mongoose, Types } from 'mongoose'

interface PlanetaInterface extends Document{
    _id: Types.ObjectId,
    nome?: String,
    clima?: String,
    terreno?: String,
    aparicoes?: Object
}

const PlanetaSchema = new Schema({
    _id: Types.ObjectId,
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
    aparicoes: Object
}, {
    timestamps: true,
    collection: 'Planeta'
})

export default model<PlanetaInterface>('Planeta', PlanetaSchema)