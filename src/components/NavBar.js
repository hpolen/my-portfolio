// src/components/NavBar.js

import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-scroll';

function NavBar() {
  return (
    <AppBar position="fixed">
      <Toolbar>
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
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
