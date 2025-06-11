import AppMap from '../AppMap';
import useVehiclesMap from '../../hooks/useVehiclesMap';

const VehiclesMap: React.FC = () => {
  const { handleSelectedMarker, mapBounds, selectedVehicle, vehiclesForCurrentPage } =
    useVehiclesMap();

  return (
    <div
      className={`max-md:h-1/2 md:!h-1/3 w-full xl:container md:mx-auto rounded-lg overflow-hidden border`}
    >
      <AppMap
        center={selectedVehicle?.coordinates}
        markers={vehiclesForCurrentPage.map((vehicle) => ({
          coordinates: vehicle.coordinates,
          text: vehicle.licensePlate,
          type: vehicle.type,
        }))}
        bounds={mapBounds}
        onMarkerClicked={(markerCoordinates) => handleSelectedMarker(markerCoordinates)}
      />
    </div>
  );
};

export default VehiclesMap;
