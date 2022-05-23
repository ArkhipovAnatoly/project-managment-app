import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  open: boolean;
}

const initialState: ModalState = {
  open: false,
};

export const createBoardModalSlice = createSlice({
  name: 'createBoardModal',
  initialState,
  reducers: {
    showCreateBoardModal(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
  },
});

export default createBoardModalSlice.reducer;
