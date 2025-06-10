import { orderBy } from 'lodash';
import { BASE_URL, GLOBAL_HEADERS } from '../../constants/api';
import type { FreeNowVehicle, ShareNowVehicle, Vehicle } from '../../types/vehicle';

export const fetchShareNowVehicles = (): Promise<Vehicle[]> => {
  return new Promise((resolve, reject) => {
    fetch(getVehiclesEndpoint('share-now'), {
      method: 'GET',
      headers: GLOBAL_HEADERS,
    })
      .then(async (response) => {
        const result: { placemarks: ShareNowVehicle[] } = await response.json();
        const correctedResult: ShareNowVehicle[] = result.placemarks.map(
          ({
            address = '-',
            condition = '-',
            licencePlate,
            state = '-',
            engineType = '-',
            fuel = undefined,
            id,
            coordinates,
          }) => ({
            address,
            condition,
            licencePlate,
            state,
            engineType,
            type: 'share now',
            fuel,
            id,
            coordinates: [coordinates[1], coordinates[0], coordinates[2]],
          })
        );
        resolve(orderBy(correctedResult, 'licencePlate', 'asc'));
      })
      .catch(() => reject());
  });
};

export const fetchFreeNowVehicles = (): Promise<Vehicle[]> => {
  return new Promise((resolve, reject) => {
    fetch(getVehiclesEndpoint('free-now'), {
      method: 'GET',
      headers: GLOBAL_HEADERS,
    })
      .then(async (response) => {
        const result: { poiList: FreeNowVehicle[] } = await response.json();
        const correctedResult: Vehicle[] = result.poiList.map(
          ({
            address = '-',
            condition = '-',
            engineType = '-',
            fuel = undefined,
            id,
            licencePlate,
            state = '-',
            coordinate,
          }) => ({
            address,
            condition,
            id,
            licencePlate,
            state,
            coordinates: [coordinate?.latitude || 0, coordinate?.longitude || 0],
            type: 'free now',
            engineType,
            fuel,
          })
        );

        resolve(orderBy(correctedResult, 'licencePlate', 'asc'));
      })
      .catch((e) => reject(e));
  });
};

export const fetchVehicles = async () => {
  const [shareNowVehicles, freeNowVehicles] = await Promise.all([
    fetchShareNowVehicles(),
    fetchFreeNowVehicles(),
  ]);
  return orderBy([...shareNowVehicles, ...freeNowVehicles], 'licencePlate', 'asc');
};

const getVehiclesEndpoint = (type: 'share-now' | 'free-now') => {
  return `${BASE_URL}/${type}/vehicles`;
};
