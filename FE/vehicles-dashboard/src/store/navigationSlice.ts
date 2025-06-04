import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { NavigationItem } from '../types';

type NavigationState = {
  items: NavigationItem[];
};

const initialState: NavigationState = {
  items: [],
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavigationItems(state, action: PayloadAction<NavigationItem[]>) {
      state.items = action.payload || [];
    },
  },
});

export const { setNavigationItems } = navigationSlice.actions;
export default navigationSlice.reducer;
