import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  open: boolean;
}

const initialState: ModalState = {
  open: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
  },
});

export default modalSlice.reducer;
