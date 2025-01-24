import React, { useState, useEffect } from 'react';
import { queryDatabase } from '../../backend/api'; // Assuming the queryDatabase method is available
import './TickerDD.css';

const TickerDD = ({ label, onSelect, query, includeAll = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]); // Renamed from 'tickers' to 'options' for generality
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch options from the database using the provided query
  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const data = await queryDatabase(query);
        // Assuming the query returns an array of objects with at least one field (e.g., 'ticker')
        const optionsList = data.map((row) => row.ticker || Object.values(row)[0]); // Fallback to first value if 'ticker' is not present

        // Add "All" option if includeAll is true
        if (includeAll) {
          optionsList.unshift('All');
        }

        setOptions(optionsList);
      } catch (error) {
        console.error('Error fetching options:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchOptions();
    }
  }, [query, includeAll]); // Re-fetch when the query or includeAll changes

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
          <span>{selectedOption || 'Select an option'}</span>
          <span className={`arrow ${isOpen ? 'open' : ''}`}>&#9660;</span>
        </div>
        {isOpen && (
          <div className="dropdown-list">
            {loading ? (
              <div className="dropdown-option">Loading...</div>
            ) : options.length > 0 ? (
              options.map((option, index) => (
                <div
                  key={index}
                  className="dropdown-option"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="dropdown-option">No options available</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TickerDD;