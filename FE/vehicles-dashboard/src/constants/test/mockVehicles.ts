import type { TableVehicle } from '../../types';

export const MOCK_VEHICLE: TableVehicle = {
  address: 'Lesserstraße 170, 22049 Hamburg',
  coordinates: {
    displayValue: '10.07526, 53.59301, 0',
    raw: [10.07526, 53.59301, 0],
  } as any,
  state: 'INACTIVE',
  licensePlate: 'HHZ 23 H8522',
  type: 'share now',
  conditionAndFuel: {
    condition: 'GOOD',
    fuel: 90,
  },
};
