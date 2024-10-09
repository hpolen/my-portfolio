// src/components/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ py: 4, textAlign: 'center', backgroundColor: 'background.paper' }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Built with React and Material UI.
      </Typography>
    </Box>
  );
}

export default Footer;
