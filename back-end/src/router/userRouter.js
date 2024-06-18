import { Router } from "express";

import { RegistraUsuario,ListarUsuarios } from "../controller/userController.js";


const UsuarioRoute = Router()

UsuarioRoute.post('/register', RegistraUsuario)
UsuarioRoute.get('/listar', ListarUsuarios)


export default UsuarioRoute