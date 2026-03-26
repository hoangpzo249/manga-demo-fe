import AdminClient from "./AdminClient";
import { mockComics } from "@/lib/mockData";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - MangaCloud",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminClient initialComics={mockComics} />;
}
