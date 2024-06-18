import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types

const mascotasSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    raza_id: {
        type: ObjectId,
        ref: 'razas',
        required: true
    },
    categorias_id: {
        type: ObjectId,
        ref: 'categorias',
        required: true
    },
    generos_id: {
        type: ObjectId,
        ref: 'generos',
        required: true
    },
    foto: {
        type: String,
    },
})

const mascotasModel =mongoose.model('mascotas',mascotasSchema)

export default mascotasModel


