export type BlogArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  shortDescription: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  categorySlug?: string;
  author: string;
  content: string[];
  htmlContent: string;
  views?: number;
  isFeatured?: boolean;
};

export type ApiBlogCategoryRef = {
  uuid?: string;
  name?: string;
  slug?: string;
  description?: string;
  image_url?: string | null;
  status?: boolean;
};

export type ApiBlog = {
  id?: string;
  category_id?: string;
  author_id?: string | null;
  title?: string;
  slug?: string;
  short_description?: string;
  content?: string;
  featured_image?: string | null;
  banner_image?: string | null;
  status?: string;
  is_featured?: boolean;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  views?: number;
  published_at?: string;
  category_name?: string;
  author_name?: string;
  category?: ApiBlogCategoryRef;
  author?: { name?: string; full_name?: string } | null;
  [key: string]: unknown;
};

export type ApiBlogCategory = {
  id?: string;
  uuid?: string;
  name?: string;
  slug?: string;
  description?: string;
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
