export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  readingTime: number;
  // Old slugs this post used to live at. Populated automatically when the
  // slug changes so /blogs/<old> can 301 to the current URL instead of 404ing.
  previousSlugs?: string[];
}

export interface BlogDB {
  posts: BlogPost[];
}
