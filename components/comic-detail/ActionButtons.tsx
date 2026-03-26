import { Comic, Chapter } from "@/types";
import { Heart, Share2, Flag, Play, Bookmark } from "lucide-react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ActionButtonsProps {
  comic: Comic & { chapters: Chapter[] };
  isFavorite: boolean;
  toggleFavorite: () => void;
}

export function ActionButtons({ comic, isFavorite, toggleFavorite }: ActionButtonsProps) {
  const firstChapter = comic.chapters.length > 0 ? Math.min(...comic.chapters.map(c => c.chapter_number)) : null;
  const latestChapter = comic.chapters.length > 0 ? Math.max(...comic.chapters.map(c => c.chapter_number)) : null;

  return (
    <div className="space-y-4">
      {/* Read Buttons */}
      <div className="flex flex-col gap-3">
        {firstChapter !== null && (
          <Link
            href={`/comic/${comic.id}/chapter/${firstChapter}`}
            className="group relative bg-sky-500 text-slate-100 px-6 py-4 rounded-2xl font-bold text-xs tracking-[0.2em] overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 text-center flex justify-center items-center"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play className="w-4 h-4 fill-current" />
              READ FIRST
            </span>
          </Link>
        )}
        {latestChapter !== null && (
          <Link
            href={`/comic/${comic.id}/chapter/${latestChapter}`}
            className="group relative bg-slate-800/50 border border-slate-700/50 text-slate-100 px-6 py-4 rounded-2xl font-bold text-xs tracking-[0.2em] overflow-hidden transition-all duration-300 hover:bg-slate-700/50 hover:scale-105 active:scale-95 text-center flex justify-center items-center"
          >
            <span className="relative z-10 flex items-center gap-2">
              READ LATEST
            </span>
          </Link>
        )}
      </div>

      {/* Secondary Actions */}
      <div className="grid grid-cols-3 gap-2">
        <button 
          onClick={toggleFavorite}
          className={cn(
            "flex flex-col items-center justify-center gap-2 py-3 rounded-2xl border transition-all font-bold text-[9px] tracking-widest uppercase",
            isFavorite 
              ? "bg-sky-500 border-sky-500 text-slate-100 shadow-lg shadow-sky-500/20" 
              : "bg-slate-800/50 border-slate-700/50 text-slate-300 hover:bg-slate-700/50"
          )}
        >
          <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
          {isFavorite ? "FAVORITED" : "FAVORITE"}
        </button>
        <button className="flex flex-col items-center justify-center gap-2 py-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-slate-700/50 transition-all font-bold text-[9px] tracking-widest uppercase">
          <Share2 className="w-4 h-4" />
          SHARE
        </button>
        <button className="flex flex-col items-center justify-center gap-2 py-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all font-bold text-[9px] tracking-widest uppercase">
          <Flag className="w-4 h-4" />
          REPORT
        </button>
      </div>
    </div>
  );
}
