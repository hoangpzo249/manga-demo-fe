"use client";

import { useState, useEffect } from "react";
import { Comic, Chapter } from "@/types";
import Link from "next/link";
import { ChevronDown, ChevronRight, MessageSquare } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MangaCard } from "@/components/shared/MangaCard";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function FormattedDate({ dateString }: { dateString: string }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <span className="text-[10px] font-medium text-slate-100/30 uppercase tracking-widest mt-1">...</span>;
  }

  return (
    <p className="text-[10px] font-medium text-slate-100/30 uppercase tracking-widest mt-1">
      {new Date(dateString).toLocaleDateString()}
    </p>
  );
}

export function TabSystem({ comic }: { comic: Comic & { chapters: Chapter[] } }) {
  const [activeTab, setActiveTab] = useState<'chapters' | 'comments' | 'related'>('chapters');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedChapters = [...comic.chapters].sort((a, b) => 
    sortOrder === 'desc' 
      ? b.chapter_number - a.chapter_number 
      : a.chapter_number - b.chapter_number
  );

  // Mock related comics
  const relatedComics: Comic[] = Array(6).fill(null).map((_, i) => ({
    ...comic,
    id: `related-${i}`,
    title: `${comic.title} - Similar ${i + 1}`,
  }));

  return (
    <div className="pt-8 space-y-6">
      <div className="flex items-center gap-10 border-b border-slate-700/50 overflow-x-auto no-scrollbar">
        {(['chapters', 'comments', 'related'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "pb-6 text-xs font-bold uppercase tracking-[0.2em] transition-all relative whitespace-nowrap",
              activeTab === tab 
                ? "text-slate-100" 
                : "text-slate-400 hover:text-slate-300"
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-sky-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]"></div>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'chapters' && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold uppercase tracking-tighter text-slate-100">
              {comic.chapters.length} Chapters
            </h3>
            <button 
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-100 transition-all"
            >
              Sort: {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
              <ChevronDown className={cn("w-4 h-4 transition-transform", sortOrder === 'asc' && "rotate-180")} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sortedChapters.map((chapter) => (
              <Link
                key={chapter.id}
                href={`/comic/${comic.id}/chapter/${chapter.chapter_number}`}
                className="group flex items-center justify-between p-4 rounded-2xl bg-slate-800/50 border border-slate-100/5 hover:border-sky-500/30 hover:bg-sky-500/5 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center font-bold text-xs text-slate-400 group-hover:text-sky-500 transition-colors">
                    {chapter.chapter_number}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-100 group-hover:text-sky-500 transition-colors">
                      Chapter {chapter.chapter_number}
                    </h4>
                    <FormattedDate dateString={chapter.created_at} />
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'comments' && (
        <div className="py-20 text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-20 h-20 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center mx-auto">
            <MessageSquare className="w-8 h-8 text-slate-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-100 tracking-tighter">No comments yet</h3>
            <p className="text-slate-400 font-medium">Be the first to share your thoughts!</p>
          </div>
          <button className="px-8 py-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-slate-100 font-bold text-xs tracking-widest uppercase hover:bg-slate-700/50 transition-all">
            Post a Comment
          </button>
        </div>
      )}

      {activeTab === 'related' && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {relatedComics.map((relatedComic, index) => (
            <MangaCard key={relatedComic.id} comic={relatedComic} variant="default" index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
