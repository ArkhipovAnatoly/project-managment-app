import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userAPI } from '../services/UserService';

const rootReducer = combineReducers({
  [userAPI.reducerPath]: userAPI.reducer,
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
