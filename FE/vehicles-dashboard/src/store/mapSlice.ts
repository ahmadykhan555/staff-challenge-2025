import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MapState } from '../types';
import type { LatLngExpression } from 'leaflet';

const initialState: MapState = {
  bounds: undefined,
  center: [0, 0],
  selectedMarkerCoordinates: [0, 0],
  zoomLevel: 15,
};

// can be used if Map State is needed globally
const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMapCenter(state, action: PayloadAction<LatLngExpression>) {
      state.center = action.payload || [];
    },
    setSelectedMarkerCoordinates(state, action: PayloadAction<LatLngExpression>) {
      state.selectedMarkerCoordinates = action.payload;
    },
  },
});

export const { setMapCenter, setSelectedMarkerCoordinates } = mapSlice.actions;
export default mapSlice.reducer;
