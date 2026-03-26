import Link from "next/link";
import { Chapter } from "@/types";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChapterDropdown } from "./ChapterDropdown";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MobileFloatingControlsProps {
  comicId: string;
  currentChapter: number;
  chapters: Chapter[];
  showControls: boolean;
  onChapterSelect: (val: number) => void;
}

export function MobileFloatingControls({
  comicId,
  currentChapter,
  chapters,
  showControls,
  onChapterSelect
}: MobileFloatingControlsProps) {
  const prevChapter = chapters.find(c => c.chapter_number === currentChapter - 1);
  const nextChapter = chapters.find(c => c.chapter_number === currentChapter + 1);

  return (
    <div className={cn(
      "fixed bottom-6 left-4 right-4 z-50 flex items-center justify-between px-2 py-2 bg-black/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl transition-all duration-500 sm:hidden shadow-2xl",
      showControls ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
    )}>
      <Link href={`/comic/${comicId}`} className="p-3 rounded-xl hover:bg-slate-800/50 transition-all text-slate-100 flex-shrink-0">
        <Home className="w-6 h-6" />
      </Link>
      <div className="h-8 w-px bg-slate-700/50 mx-1"></div>
      <div className="flex items-center justify-center gap-1 flex-1">
        <Link href={prevChapter ? `/comic/${comicId}/chapter/${prevChapter.chapter_number}` : '#'} className={cn("p-3 rounded-xl transition-all", prevChapter ? "hover:bg-slate-800/50 text-slate-100" : "opacity-50 pointer-events-none text-slate-500")}><ChevronLeft className="w-7 h-7" /></Link>
        <div className="flex-1 flex justify-center">
          <ChapterDropdown 
            currentChapter={currentChapter} 
            chapters={chapters} 
            onSelect={onChapterSelect} 
            variant="default"
            direction="up"
          />
        </div>
        <Link href={nextChapter ? `/comic/${comicId}/chapter/${nextChapter.chapter_number}` : '#'} className={cn("p-3 rounded-xl transition-all", nextChapter ? "hover:bg-slate-800/50 text-slate-100" : "opacity-50 pointer-events-none text-slate-500")}><ChevronRight className="w-7 h-7" /></Link>
      </div>
    </div>
  );
}
