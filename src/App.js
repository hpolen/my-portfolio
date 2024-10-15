// src/App.js

import React, { useEffect } from 'react';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import AgileExperience from './components/AgileExperience';
import ProcessOptimization from './components/ProcessOptimization';
import AIExperience from './components/AIExperience';
//import Technologies from './components/Technologies'; // Import the Technologies component
import Footer from './components/Footer';
import { Box } from '@mui/material';
import { Element } from 'react-scroll';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import the custom theme

function App() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'background.default', color: 'text.primary' }}>
        <NavBar />
        <HeroSection />
        <Element name="agile">
          <AgileExperience />
        </Element>
        <Element name="process">
          <ProcessOptimization />
        </Element>
        <Element name="ai">
          <AIExperience />
        </Element>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
