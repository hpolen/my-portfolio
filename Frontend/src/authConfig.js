// src/authConfig.js

const isProduction = process.env.NODE_ENV === 'production';

export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID, // From .env
    authority: `https://harrypolen.b2clogin.com/harrypolen.onmicrosoft.com/B2C_1_signin`, // B2C tenant and sign-in user flow
    redirectUri: isProduction ? "https://www.harry-polen.com" : process.env.REACT_APP_REDIRECT_URI,
    knownAuthorities: ["harrypolen.b2clogin.com"], // B2C domain
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["openid", "profile", "email"], // Scopes for B2C
};

export const resetPasswordRequest = {
  authority: `https://harrypolen.b2clogin.com/harrypolen.onmicrosoft.com/B2C_1_PasswordReset`, // Password reset user flow
  scopes: ["openid"], // Scopes for password reset
};
