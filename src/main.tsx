import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

console.log('Applet loading...');

const container = document.getElementById('root');
if (container) {
  console.log('Container found, rendering...');
  createRoot(container).render(<App />);
} else {
  console.error('Root container not found!');
}
