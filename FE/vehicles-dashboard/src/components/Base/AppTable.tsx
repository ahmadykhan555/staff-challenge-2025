import type React from 'react';

import { orderBy } from 'lodash';
import { useEffect, useState, type ReactNode } from 'react';

const Table: React.FC<{
  columns: { displayName: string; id: string }[];

  currentPage?: number;
  activeRowId?: string;
  headerRow?: ReactNode;
  tableDataNode?: ReactNode;
  onRowClicked: (id: string) => void;
  onNextClicked: () => void;
  onPrevClicked: () => void;
}> = ({ currentPage = 1, headerRow, tableDataNode, onNextClicked, onPrevClicked }) => {
  return (
    <>
      <table className="w-full ">
        <thead className="font-bold uppercase text-center border-b">{headerRow}</thead>
        <tbody>{tableDataNode}</tbody>
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
