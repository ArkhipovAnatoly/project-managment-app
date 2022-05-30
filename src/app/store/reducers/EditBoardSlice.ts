import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardData } from '../../../types';

interface ModalState {
  dataBoard: BoardData;
}

const initialState: ModalState = {
  dataBoard: {
    id: localStorage.getItem('idBoard') || '',
    title: '',
    description: '',
  },
};

export const editBoardSlice = createSlice({
  name: 'editBoard',
  initialState,
  reducers: {
    setBoardData(state, action: PayloadAction<BoardData>) {
      state.dataBoard = { ...state.dataBoard, ...action.payload };
    },
  },
});

export default editBoardSlice.reducer;
