const express = require('express');

const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();
const connectDB = require('./src/config/mongo');
const userRoute = require('./src/routes/userRouter');
const productRoute = require('./src/routes/productRouter');
const cartRoute = require('./src/routes/cardRouter');
const addressRoute = require('./src/routes/addressRouter');


const app = express();
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true,
    methods : ["GET" , "POST" , "PUT" , "DELETE"],
}));


connectDB()

app.get('/' , (req , res) => {
    res.send('APi is running')
})

// User Routes
app.use('/api/user' , userRoute)

// Product Routes
app.use('/api/product' , productRoute)

// // Cart Routes
app.use('/api/cart' , cartRoute)

// // Adress Routes
app.use('/api/address' , addressRoute)


const PORT = process.env.PORT || 5000;


app.listen(PORT , () => {
    console.log(`Server is running PORT ${PORT}`);
    
})
