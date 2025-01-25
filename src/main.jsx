import React from 'react';
import { createRoot } from 'react-dom/client';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import App from './App';
import './index.css';
import './polyfills';

// Solana network (Mainnet, Devnet, or Testnet)
const network = 'https://api.mainnet-beta.solana.com'; // Use 'https://api.devnet.solana.com' for Devnet

// Supported wallets (Phantom is prioritized)
const wallets = [new PhantomWalletAdapter()];

const root = createRoot(document.getElementById('root'));

root.render(
  <ConnectionProvider endpoint={network}>
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <App />
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
);