"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Comic, Chapter } from "@/types";
import { ReaderHeader } from "@/components/chapter-reader/ReaderHeader";
import { MangaPages } from "@/components/chapter-reader/MangaPages";
import { ReaderFooterNav } from "@/components/chapter-reader/ReaderFooterNav";
import { MobileFloatingControls } from "@/components/chapter-reader/MobileFloatingControls";
import { RecommendedComics } from "@/components/chapter-reader/RecommendedComics";

export default function ChapterReaderClient({ comic, chapter, chapters }: { comic: Comic, chapter: Chapter, chapters: Chapter[] }) {
  const [showControls, setShowControls] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lastScrollY = useRef(0);
  const readerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const pages = typeof chapter.pages === 'string' ? JSON.parse(chapter.pages) : (chapter.pages || []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (currentScrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      // Show controls if scrolling up or at the top
      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setShowControls(true);
      } 
      // Hide controls if scrolling down and past 100px
      else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowControls(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChapterSelect = (val: number) => {
    router.push(`/comic/${comic.id}/chapter/${val}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-sky-500/30 -mt-20">
      <ReaderHeader 
        comicId={comic.id}
        comicTitle={comic.title}
        currentChapter={chapter.chapter_number}
        chapters={chapters}
        showControls={showControls}
        scrollProgress={scrollProgress}
        onChapterSelect={handleChapterSelect}
      />

      {/* Reader Content */}
      <main ref={readerRef} className="max-w-4xl mx-auto pt-24 pb-32">
        <MangaPages pages={pages} comicId={comic.id} />
        
        <ReaderFooterNav 
          comicId={comic.id}
          currentChapter={chapter.chapter_number}
          chapters={chapters}
        />
      </main>

      <RecommendedComics currentComic={comic} />

      <MobileFloatingControls 
        comicId={comic.id}
        currentChapter={chapter.chapter_number}
        chapters={chapters}
        showControls={showControls}
        onChapterSelect={handleChapterSelect}
      />
    </div>
  );
}
