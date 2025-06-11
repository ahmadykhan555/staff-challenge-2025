import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './useReduxStore';
import { fetchVehicles } from '../services/api';
import { setVehiclesList } from '../store/vehiclesSlice';

export default function useVehiclesData() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const vehicles = useAppSelector((state) => state.vehiclesReducer.list);

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setIsLoading(true);
        const data = await fetchVehicles();
        dispatch(setVehiclesList(data));
      } catch (err) {
        console.error('Failed to fetch vehicles:', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadVehicles();
  }, [dispatch]);

  return { vehicles, isLoading };
}
