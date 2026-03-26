import ChapterReaderClient from "./ChapterReaderClient";
import { mockComics, mockChapters } from "@/lib/mockData";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string; chapterNumber: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, chapterNumber } = await params;
  const comic = mockComics.find(c => c.id === id);

  if (!comic) return { title: "Chapter Not Found" };

  return {
    title: `Chapter ${chapterNumber} - ${comic.title} - MangaCloud`,
    description: `Read Chapter ${chapterNumber} of ${comic.title} online for free on MangaCloud. High quality images and fast loading.`,
  };
}

export default async function ChapterPage({ params }: Props) {
  const { id, chapterNumber } = await params;
  
  const comic = mockComics.find(c => c.id === id);
  if (!comic) notFound();

  const chapter = mockChapters.find(c => c.comic_id === id && c.chapter_number.toString() === chapterNumber);
  if (!chapter) notFound();

  const chapters = mockChapters.filter(c => c.comic_id === id).sort((a, b) => a.chapter_number - b.chapter_number);

  return <ChapterReaderClient comic={comic} chapter={chapter} chapters={chapters} />;
}
