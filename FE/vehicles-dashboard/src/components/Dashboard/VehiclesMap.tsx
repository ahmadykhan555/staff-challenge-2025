import L from 'leaflet';
import type { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxStore';
import AppMap from '../AppMap';
import { isEqual } from 'lodash';
import { setSelectedVehicle } from '../../store/vehiclesSlice';
import { useEffect, useState } from 'react';

const VehiclesMap: React.FC = () => {
  const { selectedVehicle, vehiclesForCurrentPage } = useAppSelector((state) => ({
    selectedVehicle: state.vehiclesReducer.selectedVehicle,
    vehiclesForCurrentPage: state.vehiclesReducer.vehiclesForCurrentPage,
  }));

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

  return (
    <div
      className={`max-md:h-1/2 md:!h-1/3 w-full xl:container md:mx-auto rounded-lg overflow-hidden border`}
    >
      <AppMap
        center={selectedVehicle?.coordinates}
        markers={vehiclesForCurrentPage.map((vehicle) => ({
          coordinates: vehicle.coordinates,
          text: vehicle.licencePlate,
          type: vehicle.type,
        }))}
        bounds={mapBounds}
        onMarkerClicked={(markerCoordinates) => handleSelectedMarker(markerCoordinates)}
      />
    </div>
  );
};

export default VehiclesMap;
