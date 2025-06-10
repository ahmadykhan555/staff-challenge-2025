import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { VehiclesState, Vehicle } from '../types/vehicle';

const initialState: VehiclesState = {
  list: [],
  selectedVehicle: null,
};

const vehicleSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setVehiclesList(state, action: PayloadAction<Vehicle[]>) {
      state.list = action.payload || [];
    },
    setSelectedVehicle(state, action: PayloadAction<Vehicle>) {
      state.selectedVehicle = action.payload;
    },
  },
});

export const { setSelectedVehicle, setVehiclesList } = vehicleSlice.actions;
export default vehicleSlice.reducer;
