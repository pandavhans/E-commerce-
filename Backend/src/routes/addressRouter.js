const expresss = require('express');
const { addAddress, getAddress } = require('../controllers/addressController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = expresss.Router();


router.post('/add=address' , verifyToken , addAddress)
router.get('/get-address' , verifyToken , getAddress)


module.exports = router