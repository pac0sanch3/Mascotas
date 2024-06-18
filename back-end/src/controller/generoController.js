import generosModel from "../models/generosModels.js";

export const RegistrarGenero = async (req, res) => {
    try {

        const { nombreGenero } = req.body

        const ObjGenero = new gendersModel({
            name: nombreGenero
        })

        const save = await ObjGenero.save()

        return res.status(201).json({ genero: save })

    } catch (error) {
        return res.status(500).json({ mensaje: "error en el servidor", error })
    }
}

export const getGenero = async (req, res) => {
    try {
        const genero = await generosModel.find({})

        if (genero.length === 0) return res.status(404).json({ mensaje: "no encontraron generos" })

        return res.status(200).json(genero)

    } catch (error) {
        return res.status(500).json({ mensaje: "error en el servidor", error })
    }
}