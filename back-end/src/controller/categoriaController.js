import categoriasModel from "../models/categoriaModels.js";


export const RegistrarCategoria = async (req, res) => {
    try {
        const { nombreCategoria } = req.body

        const objCategoria = new categoriasModel({
            name: nombreCategoria
        })

        const save = await objCategoria.save()

        return res.status(201).json({ raza: save })

    } catch (error) {
        return res.status(500).json({ mensaje: "error en el servidor", error })
    }
}

export const getCategoria = async (req, res) => {
    try {
        const categoria = await categoriasModel.find({})

        if (categoria.length === 0) return res.status(404).json({ mensaje: "no encontraron categorias" })

        return res.status(200).json(categoria)

    } catch (error) {
        return res.status(500).json({ mensaje: "error en el servidor", error })
    }
}