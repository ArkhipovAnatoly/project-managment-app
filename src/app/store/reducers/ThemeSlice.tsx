import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  isBackgroundBlack: boolean;
}

const initialState: ThemeState = {
  isBackgroundBlack: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    isBackground(state, action: PayloadAction<boolean>) {
      state.isBackgroundBlack = action.payload;
    },
  },
});

export default themeSlice.reducer;
