const express = require('express');
const { addCart, getUser, removeCart, clearCart, decreseQty } = require('../controllers/cardController.js');

const {verifyToken} = require('../middlewares/authMiddleware.js')


const router = express.Router();


router.post('/add-cart' , verifyToken , addCart);
router.get('/user' , verifyToken , getUser)
router.delete('/remove-cart/:productId' , verifyToken , removeCart)
router.delete('/clear',verifyToken , clearCart)
router.post('/--qty',verifyToken , decreseQty)





module.exports = router