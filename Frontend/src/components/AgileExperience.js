// src/components/AgileExperience.js
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import agileImage from '../assets/images/agile.jpg';

function AgileExperience() {
  return (
    <Box sx={{ py: 8 }} data-aos="fade-up">
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <img src={agileImage} alt="Agile Experience" style={{ width: '100%', borderRadius: 8 }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
            Agile Journey Experience
          </Typography>
          <Typography variant="body1" paragraph>
          With a proven track record in agile leadership, I have driven significant organizational improvements by fostering collaboration, enhancing transparency, and streamlining processes. Through the application of agile methodologies, I have led teams to achieve greater efficiency, reduce delivery times, and continuously improve performance.
           My leadership approach emphasizes empowering teams, enabling continuous growth, and creating environments where agility supports both innovation and sustainable success.
          </Typography>
          <Typography variant="body1">
            Let collaborate and discuss your agile transformation! 
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AgileExperience;
