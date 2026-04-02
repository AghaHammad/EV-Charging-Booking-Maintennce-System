import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { joinClasses } from "../../utils/common/helper";

export default function BookingsPagination({
  visibleStartIndex,
  visibleEndIndex,
  totalItems,
  currentPageNumber,
  totalPageCount,
  handlePreviousPageClick,
  handleNextPageClick,
  handlePageButtonClick,
}) {
  const pageNumbers = Array.from({ length: totalPageCount }, (_, index) => index + 1);

  return (
    <div className="flex flex-col gap-4 border-t border-white/5 px-4 py-4 sm:px-6 sm:py-5 md:flex-row md:items-center md:justify-between">
      <div className="text-center text-[13px] text-white/50 md:text-left md:text-[14px]">
        Showing {visibleStartIndex} to {visibleEndIndex} of {totalItems} entries
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
        <button
          type="button"
          onClick={handlePreviousPageClick}
          disabled={currentPageNumber === 1}
          className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] border border-white/10 bg-[#091e29] text-white transition disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10 md:h-11 md:w-11"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>

        {pageNumbers.map((pageNumber) => {
          const isActivePage = currentPageNumber === pageNumber;

          return (
            <button
              key={pageNumber}
              type="button"
              onClick={() => handlePageButtonClick(pageNumber)}
              className={joinClasses(
                "inline-flex h-9 min-w-[38px] items-center justify-center rounded-[12px] border px-3 text-[13px] font-semibold transition sm:h-10 sm:min-w-[40px] sm:text-[14px] md:h-11 md:min-w-[44px] md:px-4 md:text-[15px]",
                isActivePage
                  ? "border-[#12dfff] bg-[#12dfff] text-[#04141c]"
                  : "border-white/10 bg-[#091e29] text-white"
              )}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          type="button"
          onClick={handleNextPageClick}
          disabled={currentPageNumber === totalPageCount}
          className="inline-flex h-9 w-9 items-center justify-center rounded-[12px] border border-white/10 bg-[#091e29] text-white transition disabled:cursor-not-allowed disabled:opacity-40 sm:h-10 sm:w-10 md:h-11 md:w-11"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
}