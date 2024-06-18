import { Router } from "express";

import { RegistraRaza,getRaza } from "../controller/razasController.js";


const RazasRoute = Router()

RazasRoute.post('/register', RegistraRaza)
RazasRoute.get('/listar', getRaza)


export default RazasRoute