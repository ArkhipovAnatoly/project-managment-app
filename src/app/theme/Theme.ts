import { createTheme, alpha } from '@mui/material';
import { indigo } from '@mui/material/colors';

const appTheme = createTheme({
  palette: {
    white: {
      main: '#fff',
    },
    appBarColor: {
      main: alpha(indigo[400], 1),
      contrastText: '#fff',
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    white: Palette['primary'];
    appBarColor: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    white?: PaletteOptions['primary'];
    appBarColor?: PaletteOptions['primary'];
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
  }
}

export default appTheme;
