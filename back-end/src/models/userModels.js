import mongoose from "mongoose";


const usuarioSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'El correo está duplicado'],
        maxlength: [100, 'El correo no puede exceder los 100 caracteres'],
    },
    password: {
        type: String,
        required: true
    }
})

const usuarioModel =mongoose.model('user',usuarioSchema)

export default usuarioModel