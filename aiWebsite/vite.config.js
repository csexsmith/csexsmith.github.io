import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        // Add Solana dependencies here
        '@solana/wallet-adapter-react',
        '@solana/wallet-adapter-wallets',
        '@solana/wallet-adapter-base',
        '@solana/web3.js',
        // Add other problematic modules if needed
      ],
    },
  },
  optimizeDeps: {
    include: ['buffer', 'process'], // Ensure polyfills are included
  },
});