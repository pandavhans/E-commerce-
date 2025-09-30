import React, { useEffect } from 'react'
import Register from './pages/Register.jsx'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import Header from './components/Header/Header.jsx'
import User from './pages/User.jsx'
import {ToastContainer} from 'react-toastify'
import Cart from './pages/Cart.jsx'
import Footer from './components/Footer/Footer.jsx'
import Product from './pages/Product.jsx'
import AllProduct from './pages/AllProduct.jsx'



const App = () => {


  return (
    <div>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/user' element={<User />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/Product' element={<Product />}/>
        <Route path='/all-product' element={<AllProduct />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
