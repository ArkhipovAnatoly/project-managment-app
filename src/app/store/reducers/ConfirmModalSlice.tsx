import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  open: boolean;
}

const initialState: ModalState = {
  open: false,
};

export const confirmModalSlice = createSlice({
  name: 'confirmModal',
  initialState,
  reducers: {
    showConfirmModal(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
  },
});

export default confirmModalSlice.reducer;
