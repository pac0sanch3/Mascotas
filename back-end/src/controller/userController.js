import usuarioModel from "../models/userModels.js";


// funcion que guarda la contaseña encriptada

import { encriptarContra } from "../config/bcrypt.js";

export const RegistraUsuario = async (req, res) => {
    try {
        const { fullName, email, password } = req.body

        const contraEncriptada = await encriptarContra(password);


        console.log(fullName,email,password)

        const user = new usuarioModel({
            fullName,
            email,
            password:contraEncriptada
        })
        console.log(fullName,email,password)

        const save = await user.save()

        return res.status(201).json({mesanje : "usuario creado" })


    } catch (error) {
        return res.status(500).json({ mensaje: "error en el servidor", error })
    }
}
export const ListarUsuarios=async(req,res)=>{
    try {
        const users=await usuarioModel.find()

        res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}