// src/components/NavBar.js

import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-scroll';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';

function NavBar() {
  const { instance, accounts } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch(e => {
      console.error(e);
    });
  };

  const handleLogout = () => {
    instance.logoutRedirect().catch(e => {
      console.error(e);
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
            component={Link}
            to="agile"
            smooth={true}
            duration={500}
          >
            Agile Journey
          </Button>
          <Button
            color="primary"
            component={Link}
            to="process"
            smooth={true}
            duration={500}
          >
            Process Optimization
          </Button>
          <Button
            color="primary"
            component={Link}
            to="ai"
            smooth={true}
            duration={500}
          >
            AI Experience
          </Button>
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
