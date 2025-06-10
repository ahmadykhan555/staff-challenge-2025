import type React from 'react';
import { type ReactNode } from 'react';
import AppPagination from './AppPagination';
import type { PaginationDirection } from '../../types/pagination';

const AppTable: React.FC<{
  activePage?: number;
  activeRowId?: string;
  headerRowComponent?: ReactNode;
  dataRowComponent?: ReactNode;
  totalPages: number;
  onRowClicked: (id: string) => void;
  onPaginationClicked: (direction: PaginationDirection) => void;
}> = ({
  activePage = 1,
  headerRowComponent,
  dataRowComponent,
  onPaginationClicked,
  totalPages,
}) => {
  return (
    <div className="max-h-full border overflow-auto">
      <table className="w-full max-h-full overflow-auto">
        <thead className="font-bold uppercase text-center border-b">{headerRowComponent}</thead>
        <tbody>{dataRowComponent}</tbody>
      </table>
      <AppPagination
        activePage={activePage}
        totalPages={totalPages}
        onPaginationClicked={(direction) => onPaginationClicked(direction)}
      />
    </div>
  );
};

export default AppTable;
