import mongoose from "mongoose";


const categoriaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
    }
})


const categoriasModel =mongoose.model('categorias',categoriaSchema)

export default categoriasModel