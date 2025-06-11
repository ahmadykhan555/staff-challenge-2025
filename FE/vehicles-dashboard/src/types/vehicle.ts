import type { LatLngExpression } from 'leaflet';

type EngineType = 'PETROL' | 'ELECTRIC' | '-';
type VehicleState = 'ACTIVE' | 'INACTIVE' | '-';
type CoordinatesTuple = [number, number, number];
type Coordinates = {
  latitude: number;
  longitude: number;
};

export type VehicleCondition = 'GOOD' | 'BAD' | '-';
export type VehicleType = 'free now' | 'share now';

export type Vehicle = {
  id: number;
  address: string;
  engineType?: EngineType;
  condition: VehicleCondition;
  fuel?: number;
  state: VehicleState;
  licensePlate: string;
  coordinates: LatLngExpression;
  type: VehicleType;
};

export type ShareNowVehicle = Vehicle & {
  coordinates: CoordinatesTuple;
  licencePlate: string;
};

export type VehiclesState = {
  list: Vehicle[];
  selectedVehicle: Vehicle | null;
  vehiclesForCurrentPage: Vehicle[];
};

export type FreeNowVehicle = Vehicle & {
  coordinate: Coordinates;
  licencePlate: string;
};

export type TableVehicle = Omit<Vehicle, 'id' | 'engineType' | 'fuel' | 'condition'> & {
  conditionAndFuel: {
    condition: VehicleCondition;
    fuel: number;
  };
  coordinates: {
    raw: LatLngExpression;
    displayValue: string;
  };
};
