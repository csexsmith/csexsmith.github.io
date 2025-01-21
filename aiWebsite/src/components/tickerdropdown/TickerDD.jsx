import React, { useState, useEffect } from 'react';
import { queryDatabase } from '../../backend/api';  // Assuming the queryDatabase method is available
import './TickerDD.css';

const TickerDD = ({ label, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tickers, setTickers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  // Fetch tickers from the database on component mount
  useEffect(() => {
    const fetchTickers = async () => {
      const query = 'SELECT ticker FROM tickers'; // Adjust this query as needed
      try {
        const data = await queryDatabase(query);
        const tickersList = data.map((row) => row.ticker); // Assuming response is in { ticker: 'BTC', ... } format
        setTickers(tickersList);
      } catch (error) {
        console.error('Error fetching tickers:', error);
      }
    };

    fetchTickers();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option); // Pass the selected option back to the parent component
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div className="custom-dropdown">
      <label className="label-white">{label}</label>
      <div className="dropdown-container">
        <div className="dropdown-header" onClick={toggleDropdown}>
          <span>{selectedOption || 'Select a ticker'}</span>
          <span className={`arrow ${isOpen ? 'open' : ''}`}>&#9660;</span>
        </div>
        {isOpen && (
          <div className="dropdown-list">
            {tickers.map((ticker, index) => (
              <div
                key={index}
                className="dropdown-option"
                onClick={() => handleOptionClick(ticker)} // Close the dropdown upon selection
              >
                {ticker}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TickerDD;