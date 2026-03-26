import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "MangaCloud - Đọc Truyện Tranh Online Miễn Phí",
  description: "Đọc Manga, Manhwa, Manhua online miễn phí với chất lượng cao nhất. Cập nhật liên tục các bộ truyện hot nhất hiện nay.",
  keywords: ["manga", "manhwa", "manhua", "đọc truyện tranh", "truyện tranh online"],
  openGraph: {
    title: "MangaCloud - Đọc Truyện Tranh Online Miễn Phí",
    description: "Nền tảng đọc truyện tranh hàng đầu với hàng ngàn bộ truyện hấp dẫn.",
    type: "website",
    locale: "vi_VN",
    siteName: "MangaCloud",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
        </AuthProvider>
      </body>
    </html>
  );
}
