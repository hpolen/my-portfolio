// src/components/HeroSection.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-scroll';
import heroImage from '../assets/images/hero.jpg';
import './HeroSection.css'; // Optional for additional styling

const phrases = [
  'Agile Delivery Leader',
  'AI Governance',
  'Innovation Optimizing Complex Processes',
];

function HeroSection() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = 150; // milliseconds per character
    const deletingSpeed = 100; // milliseconds per character
    const delayBetweenPhrases = 2000; // milliseconds before deleting starts

    const handleTyping = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
        // Deleting mode: remove one character
        setDisplayedText(currentPhrase.substring(0, displayedText.length - 1));
        
        if (displayedText.length - 1 === 0) {
          // Move to the next phrase
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      } else {
        // Typing mode: add one character
        setDisplayedText(currentPhrase.substring(0, displayedText.length + 1));
        
        if (displayedText.length + 1 === currentPhrase.length) {
          // Pause before starting to delete
          setTimeout(() => setIsDeleting(true), delayBetweenPhrases);
        }
      }
    };

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentPhraseIndex]);

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'text.primary',
      }}
    >
      <Box sx={{ maxWidth: 800, px: 2 }}>
        <Typography variant="h2" gutterBottom sx={{ color: 'text.primary', fontWeight: 700 }}>
          Harry Polen ...
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ color: 'text.primary', fontWeight: 500 }}>
          {displayedText}
          <span className="cursor">|</span>
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="agile"
          smooth={true}
          duration={500}
          sx={{ mt: 3 }}
        >
          Explore
        </Button>
      </Box>
    </Box>
  );
}

export default HeroSection;
