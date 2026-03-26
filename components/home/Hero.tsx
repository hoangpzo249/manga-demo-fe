"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Play, Bookmark } from "lucide-react";
import { Comic } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HeroProps {
  comics: Comic[];
}

export default function Hero({ comics }: HeroProps) {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredComics = comics.slice(0, 5);
  const featured = featuredComics[featuredIndex] || featuredComics[0];

  if (!featured) return null;

  return (
    <section className="relative min-h-[40vh] lg:min-h-[60vh] w-full overflow-hidden flex items-center">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={featured.cover_url}
          alt={featured.title}
          className="w-full h-full object-cover blur-[2px] opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(14,165,233,0.15)_0%,transparent_50%)]"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center pt-20 md:pt-24 lg:pt-12 pb-8 lg:pb-12">
        {/* Content Area */}
        <div className="lg:col-span-7 space-y-6 lg:space-y-10">

          <div className="space-y-4 lg:space-y-6">
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {(featured.genres || "").split(',').map((genre, i) => (
                <span key={i} className="px-3 py-1 lg:px-4 lg:py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-slate-100 hover:bg-slate-700/50 transition-all cursor-default">
                  {genre.trim()}
                </span>
              ))}
              <span className="px-3 py-1 lg:px-4 lg:py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-yellow-500 flex items-center gap-1.5 lg:gap-2">
                <Star className="w-3 h-3 fill-current" />
                {featured.rating}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-display font-bold leading-tight tracking-tighter text-slate-100 line-clamp-2 lg:line-clamp-1">
              {featured.title}
            </h1>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-sky-500/20"></div>
            <p className="text-slate-300 text-sm md:text-lg lg:text-xl max-w-xl leading-relaxed font-medium pl-6 line-clamp-2 lg:line-clamp-3">
              {featured.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 lg:gap-8 pt-2 lg:pt-6">
            <Link
              href={`/comic/${featured.id}`}
              className="group relative bg-slate-100 text-black px-8 py-4 lg:px-14 lg:py-6 rounded-full font-bold text-[10px] lg:text-xs tracking-[0.2em] overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
            >
              <span className="relative z-10 flex items-center gap-2 lg:gap-3">
                <Play className="w-4 h-4 lg:w-5 lg:h-5 fill-current" />
                START READING
              </span>
            </Link>
            
            <button className="group flex items-center gap-3 lg:gap-4 text-slate-100/60 hover:text-sky-500 transition-all font-bold text-[10px] lg:text-xs tracking-[0.2em]">
              <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-full border border-slate-700/50 flex items-center justify-center group-hover:border-sky-500/50 group-hover:bg-sky-500/5 transition-all">
                <Bookmark className="w-4 h-4 lg:w-6 lg:h-6 group-hover:fill-current" />
              </div>
              <span className="hidden sm:inline">SAVE TO LIBRARY</span>
              <span className="sm:hidden">SAVE</span>
            </button>
          </div>
        </div>

        {/* Poster Area */}
        <div className="lg:col-span-5 relative flex flex-col lg:flex-row items-center justify-end gap-4 lg:gap-8 mt-6 lg:mt-0">
          <div className="hidden lg:block relative group w-full max-w-[240px] lg:max-w-[380px]">
            {/* Glow Effect */}
            <div className="absolute -inset-20 bg-sky-500/20 blur-[120px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse"></div>
            
            <div className="relative aspect-[3/4] w-full rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] border-[12px] border-slate-100/5 transform transition-all duration-1000 group-hover:-translate-y-4">
              <img 
                src={featured.cover_url} 
                alt={featured.title}
                className="w-full h-full object-cover transition-transform duration-1000" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Thumbnail Selector */}
          <div className="flex flex-row lg:flex-col gap-4 lg:gap-3 shrink-0 z-20 overflow-x-auto lg:overflow-visible w-full lg:w-auto py-4 lg:py-4 px-4 lg:px-0 no-scrollbar">
            {featuredComics.map((comic, idx) => (
              <button
                key={comic.id}
                onClick={() => setFeaturedIndex(idx)}
                className={cn(
                  "group flex flex-col items-center gap-2 transition-all duration-300",
                  featuredIndex === idx ? "scale-110 z-10" : "opacity-50 hover:opacity-100 hover:scale-105"
                )}
              >
                <div className={cn(
                  "relative flex-shrink-0 w-16 h-24 sm:w-20 sm:h-28 rounded-2xl overflow-hidden border-2 transition-all duration-300",
                  featuredIndex === idx 
                    ? "border-sky-500" 
                    : "border-slate-700/50"
                )}>
                  <img 
                    src={comic.cover_url} 
                    alt={comic.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="lg:hidden text-[9px] font-bold text-slate-300 line-clamp-1 w-16 sm:w-20 text-center">
                  {comic.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
