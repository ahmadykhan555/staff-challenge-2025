import type React from 'react';
import {
  Table as BaseTable,
  Card,
  Headline,
  TableCell,
  TableHeaderCell,
  TableRow,
} from '@freenow/wave';
import type { Vehicle } from '../types/vehicle';

const AppTable: React.FC<{
  columns: string[];
  content: Vehicle[];
}> = ({ columns, content }) => {
  return (
    <table className="border !w-full max-h-full overflow-auto">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {content.map((row) => {
          return (
            <tr key={row.id}>
              <td>{row.address}</td>
              <td>{row.condition}</td>
              <td>{row.coordinates}</td>
              <td>{row.engineType}</td>
              <td>{row.fuel}</td>
              <td>{row.fuel}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AppTable;
