// src/components/Technologies.js

import React, { useEffect, useRef, useMemo, useState } from 'react';
import Matter from 'matter-js';
import { Box, Typography } from '@mui/material';
import theme from '../theme'; // Ensure the correct path to theme.js
import Bubble from './Bubble'; // Import the Bubble component
import './Technologies.css'; // Ensure the correct path to Technologies.css

const Technologies = () => {
  const containerRef = useRef(null);
  const engineRef = useRef(null);
  const runnerRef = useRef(null);
  const [bubbles, setBubbles] = useState([]);

  // Initialize technologies array using useMemo to prevent re-creation on each render
  const technologies = useMemo(
    () => [
      'React',
      'Node.js',
      'Material UI',
      'Redux',
      'TypeScript',
      'GraphQL',
      'Webpack',
      'Babel',
      'Git',
      'Docker',
      'Jest',
      'SASS',
      'HTML5',
      'CSS3',
      'Express.js',
    ],
    []
  );

  useEffect(() => {
    const { Engine, Render, World, Bodies, Runner, Events } = Matter;

    // Create a new engine
    const engine = Engine.create();
    engine.gravity.y = 0; // No gravity for floating effect
    engineRef.current = engine;

    const container = containerRef.current;
    const { clientWidth, clientHeight } = container;

    // Create walls to contain the bubbles within the container
    const walls = [
      Bodies.rectangle(clientWidth / 2, -25, clientWidth, 50, { isStatic: true }), // Top
      Bodies.rectangle(clientWidth / 2, clientHeight + 25, clientWidth, 50, { isStatic: true }), // Bottom
      Bodies.rectangle(-25, clientHeight / 2, 50, clientHeight, { isStatic: true }), // Left
      Bodies.rectangle(clientWidth + 25, clientHeight / 2, 50, clientHeight, { isStatic: true }), // Right
    ];
    World.add(engine.world, walls);

    // Create bubbles
    const bubbleBodies = technologies.map((tech) => {
      const radius = 50;
      const bubble = Bodies.circle(
        Math.random() * (clientWidth - 2 * radius) + radius,
        Math.random() * (clientHeight - 2 * radius) + radius,
        radius,
        {
          restitution: 0.9, // Bounciness
          friction: 0.005,
          render: {
            fillStyle: theme.palette.techBubble[tech] || '#000000',
            strokeStyle: '#ffffff',
            lineWidth: 2,
          },
        }
      );
      bubble.label = tech;
      World.add(engine.world, bubble);
      return bubble;
    });

    // Initialize runner
    const runner = Runner.create();
    Runner.run(runner, engine);
    runnerRef.current = runner;

    // Function to update bubble positions and set state
    const updateBubbles = () => {
      const updatedBubbles = bubbleBodies.map((body) => ({
        id: body.id,
        tech: body.label,
        x: body.position.x - body.circleRadius,
        y: body.position.y - body.circleRadius,
        color: theme.palette.techBubble[body.label] || '#000000',
      }));
      setBubbles(updatedBubbles);
      requestAnimationFrame(updateBubbles);
    };

    updateBubbles();

    // Handle window resize
    const handleResize = () => {
      const { clientWidth: newWidth, clientHeight: newHeight } = container;

      // Update walls positions
      World.remove(engine.world, walls);

      const newWalls = [
        Bodies.rectangle(newWidth / 2, -25, newWidth, 50, { isStatic: true }), // Top
        Bodies.rectangle(newWidth / 2, newHeight + 25, newWidth, 50, { isStatic: true }), // Bottom
        Bodies.rectangle(-25, newHeight / 2, 50, newHeight, { isStatic: true }), // Left
        Bodies.rectangle(newWidth + 25, newHeight / 2, 50, newHeight, { isStatic: true }), // Right
      ];
      World.add(engine.world, newWalls);
    };

    // Debounce resize events to prevent excessive calculations
    let resizeTimeout;
    const debounceResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 250);
    };

    window.addEventListener('resize', debounceResize);

    // Cleanup on unmount
    return () => {
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
      window.removeEventListener('resize', debounceResize);
    };
  }, [technologies, theme.palette.techBubble]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '600px', md: '800px' }, // Responsive height
        backgroundColor: '#F0F4F8', // Light blue-grey background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: 4,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          mb: 4,
          color: 'text.primary',
          fontWeight: 600,
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        Technologies I Have Experience With
      </Typography>
      {bubbles.map((bubble) => (
        <Bubble
          key={bubble.id}
          x={bubble.x}
          y={bubble.y}
          color={bubble.color}
          tech={bubble.tech}
        />
      ))}
    </Box>
  );
};

export default Technologies;
