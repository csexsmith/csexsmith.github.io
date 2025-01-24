import { Buffer } from 'buffer';
import process from 'process';

// Polyfill for buffer
window.Buffer = Buffer;

// Polyfill for process
window.process = process;