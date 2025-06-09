import type { TableVehicle, Vehicle, VehicleCondition } from '../types';

export const getVehicleConditionString = ({
  condition,
  fuel,
}: {
  condition: VehicleCondition;
  fuel?: number;
}) => {
  return `${condition} ${getFuelString(fuel)}`;
};

const getFuelString = (fuel?: number) => {
  if (!fuel && fuel !== 0) {
    return '';
  }
  if (fuel > 80) {
    return 'Full';
  }

  if (fuel < 50) {
    return 'Low';
  }

  return 'Normal';
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
  debugger;
  return {
    carType,
    licencePlate,
    coordinates: (coordinates as number[]).join(', '),
    address,
    state,
    condition: getVehicleConditionString({ condition, fuel }),
  };
};
