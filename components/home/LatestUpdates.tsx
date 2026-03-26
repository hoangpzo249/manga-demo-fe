"use client";

import { useState } from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import { Comic } from "@/types";
import { MangaCard } from "@/components/shared/MangaCard";

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl md:text-3xl font-display font-bold flex items-center gap-3 md:gap-4">
        <span className="w-1.5 md:w-2 h-8 md:h-10 bg-sky-500 rounded-full"></span>
        {title}
      </h2>
      <Link href="/browse" className="group flex items-center gap-2 text-slate-300 hover:text-sky-500 transition-all font-bold uppercase tracking-widest text-[10px] md:text-xs">
        View All
        <Play className="w-3 h-3 fill-current group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}

interface LatestUpdatesProps {
  comics: Comic[];
}

export default function LatestUpdates({ comics }: LatestUpdatesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  
  const totalPages = Math.ceil(comics.length / itemsPerPage);
  const newReleases = comics.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <section className="relative w-full">
      <SectionHeader title="Latest Updates" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {newReleases.map((comic) => (
          <MangaCard key={comic.id} comic={comic} variant="update" />
        ))}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-bold"
          >
            Prev
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                  currentPage === i + 1 
                    ? 'bg-sky-500 text-slate-100' 
                    : 'bg-slate-800/50 text-slate-100/90 hover:bg-slate-700/50 hover:text-slate-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-bold"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
