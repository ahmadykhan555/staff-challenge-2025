import { DEFAULT_VEHICLE_LISTING_COLUMNS } from '../../constants/dashboard';

const TableHeaderRow: React.FC = () => {
  return (
    <tr className="sticky -top-1 bg-white z-10 shadow-sm">
      {DEFAULT_VEHICLE_LISTING_COLUMNS.map(({ displayName, id }) => (
        <th className="cursor-pointer border-l text-sm  p-3" key={id}>
          {displayName}
        </th>
      ))}
    </tr>
  );
};

export default TableHeaderRow;
