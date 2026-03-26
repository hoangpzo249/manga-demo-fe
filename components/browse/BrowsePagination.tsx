import { ChevronLeft, ChevronRight } from "lucide-react";

interface BrowsePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function BrowsePagination({ currentPage, totalPages, onPageChange }: BrowsePaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-slate-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-none no-scrollbar">
        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNum = i + 1;
          // Show first, last, current, and adjacent pages
          if (
            pageNum === 1 || 
            pageNum === totalPages || 
            (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
          ) {
            return (
              <button
                key={i}
                onClick={() => onPageChange(pageNum)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all flex-shrink-0 ${
                  currentPage === pageNum 
                    ? 'bg-sky-500 text-slate-100 shadow-lg shadow-sky-500/20' 
                    : 'bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-slate-700/50 hover:text-slate-100'
                }`}
              >
                {pageNum}
              </button>
            );
          } else if (
            pageNum === currentPage - 2 || 
            pageNum === currentPage + 2
          ) {
            return <span key={i} className="px-2 text-slate-500">...</span>;
          }
          return null;
        })}
      </div>

      <button 
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-slate-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
