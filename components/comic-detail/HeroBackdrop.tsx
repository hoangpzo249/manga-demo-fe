import { Comic } from "@/types";

export function HeroBackdrop({ comic }: { comic: Comic }) {
  return (
    <div className="hidden lg:block relative h-[30vh] lg:h-[35vh] w-full overflow-hidden">
      <img
        src={comic.cover_url}
        alt={comic.title}
        className="w-full h-full object-cover blur-lg opacity-40 scale-105"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(14,165,233,0.15)_0%,transparent_70%)]"></div>
    </div>
  );
}
