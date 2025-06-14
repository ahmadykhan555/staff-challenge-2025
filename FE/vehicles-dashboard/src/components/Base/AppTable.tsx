import type React from 'react';
import { type ReactNode } from 'react';
import AppPagination from './AppPagination';
import type { PaginationDirection } from '../../types/pagination';

const AppTable: React.FC<{
  activePage?: number;
  activeRowId?: string;
  headerRowComponent?: ReactNode;
  dataRowsComponent?: ReactNode;
  totalPages: number;
  onRowClicked: (id: string) => void;
  onPaginationClicked: (direction: PaginationDirection, pageNumber?: number) => void;
}> = ({
  activePage = 1,
  headerRowComponent,
  dataRowsComponent,
  onPaginationClicked,
  totalPages,
}) => {
  return (
    <div className="max-h-full overflow-auto">
      <table className="w-full max-h-full overflow-auto">
        <thead className="font-bold uppercase text-center border-b">{headerRowComponent}</thead>
        <tbody>{dataRowsComponent}</tbody>
      </table>
      <AppPagination
        activePage={activePage}
        totalPages={totalPages}
        onPaginationClicked={({ direction, pageNumber }) =>
          onPaginationClicked(direction, pageNumber)
        }
      />
    </div>
  );
};

export default AppTable;
