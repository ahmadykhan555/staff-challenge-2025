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
        resolve(result.placemarks?.slice(0, 11));
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
