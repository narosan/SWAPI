import { Schema, model, Document, Collection, Mongoose, Types } from 'mongoose'

const UserScema = new Schema({
    _id: Types.ObjectId,
    Nome: String, require: true,
}, {
    timestamps: true,
    collection: 'Planetas'
})