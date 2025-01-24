import { Connection } from '@solana/web3.js';

// Define the Solana endpoint
const endpoint = 'https://api.mainnet-beta.solana.com'; // Replace with your endpoint

// Create a connection to the Solana network
const connection = new Connection(endpoint, 'confirmed');

// Test the connection
async function testConnection() {
  try {
    // Get the latest block height
    const blockHeight = await connection.getBlockHeight();
    console.log('Latest block height:', blockHeight);

    // Get the version of the Solana node
    const version = await connection.getVersion();
    console.log('Solana node version:', version);

    // Get the current slot (latest confirmed block)
    const slot = await connection.getSlot();
    console.log('Current slot:', slot);

    console.log('Endpoint is working correctly!');
  } catch (error) {
    console.error('Error testing endpoint:', error);
  }
}

// Run the test
testConnection();