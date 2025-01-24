import React from 'react';
import './polyfills'
import { createRoot } from 'react-dom/client';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import App from './App';
import './index.css';


// Solana network
const network = 'https://api.mainnet-beta.solana.com'; // Use 'https://api.devnet.solana.com' for Devnet

// Supported wallets (prioritize Phantom)
const wallets = [
  new PhantomWalletAdapter(), // Add PhantomWalletAdapter
];

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