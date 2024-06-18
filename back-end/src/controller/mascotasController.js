import ConexionMongo from "../database/conexion_Mongodb.js"

import mascotasModel from "../models/mascotaModel.js"


export const registrarMascota = async (req, res) => {
    try {
      const { name, raza_id, categorias_id, generos_id } = req.body;
      const foto = req.file.originalname;
  
      const newMascota = await mascotasModel({
        name,
        raza_id,
        categorias_id,
        generos_id,
        foto: foto,
      });

      const save = await newMascota.save();
  
      return res.status(200).json(save);
    } catch (error) {
      return res.status(500).json({ mensaje: "error en el servidor" + error });
    }
};
export const actualizarMascota = async (req, res) => {
  try {
    console.log(req.body);
    const {name, raza_id, categorias_id, generos_id } = req.body;
    const id = req.params.id;

    //poder obtener la imagen que llega del front
    const foto = req.file.originalname;

    const response = await mascotasModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          raza_id,
          categorias_id,
          generos_id,
          foto,
        },
      },
      { new: true }
    );

    if (response)
      return res.status(200).json({ mensaje: "mascota actualizada" });
  } catch (error) {
    return res.status(500).json({ mensaje: "error en el servidor" + error });
  }
};

export const ListarMascota = async (req, res) => {
    try {
      const mascotas = await mascotasModel.find({}, "name raza_id foto")
        .populate("raza_id", "name _id")
        .exec();
      // si el array que se obtiene, la longitud es 0 retorana  mensaje: "no encontraron mascotas en la base de datos"
      if (mascotas.length === 0)
        return res
          .status(404)
          .json({ mensaje: "no encontraron mascotas en la base de datos" });
  
      return res.status(200).json(mascotas);
    } catch (error) {
      return res.status(500).json({ mensaje: "error en el servidor" + error });
    }
  };

  
  export const ListarMascotasId = async (req, res) => {
    try {
      const idMascota = req.params.id; 
      const mascotas = await mascotasModel.findById(idMascota, "name raza_id foto")
        .populate("raza_id", "name")
        .populate("categorias_id", "name")
        .populate("generos_id", "name")
  
      if (!mascotas)
        return res.status(404).json({ mensaje: "no encontraron mascotas" });
  
      const mascota = {
        id: mascotas._id,
        nombre: mascotas.name,
        razas: mascotas.raza_id,
        categorias: mascotas.categorias_id,
        generos: mascotas.generos_id,
        foto: mascotas.foto,
      };
      return res.status(200).json({ mascota: mascota });
    } catch (error) {
      return res.status(500).json({ mensaje: "error en el servidor" + error });
    }
  };


  export const eliminarMascota = async (req, res) => {
    try {
      const id = req.params.id;
      const response = await mascotasModel.deleteOne({ _id: id });
  
      if (response.deletedCount === 0)
        return res
          .status(404)
          .json({ mensaje: "No se encontro mascota para eliminar" });
  
      res.status(200).json({ mensaje: "mascota eliminada" });
    } catch (error) {
      return res.status(500).json({ mensaje: "error en el servidor" + error });
    }
  };
  
  







  export const ListarMascotas=async(req,res)=>{
    try {
        const users=await mascotasModel.find()

        res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}