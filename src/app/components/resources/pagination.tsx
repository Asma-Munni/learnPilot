import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  // If there are no items or only 1 page, we can still show a minimal message or simplify layout
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers array
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  if (totalPages <= 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-6 mt-10">
      
      {/* Results information summary */}
      <p className="text-sm font-semibold text-slate-500 order-2 sm:order-1">
        Showing <span className="text-slate-900 font-bold">{startItem}–{endItem}</span> of{" "}
        <span className="text-slate-900 font-bold">{totalItems}</span> resources
      </p>

      {/* Pagination Controls */}
      <nav
        aria-label="Resources pagination"
        className="inline-flex items-center gap-1.5 order-1 sm:order-2"
      >
        
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <span className="sr-only">Previous page</span>
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Numbered Page Buttons */}
        {pageNumbers.map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={isActive ? "page" : undefined}
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold shadow-sm transition duration-200 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-indigo-600/10"
                  : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <span className="sr-only">Next page</span>
          <ChevronRight className="h-4 w-4" />
        </button>

      </nav>
    </div>
  );
}
