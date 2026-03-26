"use client";

import { useState, useEffect } from "react";
import { Comic, Chapter } from "@/types";
import Link from "next/link";
import { Star, Clock, ChevronDown } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAuth } from "@/app/AuthContext";

import { HeroBackdrop } from "@/components/comic-detail/HeroBackdrop";
import { PosterSection } from "@/components/comic-detail/PosterSection";
import { ActionButtons } from "@/components/comic-detail/ActionButtons";
import { ComicStats } from "@/components/comic-detail/ComicStats";
import { TabSystem } from "@/components/comic-detail/TabSystem";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function TimeAgo({ dateString }: { dateString: string }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="flex items-center gap-3 text-slate-100/60 font-bold text-xs tracking-widest uppercase">
      <Clock className="w-4 h-4 text-sky-500" />
      Updated ...
    </div>;
  }

  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  let timeStr = "recently";
  if (diffInDays > 0) timeStr = `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;

  return (
    <div className="flex items-center gap-3 text-slate-100/60 font-bold text-xs tracking-widest uppercase">
      <Clock className="w-4 h-4 text-sky-500" />
      Updated {timeStr}
    </div>
  );
}

export default function ComicDetailClient({ comic }: { comic: Comic & { chapters: Chapter[] } }) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleFavorite = () => {
    if (!user) {
      alert("Please login to add to favorites");
      return;
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen pb-20">
      <HeroBackdrop comic={comic} />

      <div className="max-w-7xl mx-auto px-4 pt-4 md:pt-8 lg:pt-0 lg:-mt-48 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Column: Poster & Actions */}
          <div className="md:col-span-5 lg:col-span-4 xl:col-span-3 space-y-4 lg:space-y-6">
            <PosterSection comic={comic} />
            
            <ActionButtons comic={comic} isFavorite={isFavorite} toggleFavorite={toggleFavorite} />

            <ComicStats comic={comic} />
          </div>

          {/* Right Column: Content */}
          <div className="md:col-span-7 lg:col-span-8 xl:col-span-9 space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 lg:gap-3">
                {(comic.genres || "").split(',').map((genre, i) => (
                  <Link
                    key={i}
                    href={`/browse?genre=${genre.trim()}`}
                    className="px-3 py-1 lg:px-4 lg:py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-slate-100/60 hover:text-sky-500 hover:border-sky-500/30 transition-all"
                  >
                    {genre.trim()}
                  </Link>
                ))}
              </div>

              {/* Desktop Title (Hidden on mobile) */}
              <div className="hidden md:block space-y-3">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold tracking-tighter text-slate-100 leading-none">
                  {comic.title}
                </h1>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                    {comic.status}
                  </span>
                  <p className="text-slate-400 font-medium text-sm md:text-base">
                    {comic.title} (Official), {comic.title} (Raw)
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 lg:gap-8">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={cn(
                          "w-5 h-5",
                          star <= Math.round(comic.rating / 2) 
                            ? "fill-yellow-500 text-yellow-500" 
                            : "fill-white/10 text-slate-100/10"
                        )} 
                      />
                    ))}
                  </div>
                  <span className="text-xl font-bold text-slate-100 ml-2">{comic.rating}</span>
                  <span className="text-slate-400 font-medium text-sm">(1,245 ratings)</span>
                </div>

                <div className="h-6 w-px bg-slate-700/50"></div>

                <TimeAgo dateString={comic.created_at} />
              </div>
            </div>

            <div className="relative group">
              <div className={cn(
                "text-lg md:text-xl text-slate-300 leading-relaxed font-medium transition-all duration-500",
                !isDescriptionExpanded && "line-clamp-3"
              )}>
                {comic.description}
              </div>
              <button 
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="mt-4 text-sky-500 font-bold text-[10px] tracking-widest uppercase flex items-center gap-2 hover:gap-4 transition-all"
              >
                {isDescriptionExpanded ? "Show Less" : "Read Full Description"}
                <ChevronDown className={cn("w-4 h-4 transition-transform", isDescriptionExpanded && "rotate-180")} />
              </button>
            </div>

            <TabSystem comic={comic} />
          </div>
        </div>
      </div>
    </div>
  );
}
