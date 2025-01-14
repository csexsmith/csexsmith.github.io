import React, { useEffect } from 'react';
import { queryDatabase } from '../backend/api';


const News = () => {
  useEffect(() => {
    const fetchAndLogData = async () => {
      try {
        const result = await queryDatabase("SELECT * FROM test_table"); // Call the query function
        console.log('Query results:', result); // Log the query results to the console
      } catch (error) {
        console.error('Error fetching data:', error); // Handle any errors
      }
    };

    fetchAndLogData(); // Invoke the function when the component mounts
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      <p>sup guys</p>
    </div>
  );
};

export default News;