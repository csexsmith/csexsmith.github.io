import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../../assets/logo.png';
import useScrollVisibility from '../../hooks/useScrollVisibility';

const Navbar = () => {
  const isVisible = useScrollVisibility();

  return (
    <nav className={`navbar ${isVisible ? '' : 'hidden'}`}>
      <img src={logo} alt='Logo' className='logo' />
      <ul>
        <li><button className='btn'>hello</button></li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/news">News</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;