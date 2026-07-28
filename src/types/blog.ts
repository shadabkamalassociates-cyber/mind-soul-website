export type BlogArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  author: string;
  content: string[];
};

export type ApiBlog = {
  id?: string;
  category_id?: string;
  author_id?: string;
  title?: string;
  slug?: string;
  short_description?: string;
  content?: string;
  featured_image?: string;
  banner_image?: string;
  status?: string;
  is_featured?: boolean;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  published_at?: string;
  category_name?: string;
  author_name?: string;
  [key: string]: unknown;
};

export type ApiBlogCategory = {
  id?: string;
  name?: string;
  slug?: string;
  [key: string]: unknown;
};

export type CreateBlogPayload = {
  category_id: string;
  author_id: string;
  title: string;
  slug: string;
  short_description: string;
  content: string;
  featured_image: string;
  banner_image: string;
  status: string;
  is_featured: boolean;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  published_at: string;
};
