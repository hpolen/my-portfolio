// src/components/ProcessOptimization.js
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import processImage from '../assets/images/process.jpg';

function ProcessOptimization() {
  return (
    <Box sx={{ py: 8, backgroundColor: 'background.paper' }} data-aos="fade-up">
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
          <Typography variant="h3" gutterBottom>
            Process Optimization Experience
          </Typography>
          <Typography variant="body1" paragraph>
            I have played a pivotal role in defining the Software Development Life Cycle for major enterprises.
            My focus has been on optimizing complex processes to enhance efficiency and adaptability in a fast-paced
            technical world.
          </Typography>
          <Typography variant="body1">
            By combining agile experience with strategic planning, I have helped organizations quickly adapt to market
            changes, streamline workflows, and improve overall performance.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
          <img src={processImage} alt="Process Optimization" style={{ width: '100%', borderRadius: 8 }} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProcessOptimization;
