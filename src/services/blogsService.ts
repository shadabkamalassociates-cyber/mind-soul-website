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

function htmlToPlainText(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(?:p|h[1-6]|div|li)>/gi, "\n\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function contentToParagraphs(content: string) {
  const trimmed = content.trim();
  if (!trimmed) return [];

  if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    return htmlToPlainText(trimmed)
      .split(/\n{2,}/)
      .map((part) => part.trim())
      .filter(Boolean);
  }

  return trimmed
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function readNestedName(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (value && typeof value === "object") {
    if ("name" in value) {
      const name = (value as { name?: unknown }).name;
      if (typeof name === "string" && name.trim()) return name.trim();
    }
    if ("full_name" in value) {
      const fullName = (value as { full_name?: unknown }).full_name;
      if (typeof fullName === "string" && fullName.trim()) return fullName.trim();
    }
  }
  return undefined;
}

function resolveCategoryName(blog: ApiBlog, categoryName?: string) {
  if (categoryName) return categoryName;
  return (
    readNestedName(blog.category) ??
    (typeof blog.category_name === "string" ? blog.category_name : undefined) ??
    "Insights"
  );
}

function resolveAuthorName(blog: ApiBlog) {
  return (
    readNestedName(blog.author) ??
    (typeof blog.author_name === "string" ? blog.author_name : undefined) ??
    "SoulSensei Editorial"
  );
}

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min read`;
}

export function mapBlogForUi(
  blog: ApiBlog,
  categoryName?: string,
): BlogArticle {
  const rawContent = String(blog.content ?? "");
  const plainContent = htmlToPlainText(rawContent);
  const paragraphs = contentToParagraphs(rawContent);

  const published = blog.published_at
    ? new Date(String(blog.published_at))
    : null;

  return {
    id: String(blog.id ?? blog.slug ?? ""),
    slug: String(blog.slug ?? blog.id ?? ""),
    title: String(blog.title ?? "Untitled"),
    excerpt: String(
      blog.short_description ??
        blog.meta_description ??
        paragraphs[0] ??
        plainContent.slice(0, 220),
    ).slice(0, 220),
    date: published
      ? published.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Recently",
    readTime: estimateReadTime(plainContent || String(blog.short_description ?? "")),
    image: String(
      blog.featured_image ?? blog.banner_image ?? DEFAULT_BLOG_IMAGE,
    ),
    category: resolveCategoryName(blog, categoryName),
    author: resolveAuthorName(blog),
    content: paragraphs.length
      ? paragraphs
      : [
          String(
            blog.short_description ??
              (plainContent.slice(0, 500) || "Content coming soon."),
          ),
        ],
  };
}

export async function fetchAllBlogs() {
  const res = await apiGet("/blogs/get-all", false);
  return extractList<ApiBlog>(res);
}

export async function fetchBlogsByCategoryId(categoryId: string | number) {
  const res = await apiGet(
    `/blogs/get-all?category_id=${encodeURIComponent(String(categoryId))}`,
    false,
  );
  return extractList<ApiBlog>(res);
}

export async function fetchBlogBySlug(slug: string) {
  const res = await apiGet(
    `/blogs/get-all?slug=${encodeURIComponent(slug)}`,
    false,
  );
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
