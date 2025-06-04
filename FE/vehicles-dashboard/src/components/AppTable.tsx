import type React from 'react';
import { Table } from '@freenow/wave';
import type { Vehicle } from '../types/vehicle';

const AppTable: React.FC<{
  columns: string[];
  content: Vehicle[];
}> = ({ columns, content }) => {
  return (
    <div>
      Table columns: {columns}
      {content.map((c) => (
        <p>
          {c.id} - {c.address}
        </p>
      ))}
    </div>
  );
};

export default AppTable;
