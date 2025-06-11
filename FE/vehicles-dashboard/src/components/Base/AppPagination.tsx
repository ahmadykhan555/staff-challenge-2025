import React from 'react';
import type { PaginationDirection } from '../../types/pagination';

type Props = {
  onPaginationClicked: (direction: PaginationDirection) => void;
  activePage: number;
  totalPages?: number;
};

const AppPagination: React.FC<Props> = ({
  activePage = 1,
  totalPages = activePage + 2,
  onPaginationClicked,
}) => {
  const getPageItems = () => {
    const pages: (number | string)[] = [];

    if (activePage + 1 <= totalPages) {
      pages.push(activePage + 1);
    }
    if (activePage + 2 <= totalPages) {
      pages.push(activePage + 2);
    }
    if (activePage + 3 <= totalPages) {
      pages.push(activePage + 3);
    }

    if (totalPages > activePage + 2) {
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const pageItems = getPageItems();

  return (
    <div className="flex items-center border-x border mx-auto w-[300px] sticky bottom-0 bg-white z-10 shadow-md">
      <button
        className="px-4 py-2 border-r flex-1 disabled:opacity-50"
        onClick={() => onPaginationClicked('prev')}
        disabled={activePage <= 1}
      >
        Prev
      </button>

      {pageItems.map((item, idx) => (
        <span key={idx} className="border flex-1 border-transparent text-center">
          {item}
        </span>
      ))}

      <button
        className="px-4 py-2 border-l flex-1 disabled:opacity-50"
        onClick={() => onPaginationClicked('next')}
        disabled={totalPages !== undefined && activePage >= totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default AppPagination;
