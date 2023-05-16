import  express  from "express";
import productsRouter from "./router/producsRouter.js";
import cartRouter from "./router/cartRouter.js"
import handlebars from 'express-handlebars'
import viewRouter from './router/viewsRouter.js'
import { __dirname } from "./path.js";
import { Server } from "socket.io";
import ProductManager from "./manager/productManager.js";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))
app.use("/products", productsRouter)
app.use("/carts", cartRouter)
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+ '/views')
app.set('view engine', 'handlebars')

app.use('/', viewRouter)
// app.use('/realtimeproducts', viewRouter)





const port = 8080;


const httpServer =app.listen(port, ()=>{
    console.log('server ok')
})
const socketServer = new Server(httpServer)

socketServer.on('connection', (socket)=>{
    console.log('usuario conectado')
    const manager = new ProductManager('./products.json')
 
    socket.on('realtimeproducts', async()=>{
    const products = await manager.getProducts();
    socketServer.emit('realtimeproducts', products);
 });

 socket.on('newprod', async (data)=>{
    console.log('Evento newprod llamado con los datos:', data)
    await manager.createProduct(data);
    const products = await manager.getProducts();
   socketServer.emit('realtimeproducts', products);
  })
})