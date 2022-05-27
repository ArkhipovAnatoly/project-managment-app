import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface States {
  openModalWindow: boolean;
  nameModalWindow: string;
  indexOfCurrentBoard: string;
  indexOfCurrentColumn: string;
  indexOfCurrentTask: string;
  titleOfCurrentTask?: string;
  DescriptionOfCurrentTask?: string;
}

interface DnDColumn {
  indexDestinationColumn: number;
  indexSourceColumn: number;
}

interface DnDTask {
  destinationColumn: string;
  sourceColumn: string;
  indexDestinationTask: number;
  indexSourceTask: number;
}

const initialState: States = {
  openModalWindow: false,
  nameModalWindow: '',
  indexOfCurrentBoard: localStorage.getItem('idBoard') || '',
  indexOfCurrentColumn: '',
  indexOfCurrentTask: '',
  titleOfCurrentTask: '',
  DescriptionOfCurrentTask: '',
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

    dragAndDropColumn: (state, action: PayloadAction<DnDColumn>) => {
      // const { indexDestinationColumn, indexSourceColumn } = action.payload;
      // const allArrayItem = state.dataBoardsPage;
      // const [reorderedItem] = allArrayItem.splice(indexSourceColumn, 1);
      // allArrayItem.splice(indexDestinationColumn, 0, reorderedItem);
      // state.dataBoardsPage = allArrayItem;
    },
    dragAndDropTask: (state, action: PayloadAction<DnDTask>) => {
      // const { destinationColumn, sourceColumn, indexDestinationTask, indexSourceTask } =
      //   action.payload;
      // const allArrayItem = state.dataBoardsPage;
      // const indexDestinationColumn = allArrayItem.findIndex((item) => {
      //   if (item.id === destinationColumn) {
      //     return true;
      //   }
      // });
      // const indexSourceColumn = allArrayItem.findIndex((item) => {
      //   if (item.id === sourceColumn) {
      //     return true;
      //   }
      // });
      // const [deletedItem] = allArrayItem[indexSourceColumn].tasks?.splice(indexSourceTask, 1);
      // allArrayItem[indexDestinationColumn].tasks.splice(indexDestinationTask, 0, deletedItem);
      // state.dataBoardsPage = allArrayItem;
    },
  },
});

export default useSliceBoardsPage.reducer;
