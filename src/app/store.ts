import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userAPI } from '../services/UserService';
import boardsPage from './reducers/useSliceBoardsPage';

const rootReducer = combineReducers({
  [userAPI.reducerPath]: userAPI.reducer,
  boardsPage,
});

const storeConfig = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware),
  });
};
export const store = storeConfig();
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof storeConfig>;
export type AppDispatch = AppStore['dispatch'];
