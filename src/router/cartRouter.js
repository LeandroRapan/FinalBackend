import { Router } from "express";

import CartManager from "../manager/cartManager.js";
const path = "./carts.json"
const cartManager = new CartManager(path)
const router= Router()


router.get('/:id', async(req,res)=>{
    try{
        const { id } = req.params;
        const cart = await cartManager.getCartById(Number(id));
        if(cart){
            res.status(200).json(cart)
        }else{
            res.status(400).send('carrito no encontrado')
        }
    }catch(error){
        res.status(400).json({message: error.message});
        console.log(error)

    }
})

router.post('/', async(req,res)=>{
    try{
        const cart = req.body;
        const newCart = await cartManager.createCart(cart)
        res.status(200).json(newCart)

    }catch(error){
        res.status(400).json({message: error.message});
       
    }
})

router.post('/:cid/product/:pid', async(req,res)=>{
    try{
        const { cid } = req.params;
        const { pid } = req.params;

        const productToCart = await cartManager.saveProductToCart(cid,pid) ;
        res.status(200).json(productToCart)
    }catch(error){
        res.status(400).json({message: error.message})
    }
})


export default router

