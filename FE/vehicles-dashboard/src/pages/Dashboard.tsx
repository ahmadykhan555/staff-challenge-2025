import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import DashboardLoadingState from '../components/Dashboard/LoadingState';
import DashboardEmptyState from '../components/Dashboard/EmptyState';
import VehiclesMap from '../components/Dashboard/VehiclesMap/VehiclesMap';
import VehiclesTable from '../components/Dashboard/VehiclesTable';
import useVehiclesData from '../hooks/useVehiclesData';

const Dashboard: React.FC = () => {
  useDocumentTitle('Vehicles Dashboard');
  const { vehicles, isLoading } = useVehiclesData();
  return (
    <section className={`bg-white h-full flex flex-col gap-4 md:gap-y-6  `}>
      {isLoading && <DashboardLoadingState />}
      {!isLoading && !vehicles.length && <DashboardEmptyState />}
      {!isLoading && vehicles.length ? (
        <>
          <VehiclesMap />
          <VehiclesTable />
        </>
      ) : (
        <></>
      )}
    </section>
  );
};
export default Dashboard;
