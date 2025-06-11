import { transformVehicleToTableRow } from '../../utils';
import AppTable from '../Base/AppTable';
import VehicleInfoRow from './VehicleInfoRow';
import VehiclesTableHeaderRow from './VehiclesTableHeaderRow';
import { useVehiclesPagination } from '../../hooks/useVehiclesPagination';

const VehiclesTable: React.FC = () => {
  const {
    handlePageSelect,
    handleVehicleSelected,
    pageNumber,
    selectedVehicle,
    totalPages,
    vehiclesForCurrentPage,
  } = useVehiclesPagination();

  return (
    <div className="flex-1 overflow-auto xl:container w-full mx-auto border rounded-md">
      <AppTable
        activeRowId={selectedVehicle?.licencePlate}
        onRowClicked={(licencePlate) => handleVehicleSelected(licencePlate)}
        onPaginationClicked={(direction, pageNumber) => handlePageSelect(direction, pageNumber)}
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
  );
};

export default VehiclesTable;
