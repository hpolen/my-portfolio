// src/components/OpenAIActivity.js

import React from 'react';
import { Box, Typography } from '@mui/material';

const OpenAIActivity = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h2" gutterBottom>
        OpenAI Activity Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to the OpenAI Activity page. This page will display logs and usage data from the OpenAI API. Stay tuned as we add more functionality!
      </Typography>
    </Box>
  );
};

export default OpenAIActivity;
