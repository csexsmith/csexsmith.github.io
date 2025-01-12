import React from 'react'
import Navbar from './components/navbar/Navbar'
import Animegirl from './components/animegirl/Animegirl'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Toolbar from './components/toolbar/Toolbar'

const App = () => {
  return(
    <div>
      <Navbar />
      <Animegirl />
    </div>
  )
}

export default App