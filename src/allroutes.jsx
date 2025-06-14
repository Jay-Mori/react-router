import React from 'react'
import {Routes,Route } from 'react-router'
import Home from './Pages/home'
import Addproducts from './Pages/Addproducts'
import Signup from './Pages/signup'
import Signin from './Pages/signin'
import Products from './reducer/products/products'

const Allroutes = () => {
  return (
    <div>
        <Routes>
             <Route path="/" element={<Home></Home>}></Route>
             <Route path="/addproducts" element={<Addproducts></Addproducts>}></Route>
            <Route path="/products" element={<Products></Products>}></Route>
             <Route path="/signup" element={<Signup></Signup>}></Route>
             <Route path="/signin" element={<Signin></Signin>}></Route>
        </Routes>
    </div>
  )
}

export default Allroutes
