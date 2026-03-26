import Link from "next/link";
import { List } from "lucide-react";

interface MangaPagesProps {
  pages: string[];
  comicId: string;
}

export function MangaPages({ pages, comicId }: MangaPagesProps) {
  return (
    <div className="flex flex-col items-center">
      {pages.length > 0 ? (
        pages.map((page: string, idx: number) => (
          <div key={idx} className="relative w-full group">
            <img
              src={page}
              alt={`Page ${idx + 1}`}
              className="w-full h-auto select-none"
              loading={idx < 3 ? "eager" : "lazy"}
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-slate-700/50 text-[10px] font-bold text-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
              {idx + 1} / {pages.length}
            </div>
          </div>
        ))
      ) : (
        <div className="py-40 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-slate-800/50 border border-slate-700/50 flex items-center justify-center mx-auto">
            <List className="w-8 h-8 text-slate-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-100 tracking-tighter">No pages found</h3>
            <p className="text-slate-400 font-medium">This chapter seems to be empty or under maintenance.</p>
          </div>
          <Link
            href={`/comic/${comicId}`}
            className="inline-block px-8 py-4 rounded-2xl bg-slate-100 text-black font-bold text-xs tracking-widest uppercase hover:scale-105 transition-all"
          >
            Back to Comic
          </Link>
        </div>
      )}
    </div>
  );
}
