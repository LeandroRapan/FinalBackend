import { Router } from "express";
import ProductManager from "../manager/productManager.js"
const path = './products.json'
const router= Router()
const productManager = new ProductManager(path)

router.get('/', async(req, res)=>{
    const {limit} = req.query;
    try{
        const products = await productManager.getProducts(limit);
        res.status(200).json(products)
    }catch(error){
        res.status(400).json({message: error.message});
        console.log(error)
    }
})
router.get('/:id', async(req,res)=>{
    try{
        const { id } = req.params;
        const product = await productManager.getProductById(Number(id));
        if(product){
            res.status(200).json(product)
        }else{
            res.status(400).send('producto no encontrado')
        }
    }catch(error){
        res.status(400).json({message: error.message});
        console.log(error)

    }
})

router.post('/', async(req,res)=>{
    try{
        const product = req.body;
        const newProduct = await productManager.createProduct(product)
        res.json(newProduct)

    }catch(error){
        res.status(400).json({message: error.message});
       
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const product = req.body;
        const {id} = req.params;
        const productFile = await productManager.getProductById(Number(id));
        if (productFile){
            await productManager.updateProduct(product, Number(id));
            res.send('producto actualizado')
        }else{
            res.status(400).send('producto no encontrado')
        }

    }catch(error){
        res.status(400).json({message: error.message});
        
    }
})
router.delete('/:id', async(req,res)=>{
    try{
        const {id} = req.params;
        const products = await productManager.getProducts();
        if (products.length > 0){
            await productManager.deleteProductById(Number(id));
            res.send('producto eliminado')
        }else{
            res.send('el producto no existe')
        }

    }catch(error){
        res.status(400).json({message: error.message});
    }

})

router.delete('/', async(req,res)=>{
    try{
        await productManager.deleteProducts();
        res.send('productos borrados')
    }catch(error){
        res.status(400).json({message: error.message});
    }

})

export default router