import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-100/5 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-display font-bold tracking-tighter block mb-4">
              <span className="text-[#ff1e56]">MANGA</span><span className="text-slate-100">CLOUD</span>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Your ultimate destination for reading high-quality manga, manhwa, and manhua online. Discover new worlds every day.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-300 hover:bg-sky-500 hover:text-slate-100 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-300 hover:bg-sky-500 hover:text-slate-100 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-300 hover:bg-sky-500 hover:text-slate-100 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center text-slate-300 hover:bg-sky-500 hover:text-slate-100 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-slate-100 font-bold uppercase tracking-widest text-sm mb-6">Explore</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li><Link href="/browse" className="hover:text-sky-500 transition-colors">Browse Comics</Link></li>
              <li><Link href="/browse?sort=popular" className="hover:text-sky-500 transition-colors">Popular Series</Link></li>
              <li><Link href="/browse?sort=latest" className="hover:text-sky-500 transition-colors">New Releases</Link></li>
              <li><Link href="/browse" className="hover:text-sky-500 transition-colors">All Genres</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-100 font-bold uppercase tracking-widest text-sm mb-6">Support</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li><a href="#" className="hover:text-sky-500 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">DMCA</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-100 font-bold uppercase tracking-widest text-sm mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>support@mangacloud.com</span>
              </li>
              <li>
                <p className="leading-relaxed">
                  Have a question or feedback? We'd love to hear from you.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-100/60 text-xs">
            &copy; {new Date().getFullYear()} MangaCloud. All rights reserved.
          </p>
          <p className="text-slate-100/60 text-xs text-center md:text-right">
            MangaCloud does not store any files on our server, we only linked to the media which is hosted on 3rd party services.
          </p>
        </div>
      </div>
    </footer>
  );
}
