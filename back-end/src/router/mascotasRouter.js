import { Router } from "express";


import { eliminarMascota,registrarMascota,ListarMascota,ListarMascotasId,actualizarMascota,ListarMascotas } from "../controller/mascotasController.js";

import{cargarImagen}from"../config/subirImagenes.js"




const MascotasRoute = Router()

MascotasRoute.post('/register',cargarImagen, registrarMascota)
MascotasRoute.delete('/eliminar/:id', eliminarMascota)
MascotasRoute.get("/listar", ListarMascota);

MascotasRoute.get("/listarID/:id", ListarMascotasId)

MascotasRoute.put("/actualizar/:id", cargarImagen, actualizarMascota);


export default MascotasRoute