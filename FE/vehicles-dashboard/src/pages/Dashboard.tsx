import React, { useEffect, useState } from 'react';
import { Card, Skeleton } from '@freenow/wave';
import AppTable from '../components/AppTable';
import { fetchFreeNowVehicles } from '../services/api';
import type { Vehicle } from '../types/vehicle';
import { useDispatch } from 'react-redux';

type DashboardProps = {};
const HomePage: React.FC<DashboardProps> = () => {
  const isLoading = false;
  const dispatch = useDispatch();

  const [data, setData] = useState<Vehicle[]>([]);

  useEffect(() => {
    fetchFreeNowVehicles(dispatch);
  }, [dispatch]);

  return (
    <section className="flex gap-4 bg-white h-full">
      {isLoading ? (
        <>
          <Skeleton animated className="border !bg-slate-50 !w-[50%] !h-full" />
          <Skeleton animated className="border !bg-slate-50 !w-[50%] !h-full" />
        </>
      ) : (
        <>
          <Card className="map flex-1 bg-slate-50 !rounded-md">MAP</Card>
          <Card className="table flex-1 bg-slate-50 !rounded-md">
            <AppTable columns={['col1', 'col2', 'col3']} content={data} />
          </Card>
        </>
      )}
    </section>
  );
};
export default HomePage;
