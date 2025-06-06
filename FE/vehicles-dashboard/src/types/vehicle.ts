type EngineType = 'PETROL' | 'ELECTRIC';
type VehicleCondition = 'GOOD' | 'BAD';
type VehicleState = 'ACTIVE' | 'INACTIVE';

export type Vehicle = {
  id: number;
  address: string;
  coordinates: [number, number, number];
  engineType: EngineType;
  condition: VehicleCondition;
  fuel: number;
  state: VehicleState;
  licencePlate: string;
};

export type VehiclesState = {
  list: Vehicle[];
  selectedVehicle: Vehicle | null;
};
