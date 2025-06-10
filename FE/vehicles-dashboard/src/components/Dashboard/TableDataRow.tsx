import type { TableVehicle } from '../../types';
import AppBadge from '../Base/AppBadge';
import VehicleIcon from './VehicleIcon';
import VehicleCondition from './VehicleCondition';

const TableDataRow: React.FC<{
  entry: TableVehicle;
  activeRowId: any;
  onRowClicked: (licencePlate: string) => void;
}> = ({ entry, activeRowId, onRowClicked }) => {
  //       const [sortedData, setSortedData] = useState<any[]>([]);
  //   const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  //   useEffect(() => {
  //     setSortedData(content);
  //   }, [content]);

  //   useEffect(() => {
  //     const newSortedData = orderBy(sortedData, sortById, sortDirection); // fix type
  //     setSortedData(newSortedData);
  //   }, [sortDirection]);

  //   const toggleSortDirection = () => {
  //     setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  //   };
  return (
    <tr
      key={entry.licencePlate}
      onClick={() => {
        onRowClicked(entry.licencePlate);
      }}
      className={`bg-white cursor-pointer border-b   ${entry.licencePlate == activeRowId ? 'border-red-300 border !bg-red-100' : ''} hover:border-red-300 hover:border hover:!bg-red-100`}
    >
      {Object.keys(entry).map((key, idx) => (
        <td
          className="p-3 max-xl:!max-w-[200px] text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis capitalize"
          key={idx}
        >
          {key === 'carType' ? (
            <VehicleIcon type={entry[key]} />
          ) : key === 'state' ? (
            <AppBadge
              type={entry[key]?.toLowerCase() === 'active' ? 'success' : 'danger'}
              text={entry[key]?.toLowerCase()}
            />
          ) : key === 'conditionAndFuel' ? (
            <VehicleCondition
              condition={entry.conditionAndFuel?.condition}
              fuel={entry.conditionAndFuel?.fuel}
            />
          ) : (
            entry[key]
          )}
        </td>
      ))}
    </tr>
  );
};

export default TableDataRow;
