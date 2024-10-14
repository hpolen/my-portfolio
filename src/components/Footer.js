// src/components/Footer.js
import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <Box sx={{ py: 4, textAlign: 'center', backgroundColor: 'background.paper' }}>
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Harry Polen. All rights reserved.
      </Typography>
      <IconButton
        href="https://www.linkedin.com/in/harry-polen-483b84b4/" // Replace with your LinkedIn profile link
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: 'text.secondary', mt: 2 }}
        aria-label="LinkedIn"
      >
        <LinkedInIcon />
      </IconButton>
    </Box>
  );
}

export default Footer;
