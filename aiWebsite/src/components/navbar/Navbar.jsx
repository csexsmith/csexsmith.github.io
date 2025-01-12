import React, { useState, useEffect } from 'react';
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
        <li><a href="#little">little</a></li>
        <li><a href="#bronze">bronze</a></li>
        <li><a href="#noob">noob</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;