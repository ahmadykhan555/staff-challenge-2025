import type React from 'react';

import { orderBy } from 'lodash';
import { useEffect, useState } from 'react';
import FreeNowCarIcon from '../../assets/icons/map/free-now-car.svg';
import ShareNowCarIcon from '../../assets/icons/map/share-now-car.svg';
import type { CarType } from '../../types';

const Table: React.FC<{
  columns: { displayName: string; id: string }[];
  content: any[];
  sortById: string;
  currentPage?: number;
  activeRowId?: string;
  onRowClicked: (id: string) => void;
  onNextClicked: () => void;
  onPrevClicked: () => void;
}> = ({
  columns,
  content,
  sortById,
  activeRowId,
  currentPage = 1,
  onRowClicked,
  onNextClicked,
  onPrevClicked,
}) => {
  const [sortedData, setSortedData] = useState<any[]>([]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setSortedData(content);
  }, [content]);

  useEffect(() => {
    const newSortedData = orderBy(sortedData, sortById, sortDirection); // fix type
    setSortedData(newSortedData);
  }, [sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  return (
    <>
      <table className="w-full ">
        <thead className="font-bold uppercase text-center border-b">
          <tr className="sticky -top-1 bg-white z-10 shadow-sm">
            {columns.map(({ displayName, id }) => (
              <th
                className="cursor-pointer border-l text-sm  p-4"
                key={id}
                onClick={id === sortById ? toggleSortDirection : undefined}
              >
                {displayName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((entry) => (
            <tr
              key={entry.licencePlate}
              onClick={() => {
                onRowClicked(entry.licencePlate);
              }}
              className={`bg-white cursor-pointer border-b  ${entry.licencePlate == activeRowId ? 'border-red-300 border !bg-red-100' : ''} hover:border-red-300 hover:border hover:!bg-red-100`}
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
          ))}
        </tbody>
      </table>
      <div className="flex items-center space-x-6 border-x border mx-auto w-[300px] sticky bottom-0 bg-white z-10 shadow-md">
        <button className="px-4 py-2 border-r flex-1 " onClick={onPrevClicked}>
          Prev
        </button>
        <p className="border border-transparent"> {currentPage}</p>
        <button className="px-4 py-2 border-l flex-1" onClick={onNextClicked}>
          Next
        </button>
      </div>
    </>
  );
};

export default Table;
