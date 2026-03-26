import { useState, useEffect, useRef } from "react";
import { Chapter } from "@/types";
import { ChevronDown } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ChapterDropdown({ 
  currentChapter, 
  chapters, 
  onSelect,
  direction = "down",
  variant = "default"
}: { 
  currentChapter: number, 
  chapters: Chapter[], 
  onSelect: (val: number) => void,
  direction?: "down" | "up",
  variant?: "default" | "ghost"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 transition-colors",
          variant === "default" 
            ? "bg-slate-800/50 border border-slate-700/50 text-sky-500 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:border-sky-500"
            : "text-[10px] font-bold uppercase tracking-widest text-sky-500 hover:text-sky-400 px-2 py-1"
        )}
      >
        {variant === "default" ? `Ch. ${currentChapter}` : `Chapter ${currentChapter}`}
        <ChevronDown className={cn("w-3 h-3 transition-transform", isOpen && (direction === "down" ? "rotate-180" : "-rotate-180"))} />
      </button>
      
      <div className={cn(
        "absolute transition-all duration-300 z-50",
        direction === "down" ? "top-full pt-2 left-0" : "bottom-full pb-2 left-1/2 -translate-x-1/2",
        isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible " + (direction === "down" ? "-translate-y-2" : "translate-y-2")
      )}>
        <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-2 shadow-2xl w-48 max-h-[40vh] overflow-y-auto flex flex-col gap-1 custom-scrollbar">
          {chapters.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                onSelect(c.chapter_number);
                setIsOpen(false);
              }}
              className={cn(
                "w-full text-left px-3 py-2 rounded-xl transition-colors text-xs font-medium",
                currentChapter === c.chapter_number 
                  ? "bg-sky-500/10 text-sky-500" 
                  : "text-slate-100 hover:bg-slate-800/50 hover:text-sky-500"
              )}
            >
              Chapter {c.chapter_number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
