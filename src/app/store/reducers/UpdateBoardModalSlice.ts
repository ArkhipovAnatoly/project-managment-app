import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  open: boolean;
}

const initialState: ModalState = {
  open: false,
};

export const updateBoardModalSlice = createSlice({
  name: 'updateBoardModal',
  initialState,
  reducers: {
    showUpdateBoardModal(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
  },
});

export default updateBoardModalSlice.reducer;
