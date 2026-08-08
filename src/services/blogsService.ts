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

/** Normalize CMS / exported HTML for clean article rendering. */
export function sanitizeBlogHtml(html: string) {
  let out = String(html ?? "").trim();
  if (!out) return "";

  // Drop ChatGPT / editor selection chrome
  out = out.replace(
    /<span[^>]*aria-hidden=["']true["'][^>]*>[\s\S]*?<\/span>/gi,
    "",
  );
  out = out.replace(
    /<span([^>]*)\srole=["']text["']([^>]*)>/gi,
    "<span$1$2>",
  );

  // Unwrap empty / utility spans that only wrap content
  out = out.replace(/<span(?:\s[^>]*)?>\s*<\/span>/gi, "");
  out = out.replace(/<span(?:\s[^>]*)?>((?:[^<]|<(?!\/?span\b))*)<\/span>/gi, "$1");

  // Strip noisy attributes from paste exports
  out = out.replace(/\s(?:data-[a-z0-9_-]+|class|id|role|aria-hidden)=(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "");

  // Body already has a page title — demote CMS h1s to h2
  out = out.replace(/<h1(\s[^>]*)?>/gi, "<h2$1>");
  out = out.replace(/<\/h1>/gi, "</h2>");

  // Remove empty blocks that create large gaps (e.g. <h2><br></h2>, <p>&nbsp;</p>)
  const emptyInner = String.raw`(?:\s|&nbsp;|<br\s*\/?>|<strong>\s*(?:<br\s*\/?>|\s|&nbsp;)*\s*<\/strong>)*`;
  out = out.replace(
    new RegExp(`<(p|h[1-6]|div)(?:\\s[^>]*)?>${emptyInner}<\\/\\1>`, "gi"),
    "",
  );

  // Clean list item whitespace so short bullets don't look oversized
  out = out.replace(/<li(?:\s[^>]*)?>\s+/gi, "<li>");
  out = out.replace(/\s+<\/li>/gi, "</li>");

  // Collapse leftover whitespace between tags
  out = out.replace(/>\s+</g, "><");
  out = out.replace(/(<\/(?:p|h[1-6]|ul|ol|blockquote|div)>)(<)/gi, "$1\n$2");

  return out.trim();
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
    "Cosmicguruji Editorial"
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
  const title = String(blog.title ?? "Untitled");
  let rawContent = sanitizeBlogHtml(String(blog.content ?? ""));

  // Drop a leading heading that repeats the page title
  const leadingHeading = rawContent.match(
    /^<h[1-6](?:\s[^>]*)?>([\s\S]*?)<\/h[1-6]>/i,
  );
  if (leadingHeading) {
    const headingText = htmlToPlainText(leadingHeading[1])
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
    if (headingText && headingText === title.replace(/\s+/g, " ").trim().toLowerCase()) {
      rawContent = rawContent.slice(leadingHeading[0].length).trim();
    }
  }

  const plainContent = htmlToPlainText(rawContent);
  const paragraphs = contentToParagraphs(rawContent);

  const published = blog.published_at
    ? new Date(String(blog.published_at))
    : null;

  const shortDescription = String(blog.short_description ?? "").trim();
  const categoryRef = blog.category;

  return {
    id: String(blog.id ?? blog.slug ?? ""),
    slug: String(blog.slug ?? blog.id ?? ""),
    title,
    excerpt: String(
      shortDescription ||
        blog.meta_description ||
        paragraphs[0] ||
        plainContent.slice(0, 220),
    ).slice(0, 220),
    shortDescription,
    date: published
      ? published.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "Recently",
    readTime: estimateReadTime(plainContent || shortDescription),
    image: String(
      blog.featured_image ?? blog.banner_image ?? DEFAULT_BLOG_IMAGE,
    ),
    category: resolveCategoryName(blog, categoryName),
    categorySlug:
      typeof categoryRef === "object" && categoryRef?.slug
        ? String(categoryRef.slug)
        : undefined,
    author: resolveAuthorName(blog),
    content: paragraphs.length
      ? paragraphs
      : [
          String(
            shortDescription ||
              (plainContent.slice(0, 500) || "Content coming soon."),
          ),
        ],
    htmlContent: rawContent,
    views: typeof blog.views === "number" ? blog.views : undefined,
    isFeatured: Boolean(blog.is_featured),
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
