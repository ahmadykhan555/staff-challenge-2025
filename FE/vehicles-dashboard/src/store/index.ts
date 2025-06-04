import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './navigationSlice';

export const store = configureStore({
  reducer: { navigationReducer },
});

export type GlobalState = ReturnType<typeof store.getState>;
export type GlobalDispatcher = typeof store.dispatch;
