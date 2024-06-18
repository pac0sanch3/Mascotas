import razasModel from "../models/razasModels.js";



export const RegistraRaza = async (req, res) => {
    try {

        const { nombreRaza } = req.body

        const ObjRaza = new razasModel({
            name: nombreRaza
        })

        const save = await ObjRaza.save()

        return res.status(201).json({ raza: save })



    } catch (error) {
        return res.status(500).json({ mensaje: "error en el servidor", error })
    }
}

export const getRaza = async (req, res) => {
    try {

        const razas = await razasModel.find({})

        return res.status(200).json(razas)

    } catch (error) {
        return res.status(500).json({ mensaje: "error en el servidor", error })
    }
}