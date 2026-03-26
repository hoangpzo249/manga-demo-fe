import BrowseClient from "./BrowseClient";
import { mockComics } from "@/lib/mockData";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Browse Comics - MangaCloud",
  description: "Browse and discover thousands of free manga, manhwa, and manhua on MangaCloud. Filter by genre, status, and more.",
  keywords: "browse manga, search manhwa, manhua list, manga genres, reading list",
};

export default function BrowsePage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-20 flex items-center justify-center text-slate-400">Loading...</div>}>
      <BrowseClient initialComics={mockComics} />
    </Suspense>
  );
}
