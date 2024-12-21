// src/App.js

import React, { useEffect } from 'react';
import NavBar from './components/NavBar';
import HeroSection from './components/HeroSection';
import AgileExperience from './components/AgileExperience';
import ProcessOptimization from './components/ProcessOptimization';
import AIExperience from './components/AIExperience';
import Footer from './components/Footer';
import ProtectedPage from './components/ProtectedPage';
import Contact from './components/Contact';
import { Box } from '@mui/material';
import { Element } from 'react-scroll';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import ChatbotAssistant from './components/ChatbotAssistant';
import OpenAIActivity from './components/OpenAIActivity';
import LoginPage from './components/LoginPage'; // Import the new Login Page component

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
                <Element name="contact">
                  <Contact />
                </Element>
                <Footer />
                <ChatbotAssistant />
              </>
            }
          />

          {/* Dedicated Login Page Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <ProtectedPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/openai-activity"
            element={
              <ProtectedRoute>
                <OpenAIActivity />
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
