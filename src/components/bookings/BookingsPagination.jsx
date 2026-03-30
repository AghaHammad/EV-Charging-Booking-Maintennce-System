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
  return (
    <div className="flex flex-col gap-4 border-t border-white/5 px-6 py-5 md:flex-row md:items-center md:justify-between">
      <div className="text-[14px] text-white/46">
        Showing {visibleStartIndex} to {visibleEndIndex} of {totalItems} entries
      </div>

      <div className="flex items-center justify-start gap-2 md:justify-end">
        <button
          onClick={handlePreviousPageClick}
          disabled={currentPageNumber === 1}
          className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/10 bg-[#091e29] text-white transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {Array.from({ length: totalPageCount }).map((_, index) => {
          const pageNumber = index + 1;
          const isActivePage = currentPageNumber === pageNumber;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageButtonClick(pageNumber)}
              className={joinClasses(
                "flex h-11 min-w-[44px] items-center justify-center rounded-[14px] border px-4 text-[15px] font-semibold transition",
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
          onClick={handleNextPageClick}
          disabled={currentPageNumber === totalPageCount}
          className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-white/10 bg-[#091e29] text-white transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
