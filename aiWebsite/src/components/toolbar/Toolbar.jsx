import React from 'react'
import './Toolbar.css'
import useScrollVisibility from '../../hooks/useScrollVisibility'
import { use } from 'react'

const Toolbar = () => {
  const isVisible = useScrollVisibility();

  return (
    <div className={`toolbar ${isVisible ? '' : 'hidden'}`}>
    <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
    </ul>
</div>
  )
}

export default Toolbar
