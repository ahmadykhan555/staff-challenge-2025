import type { TableVehicle } from '../../../types';
import AppBadge from '../../Base/AppBadge';
import VehicleIcon from '../../Base/VehicleIcon';
import VehicleCondition from '../VehicleCondition';

const VehicleInfoRow: React.FC<{
  vehicle: TableVehicle;
  activeRowId: string;
  onRowClicked: (licensePlate: string) => void;
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

      case 'coordinates': {
        return vehicle.coordinates.displayValue;
      }
      default:
        return <>{vehicle[key]}</>;
    }
  };

  return (
    <tr
      key={vehicle.licensePlate}
      onClick={() => {
        onRowClicked(vehicle.licensePlate);
      }}
      className={`bg-white cursor-pointer border-b last-of-type:border-0 ${vehicle.licensePlate == activeRowId ? 'border-red-300 border !bg-red-100' : ''}  hover:!bg-red-100`}
    >
      {Object.keys(vehicle).map((key, idx) => (
        <td
          className="p-3 max-xl:!max-w-[200px] text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis capitalize"
          key={idx}
          data-testid={vehicle[key as keyof TableVehicle]}
        >
          {renderComponentForProperty(key as keyof TableVehicle)}
        </td>
      ))}
    </tr>
  );
};

export default VehicleInfoRow;
