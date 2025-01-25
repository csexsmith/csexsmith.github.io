import React, { useState, useEffect } from 'react';
import { queryDatabase } from '../../backend/api';
import TickerDD from '../tickerdropdown/TickerDD';
import './PGrid.css';

const PGrid = () => {
  const [selectedTicker, setSelectedTicker] = useState('All'); // Default to "All"
  const [selectedInterval, setSelectedInterval] = useState('All'); // Default to "All"
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch predictions based on the selected ticker and time interval
  useEffect(() => {
    setLoading(true);
    const fetchPredictions = async () => {
      let query = `
        SELECT 
          p.prediction_timestamp, 
          p.time_interval, 
          p.direction, 
          p.confidence, 
          p.change_over_last_interval,
          t.ticker
        FROM predictions p
        INNER JOIN tickers t ON p.ticker_id = t.id
        WHERE 1=1`; // Start with a true condition to simplify adding filters

      // Add ticker filter if "All" is not selected
      if (selectedTicker !== 'All') {
        query += ` AND t.ticker = '${selectedTicker}'`;
      }

      // Add time interval filter if "All" is not selected
      if (selectedInterval !== 'All') {
        query += ` AND p.time_interval = '${selectedInterval}'`;
      }

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
  }, [selectedTicker, selectedInterval]); // Re-fetch when ticker or interval changes

  const handleTickerSelect = (ticker) => {
    setSelectedTicker(ticker);
  };

  const handleIntervalSelect = (interval) => {
    setSelectedInterval(interval);
  };

  const getDirectionText = (direction) => {
    return direction === 1 ? 'Up' : 'Down';
  };

  return (
    <div className="prediction-table-container">
      {/* Container for side-by-side dropdowns */}
      <div className="dropdowns-container">
        <TickerDD
          label="Select Ticker"
          onSelect={handleTickerSelect}
          query="SELECT ticker FROM tickers"
          includeAll={true} // Enable "All" option
        />

        <TickerDD
          label="Select Time Interval"
          onSelect={handleIntervalSelect}
          query="SELECT DISTINCT time_interval FROM predictions"
          includeAll={true} // Enable "All" option
        />
      </div>

      {loading && <p className="loading-message">Loading predictions...</p>}

      {!loading && (
        <div>
          <h3>
            Predictions{' '}
            {selectedTicker !== 'All' && `for ${selectedTicker}`}{' '}
            {selectedInterval !== 'All' && `(${selectedInterval})`}
          </h3>
          {predictions.length > 0 ? (
            <table className="prediction-table">
              <thead>
                <tr>
                  <th>Ticker</th>
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
                    <td>{prediction.ticker}</td>
                    <td>{prediction.prediction_timestamp}</td>
                    <td>{prediction.time_interval}</td>
                    <td>{getDirectionText(prediction.direction)}</td>
                    <td>{prediction.confidence}%</td>
                    <td>{prediction.change_over_last_interval}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-results">
              No predictions found{' '}
              {selectedTicker !== 'All' && `for ${selectedTicker}`}{' '}
              {selectedInterval !== 'All' && `(${selectedInterval})`}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PGrid;