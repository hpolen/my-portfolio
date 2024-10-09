// src/components/Bubble.js

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Bubble.css'; // Ensure this path is correct

const Bubble = ({ x, y, color, tech }) => {
  const bubbleRef = useRef(null);

  useEffect(() => {
    const bubble = bubbleRef.current;
    if (bubble) {
      // Update the position smoothly using CSS transform
      bubble.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, [x, y]);

  return (
    <div
      ref={bubbleRef}
      className="bubble"
      style={{
        backgroundColor: color,
      }}
      aria-label={tech}
      title={tech}
    >
      <span className="bubble-text">{tech}</span>
    </div>
  );
};

Bubble.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  tech: PropTypes.string.isRequired,
};

export default Bubble;
