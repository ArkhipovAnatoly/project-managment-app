import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface States {
  dataBoardsPage: Array<BoardsPageState> | never[];
}

interface Task {
  taskTittle?: string;
  taskOption?: string;
}

export interface BoardsPageState {
  tittle?: string;
  tasks?: Array<Task> | never[];
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
    tittle: 'Ready',
    tasks: [
      {
        taskTittle: 'Task tittle1',
        taskOption: 'Task tittle1',
      },
    ],
  },
  {
    tittle: 'Ready',
    tasks: [
      {
        taskTittle: 'Task tittle1',
        taskOption: 'Task tittle1',
      },
    ],
  },
  {
    tittle: 'Ready',
    tasks: [
      {
        taskTittle: 'Task tittle1',
        taskOption: 'Task tittle1',
      },
    ],
  },
];

const initialState: States = {
  dataBoardsPage: dataBoards,
};

export const useSliceBoardsPage = createSlice({
  name: 'BoardsPage',
  initialState,
  reducers: {
    // useExample: (state, action: PayloadAction<boolean>) => {
    //   state.dataBoardsPage.isLoaded = action.payload;
    // },
  },
});

export default useSliceBoardsPage.reducer;
