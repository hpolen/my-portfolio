// src/components/NewScreen.js

import React from 'react';
import { Typography, Box } from '@mui/material';

const NewScreen = () => {
  return (
    <Box sx={{ padding: 4, marginTop: '80px' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the New Screen!
      </Typography>
      <Typography variant="body1">
        This is a protected screen accessible only after logging in.
      </Typography>
    </Box>
  );
};

export default NewScreen;
