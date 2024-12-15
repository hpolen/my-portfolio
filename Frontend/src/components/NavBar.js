// src/components/NavBar.js

import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link as ScrollLink } from 'react-scroll'; // Rename to avoid confusion with React Router's Link
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import { Link as RouterLink } from 'react-router-dom';

function NavBar() {
  const { instance, accounts } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.error('Login Redirect Error:', e);
      alert('Login failed. Please try again.');
    });
  };

  const handleLogout = () => {
    instance.logoutRedirect().catch((e) => {
      console.error('Logout Redirect Error:', e);
      alert('Logout failed. Please try again.');
    });
  };

  const isAuthenticated = accounts.length > 0;

  return (
    <AppBar position="fixed">
      <Toolbar>
        {/* Navigation Buttons */}
        <Box sx={{ flexGrow: 1 }}>
          <Button
            color="primary"
            component={ScrollLink}
            to="agile"
            smooth={true}
            duration={500}
          >
            Agile Journey
          </Button>
          <Button
            color="primary"
            component={ScrollLink}
            to="process"
            smooth={true}
            duration={500}
          >
            Process Optimization
          </Button>
          <Button
            color="primary"
            component={ScrollLink}
            to="ai"
            smooth={true}
            duration={500}
          >
            AI Experience
          </Button>
          <Button
            color="primary"
            component={ScrollLink}
            to="contact"
            smooth={true}
            duration={500}
          >
            Contact
          </Button>

          {/* Protected Pages */}
          {isAuthenticated && (
            <>
              <Button
                color="primary"
                component={RouterLink}
                to="/protected"
                sx={{
                  marginLeft: 1, // Add spacing between buttons
                  textTransform: 'none', // Same styling as the other text buttons
                }}
              >
                Protected Page
              </Button>
              <Button
                color="primary"
                component={RouterLink}
                to="/openai-activity"
                sx={{
                  marginLeft: 1, // Add spacing between buttons
                  textTransform: 'none', // Same styling as the other text buttons
                }}
              >
                Open AI Activity
              </Button>
            </>
          )}
        </Box>

        {/* Login/Logout Button */}
        <Box>
          {isAuthenticated ? (
            <Button color="primary" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="primary" onClick={handleLogin}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
