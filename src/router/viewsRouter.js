import { Router } from "express";
import { __dirname } from "../path.js";
import ProductManager from "../manager/productManager.js";
const path = './products.json'
const productManager = new ProductManager(path)
const router = Router();


router.get("/", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        
        res.render('vista1', { products });
    } catch (error) {
        console.log(error);
    }
});

router.get('/realtimeproducts', async (req,res)=>{
    try {
        const products = await productManager.getProducts();
        
        res.render('webSocket', { products });
    } catch (error) {
        console.log(error);
    }
})
export default router