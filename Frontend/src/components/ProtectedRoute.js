// src/components/ProtectedRoutes.js

import React from 'react';
import { useIsAuthenticated } from '@azure/msal-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    // If not authenticated, redirect to home page
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the children components
  return children;
};

export default ProtectedRoutes;
