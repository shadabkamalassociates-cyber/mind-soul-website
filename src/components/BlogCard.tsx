import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/types/blog";

type BlogCardProps = {
  article: BlogArticle;
  variant?: "overlay" | "listing";
  className?: string;
};

export default function BlogCard({
  article,
  variant = "listing",
  className = "",
}: BlogCardProps) {
  if (variant === "overlay") {
    return <BlogCardOverlay article={article} className={className} />;
  }

  return (
    <Link href={`/blogs/${article.slug}`} className={`block ${className}`}>
      <article className="group flex flex-col overflow-hidden rounded-xl border border-[#E8EAF4] bg-white shadow-[0_6px_20px_rgba(26,26,74,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(26,26,74,0.10)]">
        <div className="relative h-[120px] w-full overflow-hidden sm:h-[130px]">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
            quality={95}
          />
          <span className="absolute left-2.5 top-2.5 rounded bg-[#C9A06A] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-white">
            {article.category}
          </span>
        </div>

        <div className="flex flex-col px-3.5 pb-3 pt-2.5 sm:px-4 sm:pb-3.5 sm:pt-3">
          <h3
            className="line-clamp-2 text-[14px] font-semibold leading-snug text-[#3D3D8F] sm:text-[15px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            {article.title}
          </h3>

          <p className="mt-1.5 line-clamp-1 text-[11px] leading-snug text-[#5C5C7A] sm:text-[12px]">
            {article.excerpt}
          </p>

          <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-[#E8EAF4] pt-2.5">
            <span className="truncate text-[10px] text-[#8A8AA8] sm:text-[11px]">
              {article.date} • {article.readTime}
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-[#3D3D8F] px-2.5 py-1 text-[10px] font-semibold text-white transition group-hover:bg-[#2F2F70] sm:text-[11px]">
              Read More →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function BlogCardOverlay({
  article,
  className = "",
}: {
  article: BlogArticle;
  className?: string;
}) {
  return (
    <Link
      href={`/blogs/${article.slug}`}
      className={`group block h-full w-full ${className}`}
    >
      <article className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[#D8C4EF]/80 bg-[#3B1C5B] shadow-[0_6px_24px_rgba(59,28,91,0.1)] transition duration-300 hover:border-[#C5A059]/50 hover:shadow-[0_12px_32px_rgba(59,28,91,0.16)]">
        <div className="relative aspect-[3/3.6] w-full overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            unoptimized
            className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 78vw, (max-width: 1280px) 33vw, 20vw"
            quality={95}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3B1C5B]/95 via-[#4B2475]/55 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col p-4">
            <h3
              className="line-clamp-3 text-[14px] font-semibold leading-snug text-white sm:text-[15px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              {article.title}
            </h3>
            <p className="mt-2 text-[11px] text-white/85 sm:text-[12px]">
              {article.date}
              <span className="mx-1.5 text-[#C5A059]/80">•</span>
              {article.readTime}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
