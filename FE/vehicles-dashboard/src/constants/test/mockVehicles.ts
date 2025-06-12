import type { TableVehicle, Vehicle } from '../../types';

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

export const VEHICLES_PAGE_1: TableVehicle[] = [
  {
    address: 'Grosse Reichenstraße 7, 20457 Hamburg',
    coordinates: {
      raw: [9.99622, 53.54847, 0],
      displayValue: [9.99622, 53.54847, 0].join(', '),
    } as any,
    state: 'ACTIVE',
    licensePlate: 'HHZ 23 H8480',
    type: 'free now',
    conditionAndFuel: {
      condition: 'GOOD',
      fuel: 90,
    },
  },
  {
    address: 'Spreenende 1 - 11, 22453 Hamburg (Umkreis 100m)',
    coordinates: {
      raw: [9.97417, 53.61274, 0],
      displayValue: [9.97417, 53.61274, 0].join(', '),
    } as any,
    state: 'INACTIVE',
    licensePlate: 'HHZ 23 H8001',
    type: 'share now', // Added a default or inferred type, because original is missing
    conditionAndFuel: {
      condition: 'BAD',
      fuel: 57,
    },
  },
  {
    address: 'Ring 2, 22043 Hamburg',
    coordinates: {
      raw: [10.07838, 53.56388, 0],
      displayValue: [10.07838, 53.56388, 0].join(', '),
    } as any,
    state: 'ACTIVE',
    licensePlate: 'HHZ 23 H8002',
    type: 'free now', // Added default, since original missing 'type'
    conditionAndFuel: {
      condition: 'GOOD',
      fuel: 84,
    },
  },
];

export const VEHICLES_PAGE_2: TableVehicle[] = [
  {
    address: 'Grosse Reichenstraße 7, 20457 Hamburg',
    coordinates: {
      raw: [9.99, 53.55, 0],
      displayValue: [9.99, 53.55, 0].join(', '),
    } as any,
    state: 'ACTIVE',
    licensePlate: 'HHZ 23 H8480',
    type: 'free now',
    conditionAndFuel: {
      condition: 'GOOD',
      fuel: 90,
    },
  },
  {
    address: 'Spreenende 1 - 11, 22453 Hamburg (Umkreis 100m)',
    coordinates: {
      raw: [9.97, 53.615, 0],
      displayValue: [9.97, 53.615, 0].join(', '),
    } as any,
    state: 'INACTIVE',
    licensePlate: 'HHZ 23 H8001',
    type: 'share now',
    conditionAndFuel: {
      condition: 'BAD',
      fuel: 57,
    },
  },
  {
    address: 'Ring 2, 22043 Hamburg',
    coordinates: {
      raw: [10.08, 53.56, 0],
      displayValue: [10.08, 53.56, 0].join(', '),
    } as any,
    state: 'ACTIVE',
    licensePlate: 'HHZ 23 H8002',
    type: 'free now',
    conditionAndFuel: {
      condition: 'GOOD',
      fuel: 84,
    },
  },
];

export const VEHICLES_PAGE_3: Vehicle[] = [
  {
    address: 'Spreenende 1 - 11, 22453 Hamburg (Umkreis 100m)',
    condition: 'BAD',
    licensePlate: 'HHZ 23 H8001',
    state: 'INACTIVE',
    engineType: 'ELECTRIC',
    type: 'share now',
    fuel: 57,
    id: 1068403392,
    coordinates: [53.61274, 9.97417, 0],
  },
  {
    address: 'Ring 2, 22043 Hamburg',
    condition: 'GOOD',
    licensePlate: 'HHZ 23 H8002',
    state: 'ACTIVE',
    engineType: 'PETROL',
    type: 'share now',
    fuel: 84,
    id: 592175998,
    coordinates: [53.56388, 10.07838, 0],
  },
  {
    address: 'Kroogblöcke 32, 22119 Hamburg',
    condition: 'GOOD',
    licensePlate: 'HHZ 23 H8003',
    state: 'ACTIVE',
    engineType: 'PETROL',
    type: 'share now',
    fuel: 54,
    id: 1698152658,
    coordinates: [53.55258, 10.09416, 0],
  },
];
