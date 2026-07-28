import Image from "next/image";
import Link from "next/link";
import type { RecordedVideo } from "@/types/recordedVideo";

type RecordedVideoCardProps = {
  video: RecordedVideo;
  variant?: "featured" | "continue" | "popular" | "recent";
};

export default function RecordedVideoCard({
  video,
  variant = "featured",
}: RecordedVideoCardProps) {
  if (variant === "continue") return <ContinueCard video={video} />;
  if (variant === "popular") return <PopularCard video={video} />;
  if (variant === "recent") return <RecentCard video={video} />;
  return <FeaturedCard video={video} />;
}

function FeaturedCard({ video }: { video: RecordedVideo }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E8EAF4] bg-white shadow-[0_4px_20px_rgba(26,26,74,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(26,26,74,0.10)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F7F6FB]">
        <Image
          src={video.image}
          alt={video.title}
          fill
          className="object-cover object-center transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition group-hover:opacity-100">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#3D3D8F] shadow-lg">
            <PlayIcon />
          </span>
        </div>
        {video.badge && (
          <span className="absolute left-2.5 top-2.5 rounded bg-[#C9A06A] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-white">
            {video.badge}
          </span>
        )}
        <button
          type="button"
          aria-label="Save video"
          className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[#1A1A4A] shadow-sm"
        >
          <HeartIcon />
        </button>
        <span className="absolute bottom-2.5 right-2.5 rounded bg-black/75 px-2 py-0.5 text-[10px] font-medium text-white">
          {video.duration}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3">
        <h3
          className="line-clamp-2 text-[14px] font-semibold leading-snug text-[#3D3D8F] sm:text-[15px]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          {video.title}
        </h3>
        <p className="mt-1 line-clamp-1 text-[11px] text-[#8A8AA8]">{video.subtitle}</p>

        <div className="mt-2.5 flex items-center gap-2">
          <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full bg-[#EEF0FA]">
            <Image
              src={video.expertAvatar}
              alt={video.expert}
              fill
              unoptimized
              className="object-cover object-top"
              sizes="28px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-semibold text-[#1A1A4A]">{video.expert}</p>
            <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-[#8A8AA8]">
              <span className="inline-flex items-center gap-0.5">
                <StarIcon />
                {video.rating} ({video.reviews})
              </span>
              <span>{video.students} students</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Link
            href={`/recorded-videos/${video.slug}`}
            className="flex flex-1 items-center justify-center rounded-lg bg-[#3D3D8F] py-2.5 text-[12px] font-semibold text-white transition hover:bg-[#2F2F70]"
          >
            Book Now
          </Link>
          <button
            type="button"
            aria-label="Save"
            className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg border border-[#E8EAF4] bg-white text-[#1A1A4A] transition hover:border-[#3D3D8F]/30"
          >
            <BookmarkIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

function ContinueCard({ video }: { video: RecordedVideo }) {
  return (
    <Link href={`/recorded-videos/${video.slug}`} className="block shrink-0">
      <article className="group w-[220px] overflow-hidden rounded-xl border border-[#E8EAF4] bg-white shadow-[0_4px_16px_rgba(26,26,74,0.06)] sm:w-[240px]">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image src={video.image} alt={video.title} fill className="object-cover" sizes="240px" />
          <span className="absolute bottom-2 right-2 rounded bg-black/75 px-1.5 py-0.5 text-[9px] text-white">
            {video.duration}
          </span>
          {video.progress != null && (
            <div className="absolute inset-x-0 bottom-0 h-1 bg-black/20">
              <div
                className="h-full bg-[#3D3D8F]"
                style={{ width: `${video.progress}%` }}
              />
            </div>
          )}
        </div>
        <div className="px-3 py-2.5">
          <h3 className="line-clamp-2 text-[12px] font-semibold leading-snug text-[#3D3D8F]">
            {video.title}
          </h3>
          <p className="mt-1 text-[10px] text-[#8A8AA8]">{video.progress}% complete</p>
        </div>
      </article>
    </Link>
  );
}

function PopularCard({ video }: { video: RecordedVideo }) {
  return (
    <Link href={`/recorded-videos/${video.slug}`} className="block h-full">
      <article className="group overflow-hidden rounded-xl border border-[#E8EAF4] bg-white shadow-[0_4px_16px_rgba(26,26,74,0.05)] transition hover:-translate-y-0.5">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image src={video.image} alt={video.title} fill className="object-cover transition group-hover:scale-[1.03]" sizes="280px" />
          <span className="absolute bottom-2 right-2 rounded bg-black/75 px-1.5 py-0.5 text-[9px] text-white">
            {video.duration}
          </span>
        </div>
        <div className="px-3 py-2.5">
          <h3 className="line-clamp-2 text-[13px] font-semibold text-[#3D3D8F]">{video.title}</h3>
          <div className="mt-1.5 flex items-center gap-2 text-[10px] text-[#8A8AA8]">
            <span className="inline-flex items-center gap-0.5">
              <StarIcon />
              {video.rating}
            </span>
            <span>{video.students} students</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function RecentCard({ video }: { video: RecordedVideo }) {
  return (
    <Link href={`/recorded-videos/${video.slug}`} className="block h-full">
      <article className="group overflow-hidden rounded-lg border border-[#E8EAF4] bg-white shadow-[0_2px_12px_rgba(26,26,74,0.05)] transition hover:-translate-y-0.5">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image src={video.image} alt={video.title} fill className="object-cover" sizes="200px" />
          <span className="absolute bottom-1.5 right-1.5 rounded bg-black/75 px-1.5 py-0.5 text-[8px] text-white">
            {video.duration}
          </span>
        </div>
        <div className="px-2.5 py-2">
          <h3 className="line-clamp-1 text-[11px] font-semibold text-[#3D3D8F]">{video.title}</h3>
          <div className="mt-1 flex items-center gap-1 text-[9px] text-[#8A8AA8]">
            <StarIcon />
            {video.rating} · {video.students}
          </div>
        </div>
      </article>
    </Link>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.5V18.5L18.5 12L8 5.5Z" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 20.5C12 20.5 4.5 14.5 4.5 9.5C4.5 7.2 6.2 5.5 8.5 5.5C10 5.5 11.3 6.3 12 7.5C12.7 6.3 14 5.5 15.5 5.5C17.8 5.5 19.5 7.2 19.5 9.5C19.5 14.5 12 20.5 12 20.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="#C9A06A" aria-hidden className="shrink-0">
      <path d="M12 3.5L14.2 9.2L20.2 9.8L15.6 13.8L17.1 19.7L12 16.6L6.9 19.7L8.4 13.8L3.8 9.8L9.8 9.2L12 3.5Z" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 4H18V20L12 16L6 20V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
