import { createTheme, alpha, PaletteMode } from '@mui/material';
import { amber, indigo } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Palette {
    appBarColor: Palette['primary'];
    appBarColorScroll: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    appBarColor?: PaletteOptions['primary'];
    appBarColorScroll?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    appBarColor: true;
    appBarColorScroll: true;
  }
}

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
            main: amber[900],
            contrastText: '#fff',
          },
          background: {
            default: '#151719',
          },
          primary: {
            main: indigo[500],
            dark: indigo[700],
          },
          secondary: {
            main: '#26c6da',
            contrastText: '#fff',
          },
          text: {
            primary: '#fff',
          },
        }
      : {}),
  },
});

export { breakpointsTheme, getDesignTokens };
