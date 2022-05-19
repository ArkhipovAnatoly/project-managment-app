import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userAPI } from '../../services/UserService';
import userAuthReducer from './reducers/UserAuthSlice';
import modalReducer from './reducers/ModalSlice';
import boardsPage from './reducers/useSliceBoardsPage';
import mainPage from './reducers/useSliceMainPage';

const rootReducer = combineReducers({
  userAuthReducer,
  modalReducer,
  [userAPI.reducerPath]: userAPI.reducer,
  boardsPage,
  mainPage,
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
