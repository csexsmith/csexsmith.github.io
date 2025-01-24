import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import './WalletConnect.css';

const WalletConnect = () => {
  const { connected, publicKey, connect, disconnect } = useWallet();
  const [error, setError] = useState('');

  const handleConnect = async () => {
    try {
      if (!window.solana) {
        throw new Error('Phantom Wallet is not installed or not detected.');
      }
      await connect();
    } catch (err) {
      console.error('Failed to connect wallet:', err);
      setError('Failed to connect wallet. Please try again.');
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (err) {
      console.error('Failed to disconnect wallet:', err);
      setError('Failed to disconnect wallet. Please try again.');
    }
  };

  useEffect(() => {
    if (!window.solana) {
      setError('Phantom Wallet is not installed. Please install it to continue.');
    }
  }, []);

  return (
    <div>
      {connected ? (
        <div>
          <p>Connected: {publicKey.toBase58()}</p>
          <button onClick={handleDisconnect} className="wallet-adapter-button">
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <div>
          <button onClick={handleConnect} className="wallet-adapter-button">
            Connect Wallet
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default WalletConnect;