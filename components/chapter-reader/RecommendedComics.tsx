import { Comic } from "@/types";
import { MangaCard } from "@/components/shared/MangaCard";

export function RecommendedComics({ currentComic }: { currentComic: Comic }) {
  // Generate 6 mock comics based on the current one for demonstration
  const recommendedComics: Comic[] = Array(6).fill(null).map((_, i) => ({
    ...currentComic,
    id: `rec-${i}`,
    title: `Recommended Comic ${i + 1}`,
    views: Math.floor(Math.random() * 500000) + 10000,
    rating: Number((Math.random() * 2 + 3).toFixed(1)),
  }));

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16 border-t border-slate-800/50 mb-20 sm:mb-0">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tighter text-slate-100">
          You May Also Like
        </h2>
        <div className="w-12 h-1 bg-sky-500 rounded-full mt-2"></div>
      </div>
      
      {/* Mobile: Horizontal scroll, Desktop: 6-column grid */}
      <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 pb-4 sm:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-4 px-4 sm:mx-0 sm:px-0">
        {recommendedComics.map((comic, index) => (
          <div key={comic.id} className="w-[140px] sm:w-auto flex-shrink-0">
            <MangaCard comic={comic} variant="default" index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
