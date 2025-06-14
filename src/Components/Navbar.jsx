import React from 'react'
import { Link } from 'react-router'
import "../App.css"

const Navbar = () => {
  return (
    <div>
          <h1>logo </h1>
          <div className="links">
             <Link to="/" className='link'> home  page</Link>
             <Link to="/addproducts"  className='link'> add products </Link>
             <Link to="/products"  className='link'> products </Link>
             <Link to="/signup"  className='link'> sign up</Link>
             <Link to="/signin"  className='link'> sign in </Link>
          </div>
      
    </div>
  )
}

export default Navbar
