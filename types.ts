export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'customer';
  avatar_url: string;
}

export interface Comment {
  id: string;
  user_id: string;
  comic_id: string;
  content: string;
  created_at: string;
  username: string;
  avatar_url: string;
}

export interface Bookmark {
  user_id: string;
  comic_id: string;
  chapter_id: string;
  created_at: string;
}

export interface Comic {
  id: string;
  title: string;
  description: string;
  cover_url: string;
  type: 'manga' | 'manhwa' | 'manhua';
  status: 'ongoing' | 'completed';
  author: string;
  genres: string;
  rating: number;
  views: number;
  created_at: string;
  chapters?: Chapter[];
}

export interface Chapter {
  id: string;
  comic_id: string;
  chapter_number: number;
  title: string;
  pages?: string | string[];
  created_at: string;
}
