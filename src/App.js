// src/App.js

import React, { useEffect } from 'react';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import AgileExperience from './components/AgileExperience';
import ProcessOptimization from './components/ProcessOptimization';
import AIExperience from './components/AIExperience';
// import Technologies from './components/Technologies'; // Import the Technologies component
import Footer from './components/Footer';
import ProtectedPage from './components/ProtectedPage'; // Import the Protected Page
import Contact from './components/Contact'; // Import the Contact component
import { Box } from '@mui/material';
import { Element } from 'react-scroll';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import the custom theme
import { Routes, Route, Navigate } from 'react-router-dom'; // Import Routes, Route, Navigate
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import ChatbotAssistant from './components/ChatbotAssistant'; // Import ChatbotAssistant

function App() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'background.default', color: 'text.primary' }}>
        <NavBar />
        <Routes>
          {/* Public Home Route */}
          <Route
            path="/"
            element={
              <>
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
                {/* Contact Section */}
                <Element name="contact">
                  <Contact />
                </Element>
                <Footer />
                {/* Chatbot Assistant */}
                <ChatbotAssistant />
              </>
            }
          />

          {/* Protected Route */}
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <ProtectedPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

export default App;
