import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface States {
  dataBoardsPage: Array<BoardsPageState> | never;
  openModalWindow: boolean;
  nameModalWindow: string;
  idxOfColumnForNewTask: string;
}

interface Task {
  taskTittle?: string;
  taskOption?: string;
}

export interface BoardsPageState {
  tittle?: string;
  tasks?: Array<Task> | never;
}

interface AddNewTask {
  index: string;
  taskTittle?: string;
  taskOption?: string;
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
  openModalWindow: false,
  nameModalWindow: '',
  idxOfColumnForNewTask: '',
};

export const useSliceBoardsPage = createSlice({
  name: 'BoardsPage',
  initialState,
  reducers: {
    addNewColumn: (state, action: PayloadAction<string>) => {
      const emptyColumn = {
        tittle: action.payload,
        tasks: [],
      };
      state.dataBoardsPage.push(emptyColumn);
    },
    addNewTask: (state, action: PayloadAction<AddNewTask>) => {
      const task = {
        taskTittle: action.payload.taskTittle,
        taskOption: action.payload.taskOption,
      };
      state.dataBoardsPage[Number(action.payload.index)].tasks?.push(task);
    },
    changeIdxOfColumnForNewTask: (state, action: PayloadAction<string>) => {
      state.idxOfColumnForNewTask = action.payload;
    },
    deleteColumn: (state, action: PayloadAction<number>) => {
      const deleteOneElement = 1;
      state.dataBoardsPage.splice(action.payload, deleteOneElement);
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
