import type React from 'react';
import {
  Table as WaveTable,
  TableCell,
  TableRow,
  TableSortableHeaderCell,
  useSortBy,
  type SortingDirection,
} from '@freenow/wave';

import { orderBy } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

const Table: React.FC<{
  columns: { displayName: string; id: string }[];
  content: any[];
  sortById: string;
}> = ({ columns, content, sortById }) => {
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
        <thead className="font-bold uppercase text-center">
          <tr>
            {columns.map(({ displayName, id }) => (
              <th key={id} onClick={id === sortById ? toggleSortDirection : undefined}>
                {displayName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((entry) => (
            <tr key={entry.id}>
              {Object.keys(entry).map((key, idx) => (
                <td key={idx}>{entry[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
