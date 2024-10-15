// src/authConfig.js

const isProduction = process.env.NODE_ENV === 'production';

export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID, // From .env
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`, // From .env
    redirectUri: isProduction ? "https://www.harry-polen.com" : process.env.REACT_APP_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ["openid", "profile", "User.Read"],
};
