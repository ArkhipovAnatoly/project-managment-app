import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalData = {
  open: boolean;
  what: string;
};

interface ModalState {
  open: boolean;
  what: string;
}

const initialState: ModalState = {
  open: false,
  what: '',
};

export const confirmModalSlice = createSlice({
  name: 'confirmModal',
  initialState,
  reducers: {
    showConfirmModal(state, action: PayloadAction<ModalData>) {
      state.open = action.payload.open;
      state.what = action.payload.what;
    },
  },
});

export default confirmModalSlice.reducer;
