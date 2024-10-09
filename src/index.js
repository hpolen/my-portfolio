// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/montserrat'; // Import Montserrat font

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline /> {/* Provides baseline CSS resets */}
    <App />
  </ThemeProvider>
);
