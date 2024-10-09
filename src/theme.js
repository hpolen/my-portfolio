// src/theme.js
import { createTheme } from '@mui/material/styles';

// Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3F51B5', // Indigo
      light: '#757de8',
      dark: '#002984',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#9C27B0', // Purple
      light: '#d05ce3',
      dark: '#6a0080',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F0F4F8', // Light blue-grey
      paper: '#FFFFFF', // White
    },
    text: {
      primary: '#333333', // Dark grey
      secondary: '#555555', // Medium grey
    },
    // Custom palette for technology bubbles
    techBubble: {
      React: '#61DAFB',
      'Node.js': '#68A063',
      'Material UI': '#007FFF',
      Redux: '#764ABC',
      TypeScript: '#007ACC',
      GraphQL: '#E10098',
      Webpack: '#8DD6F9',
      Babel: '#F9DC3E',
      Git: '#F05032',
      Docker: '#0db7ed',
      Jest: '#C21325',
      SASS: '#CC6699',
      HTML5: '#E34C26',
      CSS3: '#1572B6',
      'Express.js': '#000000',
      // Add more technologies as needed
    },
  },
  typography: {
    fontFamily: ['"Montserrat"', 'sans-serif'].join(','), // Set Montserrat as the default font
    h2: {
      fontWeight: 700,
      color: '#333333',
    },
    h3: {
      fontWeight: 600,
      color: '#333333',
    },
    h4: {
      fontWeight: 600,
      color: '#333333',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#3F51B5',
          '&:hover': {
            backgroundColor: '#303F9F',
          },
        },
        containedSecondary: {
          backgroundColor: '#9C27B0',
          '&:hover': {
            backgroundColor: '#7B1FA2',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      },
    },
  },
});

export default theme;
