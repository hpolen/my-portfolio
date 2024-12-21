import React, { useState } from "react";
import { Button, Box, Typography, TextField } from "@mui/material";
import { useMsal } from "@azure/msal-react";
import { loginRequest, resetPasswordRequest } from "../authConfig";

const LoginPage = () => {
  const { instance } = useMsal();

  // Local state for username and password inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Error handling state

  // Manual Login: Placeholder for custom validation
  const handleManualLogin = async () => {
    if (!username || !password) {
      setError("Please enter both your email and password.");
      return;
    }

    try {
      console.log("Attempting manual login with:", username);
      // Currently using Azure AD B2C loginHint for username pre-fill
      await instance.loginRedirect({
        ...loginRequest,
        loginHint: username, // Pre-fills username during login
      });
    } catch (e) {
      console.error("Manual Login Error:", e);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  // Password Reset Flow
  const handlePasswordReset = () => {
    try {
      console.log("Redirecting to password reset flow...");
      instance.loginRedirect(resetPasswordRequest).catch((e) => {
        console.error("Password Reset Error:", e);
        setError("Password reset failed. Please try again.");
      });
    } catch (e) {
      setError("Password reset initiation failed.");
    }
  };

  // Azure AD B2C Login Flow
  const handleAzureLogin = () => {
    try {
      console.log("Redirecting to Azure AD B2C login...");
      instance.loginRedirect(loginRequest).catch((e) => {
        console.error("Azure AD B2C Login Error:", e);
        setError("Login failed. Please try again.");
      });
    } catch (e) {
      setError("Azure AD B2C login initiation failed.");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ gap: 2 }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to My Portfolio
      </Typography>
      <Typography variant="body1" mb={2}>
        Log in with your email and password or Azure AD B2C.
      </Typography>

      {/* Username and Password Input Fields */}
      <Box display="flex" flexDirection="column" width="300px" gap={2}>
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>

      {/* Error Message */}
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      {/* Manual Login Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleManualLogin}
        sx={{ mt: 2 }}
      >
        Login with Username & Password
      </Button>

      {/* Password Reset Button */}
      <Button
        variant="outlined"
        color="warning"
        onClick={handlePasswordReset}
        sx={{ mt: 1 }}
      >
        Forgot Password? Reset Here
      </Button>

      {/* Azure AD B2C Login Button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleAzureLogin}
        sx={{ mt: 2 }}
      >
        Login with Azure AD B2C
      </Button>
    </Box>
  );
};

export default LoginPage;
