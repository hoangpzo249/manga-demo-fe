import { Comic } from "@/types";
import { MangaCard } from "@/components/shared/MangaCard";
import { Search } from "lucide-react";

interface MangaGridProps {
  comics: Comic[];
  onClearFilters: () => void;
}

export function MangaGrid({ comics, onClearFilters }: MangaGridProps) {
  if (comics.length === 0) {
    return (
      <div className="py-32 text-center">
        <div className="w-24 h-24 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center mx-auto mb-8">
          <Search className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-2xl font-bold text-slate-100 mb-2 tracking-tighter">No results found</h3>
        <p className="text-slate-400 font-medium">Try adjusting your filters or search query</p>
        <button 
          onClick={onClearFilters}
          className="mt-8 px-8 py-4 rounded-2xl bg-slate-100 text-black font-bold text-xs tracking-widest uppercase hover:scale-105 transition-all"
        >
          Clear All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {comics.map((comic) => (
        <MangaCard key={comic.id} comic={comic} variant="browse" />
      ))}
    </div>
  );
}
