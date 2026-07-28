import type {
  ApiBlog,
  ApiBlogCategory,
  BlogArticle,
  CreateBlogPayload,
} from "@/types/blog";
import {
  apiDelete,
  apiGet,
  apiPost,
  apiPut,
  extractData,
  extractList,
} from "@/services/apiClient";

const DEFAULT_BLOG_IMAGE = "/live-sessions/astrology-card.png";

function estimateReadTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

export function mapBlogForUi(
  blog: ApiBlog,
  categoryName?: string,
): BlogArticle {
  const content = String(blog.content ?? "");
  const paragraphs = content
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const published = blog.published_at
    ? new Date(String(blog.published_at))
    : null;

  return {
    id: String(blog.id ?? blog.slug ?? ""),
    slug: String(blog.slug ?? blog.id ?? ""),
    title: String(blog.title ?? "Untitled"),
    excerpt: String(
      blog.short_description ?? blog.meta_description ?? paragraphs[0] ?? "",
    ).slice(0, 220),
    date: published
      ? published.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Recently",
    readTime: estimateReadTime(content || String(blog.short_description ?? "")),
    image: String(
      blog.featured_image ?? blog.banner_image ?? DEFAULT_BLOG_IMAGE,
    ),
    category: categoryName ?? String(blog.category_name ?? "Insights"),
    author: String(blog.author_name ?? "SoulSensei"),
    content: paragraphs.length
      ? paragraphs
      : [String(blog.short_description ?? (content || "Content coming soon."))],
  };
}

export async function fetchAllBlogs() {
  const res = await apiGet("/blogs/get-all", false);
  return extractList<ApiBlog>(res);
}

export async function fetchBlogBySlug(slug: string) {
  const res = await apiGet(`/blogs/fetch-by-slug/${slug}`, false);
  return extractData<ApiBlog>(res);
}

export async function createBlog(body: CreateBlogPayload) {
  return apiPost("/blogs/create", body);
}

export async function updateBlog(id: string | number, body: Partial<CreateBlogPayload>) {
  return apiPut(`/blogs/update-blog/${id}`, body);
}

export async function deleteBlog(id: string | number) {
  return apiDelete(`/blogs/delete-blog/${id}`);
}

export async function fetchBlogCategories() {
  const res = await apiGet("/blogs/get-categories", false);
  return extractList<ApiBlogCategory>(res);
}

export async function fetchBlogCategoryById(id: string | number) {
  const res = await apiGet(`/blogs/get-category-by-id/${id}`, false);
  return extractData<ApiBlogCategory>(res);
}

export async function updateBlogCategory(
  id: string | number,
  body: Partial<ApiBlogCategory>,
) {
  return apiPut(`/blogs/update-category/${id}`, body);
}

export async function deleteBlogCategory(id: string | number) {
  return apiDelete(`/blogs/delete-category/${id}`);
}

export async function fetchBlogsByCategory(categoryId: string | number) {
  const res = await apiGet(`/blogs/get-blogs-by-category/${categoryId}`, false);
  return extractList<ApiBlog>(res);
}
