import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const WalletConnect = () => {
    const { connected, publicKey, connect, disconnect, select } = useWallet();
  const [error, setError] = useState('');

  const handleConnect = async () => {
    try {
      console.log('Attempting to connect to Phantom Wallet...');

      // Ensure a wallet is selected before connecting
      if (!window.solana) {
        throw new Error('Phantom Wallet is not installed or not detected.');
      }

      // Select the Phantom Wallet
      select('Phantom');

      // Connect to the selected wallet
      await connect();
      console.log('Wallet connected successfully!');
    } catch (err) {
      console.error('Failed to connect wallet:', err);
      setError('Failed to connect wallet. Please try again.');
    }
  };

  const handleDisconnect = async () => {
    try {
      console.log('Disconnecting wallet...');
      await disconnect();
      console.log('Wallet disconnected successfully!');
    } catch (err) {
      console.error('Failed to disconnect wallet:', err);
      setError('Failed to disconnect wallet. Please try again.');
    }
  };

  useEffect(() => {
    if (window.solana) {
      console.log('Phantom Wallet is available:', window.solana);
      console.log('Is Phantom Wallet connected?', window.solana.isConnected);
    } else {
      console.error('Phantom Wallet is not installed or not detected.');
      setError('Phantom Wallet is not installed. Please install it to continue.');
    }
  }, []);

  return (
    <div>
      {connected ? (
        <div>
          <p>Connected: {publicKey.toBase58()}</p>
          <button
            onClick={handleDisconnect}
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={handleConnect}
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', background: '#4A90E2', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Connect Wallet
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default WalletConnect;