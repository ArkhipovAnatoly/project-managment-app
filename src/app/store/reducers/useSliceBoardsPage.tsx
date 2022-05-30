import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface States {
  openModalWindow: boolean;
  nameModalWindow: string;
  indexOfCurrentBoard: string;
  indexOfCurrentColumn: string;
  indexOfCurrentTask: string;
  valueForTitleToSaveCheckbox: string;
}

const initialState: States = {
  openModalWindow: false,
  nameModalWindow: '',
  indexOfCurrentBoard: localStorage.getItem('idBoard') || '',
  indexOfCurrentColumn: '',
  indexOfCurrentTask: '',
  valueForTitleToSaveCheckbox: '^^^&&&?{0907}?&&&^^^',
};

export const useSliceBoardsPage = createSlice({
  name: 'BoardsPage',
  initialState,
  reducers: {
    changeIndexOfCurrentBoard: (state, action: PayloadAction<string>) => {
      state.indexOfCurrentBoard = action.payload;
    },

    changeIndexOfCurrentColumn: (state, action: PayloadAction<string>) => {
      state.indexOfCurrentColumn = action.payload;
    },

    changeIndexOfCurrentTask: (state, action: PayloadAction<string>) => {
      state.indexOfCurrentTask = action.payload;
    },

    openModalWindow: (state, action: PayloadAction<boolean>) => {
      state.openModalWindow = action.payload;
    },

    addNameForModalWindow: (state, action: PayloadAction<string>) => {
      state.nameModalWindow = action.payload;
    },
  },
});

export default useSliceBoardsPage.reducer;
