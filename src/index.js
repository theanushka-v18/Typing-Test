import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TestModeContextProvider } from './context/TestModeContext';
import { ThemeContextProvider } from './context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <TestModeContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TestModeContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
