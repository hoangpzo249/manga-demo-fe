import { mockComics } from "@/lib/mockData";
import Hero from "@/components/home/Hero";
import LatestUpdates from "@/components/home/LatestUpdates";
import Sidebar from "@/components/home/Sidebar";

export default function Home() {
  const trending = [...mockComics].sort((a, b) => (b.rating * b.views) - (a.rating * a.views)).slice(0, 10);

  return (
    <div className="pb-12">
      <Hero comics={trending.length > 0 ? trending : mockComics} />
      
      <div className="max-w-7xl mx-auto px-4 mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-10">
            <LatestUpdates comics={mockComics} />
          </div>
          <Sidebar comics={mockComics} />
        </div>
      </div>
    </div>
  );
}
