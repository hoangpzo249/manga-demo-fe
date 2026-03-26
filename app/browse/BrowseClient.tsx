"use client";

import { useState, useEffect, Suspense } from "react";
import { Comic } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { BrowseHeader } from "@/components/browse/BrowseHeader";
import { FilterSidebar } from "@/components/browse/FilterSidebar";
import { MangaGrid } from "@/components/browse/MangaGrid";
import { Pagination } from "@/components/shared/Pagination";

function BrowseContent({ initialComics }: { initialComics: Comic[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [comics] = useState<Comic[]>(initialComics);
  const [filteredComics, setFilteredComics] = useState<Comic[]>(initialComics);

  const searchQuery = searchParams.get("q") || "";
  const selectedGenre = searchParams.get("genre") || "All";
  const selectedStatus = searchParams.get("status") || "All";
  const selectedType = searchParams.get("type") || "All";
  const sortBy = searchParams.get("sort") || "latest";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const itemsPerPage = 12;

  const updateParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === "All" || value === "" || (key === "page" && value === "1") || (key === "sort" && value === "latest")) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    
    // Reset page to 1 if any filter other than page itself changes
    if (!updates.page) {
      params.delete("page");
    }

    router.push(`/browse?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    let result = [...comics];

    if (searchQuery) {
      result = result.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedGenre !== "All") {
      result = result.filter(c => c.genres.includes(selectedGenre));
    }

    if (selectedStatus !== "All") {
      result = result.filter(c => c.status.toLowerCase() === selectedStatus.toLowerCase());
    }

    if (selectedType !== "All") {
      result = result.filter(c => c.type?.toLowerCase() === selectedType.toLowerCase());
    }

    switch (sortBy) {
      case "popular":
        result.sort((a, b) => b.views - a.views);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "az":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default: // latest
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    setFilteredComics(result);
  }, [searchQuery, selectedGenre, selectedStatus, selectedType, sortBy, comics]);

  const totalPages = Math.ceil(filteredComics.length / itemsPerPage);
  const paginatedComics = filteredComics.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleClearFilters = () => {
    router.push("/browse", { scroll: false });
  };

  return (
    <div className="min-h-screen pt-[68px] md:pt-[72px] pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <BrowseHeader />

        <FilterSidebar 
          selectedGenre={selectedGenre}
          setSelectedGenre={(val) => updateParams({ genre: val })}
          selectedStatus={selectedStatus}
          setSelectedStatus={(val) => updateParams({ status: val })}
          selectedType={selectedType}
          setSelectedType={(val) => updateParams({ type: val })}
          sortBy={sortBy}
          setSortBy={(val) => updateParams({ sort: val })}
        />

        <MangaGrid comics={paginatedComics} onClearFilters={handleClearFilters} />

        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={(page) => updateParams({ page: page.toString() })} 
        />
      </div>
    </div>
  );
}

export default function BrowseClient({ initialComics }: { initialComics: Comic[] }) {
  return (
    <Suspense fallback={<div className="min-h-screen pt-[68px] md:pt-[72px] pb-12 px-4 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div></div>}>
      <BrowseContent initialComics={initialComics} />
    </Suspense>
  );
}
