"use client";

import { useState, useRef, useEffect } from "react";
import { Filter, ChevronDown, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function FilterDropdown({ 
  value, 
  options, 
  onChange, 
  columns = 1 
}: { 
  value: string, 
  options: {label: string, value: string}[], 
  onChange: (val: string) => void,
  columns?: number
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

  const selectedLabel = options.find(o => o.value === value)?.label || value;

  return (
    <div className="relative w-full md:w-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between md:justify-start gap-2 w-full md:w-auto bg-slate-800/50 border border-slate-700/50 text-slate-300 px-4 py-3 md:py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-sky-500 hover:text-slate-100 transition-colors"
      >
        {selectedLabel}
        <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", isOpen && "rotate-180")} />
      </button>
      
      <div className={cn(
        "absolute top-full left-0 pt-2 transition-all duration-300 z-50 w-full md:w-auto",
        isOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
      )}>
        <div className={cn(
          "bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-2 shadow-2xl max-h-[300px] overflow-y-auto custom-scrollbar",
          columns === 2 ? "w-full md:w-80 grid grid-cols-2 gap-1" : "w-full md:min-w-[160px] flex flex-col gap-1"
        )}>
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={cn(
                "w-full text-left px-3 py-2 rounded-xl transition-colors text-xs font-medium",
                value === opt.value 
                  ? "bg-sky-500/10 text-sky-500" 
                  : "text-slate-100 hover:bg-slate-800/50 hover:text-sky-500"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const GENRES = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Martial Arts", "Mystery", "Psychological", "Romance", "Sci-Fi", "School Life", "Slice of Life", "Sports", "Supernatural", "Thriller"];
const STATUS = ["All", "Ongoing", "Completed"];
const TYPES = ["All", "Manga", "Manhwa", "Manhua"];
const SORT_OPTIONS = [
  { label: "Latest Update", value: "latest" },
  { label: "Most Popular", value: "popular" },
  { label: "Highest Rating", value: "rating" },
  { label: "A-Z", value: "az" },
];

interface FilterSidebarProps {
  selectedGenre: string;
  setSelectedGenre: (val: string) => void;
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
  selectedType: string;
  setSelectedType: (val: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
}

export function FilterSidebar({
  selectedGenre,
  setSelectedGenre,
  selectedStatus,
  setSelectedStatus,
  selectedType,
  setSelectedType,
  sortBy,
  setSortBy
}: FilterSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const FilterContent = () => (
    <div className="flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-3">
      <div className="w-full md:w-auto">
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1 block md:hidden">Genre</label>
        <FilterDropdown 
          value={selectedGenre} 
          onChange={setSelectedGenre} 
          options={[{label: "All Genres", value: "All"}, ...GENRES.map(g => ({label: g, value: g}))]} 
          columns={2}
        />
      </div>
      
      <div className="w-full md:w-auto">
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1 block md:hidden">Status</label>
        <FilterDropdown 
          value={selectedStatus} 
          onChange={setSelectedStatus} 
          options={[{label: "All Status", value: "All"}, ...STATUS.filter(s => s !== "All").map(s => ({label: s, value: s}))]} 
        />
      </div>

      <div className="w-full md:w-auto">
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1 block md:hidden">Type</label>
        <FilterDropdown 
          value={selectedType} 
          onChange={setSelectedType} 
          options={[{label: "All Types", value: "All"}, ...TYPES.filter(t => t !== "All").map(t => ({label: t, value: t}))]} 
        />
      </div>

      <div className="h-6 w-px bg-slate-700/50 hidden md:block mx-1"></div>

      <div className="w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-slate-800 md:border-none">
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1 block md:hidden">Sort By</label>
        <FilterDropdown 
          value={sortBy} 
          onChange={setSortBy} 
          options={SORT_OPTIONS} 
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Trigger */}
      <div className="md:hidden mb-6">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center justify-center gap-2 w-full bg-slate-800/50 border border-slate-700/50 text-slate-100 px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-slate-700/50 transition-colors"
        >
          <Filter className="w-4 h-4" />
          Filter & Sort
        </button>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block mb-8">
        <FilterContent />
      </div>

      {/* Mobile Drawer/Modal */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          ></div>
          <div className="absolute bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 rounded-t-3xl p-6 shadow-2xl transform transition-transform duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Filter className="w-5 h-5 text-sky-500" />
                Filters
              </h3>
              <button 
                onClick={() => setIsMobileOpen(false)}
                className="p-2 rounded-full bg-slate-800/50 text-slate-400 hover:text-slate-100 hover:bg-slate-700/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="max-h-[60vh] overflow-y-auto pb-6 custom-scrollbar">
              <FilterContent />
            </div>
            
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => setIsMobileOpen(false)}
                className="w-full bg-sky-500 text-slate-100 font-bold py-4 rounded-xl text-sm tracking-widest uppercase hover:bg-sky-400 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
