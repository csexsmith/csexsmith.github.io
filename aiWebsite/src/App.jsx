import React from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './pages/Home';
import News from './pages/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </Router>
  );
};

export default App