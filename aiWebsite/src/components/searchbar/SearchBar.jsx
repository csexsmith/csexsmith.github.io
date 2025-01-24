import React from 'react';
import './SearchBar.css'; // For styling

const SearchBar = ({ placeholder, value, onChange }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="search-bar"
      />
    </div>
  );
};

export default SearchBar;