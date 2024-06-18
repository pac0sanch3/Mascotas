import { Router } from "express";


import { eliminarMascota,registrarMascota,getMascotas,getMascotasId,actualizarMascota,ListarMascotas } from "../controller/mascotasController.js";

import{cargarImagen}from"../config/subirImagenes.js"




const MascotasRoute = Router()

MascotasRoute.post('/register',cargarImagen, registrarMascota)
MascotasRoute.delete('/eliminar/:id', eliminarMascota)
MascotasRoute.get("/listar", getMascotas);

MascotasRoute.get("/listarID/:id", getMascotasId)

MascotasRoute.put("/actualizar/:id", cargarImagen, actualizarMascota);


export default MascotasRoute