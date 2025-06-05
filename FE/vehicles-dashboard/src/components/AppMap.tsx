import { Marker, Popup } from 'react-leaflet';
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';

import 'leaflet/dist/leaflet.css';
import type { LatLngExpression } from 'leaflet';

type MapMarker = LatLngExpression;

const MyMap: React.FC<{ markers: MapMarker[] }> = ({ markers }) => {
  return (
    <>
      <MapContainer
        zoomAnimation
        center={[53.59301, 10.07526, 0]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        />

        {markers.map((marker) => (
          <Marker position={marker}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};
export default MyMap;
