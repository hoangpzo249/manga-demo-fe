"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Star, Play, Bookmark, ChevronLeft, ChevronRight } from "lucide-react";
import { Comic } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HeroProps {
  comics: Comic[];
}

export default function Hero({ comics }: HeroProps) {
  const featuredComics = comics.slice(0, 5);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (!featuredComics.length) return null;

  return (
    <section className="relative min-h-[50vh] lg:min-h-[70vh] w-full overflow-hidden flex items-end lg:items-center bg-black">
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 z-0 transition-all duration-700">
        <img
          src={featuredComics[selectedIndex].cover_url}
          alt={featuredComics[selectedIndex].title}
          className="w-full h-full object-cover blur-xl lg:blur-[40px] opacity-40 scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent lg:bg-gradient-to-r lg:from-black lg:via-black/90 lg:to-transparent/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Carousel Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-6 pt-24 pb-12 lg:py-16">
        <div className="overflow-hidden rounded-2xl lg:rounded-none" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {featuredComics.map((featured, index) => (
              <div key={featured.id} className="flex-[0_0_100%] min-w-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                  
                  {/* Content Area */}
                  <div className="lg:col-span-7 space-y-4 lg:space-y-8 order-2 lg:order-1 pt-6 lg:pt-0">
                    <div className="space-y-3 lg:space-y-4">
                      {/* Tags & Rating */}
                      <div className="flex flex-wrap gap-2 lg:gap-3">
                        <span className="px-2 py-1 lg:px-3 lg:py-1 rounded bg-sky-500 text-[10px] lg:text-xs font-bold uppercase text-white shadow-[0_0_15px_rgba(14,165,233,0.5)]">
                          HOT
                        </span>
                        {(featured.genres || "").split(',').slice(0, 3).map((genre, i) => (
                          <span key={i} className="px-2 py-1 lg:px-3 lg:py-1 rounded bg-white/10 backdrop-blur-md border border-white/10 text-[10px] lg:text-xs font-semibold uppercase text-zinc-300">
                            {genre.trim()}
                          </span>
                        ))}
                        <span className="px-2 py-1 lg:px-3 lg:py-1 rounded bg-yellow-500/20 backdrop-blur-md border border-yellow-500/30 text-[10px] lg:text-xs font-bold text-yellow-500 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          {featured.rating}
                        </span>
                      </div>

                      {/* Title */}
                      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white line-clamp-2">
                        {featured.title}
                      </h1>
                    </div>

                    {/* Description */}
                    <div className="relative border-l-2 border-sky-500/50 pl-4 lg:pl-6 hidden sm:block">
                      <p className="text-zinc-400 text-sm lg:text-base max-w-2xl leading-relaxed line-clamp-3">
                        {featured.description}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 lg:gap-6 pt-2 lg:pt-4">
                      <Link
                        href={/comic/ + featured.id}
                        className="group flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-full font-bold text-sm lg:text-base transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(14,165,233,0.3)]"
                      >
                        <Play className="w-4 h-4 lg:w-5 lg:h-5 fill-current" />
                        READ NOW
                      </Link>
                      
                      <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 lg:px-8 lg:py-4 rounded-full font-bold text-sm lg:text-base backdrop-blur-md transition-all duration-300">
                        <Bookmark className="w-4 h-4 lg:w-5 lg:h-5" />
                        <span className="hidden sm:inline">SAVE TO LIBRARY</span>
                        <span className="sm:hidden">SAVE</span>
                      </button>
                    </div>
                  </div>

                  {/* Poster Area */}
                  <div className="lg:col-span-5 relative flex justify-center lg:justify-end order-1 lg:order-2">
                    <div className="relative group w-3/5 sm:w-1/2 lg:w-[320px] aspect-[3/4] rounded-2xl lg:rounded-[2rem] overflow-hidden shadow-2xl lg:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
                      <img 
                        src={featured.cover_url} 
                        alt={featured.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation & Pagination */}
        <div className="flex items-center justify-between lg:justify-start lg:gap-8 mt-8 lg:mt-12 w-full lg:w-auto">
          {/* Dots */}
          <div className="flex items-center gap-2 lg:gap-3">
            {featuredComics.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "h-1.5 lg:h-2 rounded-full transition-all duration-300",
                  selectedIndex === index ? "w-6 lg:w-8 bg-sky-500" : "w-1.5 lg:w-2 bg-white/20 hover:bg-white/40"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrows (Desktop primarily) */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-sky-500/50 transition-all backdrop-blur-md disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-sky-500/50 transition-all backdrop-blur-md disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
