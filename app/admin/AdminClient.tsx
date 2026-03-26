"use client";

import { useState, useEffect } from "react";
import { Comic, User } from "@/types";
import { useAuth } from "@/app/AuthContext";
import { useRouter } from "next/navigation";
import { Plus, Edit2, Trash2, Search, Filter, LayoutGrid, List as ListIcon, TrendingUp, Users, BookOpen, Eye, Star } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function AdminClient({ initialComics }: { initialComics: Comic[] }) {
  const { user } = useAuth();
  const router = useRouter();
  const [comics, setComics] = useState<Comic[]>(initialComics);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingComic, setEditingComic] = useState<Comic | null>(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push("/");
    }
  }, [user, router]);

  const filteredComics = comics.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Comics" value={comics.length.toString()} icon={<BookOpen className="w-5 h-5" />} color="rose" />
          <StatCard title="Total Views" value={comics.reduce((acc, curr) => acc + curr.views, 0).toLocaleString()} icon={<Eye className="w-5 h-5" />} color="blue" />
          <StatCard title="Total Users" value="1,245" icon={<Users className="w-5 h-5" />} color="emerald" />
          <StatCard title="Avg Rating" value={(comics.reduce((acc, curr) => acc + curr.rating, 0) / comics.length).toFixed(1)} icon={<TrendingUp className="w-5 h-5" />} color="yellow" />
        </div>

        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-display font-bold tracking-tighter text-slate-100 mb-2">Admin <span className="text-sky-500">Dashboard</span></h1>
            <p className="text-slate-400 font-medium">Manage your comic library and users</p>
          </div>

          <button 
            onClick={() => { setEditingComic(null); setIsModalOpen(true); }}
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-sky-500 text-slate-100 font-bold text-xs tracking-widest uppercase hover:scale-105 transition-all shadow-lg shadow-sky-500/20"
          >
            <Plus className="w-5 h-5" />
            Add New Comic
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by title or author..."
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-4 pl-14 pr-6 text-slate-100 placeholder:text-slate-400 focus:border-sky-500/50 outline-none transition-all font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="px-6 py-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-slate-300 hover:bg-slate-700/50 transition-all font-bold text-xs tracking-widest uppercase flex items-center gap-3">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Comics Table */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-[2.5rem] overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100/5">
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Comic</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Author</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Rating</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">Views</th>
                  <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredComics.map((comic) => (
                  <tr key={comic.id} className="group hover:bg-slate-100/[0.02] transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img src={comic.cover_url} className="w-12 h-16 rounded-lg object-cover border border-slate-700/50" alt={comic.title} />
                        <div>
                          <p className="font-bold text-slate-100 group-hover:text-sky-500 transition-colors">{comic.title}</p>
                          <p className="text-[10px] font-medium text-slate-100/30 uppercase tracking-widest mt-1">{comic.type || "Manga"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-medium text-slate-100/60">{comic.author}</td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-widest border",
                        comic.status.toLowerCase() === 'ongoing' 
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                          : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                      )}>
                        {comic.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                        <span className="text-sm font-bold text-slate-100">{comic.rating}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-slate-100/60">{comic.views.toLocaleString()}</td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => { setEditingComic(comic); setIsModalOpen(true); }}
                          className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:text-slate-100 hover:bg-slate-700/50 transition-all"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-500/40 hover:text-sky-500 hover:bg-sky-500/20 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) {
  const colorClasses: Record<string, string> = {
    rose: "bg-sky-500/10 text-sky-500 border-sky-500/20",
    blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    yellow: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  };

  return (
    <div className="p-8 rounded-[2.5rem] bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border", colorClasses[color])}>
        {icon}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-1">{title}</p>
      <p className="text-3xl font-display font-bold tracking-tighter text-slate-100">{value}</p>
    </div>
  );
}
