import { PaletteMode } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppTheme {
  mode: PaletteMode;
}

const initialState: AppTheme = {
  mode: 'dark',
};

export const themeSlice = createSlice({
  name: 'appTheme',
  initialState,
  reducers: {
    setTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export default themeSlice.reducer;
