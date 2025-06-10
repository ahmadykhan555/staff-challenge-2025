import type { TableVehicle, Vehicle, VehicleCondition } from '../types';

export const getVehicleConditionString = ({
  condition,
  fuel,
}: {
  condition: VehicleCondition;
  fuel?: number;
}) => {
  return `${condition?.toLowerCase()} ${getFuelString(fuel)}`;
};

const getFuelString = (fuel?: number) => {
  if (!fuel && fuel !== 0) {
    return '';
  }
  if (fuel > 80) {
    return 'full';
  }

  if (fuel < 50) {
    return 'low';
  }

  return 'normal';
};

export const transformVehicleToTableRow = ({
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
    coordinates: (coordinates as number[]).join(', '),
    address,
    state,
    condition: getVehicleConditionString({ condition, fuel }),
  };
};
