import type { Vehicle } from '../../types/vehicle';

export const fetchFreeNowVehicles = (): Promise<Vehicle[]> => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:5001/share-now/vehicles', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        const result: { placemarks: Vehicle[] } = await response.json();
        const correctedResult: Vehicle[] = result.placemarks.map((placement) => ({
          ...placement,
          coordinates: [
            placement.coordinates[1],
            placement.coordinates[0],
            placement.coordinates[2],
          ],
        }));
        resolve(correctedResult.slice(0, 25));
      })
      .catch(() => reject());
  });
};
export const fetchShareNowVehicles = (): Promise<Vehicle[]> => {
  const error = false;
  return new Promise((resolve, reject) => {
    if (error) {
      reject();
    } else {
      resolve([]);
    }
  });
};
