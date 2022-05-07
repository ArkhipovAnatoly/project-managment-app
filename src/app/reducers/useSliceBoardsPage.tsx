import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface States {
  dataBoardsPage: Array<BoardsPageState> | never;
}

interface Task {
  taskTittle?: string;
  taskOption?: string;
}

export interface BoardsPageState {
  tittle?: string;
  tasks?: Array<Task> | never;
}

const dataBoards = [
  {
    tittle: 'Need to do',
    tasks: [
      {
        taskTittle: 'Task tittle1',
        taskOption: 'Task tittle1',
      },
      {
        taskTittle: 'Task tittle1',
        taskOption: 'Task tittle1',
      },
      {
        taskTittle: 'Task tittle1',
        taskOption: 'Task tittle1',
      },
      {
        taskTittle: 'Task tittle1',
        taskOption: 'Task tittle1',
      },
      {
        taskTittle: 'Task tittle1',
        taskOption: 'Task tittle1',
      },
      {
        taskTittle: 'Task tittle1',
        taskOption: 'Task tittle1',
      },
      {
        taskTittle: 'Task tittle1',
        taskOption: 'Task tittle1',
      },
      {
        taskTittle: 'Task tittle1',
        taskOption: 'Task tittle1',
      },
      {
        taskTittle: 'Task tittle1',
        taskOption: 'Task tittle1',
      },
    ],
  },
  {
    tittle: 'During',
    tasks: [
      {
        taskTittle: 'Task tittle1',
        taskOption: 'Task tittle1',
      },
    ],
  },
  {
    tittle: 'Completed',
    tasks: [],
  },
];

const initialState: States = {
  dataBoardsPage: dataBoards,
};

export const useSliceBoardsPage = createSlice({
  name: 'BoardsPage',
  initialState,
  reducers: {
    addNewColumn: (state, action: PayloadAction<boolean>) => {
      const emptyColumn = {
        tittle: 'Some Text',
        tasks: [],
      };
      state.dataBoardsPage.push(emptyColumn);
    },
    deleteColumn: (state, action: PayloadAction<number>) => {
      const deleteOneElement = 1;
      state.dataBoardsPage.splice(action.payload, deleteOneElement);
    },
  },
});

export default useSliceBoardsPage.reducer;
