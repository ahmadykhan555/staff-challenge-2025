import type { LatLngBounds, LatLngExpression } from 'leaflet';

export type MapState = {
  center: LatLngExpression;
  zoomLevel: number;
  selectedMarkerCoordinates?: LatLngExpression;
  bounds?: LatLngBounds;
};
