import Link from "next/link";
import { Star } from "lucide-react";
import { Comic } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
}

function TimeAgo({ dateString }: { dateString: string }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="text-slate-100/60 shrink-0 ml-2">...</span>;
  }

  return <span className="text-slate-100/60 shrink-0 ml-2">{formatTimeAgo(dateString)}</span>;
}

interface MangaCardProps {
  comic: Comic;
  variant?: "default" | "compact" | "long" | "ranking" | "browse" | "update";
  index?: number;
}

export function MangaCard({ comic, variant = "default", index = 0 }: MangaCardProps) {
  if (variant === "update") {
    return (
      <div className="flex flex-col group w-full mb-4 lg:mb-0">
        <Link href={`/comic/${comic.id}`} className="relative aspect-[3/4] w-full rounded-xl overflow-hidden mb-3">
          <img 
            src={comic.cover_url} 
            alt={comic.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          {/* Gradient Overlay for rating */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100"></div>
          {/* Rating */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-yellow-500 text-[10px] font-bold">
            <Star className="w-3 h-3 fill-current" />
            {comic.rating}
          </div>
        </Link>
        <Link href={`/comic/${comic.id}`}>
          <h3 className="font-semibold text-sm sm:text-base text-slate-100 group-hover:text-sky-500 transition-colors line-clamp-2 md:line-clamp-1 mb-2">
            {comic.title}
          </h3>
        </Link>
        <div className="flex flex-col gap-1.5">
          {comic.chapters?.slice(0, 2).map((chapter) => (
            <Link 
              key={chapter.id} 
              href={`/comic/${comic.id}/chapter/${chapter.chapter_number}`}
              className="flex items-center justify-between bg-white/5 hover:bg-sky-500/20 px-2 py-1.5 rounded transition-colors text-[11px] sm:text-xs text-slate-300 hover:text-sky-400 font-medium"
            >
              <span className="truncate">Ch. {chapter.chapter_number}</span>
              <TimeAgo dateString={chapter.created_at} />
            </Link>
          ))}
          {(!comic.chapters || comic.chapters.length === 0) && (
             <div className="text-[11px] text-slate-500 italic px-2">No chapters yet</div>
          )}
        </div>
      </div>
    );
  }

  if (variant === "long") {
    return (
      <div>
        <Link 
          href={`/comic/${comic.id}`}
          className="group flex gap-4 p-3 rounded-2xl transition-all h-full"
        >
          <div className="relative flex-shrink-0 w-24 h-36 sm:w-28 sm:h-40 rounded-xl overflow-hidden border border-slate-700/50">
            <img 
              src={comic.cover_url} 
              alt={comic.title}
              className="w-full h-full object-cover transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
          </div>
          <div className="flex-1 min-w-0 py-1 flex flex-col">
            <h3 className="font-semibold text-base sm:text-lg text-slate-100 group-hover:text-sky-500 transition-colors line-clamp-2 mb-1 tracking-tight">
              {comic.title}
            </h3>
            
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={cn(
                    "w-3 h-3",
                    star <= Math.round(comic.rating / 2) 
                      ? "fill-yellow-500 text-yellow-500" 
                      : "fill-white/10 text-slate-100/10"
                  )} 
                />
              ))}
              <span className="text-[10px] font-medium text-slate-300 ml-1">{comic.rating}</span>
            </div>

            <div className="mt-auto space-y-2">
              {comic.chapters?.slice(0, 3).map((chapter) => (
                <div key={chapter.id} className="flex items-center justify-between text-[11px] font-medium text-slate-100/80 hover:text-sky-500 transition-colors">
                  <span className="truncate">Chapter {chapter.chapter_number}</span>
                  <TimeAgo dateString={chapter.created_at} />
                </div>
              ))}
              {(!comic.chapters || comic.chapters.length === 0) && (
                <div className="text-[11px] font-medium text-slate-100/60">
                  No chapters yet
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>
    );
  }

  if (variant === "ranking") {
    return (
      <div>
        <Link 
          href={`/comic/${comic.id}`}
          className="group flex items-center gap-4 p-2 rounded-2xl transition-all hover:bg-slate-800/30"
        >
          <div className="w-6 text-center font-display font-bold text-xl text-slate-500 group-hover:text-sky-500 transition-colors">
            {index + 1}
          </div>
          <div className="relative flex-shrink-0 w-12 h-16 rounded-xl overflow-hidden border border-slate-700/50">
            <img 
              src={comic.cover_url} 
              alt={comic.title}
              className="w-full h-full object-cover transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-slate-100 group-hover:text-sky-500 transition-colors line-clamp-1 mb-1 tracking-tight">
              {comic.title}
            </h4>
            <div className="flex items-center gap-1 mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={cn(
                    "w-2.5 h-2.5",
                    star <= Math.round(comic.rating / 2) 
                      ? "fill-yellow-500 text-yellow-500" 
                      : "fill-white/10 text-slate-100/10"
                  )} 
                />
              ))}
              <span className="text-[9px] font-bold text-slate-300 ml-1">{comic.rating}</span>
            </div>
            <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
              <span className="truncate">{(comic.genres || "").split(',').slice(0, 3).join(', ')}</span>
            </div>
          </div>
        </Link>
      </div>
    );
  }

  if (variant === "browse") {
    return (
      <div className="group relative">
        <Link href={`/comic/${comic.id}`}>
          <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-4 border border-slate-100/5 transition-all duration-500">
            <img
              src={comic.cover_url}
              alt={comic.title}
              className="w-full h-full object-cover transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
            
            {/* Rating Badge */}
            <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-slate-700/50 flex items-center gap-1.5">
              <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
              <span className="text-[10px] font-bold text-slate-100">{comic.rating}</span>
            </div>

            {/* Type Badge */}
            {comic.type && (
              <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-sky-500 text-slate-100 text-[8px] font-bold uppercase tracking-widest">
                {comic.type}
              </div>
            )}
          </div>
          
          <div className="px-1">
            <h3 className="font-semibold text-base text-slate-100 group-hover:text-sky-500 transition-colors mb-2 tracking-tight line-clamp-2">
              {comic.title}
            </h3>
            
            {/* 3 Latest Chapters */}
            {comic.chapters && comic.chapters.length > 0 && (
              <div className="flex flex-col gap-1.5 mt-2">
                {[...comic.chapters].sort((a, b) => b.chapter_number - a.chapter_number).slice(0, 3).map((chapter) => (
                  <div key={chapter.id} className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 hover:text-sky-500 transition-colors line-clamp-1">
                      Chapter {chapter.chapter_number}
                    </span>
                    <TimeAgo dateString={chapter.created_at} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="group relative">
      <Link href={`/comic/${comic.id}`}>
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 border border-slate-100/5 transition-all duration-500">
          <img
            src={comic.cover_url}
            alt={comic.title}
            className="w-full h-full object-cover transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
          
          <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            {variant === "compact" && (
              <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-sky-500 transition-colors tracking-tight">
                {comic.title}
              </h3>
            )}
          </div>
        </div>
        
        {variant === "default" && (
          <div className="px-2">
            <h3 className="font-semibold text-lg text-slate-100 group-hover:text-sky-500 transition-colors mb-2 tracking-tight line-clamp-2">
              {comic.title}
            </h3>
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={cn(
                    "w-3 h-3",
                    star <= Math.round(comic.rating / 2) 
                      ? "fill-yellow-500 text-yellow-500" 
                      : "fill-white/10 text-slate-100/10"
                  )} 
                />
              ))}
              <span className="text-[10px] font-bold text-slate-300 ml-1">{comic.rating}</span>
            </div>
            {comic.chapters && comic.chapters.length > 0 && (
              <div className="flex items-center justify-between text-[11px] font-medium text-slate-100/80 hover:text-sky-500 transition-colors mt-2">
                <span className="truncate">Chapter {comic.chapters[0].chapter_number}</span>
              </div>
            )}
          </div>
        )}
      </Link>
    </div>
  );
}
