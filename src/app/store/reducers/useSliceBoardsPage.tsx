import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface States {
  dataBoardsPage: Array<BoardsPageState> | never;
  openModalWindow: boolean;
  nameModalWindow: string;
  indexOfCurrentColumn: string;
  indexOfCurrentTask: string;
  titleOfCurrentTask?: string;
  DescriptionOfCurrentTask?: string;
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

interface ChangeTask {
  indexColumn: string;
  indexTask: string;
  taskTittle?: string;
  taskOption?: string;
}
interface ChangeColumn {
  indexColumn: string;
  columnTittle?: string;
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
  indexOfCurrentColumn: '',
  indexOfCurrentTask: '',
  titleOfCurrentTask: '',
  DescriptionOfCurrentTask: '',
};

export const useSliceBoardsPage = createSlice({
  name: 'BoardsPage',
  initialState,
  reducers: {
    changeIndexOfCurrentColumn: (state, action: PayloadAction<string>) => {
      state.indexOfCurrentColumn = action.payload;
    },

    changeIndexOfCurrentTask: (state, action: PayloadAction<string>) => {
      state.indexOfCurrentTask = action.payload;
    },

    addNewColumn: (state, action: PayloadAction<string>) => {
      const emptyColumn = {
        tittle: action.payload,
        tasks: [],
      };
      state.dataBoardsPage.push(emptyColumn);
    },

    // changeTitleOfCurrentColumn: (state, action: PayloadAction<ChangeColumn>) => {
    //   state.titleOfCurrentColumn = action.payload.columnTittle;
    //   state.dataBoardsPage[Number(action.payload.indexColumn)].tittle = action.payload.columnTittle;
    // },

    deleteColumn: (state, action: PayloadAction<number>) => {
      const deleteOneElement = 1;
      state.dataBoardsPage.splice(action.payload, deleteOneElement);
    },

    addNewTask: (state, action: PayloadAction<AddNewTask>) => {
      const task = {
        taskTittle: action.payload.taskTittle,
        taskOption: action.payload.taskOption,
      };
      state.dataBoardsPage[Number(action.payload.index)].tasks?.push(task);
    },

    deleteTask: (state, action: PayloadAction<ChangeTask>) => {
      const deleteOneElement = 1;
      const indexForColumn = Number(action.payload.indexColumn);
      const indexForTask = Number(action.payload.indexTask);
      state.dataBoardsPage[indexForColumn].tasks?.splice(indexForTask, deleteOneElement);
    },

    changeTask: (state, action: PayloadAction<ChangeTask>) => {
      const changedTask = {
        taskTittle: action.payload.taskTittle,
        taskOption: action.payload.taskOption,
      };
      const deleteOneElement = 1;
      const indexForColumn = Number(action.payload.indexColumn);
      const indexForTask = Number(action.payload.indexTask);
      state.dataBoardsPage[indexForColumn].tasks?.splice(
        indexForTask,
        deleteOneElement,
        changedTask
      );
    },

    changeTitleOfCurrentTask: (state) => {
      const column = Number(state.indexOfCurrentColumn);
      const task = Number(state.indexOfCurrentTask);
      const allTasksOfThisColumn = state.dataBoardsPage[column].tasks;
      state.titleOfCurrentTask =
        allTasksOfThisColumn !== undefined ? allTasksOfThisColumn[task].taskTittle : '';
      state.DescriptionOfCurrentTask =
        allTasksOfThisColumn !== undefined ? allTasksOfThisColumn[task].taskOption : '';
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
