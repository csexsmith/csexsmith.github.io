import React, { useState, useEffect } from 'react';
import { queryDatabase } from '../../backend/api'; // Adjust path to your API module
import TickerDD from '../tickerdropdown/TickerDD'; // Dropdown for ticker selection
import './PGrid.css'; // Styles for the table

const PGrid = () => {
    const [selectedTicker, setSelectedTicker] = useState('');
    const [predictions, setPredictions] = useState([]);
    const [loading, setLoading] = useState(false);
  
    // Fetch predictions based on the selected ticker
    useEffect(() => {
      if (selectedTicker) {
        setLoading(true);
        const fetchPredictions = async () => {
          const query = `
            SELECT 
              p.prediction_timestamp, 
              p.time_interval, 
              p.direction, 
              p.confidence, 
              p.change_over_last_interval
            FROM predictions p
            INNER JOIN tickers t ON p.ticker_id = t.id
            WHERE t.ticker = '${selectedTicker}'`; // Adjust query for your schema
  
          try {
            const data = await queryDatabase(query);
            setPredictions(data);
          } catch (error) {
            console.error('Error fetching predictions:', error);
          } finally {
            setLoading(false);
          }
        };
  
        fetchPredictions();
      }
    }, [selectedTicker]);
  
    // Handle ticker selection from dropdown
    const handleTickerSelect = (ticker) => {
      setSelectedTicker(ticker);
    };
  
    return (
      <div className="prediction-table-container">
        <TickerDD label="Select Ticker" onSelect={handleTickerSelect} />
        
        {loading && <p className="loading-message">Loading predictions...</p>}
  
        {selectedTicker && !loading && (
          <div>
            <h3>Predictions for {selectedTicker}</h3>
            {predictions.length > 0 ? (
              <table className="prediction-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Time Interval</th>
                    <th>Direction</th>
                    <th>Confidence</th>
                    <th>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {predictions.map((prediction, index) => (
                    <tr key={index}>
                      <td>{prediction.prediction_timestamp}</td>
                      <td>{prediction.time_interval}</td>
                      <td>{prediction.direction}</td>
                      <td>{prediction.confidence}%</td>
                      <td>{prediction.change_over_last_interval}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-results">No predictions found for {selectedTicker}</p>
            )}
          </div>
        )}
      </div>
    );
  };
  

export default PGrid;