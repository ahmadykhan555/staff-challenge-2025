import type { TableVehicle, Vehicle } from '../types';

export const getFuelString = (fuel?: number) => {
  if (!fuel && fuel !== 0) {
    return '';
  }
  if (fuel > 80) {
    return 'full fuel';
  }

  if (fuel < 50) {
    return 'low fuel';
  }

  return 'normal fuel';
};

export const transformVehicleToTableRow = ({
  address,
  type,
  coordinates,
  licencePlate,
  state,
  condition,
  fuel,
}: Vehicle): TableVehicle => {
  return {
    type,
    licencePlate,
    coordinates: (coordinates as number[]).join(', '),
    address,
    state,
    conditionAndFuel: { condition, fuel },
  };
};
