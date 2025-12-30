
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log("App initializing...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Critical: Root element not found!");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("App mounted successfully.");
}
