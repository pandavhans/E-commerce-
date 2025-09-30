import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './carSlice'
import productReducer from './ProductSlice'

const store = configureStore({
    reducer : {
        cart : cartReducer,
        product : productReducer
    }
})


export default store