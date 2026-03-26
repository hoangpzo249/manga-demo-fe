import { Comic } from "@/types";
import { Star } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function HeroSection({ comic }: { comic: Comic }) {
  return (
    <>
      {/* Hero Backdrop (Desktop Only) */}
      <div className="hidden lg:block relative h-[30vh] lg:h-[35vh] w-full overflow-hidden">
        <img
          src={comic.cover_url}
          alt={comic.title}
          className="w-full h-full object-cover blur-lg opacity-40 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.15)_0%,transparent_70%)]"></div>
      </div>

      {/* Mobile: Side-by-side poster and title (Rendered inside the left column) */}
      <div className="flex gap-4 md:block">
        <div className="w-1/3 sm:w-1/4 md:w-full shrink-0">
          <div className="relative aspect-[3/4] rounded-xl lg:rounded-[2.5rem] overflow-hidden border-2 lg:border-8 border-slate-100/10 shadow-2xl">
            <img 
              src={comic.cover_url} 
              alt={comic.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
        </div>
        
        {/* Mobile Title & Quick Info (Hidden on md+) */}
        <div className="flex-1 md:hidden space-y-2 py-1">
          <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-tighter text-slate-100 leading-tight line-clamp-3">
            {comic.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[9px] font-bold uppercase tracking-widest border border-emerald-500/20">
              {comic.status}
            </span>
            <p className="text-slate-400 font-medium text-xs line-clamp-1">
              {comic.title} (Official), {comic.title} (Raw)
            </p>
          </div>
          <p className="text-slate-400 font-medium text-xs sm:text-sm line-clamp-1 mt-1">
            {comic.author}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="flex items-center gap-1 text-[10px] font-bold text-yellow-500">
              <Star className="w-3 h-3 fill-current" />
              {comic.rating}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
