import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useScrollVisibility from '../../hooks/useScrollVisibility';
import './Navbar.css';
import logo from '../../assets/logo.png';


const Navbar = () => {
  const isVisible = useScrollVisibility();

  return (
    <nav className={`navbar ${isVisible ? '' : 'hidden'}`}>
      <img src={logo} alt='Logo' className='logo' />
      <ul>
        <li><button className='btn'>hello</button></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/news">News</Link></li>
        <li><Link to="/predictions">Predictions</Link></li>
        <li><Link to="/quant">Quant</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;