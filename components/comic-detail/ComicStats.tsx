import { Comic } from "@/types";
import { Eye, Users } from "lucide-react";

export function ComicStats({ comic }: { comic: Comic }) {
  return (
    <div className="p-5 rounded-3xl bg-slate-800/50 border border-slate-700/50 space-y-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Type</span>
        <span className="text-slate-100 font-bold text-xs uppercase tracking-widest">{comic.type || "Manga"}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Author</span>
        <span className="text-slate-100 font-bold text-xs">{comic.author}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Views</span>
        <span className="text-slate-100 font-bold text-xs flex items-center gap-2">
          <Eye className="w-3 h-3 text-sky-500" />
          {comic.views.toLocaleString()}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Followers</span>
        <span className="text-slate-100 font-bold text-xs flex items-center gap-2">
          <Users className="w-3 h-3 text-sky-500" />
          {Math.floor(comic.views * 0.15).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
