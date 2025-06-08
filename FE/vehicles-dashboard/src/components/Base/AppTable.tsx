import type React from 'react';

import { orderBy } from 'lodash';
import { useEffect, useState } from 'react';

const Table: React.FC<{
  columns: { displayName: string; id: string }[];
  content: any[];
  sortById: string;
  activeRowId?: string;
  onRowClicked: (id: number) => void;
}> = ({ columns, content, sortById, activeRowId, onRowClicked }) => {
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
      <table className="border w-full">
        <thead className="font-bold uppercase text-center border-b ">
          <tr className="sticky -top-1 bg-white z-10 shadow-sm">
            {columns.map(({ displayName, id }) => (
              <th
                className=" border-l  p-4"
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
            <tr key={entry.id} onClick={() => onRowClicked(entry.id)}>
              {Object.keys(entry).map((key, idx) => (
                <td className="p-4 text-center" key={idx}>
                  {entry[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
