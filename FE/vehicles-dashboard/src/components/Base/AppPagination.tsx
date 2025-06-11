import React, { useEffect, useState } from 'react';
import type { PaginationDirection } from '../../types/pagination';
import { ChevronRightIcon, ChevronLeftIcon } from '@freenow/wave';

type Props = {
  onPaginationClicked: ({
    direction,
    pageNumber,
  }: {
    direction: PaginationDirection;
    pageNumber?: number;
  }) => void;
  activePage: number;
  totalPages?: number;
};

const AppPagination: React.FC<Props> = ({
  activePage = 1,
  totalPages = activePage + 2,
  onPaginationClicked,
}) => {
  const [pagesToShow, setPagesToShow] = useState<(string | number)[]>([]);

  useEffect(() => {
    setPagesToShow(getPageItems());
  }, [activePage]);

  const getPageItems = () => {
    const pages: (number | string)[] = [activePage];

    if (activePage + 1 <= totalPages) {
      pages.push(activePage + 1);
    }
    if (activePage + 2 <= totalPages) {
      pages.push(activePage + 2);
    }

    if (totalPages > activePage + 2) {
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center border-x border  rounded-md mx-auto w-[300px] sticky bottom-2 bg-white z-10 shadow-md">
      <button
        className="p-2 border-r flex-1 disabled:opacity-50 flex justify-center"
        onClick={() => onPaginationClicked({ direction: 'prev' })}
        disabled={activePage <= 1}
      >
        <ChevronLeftIcon />
      </button>

      {pagesToShow.map((pageNumber, idx) => (
        <span
          key={`pagination-control-page-${idx}`}
          className={`border flex-1 cursor-pointer border-transparent text-center  ${pageNumber === activePage ? 'font-bold' : ''}`}
          onClick={() =>
            onPaginationClicked({
              direction: 'next',
              pageNumber: pageNumber ? parseInt(pageNumber.toString()) : undefined,
            })
          }
        >
          {pageNumber}
        </span>
      ))}

      <button
        className="p-2 border-l flex-1 disabled:opacity-50 flex justify-center"
        onClick={() => onPaginationClicked({ direction: 'next' })}
        disabled={totalPages !== undefined && activePage >= totalPages}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};

export default AppPagination;
