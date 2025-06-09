import type { LatLngExpression } from 'leaflet';

type EngineType = 'PETROL' | 'ELECTRIC' | '-';
type VehicleCondition = 'GOOD' | 'BAD' | '-';
type VehicleState = 'ACTIVE' | 'INACTIVE' | '-';

type CoordinatesTuple = [number, number, number];
type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Vehicle = {
  id: number;
  address: string;
  engineType?: EngineType;
  condition: VehicleCondition;
  fuel?: number | '-';
  state: VehicleState;
  licencePlate: string;
  coordinates: LatLngExpression;
  carType: CarType;
};

export type ShareNowVehicle = Vehicle & {
  coordinates: CoordinatesTuple;
};
export type VehiclesState = {
  list: Vehicle[];
  selectedVehicle: Vehicle | null;
};

export type FreeNowVehicle = Vehicle & {
  coordinate: Coordinates;
};

export type CarType = 'free now' | 'share now';
