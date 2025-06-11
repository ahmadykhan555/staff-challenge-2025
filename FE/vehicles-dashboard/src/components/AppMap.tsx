import { Marker, Popup, useMap } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import 'leaflet/dist/leaflet.css';

const GLOBAL_MAP_CENTER: LatLngExpression = [53.5511, 9.9937];

import type { LatLngBoundsExpression, LatLngExpression, Marker as MarkerType } from 'leaflet';
import { useEffect, useRef } from 'react';
import type { VehicleType } from '../types';
import { markerForVehicleType, setMapBounds, setMapCenter } from '../services/maps';
import { isEqual } from 'lodash';

type MapMarker = {
  coordinates: LatLngExpression;
  text?: string;
  type: VehicleType;
};

const AppMap: React.FC<{
  markers: MapMarker[];
  center?: LatLngExpression;
  bounds?: LatLngBoundsExpression;
  onMarkerClicked: (coordinates: LatLngExpression) => void;
}> = ({ markers, center, bounds, onMarkerClicked }) => {
  const markerRef = useRef<MarkerType>(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [center]);

  return (
    <>
      <MapContainer
        zoomAnimation
        center={GLOBAL_MAP_CENTER}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        />

        {markers.map((marker) => (
          <Marker
            ref={isEqual(marker.coordinates, center) ? markerRef : undefined}
            key={marker.coordinates.toString()}
            position={marker.coordinates}
            eventHandlers={{
              click: () => onMarkerClicked(marker.coordinates),
            }}
            icon={markerForVehicleType(marker.type)}
          >
            {marker.text && (
              <Popup autoClose={true} closeOnClick={true}>
                {marker.text}
              </Popup>
            )}
          </Marker>
        ))}

        <DynamicMapCenter center={center ?? GLOBAL_MAP_CENTER} />
        {bounds && <DynamicMapBounds bounds={bounds} />}
      </MapContainer>
    </>
  );
};

// Internal component
const DynamicMapCenter: React.FC<{ center: LatLngExpression }> = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    setMapCenter(map, { center });
  }, [center, map]);

  return <></>;
};

const DynamicMapBounds: React.FC<{ bounds: LatLngBoundsExpression }> = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    setMapBounds(map, { bounds });
  }, [bounds, map]);

  return <></>;
};

export default AppMap;
