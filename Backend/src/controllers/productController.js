const Product = require("../models/prodectModel");

/////////////        ADD PRODUCT

const addProduct = async(req,res) =>{
    try{
        const {title, price, description, image, category, qty } = req.body;

        const product = await Product.create({
            title,price,description,image,category,qty
        })

        const productData = await product.save();

        return res.status(200).json({
            success: true,
            message: "Product Created Successfully!",
            productData :productData
        })
    } catch (errr) {
        return res.status(404).josn({
            success: false,
            message: error.message
        })
    }
};


/////////////        GET ALL-PRODUCT

const getProduct = async(req,res) => {
    try{
        const allproduct = await Product.find({}).populate('category');

        return res.status(200).json({
            success: true,
            message: "Product get Successfully!",
            productData : allproduct
        })
    } catch (error) {
        return res.status(404).josn({
            success: false,
            message: error.message
        })
    }
};


/////////////        GET BY-ID-PRODUCT

const byProduct = async(req,res) => {
    try{
        const byproduct = await Product.findById({_id: req.params.id}).populate('category');

        return res.status(200).json({
            success: true,
            message: "Product get Successfully!",
            productData : byproduct
        })
    } catch (error) {
        return res.status(404).josn({
            success: false,
            message: error.message
        })
    }
};

const updateProduct = async(req , res) => {
    try {
        
        const { id:userId } = req.params;
        const { title , price , category  , qty , image , description } = req.body;

        const product = await Product.findByIdAndUpdate(userId , { title , price , category , description  , qty , image} , {new : true})
      
        await product.save();
        
        return res.status(200).json({
            success: true,
            message: "Proudct Update successfully",
            productData : product
        });
 
    } catch (error) {
        return res.status(400).json({
        success: false,
        message: error.message,
        }); 
    }
}


const deleteProduct = async(req , res) => {
    try {

        const product = await Product.findByIdAndDelete(req.params.id)

         
        return res.status(200).json({
            success: true,
            message: "Proudct Delete successfully",
            productData : product
        });
 

    } catch (error) {
        return res.status(400).json({
        success: false,
        message: error.message,
        }); 
    }
}

module.exports ={
    addProduct,
    getProduct,
    byProduct,
    updateProduct,
    deleteProduct
}