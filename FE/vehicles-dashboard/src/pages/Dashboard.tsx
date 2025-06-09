import React, { useEffect, useState } from 'react';
import { Skeleton } from '@freenow/wave';
import AppTable from '../components/Base/AppTable';
import AppMap from '../components/AppMap';
import { fetchVehicles } from '../services/api';
import { DEFAULT_VEHICLE_LISTING_COLUMNS, PAGE_SIZE } from '../constants/dashboard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { setVehiclesList, setSelectedVehicle } from '../store/vehiclesSlice';
import { useAppDispatch, useAppSelector } from '../hooks/state';
import type { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import { isEqual } from 'lodash';
import type { Vehicle } from '../types';
import L from 'leaflet';
import { mapVehicleDataToTable } from '../utils';

type DashboardProps = {};
const Dashboard: React.FC<DashboardProps> = () => {
  useDocumentTitle('Now! Dashboard');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [vehiclesForCurrentPage, setVehiclesForCurrentPage] = useState<Vehicle[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [lastSliceIndex, setLastSliceIndex] = useState<number>(10);
  const vehicles = useAppSelector((state) => state.vehiclesSlice.list);

  const selectedVehicle = useAppSelector((state) => state.vehiclesSlice.selectedVehicle);
  const dispatch = useAppDispatch();

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    if (pageNumber === 1 || pageNumber <= 0) {
      setVehiclesForCurrentPage(vehicles.slice(0, PAGE_SIZE));
      setLastSliceIndex(PAGE_SIZE);
    } else {
      setVehiclesForCurrentPage(vehicles.slice(lastSliceIndex, lastSliceIndex + PAGE_SIZE));
      setLastSliceIndex(lastSliceIndex + PAGE_SIZE);
    }
  }, [pageNumber]);

  const initData = async () => {
    setIsLoading(true);
    const allVehicles = await fetchVehicles();
    const vehiclesForFirstPage = allVehicles.slice(0, PAGE_SIZE);
    dispatch(setVehiclesList(allVehicles));
    setVehiclesForCurrentPage(vehiclesForFirstPage);

    setMapBounds(L.latLngBounds(vehiclesForFirstPage.map((v) => v.coordinates)));
    setIsLoading(false);
  };

  const handleVehicleSelected = (licencePlate: string) => {
    const matchingVehicle = vehicles.find((vehicle) => vehicle.licencePlate === licencePlate);
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

  const [mapBounds, setMapBounds] = useState<LatLngBoundsExpression>();

  const [viewType] = useState<'stacked' | 'side-by-side'>('stacked');

  return (
    <>
      <section className={`bg-white h-full flex flex-col gap-4 md:gap-y-8  `}>
        {isLoading ? (
          <>
            <Skeleton animated className="border !bg-slate-50 !w-full md:!h-2/5" />
            <Skeleton animated className="border !bg-slate-50 w-full flex-1" />
          </>
        ) : (
          <>
            <div
              className={`${viewType === 'stacked' ? 'max-md:h-1/2 md:!h-2/5  w-full' : 'flex-1 max-h-screen'} xl:container md:mx-auto`}
            >
              <AppMap
                center={selectedVehicle?.coordinates}
                markers={vehiclesForCurrentPage.map((vehicle) => ({
                  coordinates: vehicle.coordinates,
                  text: vehicle.licencePlate,
                  type: vehicle.carType,
                }))}
                bounds={mapBounds}
                onMarkerClicked={(markerCoordinates) => handleSelectedMarker(markerCoordinates)}
              />
            </div>

            <div className="flex-1 max-h-screen !rounded-md overflow-auto container w-full mx-auto">
              <AppTable
                sortById="licencePlate"
                columns={DEFAULT_VEHICLE_LISTING_COLUMNS}
                content={vehiclesForCurrentPage.map((vehicle) => mapVehicleDataToTable(vehicle))}
                activeRowId={selectedVehicle?.licencePlate}
                onRowClicked={(licencePlate) => handleVehicleSelected(licencePlate)}
                onNextClicked={() => setPageNumber(pageNumber + 1)}
                onPrevClicked={() => setPageNumber(pageNumber - 1)}
                currentPage={pageNumber}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
};
export default Dashboard;
