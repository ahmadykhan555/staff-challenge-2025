import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import VehiclesMap from './VehiclesMap';
import { MOCK_VEHICLE } from '../../../constants';

vi.mock('../AppMap', () => ({
  default: ({ center, markers, bounds, onMarkerClicked }: any) => {
    return (
      <div data-testid="app-map">
        <div data-testid="center">{JSON.stringify(center)}</div>
        <div data-testid="bounds">{JSON.stringify(bounds)}</div>
        {markers.map((marker: any, index: number) => (
          <button
            key={index}
            data-testid={`marker-${index}`}
            onClick={() => onMarkerClicked(marker.coordinates)}
          >
            {marker.text}
          </button>
        ))}
      </div>
    );
  },
}));

// Mock useVehiclesMap hook
const handleSelectedMarker = vi.fn();

vi.mock('../../hooks/useVehiclesMap', () => ({
  default: () => ({
    handleSelectedMarker,
    mapBounds: { north: 1, south: 2, east: 3, west: 4 },
    selectedVehicle: {
      coordinates: {
        lat: 10.07526,
        lng: 53.59301,
      },
    },
    vehiclesForCurrentPage: [
      {
        licensePlate: MOCK_VEHICLE.licensePlate,
        type: 'free now',
        coordinates: {
          lat: (MOCK_VEHICLE.coordinates.raw as number[])?.[0],
          lng: (MOCK_VEHICLE.coordinates.raw as number[])?.[1],
        },
      },
      {
        licensePlate: 'XYZ 789',
        type: 'share now',
        coordinates: { lat: 3, lng: 4 },
      },
    ],
  }),
}));

describe('VehiclesMap', () => {
  it('renders AppMap with correct props', () => {
    render(<VehiclesMap />);

    expect(screen.getByTestId('app-map')).toBeInTheDocument();
    expect(screen.getByTestId('center').textContent).toContain(
      `"lat":${(MOCK_VEHICLE.coordinates.raw as number[])?.[0]}`
    );
    expect(screen.getByTestId('center').textContent).toContain(
      `"lng":${(MOCK_VEHICLE.coordinates.raw as number[])?.[1]}`
    );
  });

  it('calls handleSelectedMarker when a marker is clicked', () => {
    render(<VehiclesMap />);

    const markerButton = screen.getByTestId('marker-0');
    fireEvent.click(markerButton);

    expect(handleSelectedMarker).toHaveBeenCalledWith({
      lat: (MOCK_VEHICLE.coordinates.raw as number[])?.[0],
      lng: (MOCK_VEHICLE.coordinates.raw as number[])?.[1],
    });
  });
});
