import React from "react";
const Pagination = ({ page, setPage, totalPages }) => {
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  const numPagesToShow = 4;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, page - Math.floor(numPagesToShow / 2));

    for (
      let i = startPage;
      i < Math.min(totalPages + 1, startPage + numPagesToShow);
      i++
    ) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <>
      <nav aria-label="Page navigation example" className="p-5">
        <ul className="inline-flex -space-x-px text-sm">
          <li>
            <a
              className={`dark:!bg-navy-800 ml-0 flex h-10 items-center justify-center rounded-l-lg border border-blue-gray-100 bg-white px-3 leading-tight text-[#31205f] dark:text-white cursor-pointer ${
                page === 1
                  ? "bg-[#FBEED8] text-[#31205f] "
                  : "hover-bg-gray-200 hover-text-blue-700"
              } dark-border-blue-gray-100 dark-bg-gray-800 dark-text-gray-400 ${
                page === 1
                  ? "dark-text-white"
                  : "dark-hover-bg-gray-700 dark-hover-text-white"
              }`}
              onClick={handlePrevious}
            >
              Previous
            </a>
          </li>
          {getPageNumbers().map((pageNumber) => (
            <li key={pageNumber}>
              <a
                className={`flex h-10 min-w-10 items-center justify-center border border-blue-gray-100 bg-white px-3 leading-tight text-[#31205f] dark:text-white cursor-pointer font-bold ${
                  pageNumber === page
                    ? "active_page"
                    : "hover-bg-gray-200  dark:!bg-navy-800 "
                } dark-border-blue-gray-100 dark-bg-gray-800 dark-text-gray-400 ${
                  pageNumber === page
                    ? "dark-text-white bg-gradient-to-tr from-[#9b1b26] to-[#fb8102]"
                    : "dark-hover-bg-gray-700 dark-hover-text-white"
                }`}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </a>
            </li>
          ))}
          <li>
            <a
              className={`dark:!bg-navy-800 flex h-10 items-center justify-center rounded-r-lg border border-blue-gray-100 bg-white px-3 leading-tight dark:text-white text-[#31205f] cursor-pointer  ${
                page === totalPages
                  ? "bg-[#FBEED8] text-[#31205f]"
                  : "hover-bg-gray-200 hover-text-blue-700"
              } dark-border-blue-gray-100 dark-bg-gray-800 dark-text-gray-400 ${
                page === totalPages
                  ? "dark-text-white"
                  : "dark-hover-bg-gray-700 dark-hover-text-white"
              }`}
              onClick={handleNext}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Pagination;
