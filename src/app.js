import  express  from "express";
import productsRouter from "./router/producsRouter.js";
import cartRouter from "./router/cartRouter.js"
import handlebars from 'express-handlebars'
import viewRouter from './router/viewsRouter.js'
import { __dirname } from "./path.js";
import { Server } from "socket.io";
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/products", productsRouter)
app.use("/carts", cartRouter)
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+ '/views')
app.set('view engine', 'handlebars')

// app.use('/', viewRouter)
app.get('/', (req,res)=>{
    res.render('webSocket')
})



const port = 8080;


const httpServer =app.listen(port, ()=>{
    console.log('server ok')
})
const socketServer = new Server(httpServer)

socketServer.on('conection', (socket)=>{
    console.log('usuario conectado')
})
