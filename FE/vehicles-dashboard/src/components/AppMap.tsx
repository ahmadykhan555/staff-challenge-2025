import { Marker, Popup, useMap } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import L from 'leaflet';
import FreeNowCarIcon from './../assets/icons/map/free-now-car.svg';
import ShareNowCarIcon from './../assets/icons/map/share-now-car.svg';
import 'leaflet/dist/leaflet.css';

const GLOBAL_MAP_CENTER: LatLngExpression = [53.5511, 9.9937];

import type { LatLngBoundsExpression, LatLngExpression, PointExpression } from 'leaflet';
import { useEffect } from 'react';
import type { CarType } from '../types';

const freeNowCarIcon = L.icon({
  iconUrl: FreeNowCarIcon, // or use import if bundling
  iconSize: [48, 48], // [width, height] in pixels
  iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
});

const shareNowCarIcon = L.icon({
  iconUrl: ShareNowCarIcon,
  iconSize: [48, 48], // [width, height] in pixels
  iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
});

type MapMarker = {
  coordinates: LatLngExpression;
  text?: string;
  type: CarType;
};

const AppMap: React.FC<{
  markers: MapMarker[];
  center?: LatLngExpression;
  bounds?: LatLngBoundsExpression;
  onMarkerClicked: (coordinates: LatLngExpression) => void;
}> = ({ markers, center, bounds, onMarkerClicked }) => {
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
            key={marker.coordinates.toString()}
            position={marker.coordinates}
            eventHandlers={{
              click: () => onMarkerClicked(marker.coordinates),
            }}
            icon={marker.type === 'free now' ? freeNowCarIcon : shareNowCarIcon}
          >
            {marker.text && <Popup>{marker.text}</Popup>}
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
    map.flyTo(center, 18);
  }, [center]);

  return <></>;
};

const DynamicMapBounds: React.FC<{ bounds: LatLngBoundsExpression }> = ({ bounds }) => {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(bounds, {
      animate: true,
      padding: {
        x: 15,
        y: 15,
      } as PointExpression,
    });
  }, [bounds]);

  return <></>;
};

export default AppMap;
