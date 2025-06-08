import React, { useEffect, useState } from 'react';
import { Skeleton } from '@freenow/wave';
import AppTable from '../components/Base/AppTable';
import AppMap from '../components/AppMap';
import { fetchFreeNowVehicles } from '../services/api';
import type { Vehicle } from '../types/vehicle';
import { DEFAULT_VEHICLE_LISTING_COLUMNS } from '../constants/dashboard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useSelector, useDispatch } from 'react-redux';
import type { GlobalDispatcher, GlobalState } from '../store';
import { setVehiclesList, setSelectedVehicle } from '../store/vehiclesSlice';
import { useAppDispatch, useAppSelector } from '../hooks/state';

type DashboardProps = {};
const Dashboard: React.FC<DashboardProps> = () => {
  const isLoading = false;

  // const [data, setData] = useState<Vehicle[]>([]);
  useDocumentTitle('Now! Dashboard');

  const vehicles = useAppSelector((state) => state.vehiclesSlice.list);
  const selectedVehicle = useAppSelector((state) => state.vehiclesSlice.selectedVehicle);
  const dispatch = useAppDispatch();

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const response = await fetchFreeNowVehicles();
    dispatch(setVehiclesList(response));
  };

  const handleVehicleSelected = (id: number) => {
    const matchingVehicle = vehicles.find((vehicle) => vehicle.id === id);
    if (matchingVehicle) {
      dispatch(setSelectedVehicle(matchingVehicle));
    }
  };

  return (
    <section className="flex flex-col gap-4 md:gap-y-8 bg-white h-full">
      {isLoading ? (
        <>
          <Skeleton animated className="border !bg-slate-50 !w-full md:!h-2/5" />
          <Skeleton animated className="border !bg-slate-50 w-full flex-1" />
        </>
      ) : (
        <>
          <div className="md:h-2/5">
            <AppMap markers={vehicles.map((d) => d.coordinates)} />
          </div>

          <div className="flex-1 !rounded-md overflow-auto container w-full mx-auto">
            <AppTable
              sortById="licencePlate"
              columns={DEFAULT_VEHICLE_LISTING_COLUMNS}
              content={vehicles}
              activeRowId={selectedVehicle?.id.toString()}
              onRowClicked={(id) => handleVehicleSelected(id)}
            />
          </div>
        </>
      )}
    </section>
  );
};
export default Dashboard;
