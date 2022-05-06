import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface States {
  dataBoardsPage: BoardsPageState;
}

export interface BoardsPageState {
  isLoaded: boolean;
}

const dataBoards = {
  isLoaded: false,
};

const initialState: States = {
  dataBoardsPage: dataBoards,
};

export const useSliceBoardsPage = createSlice({
  name: 'BoardsPage',
  initialState,
  reducers: {
    useExample: (state, action: PayloadAction<boolean>) => {
      state.dataBoardsPage.isLoaded = action.payload;
    },
  },
});

export default useSliceBoardsPage.reducer;
