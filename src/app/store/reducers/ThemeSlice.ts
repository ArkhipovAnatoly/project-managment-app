import { PaletteMode } from '@mui/material';
import { createSlice } from '@reduxjs/toolkit';

interface AppTheme {
  mode: PaletteMode;
}

const initialState: AppTheme = {
  mode: 'light',
};

export const themeSlice = createSlice({
  name: 'appTheme',
  initialState,
  reducers: {
    setTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.mode);
    },
  },
});

export default themeSlice.reducer;
