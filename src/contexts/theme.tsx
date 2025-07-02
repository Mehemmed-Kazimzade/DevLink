// theme.ts
import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(27, 27, 27)',
    },

    secondary: {
      main: 'rgb(94, 92, 92)',
    },

    error: {
      main: '#d32f2f',
    },

    action: {
      active: "#388636",
    }

  },

  typography: {
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },

  // Optional: custom breakpoints
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

export default theme;