import React from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home';
import News from './pages/news/News';
import Predictions from './pages/predictions/Predictions'
import Quanttools from './pages/quant/Quanttools'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/quant" element={<Quanttools />} />
      </Routes>
    </Router>
  );
};

export default App