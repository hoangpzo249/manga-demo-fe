import { mockComics } from "@/lib/mockData";
import Hero from "@/components/home/Hero";
import LatestUpdates from "@/components/home/LatestUpdates";
import Sidebar from "@/components/home/Sidebar";

export default function Home() {
  const trending = [...mockComics].sort((a, b) => (b.rating * b.views) - (a.rating * a.views)).slice(0, 10);

  return (
    <div className="pb-12 bg-[#0a0a0a] min-h-screen text-slate-200">
      <Hero comics={trending.length > 0 ? trending : mockComics} />
      
      <div className="max-w-7xl mx-auto px-4 mt-8 md:mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main content area */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-10 lg:space-y-16">
            <LatestUpdates comics={mockComics} />
          </div>
          <div className="lg:col-span-4 xl:col-span-3">
            <Sidebar comics={mockComics} />
          </div>
        </div>
      </div>
    </div>
  );
}
