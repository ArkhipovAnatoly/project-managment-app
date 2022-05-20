import { createTheme, PaletteMode } from '@mui/material';
import { amber, blue, indigo } from '@mui/material/colors';

const breakpointsTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 420,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          warning: {
            main: amber[700],
            contrastText: '#fff',
          },

          background: {
            default: '#151719',
          },

          primary: {
            main: indigo[800],
            dark: indigo[900],
            contrastText: '#fff',
          },
          secondary: {
            main: '#26c6da',
            contrastText: '#fff',
          },
          text: {
            primary: '#fff',
          },
        }
      : {
          primary: {
            main: blue[400],
            dark: blue[500],
            contrastText: '#fff',
          },
          background: {
            default: '#fff',
          },
          text: {
            primary: '#000',
          },
        }),
  },
});

export { breakpointsTheme, getDesignTokens };
