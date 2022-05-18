import React from 'react';
import ReactDOM from 'react-dom/client';
// import ReactDOM from 'react-dom';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);
// ReactDOM.render(
root.render(
  // <React.StrictMode>
    <App />
  // {/* </React.StrictMode>, */}
  // document.getElementById('root')
);
