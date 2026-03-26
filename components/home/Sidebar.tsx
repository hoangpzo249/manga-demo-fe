"use client";

import { useState } from "react";
import Link from "next/link";
import { Comic } from "@/types";
import { MangaCard } from "@/components/shared/MangaCard";

interface SidebarProps {
  comics: Comic[];
}

export default function Sidebar({ comics }: SidebarProps) {
  const [rankingPeriod, setRankingPeriod] = useState<'week' | 'month' | 'all'>('week');
  
  const popular = [...comics].sort((a, b) => b.views - a.views).slice(0, 5);

  return (
    <aside className="lg:col-span-4 space-y-8">
      <div className="sticky top-24 border border-slate-700/30 rounded-3xl p-5 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold uppercase tracking-tighter text-slate-100">
            Popular
          </h2>

          {/* Period Toggle */}
          <div className="flex p-1 bg-slate-800/50 rounded-xl border border-slate-100/5">
            {(['week', 'month', 'all'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setRankingPeriod(period as any)}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${
                  rankingPeriod === period
                    ? 'bg-sky-500 text-slate-100 shadow-lg shadow-sky-500/20'
                    : 'text-slate-300 hover:text-slate-100/90'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {popular.slice(0, 7).map((comic, idx) => (
            <MangaCard key={comic.id} comic={comic} variant="ranking" index={idx} />
          ))}
        </div>

        <Link 
          href="/browse" 
          className="mt-8 block w-full py-4 rounded-2xl bg-slate-800/50 border border-slate-100/5 hover:border-sky-500/30 hover:bg-sky-500/5 transition-all text-center text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-sky-500"
        >
          View Full Ranking
        </Link>

        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold uppercase tracking-tighter text-slate-100">
              Genres
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {['Action', 'Adventure', 'Fantasy', 'Romance', 'Sci-Fi', 'Comedy', 'Drama', 'Horror'].map((genre) => (
              <Link
                key={genre}
                href={`/browse?genre=${genre}`}
                className="px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-100/5 hover:border-sky-500/30 hover:bg-sky-500/5 transition-all text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-sky-500"
              >
                {genre}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
