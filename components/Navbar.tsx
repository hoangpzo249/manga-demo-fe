"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, User, Bookmark, LogOut, LayoutDashboard, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/AuthContext";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Hide Navbar completely on chapter reading pages
  if (pathname?.includes('/chapter/')) {
    return null;
  }

  return (
    <nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 py-4 flex items-center justify-between",
        isScrolled ? "bg-slate-900/80 backdrop-blur-2xl border-b border-slate-100/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : "bg-transparent",
        !isVisible && "-translate-y-full"
      )}
    >
      <div className="flex items-center gap-12">
        <Link href="/" className="text-2xl font-display font-bold tracking-tighter">
          <span className="text-[#ff1e56]">MANGA</span><span className="text-slate-100">CLOUD</span>
        </Link>
        
        <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-100/80">
          <Link href="/" className={cn("hover:text-slate-100 transition-colors", pathname === "/" && "text-slate-100")}>Home</Link>
          <Link href="/browse" className={cn("hover:text-slate-100 transition-colors", pathname === "/browse" && "text-slate-100")}>Browse</Link>
          
          {/* Genres Dropdown */}
          <div className="relative group">
            <Link href="/browse" className="flex items-center gap-1 hover:text-slate-100 transition-colors uppercase tracking-widest font-bold">
              Genres
              <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </Link>
            <div className="absolute top-full left-0 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 shadow-2xl w-80 grid grid-cols-2 gap-2">
                {['Action', 'Adventure', 'Fantasy', 'Romance', 'Sci-Fi', 'Comedy', 'Drama', 'Horror', 'Sports', 'Thriller', 'Slice of Life', 'Martial Arts', 'School'].map((genre) => (
                  <Link
                    key={genre}
                    href={`/browse?genre=${genre}`}
                    className="px-3 py-2 rounded-xl hover:bg-slate-800/50 hover:text-sky-500 transition-colors text-xs normal-case tracking-normal font-medium text-slate-100"
                  >
                    {genre}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/browse?sort=popular" className="hover:text-slate-100 transition-colors">Popular</Link>
          <Link href="/browse?sort=latest" className="hover:text-slate-100 transition-colors">New</Link>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        <form onSubmit={handleSearch} className="relative hidden sm:block">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
            <input
              type="text"
              placeholder="Search comics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#1a1a1a] border border-slate-100/5 rounded-full py-2.5 pl-12 pr-6 text-sm focus:outline-none focus:border-sky-500/30 transition-all w-48 lg:w-80 placeholder:text-slate-400"
            />
          </div>
        </form>
        
        <div className="flex items-center gap-4">
          <button className="p-2.5 hover:bg-slate-800/50 rounded-full transition-colors text-slate-300 hover:text-slate-100">
            <Bookmark className="w-5 h-5" />
          </button>
          
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 hover:bg-slate-800/50 p-1 pr-4 rounded-full transition-all border border-slate-100/5"
              >
                <img src={user.avatar_url} className="w-8 h-8 rounded-full object-cover" alt={user.username} />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-100/90 hidden sm:inline">{user.username}</span>
              </button>

              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 glass rounded-2xl border border-slate-700/50 p-2 shadow-2xl">
                  {user.role === "admin" && (
                    <Link 
                      href="/admin" 
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-slate-800/50 rounded-xl text-sm font-semibold transition-all"
                    >
                      <LayoutDashboard className="w-4 h-4 text-sky-500" />
                      Admin Panel
                    </Link>
                  )}
                  <button 
                    onClick={() => { logout(); setShowUserMenu(false); router.push("/"); }}
                    className="w-full flex items-center gap-3 px-4 py-2 hover:bg-sky-500/10 rounded-xl text-sm font-semibold text-sky-500 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-full text-sm font-semibold transition-all">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
          )}
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 text-slate-300 hover:text-slate-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 p-4 flex flex-col gap-4 lg:hidden shadow-2xl">
          <form onSubmit={handleSearch} className="relative sm:hidden mb-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search comics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-slate-100/5 rounded-full py-2.5 pl-12 pr-6 text-sm focus:outline-none focus:border-sky-500/30 transition-all placeholder:text-slate-400"
            />
          </form>
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-slate-100 hover:text-sky-500 py-2">Home</Link>
          <Link href="/browse" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-slate-100 hover:text-sky-500 py-2">Browse</Link>
          <Link href="/browse" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-slate-100 hover:text-sky-500 py-2">Genres</Link>
          <Link href="/browse?sort=popular" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-slate-100 hover:text-sky-500 py-2">Popular</Link>
          <Link href="/browse?sort=latest" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-slate-100 hover:text-sky-500 py-2">New</Link>
        </div>
      )}
    </nav>
  );
}
