import Express from "express"
import bodyParser from "body-parser"
import cors from 'cors'

//importacion de la conexion a la base de datos

import ConexionMongo from "./src/database/conexion_Mongodb.js"

//rutas 

import UsuarioRoute from "./src/router/userRouter.js"
import CategoriaRoute from "./src/router/categoriasRouter.js"
import RazasRoute from "./src/router/razasRouter.js"
import LoginRouter from "./src/router/loginRouter.js"
import MascotasRoute from "./src/router/mascotasRouter.js"
import GeneroRoute from "./src/router/generosRouter.js"

const app = Express()
const port = 3000

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

new ConexionMongo()


app.set('view engine', 'ejs')
app.set('views', './views')


app.get('/', (req, res) => res.send('Hello World!'))
app.use(Express.static('./public'))
app.use('/usuario', UsuarioRoute)
app.use('/categoria', CategoriaRoute)
app.use('/razas', RazasRoute)
app.use('/login', LoginRouter)
app.use('/mascotas', MascotasRoute)
app.use('/generos', GeneroRoute)

app.use("/documents", (req, res) => {
    res.render("document.ejs");
});
  

app.listen(port, () => console.log(`ejecutando en puerto http://localhost:${port}`))