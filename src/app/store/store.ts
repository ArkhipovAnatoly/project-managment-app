import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userAPI } from '../../services/UserService';
import userAuthReducer from './reducers/UserAuthSlice';
import confirmModalReducer from './reducers/ConfirmModalSlice';
import createBoardModalReducer from './reducers/CreateBoardModalSlice';
import updateBoardModalReducer from './reducers/UpdateBoardModalSlice';
import themeReducer from './reducers/ThemeSlice';
import boardsPage from './reducers/useSliceBoardsPage';
import mainPage from './reducers/useSliceMainPage';
import editBoardReducer from './reducers/EditBoardSlice';
import { boardAPI } from '../../services/BoardService';
import { columnAPI } from '../../services/ColumnService';
import { taskAPI } from '../../services/TaskService';

const rootReducer = combineReducers({
  userAuthReducer,
  confirmModalReducer,
  createBoardModalReducer,
  updateBoardModalReducer,
  editBoardReducer,
  themeReducer,
  boardsPage,
  mainPage,
  [userAPI.reducerPath]: userAPI.reducer,
  [boardAPI.reducerPath]: boardAPI.reducer,
  [columnAPI.reducerPath]: columnAPI.reducer,
  [taskAPI.reducerPath]: taskAPI.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        userAPI.middleware,
        boardAPI.middleware,
        columnAPI.middleware,
        taskAPI.middleware,
      ]),
  });
};
export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
