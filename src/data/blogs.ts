import type { BlogArticle } from "@/types/blog";
import {
  fetchAllBlogs,
  fetchBlogBySlug,
  mapBlogForUi,
} from "@/services/blogsService";

export async function getBlogArticles(): Promise<BlogArticle[]> {
  const blogs = await fetchAllBlogs();
  return blogs.map((blog) => mapBlogForUi(blog));
}

export async function getBlog(slug: string): Promise<BlogArticle | null> {
  try {
    const blog = await fetchBlogBySlug(slug);
    return mapBlogForUi(blog);
  } catch {
    return null;
  }
}

export async function getBlogSlugs(): Promise<string[]> {
  const blogs = await fetchAllBlogs();
  return blogs
    .map((blog) => String(blog.slug ?? blog.id ?? ""))
    .filter(Boolean);
}

export async function getBlogCategories(): Promise<string[]> {
  const articles = await getBlogArticles();
  return Array.from(new Set(articles.map((article) => article.category))).sort();
}
