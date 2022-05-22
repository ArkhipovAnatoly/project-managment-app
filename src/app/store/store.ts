import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userAPI } from '../../services/UserService';
import userAuthReducer from './reducers/UserAuthSlice';
import confirmModalReducer from './reducers/ConfirmModalSlice';
import createBoardModalReducer from './reducers/CreateBoardModalSlice';
import themeReducer from './reducers/ThemeSlice';
import boardsPage from './reducers/useSliceBoardsPage';
import mainPage from './reducers/useSliceMainPage';

const rootReducer = combineReducers({
  userAuthReducer,
  confirmModalReducer,
  createBoardModalReducer,
  themeReducer,
  boardsPage,
  mainPage,
  [userAPI.reducerPath]: userAPI.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware),
  });
};
export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
