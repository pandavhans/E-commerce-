const Cart = require('../models/cardmodel');

const addCart = async (req, res) => {
    try {
        
        const { productId , title , image , price , qty } = req.body;

        const userId = req.user;

        let cart = await Cart.findOne({userId})

        if(!cart) {      
            cart = new Cart({userId , items : []})
        }

        const cartIndex = cart.items.findIndex((item) => item.productId.toString() === productId)

        if(cartIndex > -1) {
            cart.items[cartIndex].qty += qty;
            cart.items[cartIndex].price += price*qty 
        }else{

            cart.items.push({productId , title , image , price , qty})
        }
    

        const cartData = await cart.save();

         
        return res.status(201).json({
            success: true,
            message: "Cart Addedd..",
            cartData : cartData
        });
 

    }catch (error) {
        return res.status(400).json({
        success: false,
        message: error.message,
        }); 
    }
}



const getUser = async (req, res) => {
    try {
        
        const userId = req.user;


         const cart = await Cart.findOne({userId})

         if(!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart Not Found",
            })
         }

         return res.status(200).json({
                success: true,
                message: "User Cart..",
                cartData : cart
            })


    } catch (error) {
         return res.status(400).json({
        success: false,
        message: error.message,
        }); 
    }
}


const removeCart = async (req, res) => {
    try {

        const productId = req.params.productId;
        
        const userId = req.user;


         const cart = await Cart.findOne({userId})

         if(!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart Not Found",
            })
         }

         cart.items = cart.items.filter((item) => item.productId.toString() !== productId)

         await cart.save()

         return res.status(200).json({
            success: true,
            message: "Remove Cart..",
            cartData : cart
        })


    } catch (error) {
         return res.status(400).json({
        success: false,
        message: error.message,
        }); 
    }
}



const clearCart = async (req, res) => {
    try {

        
        const userId = req.user;


         const cart = await Cart.findOne({userId})

         if(!cart) {
           cart = new Cart({items : []})
         }else {
            cart.items = []
         }

         await cart.save()

         return res.status(200).json({
            success: true,
            message: "clear Cart..",
            cartData : cart
        })


    } catch (error) {
         return res.status(400).json({
        success: false,
        message: error.message,
        }); 
    }
}



const decreseQty = async (req, res) => {
    try {
        
        const { productId , qty } = req.body;

        const userId = req.user;


        const cart = await Cart.findOne({userId})

        if(!cart) {      
            cart = new Cart({userId , items : []})
        }

        const cartIndex = cart.items.findIndex((item) => item.productId.toString() === productId)

        if(cartIndex > -1) {

            const item = cart.items[cartIndex]
            
            if(item.qty > qty){
                const pricePerUnit = item.price/item.qty;

                item.qty -= qty;
                item.price -= pricePerUnit * qty;
             }else{
                cart.items.splice(cartIndex, 1)
             }
        }else{
            return res.status(400).json({
                success: false,
                message: "Invalid ProductId",
            })
        }
    

        const cartData = await cart.save();

         
        return res.status(201).json({
            success: true,
            message: "Decrese Qty..",
            cartData : cartData
        });
 

    }catch (error) {
        return res.status(400).json({
        success: false,
        message: error.message,
        }); 
    }
}



module.exports = {
    addCart,
    getUser,
    removeCart,
    clearCart,
    decreseQty
}