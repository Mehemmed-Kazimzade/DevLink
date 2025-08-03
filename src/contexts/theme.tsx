// theme.ts
import { createTheme } from '@mui/material/styles';

const getTheme = (mode: string) => {
  return createTheme({
    palette: {
      mode: mode as 'light' | 'dark',

      primary: {
        main: '#8B5CF6', // vibrant purple accent
        contrastText: '#FFFFFF',
      },

      secondary: {
        main: '#06B6D4', // teal highlight
        contrastText: '#FFFFFF',
      },

      background: {
        default: mode === 'dark' ? '#111827' : '#FFFFFF', // page bg
        paper: mode === 'dark' ? '#1F2937' : '#F9FAFB',   // card bg
        editor: mode === 'dark' ? '#374151' : '#E5E7EB'
      },

      text: {
        primary: mode === 'dark' ? '#F9FAFB' : '#111827', // near black
        secondary: mode === 'dark' ? '#9CA3AF' : '#374151', // muted gray
      },
    },

    typography: {
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
      fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    },

    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });
};

export default getTheme;
    
