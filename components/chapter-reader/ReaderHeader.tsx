import { Chapter } from "@/types";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChapterDropdown } from "./ChapterDropdown";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ReaderHeaderProps {
  comicId: string;
  comicTitle: string;
  currentChapter: number;
  chapters: Chapter[];
  showControls: boolean;
  scrollProgress: number;
  onChapterSelect: (val: number) => void;
}

export function ReaderHeader({
  comicId,
  comicTitle,
  currentChapter,
  chapters,
  showControls,
  scrollProgress,
  onChapterSelect
}: ReaderHeaderProps) {
  const prevChapter = chapters.find(c => c.chapter_number === currentChapter - 1);
  const nextChapter = chapters.find(c => c.chapter_number === currentChapter + 1);

  return (
    <>
      {/* Top Bar (Desktop/Tablet) */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-slate-100/5 transition-all duration-500 hidden sm:block",
        showControls ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <Link href={`/comic/${comicId}`} className="p-2 hover:bg-slate-800/50 rounded-xl transition-all group">
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
            <h1 className="text-sm font-bold uppercase tracking-tighter line-clamp-1">{comicTitle}</h1>
          </div>

          <div className="flex items-center justify-center gap-2 flex-1">
            <Link href={prevChapter ? `/comic/${comicId}/chapter/${prevChapter.chapter_number}` : '#'} className={cn("p-2 rounded-xl transition-all", prevChapter ? "hover:bg-slate-800/50 text-slate-100" : "opacity-50 pointer-events-none text-slate-500")}><ChevronLeft className="w-5 h-5" /></Link>
            <ChapterDropdown 
              currentChapter={currentChapter} 
              chapters={chapters} 
              onSelect={onChapterSelect} 
              variant="default"
              direction="down"
            />
            <Link href={nextChapter ? `/comic/${comicId}/chapter/${nextChapter.chapter_number}` : '#'} className={cn("p-2 rounded-xl transition-all", nextChapter ? "hover:bg-slate-800/50 text-slate-100" : "opacity-50 pointer-events-none text-slate-500")}><ChevronRight className="w-5 h-5" /></Link>
          </div>

          <div className="flex items-center justify-end gap-2 flex-1">
            {/* Empty space to balance the flex layout */}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-sky-500 transition-all duration-300" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      {/* Mobile Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50 sm:hidden">
        <div className="h-full bg-sky-500 transition-all duration-300" style={{ width: `${scrollProgress}%` }}></div>
      </div>
    </>
  );
}
