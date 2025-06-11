// hooks/useVehiclesPagination.ts
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './useReduxStore';
import { setSelectedVehicle, setVehiclesForCurrentPage } from '../store/vehiclesSlice';
import { PAGE_SIZE } from '../constants/tables';
import type { PaginationDirection } from '../types/pagination';

export const useVehiclesPagination = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState(1);
  const {
    list: vehicles,
    selectedVehicle,
    vehiclesForCurrentPage,
  } = useAppSelector((state) => state.vehiclesReducer);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(vehicles.length / PAGE_SIZE)), [vehicles]);

  const setVehiclesForSelectedPage = (page: number) => {
    const startIdx = (page - 1) * PAGE_SIZE;
    const pageVehicles = vehicles.slice(startIdx, startIdx + PAGE_SIZE);
    dispatch(setVehiclesForCurrentPage(pageVehicles));
  };

  const handlePageChangeFromURL = () => {
    const rawPage = parseInt(searchParams.get('page') || '1', 10);
    let sanitizedPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;
    if (sanitizedPage > totalPages) sanitizedPage = totalPages;

    if (rawPage !== sanitizedPage) {
      setSearchParams({ page: sanitizedPage.toString() }, { replace: true });
    }
    if (sanitizedPage !== pageNumber) {
      setPageNumber(sanitizedPage);
    }
    setVehiclesForSelectedPage(sanitizedPage);
  };

  const handlePageSelect = (direction: PaginationDirection, toPageNumber?: number) => {
    const current = parseInt(searchParams.get('page') || '1', 10);
    const nextPage =
      toPageNumber && toPageNumber > 0 && toPageNumber <= totalPages
        ? toPageNumber
        : direction === 'next'
          ? Math.min(current + 1, totalPages)
          : Math.max(current - 1, 1);
    setSearchParams({ page: nextPage.toString() });
    setVehiclesForSelectedPage(nextPage);
  };

  const handleVehicleSelected = (licensePlate: string) => {
    const vehicle = vehiclesForCurrentPage.find(
      (_vehicle) => _vehicle.licensePlate === licensePlate
    );
    if (vehicle) dispatch(setSelectedVehicle(vehicle));
  };

  useEffect(() => {
    if (vehicles.length) {
      handlePageChangeFromURL();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, vehicles.length, totalPages]);

  return {
    selectedVehicle,
    vehiclesForCurrentPage,
    totalPages,
    pageNumber,
    handlePageSelect,
    handleVehicleSelected,
  };
};
