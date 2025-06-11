import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './navigationSlice';
import vehiclesReducer from './vehiclesSlice';

export const store = configureStore({
  reducer: { vehiclesReducer, navigationReducer },
});

export type GlobalState = ReturnType<typeof store.getState>;
export type GlobalDispatcher = typeof store.dispatch;
