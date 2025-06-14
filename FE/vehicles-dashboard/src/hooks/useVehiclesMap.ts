import type { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import { useAppDispatch, useAppSelector } from './useReduxStore';
import { isEqual } from 'lodash';
import { setSelectedVehicle } from '../store/vehiclesSlice';
import { useEffect, useState } from 'react';
import L from 'leaflet';

export default function useVehiclesMap() {
  const { selectedVehicle, vehiclesForCurrentPage } = useAppSelector(
    (state) => state.vehiclesReducer
  );

  const dispatch = useAppDispatch();
  const handleSelectedMarker = (coordinates: LatLngExpression) => {
    const matchingVehicle = vehiclesForCurrentPage.find((vehicle) =>
      isEqual(coordinates, vehicle.coordinates)
    );
    if (matchingVehicle) {
      dispatch(setSelectedVehicle(matchingVehicle));
    }
  };

  const [mapBounds, setMapBounds] = useState<LatLngBoundsExpression>();

  useEffect(() => {
    if (vehiclesForCurrentPage.length) {
      setMapBounds(L.latLngBounds(vehiclesForCurrentPage.map((v) => v.coordinates)));
    }
  }, [vehiclesForCurrentPage]);

  return {
    selectedVehicle,
    vehiclesForCurrentPage,
    mapBounds,
    handleSelectedMarker,
  };
}
