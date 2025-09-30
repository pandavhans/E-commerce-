const express = require("express");
const {
     Ragister,
  Login,
  getUserProfile,
  getAllUser
} = require("../controllers/userControllers")

const {
    verifyToken
} = require("../middlewares/authMiddleware")

const router = express.Router();

router.post("/register", Ragister);
router.post('/login'  , Login)
router.get('/profile' , verifyToken  , getUserProfile)
router.get("/get-user", getAllUser);


module.exports = router