const mongoose = require('mongoose');


const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    title : {type : String , required : true},
    image : {type : String , required : true},
    price: {type: Number, required: true},
    qty : {type : Number , required : true , default : 1 },
    price : {type : Number , required : true },
} , {_id : false}
);


const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    items: [cartItemSchema],

})



module.exports = mongoose.model('Cart' , cartSchema);