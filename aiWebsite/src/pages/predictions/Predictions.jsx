import React, { useState } from 'react';
import TickerDD from '../../components/tickerdropdown/TickerDD'
import PGrid from '../../components/predictiongrid/PGrid'



const Predictions = () => {

  const [selectedTicker, setSelectedTicker] = useState('');

  const handleSelect = (selectedOption) => {
    setSelectedTicker(selectedOption);
  };

  return (
    <div>
      <TickerDD 
      onSelect={handleSelect}/>
    </div>
  )
}

export default Predictions
