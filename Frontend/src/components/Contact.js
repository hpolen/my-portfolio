// src/components/Contact.js

import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Container,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import Aos from 'aos';

// Initialize AOS
Aos.init({ duration: 1000 });

// Custom styles using makeStyles
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4, 0),
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
    },
    '& .MuiButton-root': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Contact = () => {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to backend)
    alert('Message sent!');
  };

  return (
    <Box className={classes.root} id="contact">
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          data-aos="fade-up"
          align="center"
        >
          Contact
        </Typography>
        <Grid container spacing={4}>
          {/* Contact Information */}
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper} data-aos="fade-right">
              <Typography variant="h6" gutterBottom>
                Get in Touch
              </Typography>
              <Typography variant="body1" gutterBottom>
                Feel free to reach out to me via the following channels:
              </Typography>
              <Typography variant="body2">
                <strong>Email:</strong> polenihj@gmail.com
              </Typography>
              <Typography variant="body2">
                <strong>Phone:</strong> (513) 403-2164
              </Typography>
              
            </Paper>
          </Grid>

          {/* Contact Form */}
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper} data-aos="fade-left">
              <Typography variant="h6" gutterBottom>
                Send a Message
              </Typography>
              <form
                className={classes.form}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <TextField
                  required
                  id="name"
                  label="Name"
                  variant="outlined"
                />
                <TextField
                  required
                  id="email"
                  label="Email"
                  variant="outlined"
                  type="email"
                />
                <TextField
                  required
                  id="message"
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Send Message
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Contact;
