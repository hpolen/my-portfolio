// src/components/ContactSection.js
import React from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import { Send } from '@mui/icons-material';

function ContactSection() {
  return (
    <Box sx={{ py: 8 }} data-aos="fade-up">
      <Typography variant="h3" gutterBottom color="secondary" textAlign="center">
        Get in Touch
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={8}>
          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Name"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Email"
                  variant="outlined"
                  type="email"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={6}
                  required
                />
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Button
                  variant="contained"
                  color="tertiary"
                  endIcon={<Send />}
                  type="submit"
                  size="large"
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ContactSection;
