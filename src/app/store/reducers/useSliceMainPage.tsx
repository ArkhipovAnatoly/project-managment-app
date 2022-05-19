import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface States {
  dataMainPage: Array<MainPageState> | never;
  openModalWindow: boolean;
  nameModalWindow: string;
  indexOfCurrentBoard: string;
  tittleOfCurrentBoard?: string;
  DescriptionOfCurrentBoard?: string;
}

export interface MainPageState {
  tittle?: string;
  boardDescription?: string;
}

interface AddNew {
  index: string;
  boardTittle?: string;
  boardDescription?: string;
}

const dataBoards = [
  {
    tittle: 'Board',
    boardDescription: 'Board Description',
  },
];

const initialState: States = {
  dataMainPage: dataBoards,
  openModalWindow: false,
  nameModalWindow: '',
  indexOfCurrentBoard: '',
  tittleOfCurrentBoard: '',
  DescriptionOfCurrentBoard: '',
};

export const useSliceMainPage = createSlice({
  name: 'MainPage',
  initialState,
  reducers: {
    changeIndexOfCurrentBoard: (state, action: PayloadAction<string>) => {
      state.indexOfCurrentBoard = action.payload;
    },

    addNewBoard: (state, action: PayloadAction<AddNew>) => {
      const emptyBoard = {
        tittle: action.payload.boardTittle,
        boardDescription: action.payload.boardDescription,
      };
      state.dataMainPage.push(emptyBoard);
    },

    deleteBoard: (state, action: PayloadAction<AddNew>) => {
      const deleteOneElement = 1;
      const indexForTask = Number(action.payload.index);
      state.dataMainPage.splice(indexForTask, deleteOneElement);
    },

    openModalWindow: (state, action: PayloadAction<boolean>) => {
      state.openModalWindow = action.payload;
    },

    addNameForModalWindow: (state, action: PayloadAction<string>) => {
      state.nameModalWindow = action.payload;
    },
  },
});

export default useSliceMainPage.reducer;
