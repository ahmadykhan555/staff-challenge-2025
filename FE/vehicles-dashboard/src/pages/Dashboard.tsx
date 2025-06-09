import React, { useEffect, useState } from 'react';
import { Skeleton } from '@freenow/wave';
import AppTable from '../components/Base/AppTable';
import AppMap from '../components/AppMap';
import { fetchVehicles } from '../services/api';
import { DEFAULT_VEHICLE_LISTING_COLUMNS } from '../constants/dashboard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { setVehiclesList, setSelectedVehicle } from '../store/vehiclesSlice';
import { useAppDispatch, useAppSelector } from '../hooks/state';
import type { LatLngExpression } from 'leaflet';
import { isEqual } from 'lodash';
import type { Vehicle } from '../types';

type DashboardProps = {};
const Dashboard: React.FC<DashboardProps> = () => {
  useDocumentTitle('Now! Dashboard');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [vehiclesForCurrentPage, setVehiclesForCurrentPage] = useState<Vehicle[]>([]);
  const [pageNumber, setPageNumber] = useState<number>();
  const vehicles = useAppSelector((state) => state.vehiclesSlice.list);

  const selectedVehicle = useAppSelector((state) => state.vehiclesSlice.selectedVehicle);
  const dispatch = useAppDispatch();

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    setVehiclesForCurrentPage(vehicles.slice(0, 10));
  }, [pageNumber]);

  const initData = async () => {
    setIsLoading(true);
    const [freeNowVehicles, shareNowVehicles] = await fetchVehicles();
    const allVehicles = [...freeNowVehicles, ...shareNowVehicles];
    setIsLoading(false);
    dispatch(setVehiclesList(allVehicles));
    setVehiclesForCurrentPage(allVehicles.slice(0, 10));
  };

  const handleVehicleSelected = (id: number) => {
    const matchingVehicle = vehicles.find((vehicle) => vehicle.id === id);
    if (matchingVehicle) {
      dispatch(setSelectedVehicle(matchingVehicle));
    }
  };

  const handleSelectedMarker = (coordinates: LatLngExpression) => {
    const matchingVehicle = vehicles.find((vehicle) => isEqual(coordinates, vehicle.coordinates));
    if (matchingVehicle) {
      dispatch(setSelectedVehicle(matchingVehicle));
    }
  };

  const [viewType, setViewType] = useState<'stacked' | 'side-by-side'>('stacked');

  return (
    <>
      <section
        className={`flex ${viewType === 'stacked' ? 'flex-col' : 'flex-row'} gap-4 md:gap-y-8 bg-white h-full`}
      >
        {isLoading ? (
          <>
            <Skeleton animated className="border !bg-slate-50 !w-full md:!h-2/5" />
            <Skeleton animated className="border !bg-slate-50 w-full flex-1" />
          </>
        ) : (
          <>
            <div
              className={`${viewType === 'stacked' ? 'md:h-2/5' : 'flex-1 max-h-screen'} xl:container mx-auto`}
            >
              <AppMap
                center={selectedVehicle?.coordinates}
                markers={vehiclesForCurrentPage.map((vehicle) => ({
                  coordinates: vehicle.coordinates,
                  text: vehicle.licencePlate,
                  type: vehicle.carType,
                }))}
                onMarkerClicked={(markerCoordinates) => handleSelectedMarker(markerCoordinates)}
              />
            </div>

            <div className="flex-1 max-h-screen !rounded-md overflow-auto container w-full mx-auto">
              <AppTable
                sortById="licencePlate"
                columns={DEFAULT_VEHICLE_LISTING_COLUMNS}
                content={vehiclesForCurrentPage}
                activeRowId={selectedVehicle?.id.toString()}
                onRowClicked={(id) => handleVehicleSelected(id)}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
};
export default Dashboard;
