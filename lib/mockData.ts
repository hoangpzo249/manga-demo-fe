import { Comic, Chapter } from "@/types";

export const mockChapters: Chapter[] = [
  { id: "c1", comic_id: "1", chapter_number: 1, title: "The Beginning", pages: "[]", created_at: new Date().toISOString() },
  { id: "c2", comic_id: "1", chapter_number: 2, title: "The Journey", pages: "[]", created_at: new Date().toISOString() },
  { id: "c3", comic_id: "1", chapter_number: 3, title: "The Encounter", pages: "[]", created_at: new Date().toISOString() },
];

export const mockComics: Comic[] = [
  {
    id: "1",
    title: "Solo Leveling",
    description: "10 years ago, after the 'the Gate' that connected the real world with the monster world opened, some of the ordinary, everyday people received the power to hunt monsters within the Gate. They are known as 'Hunters'. However, not all Hunters are powerful.",
    cover_url: "https://picsum.photos/seed/solo/400/600",
    type: "manhwa",
    author: "Chugong",
    status: "completed",
    genres: "Action, Adventure, Fantasy",
    views: 1500000,
    rating: 4.9,
    created_at: new Date().toISOString(),
    chapters: mockChapters
  },
  {
    id: "2",
    title: "Omniscient Reader's Viewpoint",
    description: "Only I know the end of this world. One day our MC finds himself stuck in the world of his favorite webnovel. What does he do to survive? It is a world struck by disaster and danger all around.",
    cover_url: "https://picsum.photos/seed/orv/400/600",
    type: "manhwa",
    author: "Sing Shong",
    status: "ongoing",
    genres: "Action, Fantasy, Sci-Fi",
    views: 1200000,
    rating: 4.8,
    created_at: new Date().toISOString(),
    chapters: mockChapters
  },
  {
    id: "3",
    title: "The Beginning After The End",
    description: "King Grey has unrivaled strength, wealth, and prestige in a world governed by martial ability. However, solitude lingers closely behind those with great power. Beneath the glamorous exterior of a powerful king lurks the shell of a man, devoid of purpose and will.",
    cover_url: "https://picsum.photos/seed/tbate/400/600",
    type: "manga",
    author: "TurtleMe",
    status: "ongoing",
    genres: "Action, Adventure, Fantasy",
    views: 950000,
    rating: 4.7,
    created_at: new Date().toISOString(),
    chapters: mockChapters
  },
  {
    id: "4",
    title: "Tower of God",
    description: "What do you desire? Money and wealth? Honor and pride? Authority and power? Revenge? Or something that transcends them all? Whatever you desire—it's here.",
    cover_url: "https://picsum.photos/seed/tog/400/600",
    type: "manhwa",
    author: "SIU",
    status: "ongoing",
    genres: "Action, Adventure, Mystery",
    views: 2000000,
    rating: 4.6,
    created_at: new Date().toISOString(),
    chapters: mockChapters
  },
  {
    id: "5",
    title: "Eleceed",
    description: "Jiwoo is a kind-hearted young man who harnesses the lightning quick reflexes of a cat to secretly make the world a better place – one saved little child or foster pet at a time. Kayden is a secret agent on the run, who finds himself stuck in the body of a...um...decidedly fat old fluffy cat.",
    cover_url: "https://picsum.photos/seed/eleceed/400/600",
    type: "manhwa",
    author: "Son Jeho",
    status: "ongoing",
    genres: "Action, Comedy, Supernatural",
    views: 800000,
    rating: 4.8,
    created_at: new Date().toISOString(),
    chapters: mockChapters
  }
];
