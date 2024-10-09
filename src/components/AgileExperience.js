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
            I have extensive experience helping large companies advance in their agile journey. As an SPC certified
            professional, I have supported a wide range of teams and value streams, collaborating closely with C-level
            leaders to implement agile methodologies effectively.
          </Typography>
          <Typography variant="body1">
            My expertise includes coaching teams on agile best practices, facilitating agile transformations, and
            ensuring that agile principles are adopted across the organization to improve productivity and collaboration.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AgileExperience;
