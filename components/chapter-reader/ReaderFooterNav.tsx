import Link from "next/link";
import { Chapter } from "@/types";
import { ChevronLeft, ChevronRight, Home, MessageSquare, Share2 } from "lucide-react";

interface ReaderFooterNavProps {
  comicId: string;
  currentChapter: number;
  chapters: Chapter[];
}

export function ReaderFooterNav({ comicId, currentChapter, chapters }: ReaderFooterNavProps) {
  const prevChapter = chapters.find(c => c.chapter_number === currentChapter - 1);
  const nextChapter = chapters.find(c => c.chapter_number === currentChapter + 1);

  return (
    <div className="mt-12 sm:mt-20 px-4 space-y-8 sm:space-y-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        {prevChapter ? (
          <Link
            href={`/comic/${comicId}/chapter/${prevChapter.chapter_number}`}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 sm:gap-3 py-4 sm:py-6 rounded-2xl sm:rounded-3xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-all group"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-2 transition-transform" />
            <div className="text-left">
              <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">Previous</p>
              <p className="font-bold text-xs sm:text-sm">Chapter {prevChapter.chapter_number}</p>
            </div>
          </Link>
        ) : <div className="hidden sm:block flex-1"></div>}

        {nextChapter ? (
          <Link
            href={`/comic/${comicId}/chapter/${nextChapter.chapter_number}`}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 sm:gap-3 py-4 sm:py-6 rounded-2xl sm:rounded-3xl bg-sky-500 border border-sky-500 hover:bg-sky-600 transition-all group shadow-lg shadow-sky-500/20"
          >
            <div className="text-right">
              <p className="text-[9px] sm:text-[10px] font-bold text-slate-100/80 uppercase tracking-widest">Next</p>
              <p className="font-bold text-xs sm:text-sm">Chapter {nextChapter.chapter_number}</p>
            </div>
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        ) : (
          <Link
            href={`/comic/${comicId}`}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 sm:gap-3 py-4 sm:py-6 rounded-2xl sm:rounded-3xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-all group"
          >
            <div className="text-right">
              <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest">End of Chapters</p>
              <p className="font-bold text-xs sm:text-sm">Back to Info</p>
            </div>
            <Home className="w-5 h-5 sm:w-6 sm:h-6" />
          </Link>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-all text-[10px] font-bold uppercase tracking-widest">
          <MessageSquare className="w-4 h-4" />
          Comments
        </button>
        <button className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-all text-[10px] font-bold uppercase tracking-widest">
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  );
}
