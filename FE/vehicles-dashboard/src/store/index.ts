import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './navigationSlice';
import vehiclesSlice from './vehiclesSlice';

export const store = configureStore({
  reducer: { navigationReducer, vehiclesSlice },
});

export type GlobalState = ReturnType<typeof store.getState>;
export type GlobalDispatcher = typeof store.dispatch;
