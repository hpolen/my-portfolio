// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { msalConfig } from './authConfig';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
//import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; // If using Material-UI
import CssBaseline from '@mui/material/CssBaseline'; // If using Material-UI
import theme from './theme'; // If using Material-UI theme
import '@fontsource/montserrat'; // Import Montserrat font


const msalInstance = new PublicClientApplication(msalConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MsalProvider instance={msalInstance}>
    <ThemeProvider theme={theme}> {/* Remove if not using Material-UI */}
      <CssBaseline /> {/* Remove if not using Material-UI */}
      <App />
    </ThemeProvider>
  </MsalProvider>
);
