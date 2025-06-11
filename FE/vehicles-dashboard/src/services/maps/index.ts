import { DEFAULT_MAP_BOUNDS_PADDING, DEFAULT_ZOOM_LEVEL_STREET_VIEW } from '../../constants/map';
import type { VehicleType } from '../../types';
import L from 'leaflet';
import FreeNowCarIcon from './../../assets/icons/map/free-now-car.svg';
import ShareNowCarIcon from './../../assets/icons/map/share-now-car.svg';

export const setMapCenter = (
  map: L.Map,
  {
    center,
    zoomLevel = DEFAULT_ZOOM_LEVEL_STREET_VIEW,
  }: { center: L.LatLngExpression; zoomLevel?: number }
) => {
  if (!map || !center) {
    return;
  }
  map.flyTo(center, zoomLevel);
};

export const setMapBounds = (
  map: L.Map,
  {
    bounds,
    padding = DEFAULT_MAP_BOUNDS_PADDING,
  }: { bounds: L.LatLngBoundsExpression; padding?: number }
) => {
  if (!map || !bounds) {
    return;
  }

  map.fitBounds(bounds, {
    padding: {
      x: padding,
      y: padding,
    } as L.PointExpression,
    duration: 0.5,
    animate: true,
  });
};

export const markerForVehicleType = (type: VehicleType) => {
  return L.icon({
    iconUrl: type === 'free now' ? FreeNowCarIcon : ShareNowCarIcon,
    iconSize: [48, 48],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};
