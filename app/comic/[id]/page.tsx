import ComicDetailClient from "./ComicDetailClient";
import { mockComics } from "@/lib/mockData";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const comic = mockComics.find(c => c.id === id);

  if (!comic) return { title: "Comic Not Found" };

  return {
    title: `${comic.title} - MangaCloud`,
    description: comic.description.slice(0, 160),
    openGraph: {
      title: comic.title,
      description: comic.description.slice(0, 160),
    },
  };
}

export default async function ComicPage({ params }: Props) {
  const { id } = await params;
  
  const comic = mockComics.find(c => c.id === id);
  if (!comic) notFound();

  return <ComicDetailClient comic={{ ...comic, chapters: comic.chapters || [] }} />;
}
