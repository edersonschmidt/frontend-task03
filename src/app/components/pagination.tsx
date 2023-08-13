import { useState } from "react";

interface PaginationProps {
  maxPageButtonsToShow?: number;
  totalPages: number;
  currentPage: number;
  onClickPage: (page: number) => void;
  onClickPrev: () => void;
  onClickNext: () => void;
}

function Pagination({
  maxPageButtonsToShow = 5,
  totalPages,
  currentPage,
  onClickPage,
  onClickPrev,
  onClickNext,
}: PaginationProps) {

  const renderPageButtons = () => {
    const pageButtons = [];

    const halfMaxButtons = Math.floor(maxPageButtonsToShow / 2);

    let startPage = currentPage - halfMaxButtons;
    let endPage = currentPage + halfMaxButtons;

    if (startPage < 1) {
      startPage = 1;
      endPage = maxPageButtonsToShow;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPageButtonsToShow + 1, 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      pageButtons.push(
        <button
          key={page}
          className="flex items-center justify-center w-8 h-8 mr-2 text-black bg-gray-300 cursor-pointer disabled:cursor-default disabled:bg-gray-100"
          onClick={() => onClickPage(page)}
          disabled={currentPage === page}
        >
          {page}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="flex justify-center gap-2">
      <button
        className="flex items-center justify-center h-8 px-3 text-black bg-gray-300 cursor-pointer w-fit disabled:cursor-default disabled:bg-gray-100"
        onClick={onClickPrev}
        disabled={currentPage === 1}>
        Previous
      </button>
      <span className="flex">
        {renderPageButtons()}
      </span>
      <button
        className="flex items-center justify-center h-8 px-3 text-black bg-gray-300 cursor-pointer w-fit disabled:cursor-default disabled:bg-gray-100"
        onClick={onClickNext}
        disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
