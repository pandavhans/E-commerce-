const express = require("express");

const {
      addProduct,
    getProduct,
    byProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const router = express.Router()

router.post('/create-product', addProduct);
router.get('/get-product', getProduct);
router.get('/:id',  byProduct);;
router.put('/update-product/:id',  updateProduct);;
router.delete('/delete-product/:id',  deleteProduct);;

module.exports = router