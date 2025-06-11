import { DEFAULT_VEHICLE_TABLE_COLUMNS } from '../../constants/tables';

const VehiclesTableHeaderRow: React.FC = () => {
  return (
    <tr className="sticky -top-1 bg-white z-10 shadow-sm">
      {DEFAULT_VEHICLE_TABLE_COLUMNS.map(({ displayName, id }) => (
        <th className="cursor-pointer text-sm p-3" key={id}>
          {displayName}
        </th>
      ))}
    </tr>
  );
};

export default VehiclesTableHeaderRow;
