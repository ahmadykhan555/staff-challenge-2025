import type React from 'react';
import { type ReactNode } from 'react';
import AppPagination from './AppPagination';
import type { PaginationDirection } from '../../types/pagination';

const AppTable: React.FC<{
  activePage?: number;
  activeRowId?: string;
  headerRow?: ReactNode;
  tableDataNode?: ReactNode;
  totalPages: number;
  onRowClicked: (id: string) => void;

  onPaginationClicked: (direction: PaginationDirection) => void;
}> = ({ activePage = 1, headerRow, tableDataNode, onPaginationClicked, totalPages }) => {
  return (
    <div className="relative">
      <table className="w-full ">
        <thead className="font-bold uppercase text-center border-b">{headerRow}</thead>
        <tbody>{tableDataNode}</tbody>
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
