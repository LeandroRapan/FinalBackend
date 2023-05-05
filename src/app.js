import  express  from "express";
import productsRouter from "./router/producsRouter.js";
import cartRouter from "./router/cartRouter.js"
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/products", productsRouter)
app.use("/carts", cartRouter)

const port = 8080;


app.listen(port, ()=>{
    console.log('server ok')
})
