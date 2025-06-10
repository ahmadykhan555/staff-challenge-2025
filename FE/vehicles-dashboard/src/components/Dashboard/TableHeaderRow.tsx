import { DEFAULT_VEHICLE_LISTING_COLUMNS } from '../../constants/dashboard';

const TableHeaderRow: React.FC<{}> = () => {
  return (
    <tr className="sticky -top-1 bg-white z-10 shadow-sm">
      {DEFAULT_VEHICLE_LISTING_COLUMNS.map(({ displayName, id }) => (
        <th
          className="cursor-pointer text-sm p-3"
          key={id}
          // onClick={id === sortById ? toggleSortDirection : undefined}
        >
          {displayName}
        </th>
      ))}
    </tr>
  );
};

export default TableHeaderRow;
