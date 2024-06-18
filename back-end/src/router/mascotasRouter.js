import { Router } from "express";


import { eliminarMascota,registrarMascota,ListarMascota,ListarMascotasId,actualizarMascota,ListarMascotas } from "../controller/mascotasController.js";

import{cargarImagen}from"../config/subirImagenes.js"


import { isLogin } from "../../middleware/loginMiddleware.js";

const MascotasRoute = Router()

MascotasRoute.post('/register',cargarImagen,isLogin, registrarMascota)
MascotasRoute.delete('/eliminar/:id',isLogin, eliminarMascota)
MascotasRoute.get("/listar",isLogin, ListarMascota);

MascotasRoute.get("/listarID/:id",isLogin, ListarMascotasId)

MascotasRoute.put("/actualizar/:id",isLogin, cargarImagen, actualizarMascota);


export default MascotasRoute