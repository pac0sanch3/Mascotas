import { Router } from "express";

// controlador
import Login from "../controller/Login.controller.js";

const LoginRouter = Router()


LoginRouter.post('/login', Login)



export default LoginRouter