import { createTheme, alpha } from '@mui/material';
import {} from '@mui/material/colors';

const headerTheme = createTheme({
  palette: {
    white: {
      main: '#fff',
    },
    appBarColor: {
      main: alpha('#151719', 1),
      contrastText: '#fff',
    },
    appBarColorScroll: {
      main: alpha('#151719', 0.5),
      contrastText: '#fff',
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    white: Palette['primary'];
    appBarColor: Palette['primary'];
    appBarColorScroll: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    white?: PaletteOptions['primary'];
    appBarColor?: PaletteOptions['primary'];
    appBarColorScroll?: PaletteOptions['primary'];
  }
}

// Update the ButtonGroup's color prop options
declare module '@mui/material/ButtonGroup' {
  interface ButtonGroupPropsColorOverrides {
    white: true;
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

export { headerTheme, breakpointsTheme };
