// client/src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light', // switch to 'dark' if you prefer
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f7fa', // a light gray background
      paper: '#ffffff',   // pure white for cards, etc.
    },
    text: {
      primary: '#0d0d0d', // dark text
      secondary: '#565656',
    },
  },
  typography: {
    fontFamily: ['"Open Sans"', 'Roboto', 'Arial', 'sans-serif'].join(','),
  },
});

export default theme;
