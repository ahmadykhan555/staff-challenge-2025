import React, { useEffect, useMemo, useState } from 'react';
import AppTable from '../components/Base/AppTable';
import AppMap from '../components/AppMap';
import { fetchVehicles } from '../services/api';
import { PAGE_SIZE } from '../constants/dashboard';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { setVehiclesList, setSelectedVehicle } from '../store/vehiclesSlice';
import { useAppDispatch, useAppSelector } from '../hooks/state';
import type { LatLngBoundsExpression, LatLngExpression } from 'leaflet';
import { isEqual } from 'lodash';
import type { Vehicle } from '../types';
import L from 'leaflet';
import { transformVehicleToTableRow } from '../utils';
import { useSearchParams } from 'react-router-dom';
import VehiclesTableHeaderRow from '../components/Dashboard/VehiclesTableHeaderRow';
import DashboardLoadingState from '../components/Dashboard/LoadingState';
import VehicleInfoRow from '../components/Dashboard/VehicleInfoRow';
import DashboardEmptyState from '../components/Dashboard/EmptyState';

const Dashboard: React.FC = () => {
  useDocumentTitle('Vehicles Dashboard');

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [vehiclesForCurrentPage, setVehiclesForCurrentPage] = useState<Vehicle[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [mapBounds, setMapBounds] = useState<LatLngBoundsExpression>();
  const vehicles = useAppSelector((state) => state.vehiclesReducer.list);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedVehicle = useAppSelector((state) => state.vehiclesReducer.selectedVehicle);
  const dispatch = useAppDispatch();

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(vehicles.length / PAGE_SIZE));
  }, [vehicles.length]);

  // effects
  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    if (vehicles.length > 0) {
      setProductForSelectedPage(vehicles, pageNumber);
    }
  }, [pageNumber, vehicles]);

  useEffect(() => {
    if (vehicles.length === 0) {
      return;
    }
    const rawPage = parseInt(searchParams.get('page') || '1', 10);
    let sanitizedPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
    if (sanitizedPage > totalPages) {
      sanitizedPage = totalPages;
    }

    // Keeping URL clean
    if (rawPage !== sanitizedPage) {
      setSearchParams({ page: sanitizedPage.toString() }, { replace: true });
      return;
    }
    // Sync with local state
    if (sanitizedPage !== pageNumber) {
      setPageNumber(sanitizedPage);
    }
  }, [searchParams, vehicles.length, totalPages, pageNumber]);

  // helpers
  const initData = async () => {
    try {
      setIsLoading(true);
      const allVehicles = await fetchVehicles();
      setProductForSelectedPage(allVehicles, pageNumber);
      dispatch(setVehiclesList(allVehicles));
    } catch (e) {
      console.error('Error loading initial data in Dashboard ', e);
    } finally {
      setIsLoading(false);
    }
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

  // Pagination button handler — only update URL param, not pageNumber directly
  const handlePageSelect = (direction: 'next' | 'prev') => {
    const currentPage = parseInt(searchParams.get('page') || '1', 10);
    const newPage =
      direction === 'next' ? Math.min(currentPage + 1, totalPages) : Math.max(currentPage - 1, 1);

    setSearchParams({ page: newPage.toString() });
  };

  const setProductForSelectedPage = (vehicles: Vehicle[], pageNumber: number) => {
    const startIdx = (pageNumber - 1) * PAGE_SIZE;
    const currentVehicles = vehicles.slice(startIdx, startIdx + PAGE_SIZE);

    if (currentVehicles) {
      setVehiclesForCurrentPage(currentVehicles);
      setMapBounds(L.latLngBounds(currentVehicles.map((v) => v.coordinates)));
    }
  };

  let content: React.ReactNode;
  if (isLoading) {
    content = <DashboardLoadingState />;
  } else if (!isLoading && !vehicles.length) {
    content = <DashboardEmptyState />;
  } else {
    content = (
      <>
        <div className={`max-md:h-1/2 md:!h-1/3  w-full xl:container md:mx-auto`}>
          <AppMap
            center={selectedVehicle?.coordinates}
            markers={vehiclesForCurrentPage.map((vehicle) => ({
              coordinates: vehicle.coordinates,
              text: vehicle.licencePlate,
              type: vehicle.type,
            }))}
            bounds={mapBounds}
            onMarkerClicked={(markerCoordinates) => handleSelectedMarker(markerCoordinates)}
          />
        </div>

        <div className="flex-1 max-h-screen overflow-auto xl:container w-full mx-auto">
          <AppTable
            activeRowId={selectedVehicle?.licencePlate}
            onRowClicked={(licencePlate) => handleVehicleSelected(licencePlate)}
            onPaginationClicked={(direction: 'next' | 'prev') => handlePageSelect(direction)}
            activePage={pageNumber}
            headerRowComponent={<VehiclesTableHeaderRow />}
            totalPages={totalPages}
            dataRowsComponent={vehiclesForCurrentPage.map((entry) => {
              const mappedData = transformVehicleToTableRow(entry);
              return (
                <VehicleInfoRow
                  key={`vehicle-info-row-${entry.id}`}
                  vehicle={mappedData}
                  activeRowId={selectedVehicle?.licencePlate || ''}
                  onRowClicked={(licencePlate) => handleVehicleSelected(licencePlate)}
                />
              );
            })}
          />
        </div>
      </>
    );
  }

  return (
    <section className={`bg-white h-full flex flex-col gap-4 md:gap-y-8  `}>{content}</section>
  );
};
export default Dashboard;
