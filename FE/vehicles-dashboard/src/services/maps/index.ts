import { DEFAULT_MAP_BOUNDS_PADDING, DEFAULT_ZOOM_LEVEL_STREET_VIEW } from '../../constants/map';

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
  });
};
