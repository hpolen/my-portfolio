// src/components/ProtectedPage.js

import React from 'react';
import { Typography, Box } from '@mui/material';

const ProtectedPage = () => {
  return (
    <Box sx={{ padding: 4, marginTop: '80px' }}>
      <Typography variant="h4" gutterBottom>
        Protected Page
      </Typography>
      <Typography variant="body1">
        This page is accessible only to authenticated users. You can add any content here that you want to protect.
      </Typography>
    </Box>
  );
};

export default ProtectedPage;
