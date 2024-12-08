// src/components/AIExperience.js
import React from 'react';
import { Box, Typography, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import aiImage from '../assets/images/ai.jpg';
// Uncomment the following line if you have langchain-logo.png
// import langchainLogo from '../assets/images/langchain-logo.png';

function AIExperience() {
  const aiPoints = [
    "Hands-on experience with LangChain for building custom AI applications.",
    "Leveraging AI tools to optimize business processes.",
    "Educating teams on safe AI usage in highly governed environments.",
  ];

  return (
    <Box sx={{ py: 8 }} data-aos="fade-up">
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <img src={aiImage} alt="AI Experience" style={{ width: '100%', borderRadius: 8 }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
            AI Leveraging Experience
          </Typography>
          <Typography variant="body1" paragraph>
            With hands-on experience using LangChain and other AI tools, I have leveraged artificial intelligence to optimize processes and drive innovation. My work includes educating teams on how to use AI safely within highly governed environments.
          </Typography>
          <List>
            {aiPoints.map((point, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <ArrowForwardIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary={point} />
              </ListItem>
            ))}
          </List>
          {/* Uncomment the following lines if you have langchain-logo.png */}
          {/* <img src={langchainLogo} alt="LangChain Logo" style={{ width: '100px', marginTop: '20px' }} /> */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default AIExperience;
