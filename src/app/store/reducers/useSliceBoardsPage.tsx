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
  id: string;
  taskTittle?: string;
  taskOption?: string;
}

export interface BoardsPageState {
  id: string;
  tittle?: string;
  tasks: Array<Task> | never;
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

const dataBoards = [
  {
    id: 'asdq23rawdjfn23uhruwnerji',
    tittle: 'Need to do',
    tasks: [
      {
        id: 'askdhwuegr23bh54uy2g3rhb23uyr',
        taskTittle: 'Task tittle1',
        taskOption: 'Task tittle1',
      },
      {
        id: 'sdcxmfernfejrhtu34y634rth34uih52i3jnre',
        taskTittle: 'Task tittle1',
        taskOption: 'Task tittle1',
      },
      {
        id: 'dfg34tjn34fbqwjerui23hiruhl23jrbh',
        taskTittle: 'Task tittle1',
        taskOption: 'Task tittle1',
      },
      {
        id: '123412jkn4rwdokaoiscjszklcmweuhfiwj',
        taskTittle: 'Task tittle1',
        taskOption: 'Task tittle1',
      },
    ],
  },
  {
    id: 'asfaw3rxcnvxcnv67867ikjhk67',
    tittle: 'During',
    tasks: [
      {
        id: '2354nl2j3bh54jhi23uk54hk23ber2by3y',
        taskTittle: 'Task tittle1',
        taskOption: 'Task tittle1',
      },
    ],
  },
  {
    id: 'xzcw45345y56he5n6456hnwe45b',
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
        id: Date.now().toString(),
        tittle: action.payload,
        tasks: [],
      };
      state.dataBoardsPage.push(emptyColumn);
    },

    changeTitleOfCurrentColumn: (state, action: PayloadAction<ChangeColumn>) => {
      state.dataBoardsPage[Number(action.payload.indexColumn)].tittle = action.payload.columnTittle;
    },

    deleteColumn: (state, action: PayloadAction<number>) => {
      const deleteOneElement = 1;
      state.dataBoardsPage.splice(action.payload, deleteOneElement);
    },

    addNewTask: (state, action: PayloadAction<AddNewTask>) => {
      const task = {
        id: Date.now().toString(),
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
        id: Date.now().toString(),
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

    dragAndDropColumn: (state, action: PayloadAction<DnDColumn>) => {
      const { indexDestinationColumn, indexSourceColumn } = action.payload;
      const allArrayItem = state.dataBoardsPage;
      const [reorderedItem] = allArrayItem.splice(indexSourceColumn, 1);
      allArrayItem.splice(indexDestinationColumn, 0, reorderedItem);
      state.dataBoardsPage = allArrayItem;
    },
    dragAndDropTask: (state, action: PayloadAction<DnDTask>) => {
      const { destinationColumn, sourceColumn, indexDestinationTask, indexSourceTask } =
        action.payload;
      const allArrayItem = state.dataBoardsPage;
      const indexDestinationColumn = allArrayItem.findIndex((item) => {
        if (item.id === destinationColumn) {
          return true;
        }
      });
      const indexSourceColumn = allArrayItem.findIndex((item) => {
        if (item.id === sourceColumn) {
          return true;
        }
      });
      const [deletedItem] = allArrayItem[indexSourceColumn].tasks?.splice(indexSourceTask, 1);
      allArrayItem[indexDestinationColumn].tasks.splice(indexDestinationTask, 0, deletedItem);
      state.dataBoardsPage = allArrayItem;
    },
  },
});

export default useSliceBoardsPage.reducer;
