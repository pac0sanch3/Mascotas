import { Router } from "express";

import { RegistrarGenero,getGenero } from "../controller/generoController.js";


const GeneroRoute = Router()

GeneroRoute.post('/register', RegistrarGenero)
GeneroRoute.get('/listar', getGenero)


export default GeneroRoute