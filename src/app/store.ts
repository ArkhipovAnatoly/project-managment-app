import { configureStore, combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({});

const storeConfig = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
export const store = storeConfig();
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof storeConfig>;
export type AppDispatch = AppStore['dispatch'];
