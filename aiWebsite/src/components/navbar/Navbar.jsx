import React from 'react'
import './navbar.css'
import logo from '../../assets/logo.png'

const Navbar = () => {
  return (
    <nav className='container'>
      <img src={logo} alt='' className='logo'></img>
      <ul>
        <li><button className='btn'>hello</button></li>
        <li><a href="#little">little</a></li>
        <li><a href="#bronze">bronze</a></li>
        <li><a href="#noob">noob</a></li>
      </ul>
    </nav>
  )
}

export default Navbar
