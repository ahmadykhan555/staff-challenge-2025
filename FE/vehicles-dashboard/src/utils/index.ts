import type { TableVehicle, Vehicle, VehicleCondition } from '../types';

export const getVehicleConditionString = ({
  condition,
  fuel,
}: {
  condition: VehicleCondition;
  fuel?: Pick<Vehicle, 'fuel'>;
}) => {
  return `${condition} - ${fuel}`;
};

export const mapVehicleDataToTable = ({
  address,
  carType,
  coordinates,
  licencePlate,
  state,
  condition,
  fuel,
}: Vehicle): TableVehicle => {
  return {
    carType,
    licencePlate,
    coordinates,
    address,
    state,
    condition: getVehicleConditionString({ condition, fuel: (fuel || -1) as any }), // fix type
  };
};
