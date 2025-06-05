import React, { useEffect, useState } from 'react';
import { Card, Skeleton } from '@freenow/wave';
import AppTable from '../components/AppTable';
import AppMap from '../components/AppMap';
import { fetchFreeNowVehicles } from '../services/api';
import type { Vehicle } from '../types/vehicle';
import { useDispatch } from 'react-redux';

type DashboardProps = {};
const HomePage: React.FC<DashboardProps> = () => {
  const isLoading = false;
  const dispatch = useDispatch();

  const columns = ['address', 'condition', 'coordinates', 'engineType', 'fuel'];

  const [data, setData] = useState<Vehicle[]>([]);

  useEffect(() => {
    fetchFreeNowVehicles().then((res) => setData(res));
  }, []);

  return (
    <section className="flex flex-col gap-4 bg-white h-full">
      {isLoading ? (
        <>
          <Skeleton animated className="border !bg-slate-50 !w-[50%] !h-full" />
          <Skeleton animated className="border !bg-slate-50 !w-[50%] !h-full" />
        </>
      ) : (
        <>
          <div className="md:h-2/5">
            <AppMap markers={data.map((d) => d.coordinates)} />
          </div>

          <div className="flex-1 !rounded-md overflow-auto">
            <AppTable columns={columns} content={data} />
          </div>
        </>
      )}
    </section>
  );
};
export default HomePage;
