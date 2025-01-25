import express from 'express';  // Use import
import cors from 'cors';        // Use import
import pkg from 'pg';           // Import the entire 'pg' module
const { Pool } = pkg;          // Destructure 'Pool' from the imported 'pg' module

const app = express();
const port = 5000;

// PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'testbase',
  password: '123',
  port: 5432,
});

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to handle queries
app.post('/api/query', async (req, res) => {
  const { query } = req.body; // Extract the query string from the request body
  try {
    const result = await pool.query(query); // Execute the query
    res.json(result.rows); // Send back the rows as a response
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).send('Error executing query');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});