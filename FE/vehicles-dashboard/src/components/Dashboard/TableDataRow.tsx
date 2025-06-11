import type { TableVehicle } from '../../types';
import AppBadge from '../Base/AppBadge';
import VehicleIcon from './VehicleIcon';
import VehicleCondition from './VehicleCondition';

const TableDataRow: React.FC<{
  vehicle: TableVehicle;
  activeRowId: any;
  onRowClicked: (licencePlate: string) => void;
}> = ({ vehicle, activeRowId, onRowClicked }) => {
  const renderComponentForProperty = (key: keyof TableVehicle) => {
    switch (key) {
      case 'type': {
        return <VehicleIcon type={vehicle.type} />;
      }
      case 'state': {
        return (
          <AppBadge
            type={vehicle.state.toLowerCase() === 'active' ? 'success' : 'danger'}
            text={vehicle.state.toLowerCase()}
          />
        );
      }
      case 'conditionAndFuel': {
        return (
          <VehicleCondition
            condition={vehicle.conditionAndFuel.condition}
            fuel={vehicle.conditionAndFuel.fuel}
          />
        );
      }
      default:
        return <>{vehicle[key]}</>;
    }
  };

  return (
    <tr
      key={vehicle.licencePlate}
      onClick={() => {
        onRowClicked(vehicle.licencePlate);
      }}
      className={`bg-white cursor-pointer border-b ${vehicle.licencePlate == activeRowId ? 'border-red-300 border bg-red-100' : ''}  hover:!bg-red-100`}
    >
      {Object.keys(vehicle).map((key, idx) => (
        <td
          className="p-3 max-xl:!max-w-[200px] text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis capitalize"
          key={idx}
        >
          {renderComponentForProperty(key as keyof TableVehicle)}
        </td>
      ))}
    </tr>
  );
};

export default TableDataRow;
