import ShareNowCarIcon from '../../assets/icons/map/share-now-car.svg';
import FreeNowCarIcon from '../../assets/icons/map/free-now-car.svg';
import type { CarType } from '../../types';

const TableDataRow: React.FC<{
  entry: any;
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
          className="px-2 py-4 max-xl:!max-w-[200px] text-center text-sm whitespace-nowrap overflow-hidden text-ellipsis"
          key={idx}
        >
          {key === 'carType' ? (
            (entry[key] as CarType) == 'free now' ? (
              <img className="size-10 mx-auto" src={FreeNowCarIcon} />
            ) : (
              <img className="size-10 mx-auto" src={ShareNowCarIcon} />
            )
          ) : (
            entry[key]
          )}
        </td>
      ))}
    </tr>
  );
};

export default TableDataRow;
