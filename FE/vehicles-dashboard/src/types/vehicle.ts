import type { LatLngExpression } from 'leaflet';

type EngineType = 'PETROL' | 'ELECTRIC' | '-';
export type VehicleCondition = 'GOOD' | 'BAD' | '-';
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
  fuel?: number;
  state: VehicleState;
  licencePlate: string;
  coordinates: LatLngExpression;
  type: VehicleType;
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

export type VehicleType = 'free now' | 'share now';

export type TableVehicle = Omit<Vehicle, 'id' | 'engineType' | 'fuel' | 'condition'> & {
  conditionAndFuel: {
    condition: VehicleCondition;
    fuel: number;
  };
};
