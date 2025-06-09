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
import { transformVehicleToTableRow } from '../utils';
import { useSearchParams } from 'react-router-dom';
import TableHeaderRow from '../components/Dashboard/TableHeaderRow';
import TableDataRow from '../components/Dashboard/TableDataRow';

type DashboardProps = {};
const Dashboard: React.FC<DashboardProps> = () => {
  useDocumentTitle('Now! Dashboard');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [vehiclesForCurrentPage, setVehiclesForCurrentPage] = useState<Vehicle[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [mapBounds, setMapBounds] = useState<LatLngBoundsExpression>();
  const vehicles = useAppSelector((state) => state.vehiclesSlice.list);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedVehicle = useAppSelector((state) => state.vehiclesSlice.selectedVehicle);
  const dispatch = useAppDispatch();

  useEffect(() => {
    initData();
  }, []);

  // pagination control
  useEffect(() => {
    setProductForSelectedPage();
  }, [pageNumber]);

  const initData = async () => {
    setIsLoading(true);
    const allVehicles = await fetchVehicles();
    const pageNumberFromQuery = parseInt(searchParams.get('page') || '1') - 1;
    const vehiclesForFirstPage = allVehicles.slice(
      pageNumberFromQuery * PAGE_SIZE,
      pageNumberFromQuery * PAGE_SIZE + PAGE_SIZE
    );
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

  const handlePageSelect = (direction: 'next' | 'prev') => {
    const newPage = direction === 'next' ? pageNumber + 1 : pageNumber - 1;
    setPageNumber(newPage <= 0 ? 1 : newPage);
    setSearchParams({ page: newPage.toString() });
  };

  const setProductForSelectedPage = () => {
    let vehicleSlice: Vehicle[] = [];

    if (pageNumber === 1 || pageNumber <= 0) {
      vehicleSlice = vehicles.slice(0, PAGE_SIZE);
      setVehiclesForCurrentPage(vehicleSlice);
    } else {
      vehicleSlice = vehicles.slice(
        (pageNumber - 1) * PAGE_SIZE,
        (pageNumber - 1) * PAGE_SIZE + PAGE_SIZE
      );

      setVehiclesForCurrentPage(vehicleSlice);
    }
    setMapBounds(L.latLngBounds(vehicleSlice.map((v) => v.coordinates)));
  };

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
            <div className={`max-md:h-1/2 md:!h-2/5  w-full xl:container md:mx-auto`}>
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

            <div className="flex-1 max-h-screen !rounded-md overflow-auto xl:container w-full mx-auto">
              <AppTable
                sortById="licencePlate"
                columns={DEFAULT_VEHICLE_LISTING_COLUMNS}
                content={vehiclesForCurrentPage.map((vehicle) =>
                  transformVehicleToTableRow(vehicle)
                )}
                activeRowId={selectedVehicle?.licencePlate}
                onRowClicked={(licencePlate) => handleVehicleSelected(licencePlate)}
                onNextClicked={() => handlePageSelect('next')}
                onPrevClicked={() => handlePageSelect('prev')}
                currentPage={pageNumber}
                headerRow={<TableHeaderRow />}
                tableDataNode={vehiclesForCurrentPage.map((entry) => {
                  const mappedData = transformVehicleToTableRow(entry);
                  return (
                    <TableDataRow
                      entry={mappedData}
                      activeRowId={selectedVehicle?.licencePlate}
                      onRowClicked={(licencePlate) => handleVehicleSelected(licencePlate)}
                    />
                  );
                })}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
};
export default Dashboard;
