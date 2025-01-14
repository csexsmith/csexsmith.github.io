import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Adjust as needed

/**
 * Sends a query string to the backend and retrieves the data.
 * @param {string} query - The query string to send to the backend.
 * @returns {Promise<any>} - A promise that resolves to the fetched data.
 */
export const queryDatabase = async (query) => {
  try {
    const response = await axios.post(`${BASE_URL}/query`, { query });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error querying the database:', error);
    throw error; // Propagate the error
  }
};