import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface States {
  dataMainPage: Array<MainPageState> | never;
  openModalWindow: boolean;
  nameModalWindow: string;
  indexOfCurrentColumn: string;
  indexOfCurrentBoard: string;
  tittleOfCurrentBoard?: string;
  DescriptionOfCurrentBoard?: string;
}

interface Board {
  boardTittle?: string;
  boardDescription?: string;
}

export interface MainPageState {
  tittle?: string;
  boards?: Array<Board> | never;
}

interface AddNew {
  index: string;
  boardTittle?: string;
  boardOption?: string;
}

interface ChangeBoard {
  indexColumn: string;
  indexBoard: string;
  boardTittle?: string;
  boardDescription?: string;
}

interface ChangeColumn {
  indexColumn: string;
  columnTittle?: string;
}

const dataBoards = [
  {
    tittle: 'Board',
    boards: [
      {
        boardTittle: 'Board tittle',
        boardDescription: 'Board Description',
      },
    ],
  },
];

const initialState: States = {
  dataMainPage: dataBoards,
  openModalWindow: false,
  nameModalWindow: '',
  indexOfCurrentColumn: '',
  indexOfCurrentBoard: '',
  tittleOfCurrentBoard: '',
  DescriptionOfCurrentBoard: '',
};

export const useSliceMainPage = createSlice({
  name: 'MainPage',
  initialState,
  reducers: {
    changeIndexOfCurrentColumn: (state, action: PayloadAction<string>) => {
      state.indexOfCurrentBoard = action.payload;
    },

    changeIndexOfCurrentBoard: (state, action: PayloadAction<string>) => {
      state.indexOfCurrentBoard = action.payload;
    },

    addNewBoard: (state, action: PayloadAction<string>) => {
      const emptyBoard = {
        tittle: action.payload,
        boards: [],
      };
      state.dataMainPage.push(emptyBoard);
    },

    addNew: (state, action: PayloadAction<AddNew>) => {
      const board = {
        boardTittle: action.payload.boardTittle,
        boardOption: action.payload.boardOption,
      };
      state.dataMainPage[Number(action.payload.index)].boards?.push(board);
    },

    deleteBoard: (state, action: PayloadAction<number>) => {
      const deleteOneElement = 1;
      state.dataMainPage.splice(action.payload, deleteOneElement);
    },

    changeBoard: (state, action: PayloadAction<ChangeBoard>) => {
      const changedBoard = {
        boardTittle: action.payload.boardTittle,
        boardDescription: action.payload.boardDescription,
      };
      const deleteOneElement = 1;
      const indexForColumn = Number(action.payload.indexColumn);
      const indexForBoard = Number(action.payload.indexBoard);
      state.dataMainPage[indexForColumn].boards?.splice(
        indexForBoard,
        deleteOneElement,
        changedBoard
      );
    },

    changeTitleOfCurrentBoard: (state) => {
      const column = Number(state.indexOfCurrentBoard);
      const board = Number(state.indexOfCurrentBoard);
      const allBoardsOfThisColumn = state.dataMainPage[column].boards;
      state.tittleOfCurrentBoard =
        allBoardsOfThisColumn !== undefined ? allBoardsOfThisColumn[board].boardTittle : '';
      state.DescriptionOfCurrentBoard =
        allBoardsOfThisColumn !== undefined ? allBoardsOfThisColumn[board].boardDescription : '';
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
