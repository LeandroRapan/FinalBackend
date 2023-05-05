import fs from 'fs'

export default class CartManager {
    constructor (path){
        this.path = path
    }
    async #getMaxId(){
        let maxId= 0;
        const carts = await  this.getCarts();
        carts.map((cart)=>{
            if(cart.id > maxId){
                maxId = cart.id
            }
            
            return maxId
        })
        return maxId
    }
  
    async getCarts(){
        try{
            if(fs.existsSync(this.path)){
                const carts = await fs.promises.readFile(this.path, 'utf-8');
                const cartsJSON = JSON.parse(carts);
              
                return cartsJSON
            }else{
                await fs.promises.writeFile(this.path, '[]'); 
                return []}
        }catch(error){
            console.log('error obteniendo carritos')

        }
    }

    async getCartById(id){
        try{
            const carts = await this.getCarts();
            const cart = carts.find((c)=> c.id === id);
            if (cart){
                return cart
            }else{
                return false
            }

        }catch(error){
           console.log('error obteniendo carrito por id') 
        }
    }
    async createCart(obj){
        try{
         const cart = {
             id: await this.#getMaxId() +1,
             products: []  
         }

         const cartsFile = await this.getCarts();
         cartsFile.push(cart)
         await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
         return cart
         }catch(error){
             console.log(error)
             throw new Error("No se pudo crear el carrito");
         }
    }

    async saveProductToCart (idCart, idProd) {

        try{
            // const cart = this.getCartById(idCart);

            const carts = await this.getCarts();
           
            const cart =   carts.find((c)=>{ return c.id === parseInt(idCart)})
           
            if (cart){
                const product =   cart.products.find((p)=> p.id === idProd);
                
                if (product){
                    product.quantity++
                    console.log(cart)
                    
                }else{
                    cart.products.push({ id: idProd, quantity: 1 })
                }
               
                
            }else{
                const newCart = this.createCart();
                newCart.products.push({ id: idProd, quantity: 1 })

                carts.push(newCart)
                
            }
            
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
           
          return cart     
        }catch(error){
        console.log(error)
        }
    }










    //fin de clase
}
