import { Router } from "express";

import { RegistrarCategoria,getCategoria } from "../controller/categoriaController.js";


const CategoriaRoute = Router()

CategoriaRoute.post('/register', RegistrarCategoria)
CategoriaRoute.get('/listar', getCategoria)


export default CategoriaRoute