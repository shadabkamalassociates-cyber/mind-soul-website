"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ExpertComment } from "@/data/expertReviews";
import {
  formatCount,
  getExpertReviewData,
} from "@/data/expertReviews";

type ExpertReviewsSectionProps = {
  expertSlug: string;
  ratingLabel: string;
};

type SortOption = "recent" | "top" | "oldest";

export default function ExpertReviewsSection({
  expertSlug,
  ratingLabel,
}: ExpertReviewsSectionProps) {
  const reviewData = useMemo(
    () => getExpertReviewData(expertSlug, ratingLabel),
    [expertSlug, ratingLabel],
  );

  const [profileLiked, setProfileLiked] = useState(false);
  const [profileLikes, setProfileLikes] = useState(reviewData.profileLikes);
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [comments, setComments] = useState(reviewData.comments);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [visibleCount, setVisibleCount] = useState(5);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const sortedComments = useMemo(() => {
    const list = [...comments];
    if (sortBy === "top") {
      return list.sort((a, b) => b.likes - a.likes);
    }
    if (sortBy === "oldest") {
      return list.reverse();
    }
    return list;
  }, [comments, sortBy]);

  const visibleComments = sortedComments.slice(0, visibleCount);

  function toggleProfileLike() {
    setProfileLiked((prev) => {
      setProfileLikes((count) => (prev ? count - 1 : count + 1));
      return !prev;
    });
  }

  function toggleCommentLike(id: string) {
    setLikedComments((prev) => {
      const next = new Set(prev);
      const liked = next.has(id);
      if (liked) next.delete(id);
      else next.add(id);
      setComments((list) =>
        list.map((c) =>
          c.id === id ? { ...c, likes: c.likes + (liked ? -1 : 1) } : c,
        ),
      );
      return next;
    });
  }

  function handlePostReview() {
    if (!reviewText.trim() || newRating === 0) return;

    const newComment: ExpertComment = {
      id: `${expertSlug}-new-${Date.now()}`,
      name: "You",
      avatar: "/experts-page/expert-1-cutout.png",
      verified: false,
      rating: newRating,
      timeAgo: "Just now",
      text: reviewText.trim(),
      likes: 0,
    };

    setComments((prev) => [newComment, ...prev]);
    setReviewText("");
    setNewRating(0);
    setHoverRating(0);
    setVisibleCount((c) => Math.max(c, 5));
  }

  function handleReply(commentId: string) {
    if (!replyText.trim()) return;

    const parent = comments.find((c) => c.id === commentId);
    if (!parent) return;

    const reply: ExpertComment = {
      id: `${expertSlug}-reply-${Date.now()}`,
      name: "You",
      avatar: "/experts-page/expert-1-cutout.png",
      verified: false,
      rating: 5,
      timeAgo: "Just now",
      text: `Replying to ${parent.name}: ${replyText.trim()}`,
      likes: 0,
    };

    setComments((prev) => [reply, ...prev]);
    setReplyText("");
    setReplyingTo(null);
  }

  function handleDeleteComment(id: string) {
    setComments((prev) => prev.filter((c) => c.id !== id));
    setLikedComments((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    if (replyingTo === id) {
      setReplyingTo(null);
      setReplyText("");
    }
    setOpenMenuId(null);
  }

  return (
    <section className="bg-[#F8F9FC] py-7 sm:py-9">
      <div className="mx-auto max-w-[920px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-5">
          <h2
            className="text-[22px] font-semibold text-[#3D3D8F] sm:text-[24px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Reviews &amp; Comments
          </h2>
          <p className="mt-1 text-[12px] text-[#6B6BC4] sm:text-[13px]">
            Real experiences from people who have used our services.
          </p>
        </div>

        {/* Top card: rating + distribution + write review */}
        <div className="rounded-xl border border-[#E8EAF4] bg-white p-4 shadow-[0_4px_20px_rgba(26,26,74,0.05)] sm:p-5 lg:p-6">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[160px_1fr_minmax(240px,300px)] lg:gap-6">
            {/* Overall rating */}
            <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left">
              <div className="flex items-baseline gap-1">
                <span className="text-[40px] font-bold leading-none text-[#1A1A4A]">
                  {reviewData.overallRating.toFixed(1)}
                </span>
                <GoldStarIcon className="mb-1 h-6 w-6" />
              </div>
              <p className="mt-1 text-[13px] font-medium text-[#6B6B8A]">Overall</p>
              <div className="mt-2 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <GoldStarIcon
                    key={i}
                    className="h-4 w-4"
                    filled={i < Math.round(reviewData.overallRating)}
                  />
                ))}
              </div>
              <p className="mt-2 text-[12px] text-[#8A8AA8]">
                {reviewData.totalReviews.toLocaleString()} total reviews
              </p>
            </div>

            {/* Distribution bars */}
            <div className="flex flex-col justify-center gap-2">
              {reviewData.distribution.map((row) => (
                <div key={row.stars} className="flex items-center gap-2.5">
                  <span className="w-3 text-[12px] font-medium text-[#4A4A6A]">
                    {row.stars}
                  </span>
                  <GoldStarIcon className="h-3 w-3 shrink-0" />
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#EDEEF5]">
                    <div
                      className="h-full rounded-full bg-[#3D3D8F] transition-all"
                      style={{ width: `${row.percent}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-[12px] text-[#6B6B8A]">
                    {row.percent}%
                  </span>
                </div>
              ))}
            </div>

            {/* Share your experience */}
            <div className="rounded-xl border border-[#E8EAF4] bg-[#FAFBFF] p-4 sm:p-5">
              <h3 className="text-[14px] font-semibold text-[#1A1A4A]">
                Share your experience
              </h3>
              <p className="mt-0.5 text-[11px] text-[#8A8AA8]">
                Your feedback helps others make the right choice.
              </p>

              <div
                className="mt-3 flex gap-1"
                onMouseLeave={() => setHoverRating(0)}
              >
                {Array.from({ length: 5 }).map((_, i) => {
                  const starValue = i + 1;
                  const filled = starValue <= (hoverRating || newRating);
                  return (
                    <button
                      key={starValue}
                      type="button"
                      aria-label={`Rate ${starValue} stars`}
                      className="p-0.5 transition-transform hover:scale-110"
                      onMouseEnter={() => setHoverRating(starValue)}
                      onClick={() => setNewRating(starValue)}
                    >
                      <GoldStarIcon
                        className="h-6 w-6"
                        filled={filled}
                        outline={!filled}
                      />
                    </button>
                  );
                })}
              </div>

              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your experience..."
                rows={3}
                className="mt-3 w-full resize-none rounded-lg border border-[#E0E2EE] bg-white px-3 py-2.5 text-[13px] text-[#1A1A4A] placeholder:text-[#B0B0C8] focus:border-[#3D3D8F] focus:outline-none focus:ring-1 focus:ring-[#3D3D8F]/30"
              />

              <div className="mt-3 flex justify-end">
                <button
                  type="button"
                  onClick={handlePostReview}
                  disabled={!reviewText.trim() || newRating === 0}
                  className="rounded-lg bg-[#1A1A4A] px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-[#2D2D6A] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Post review
                </button>
              </div>
            </div>
          </div>

          {/* Like expert profile bar */}
          <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-[#E8EAF4] pt-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-[#4A4A6A]">
              <ThumbsUpIcon className="h-4 w-4 text-[#3D3D8F]" />
              <span className="text-[13px] font-medium">
                Like this expert&apos;s profile?
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={toggleProfileLike}
                className={[
                  "inline-flex items-center gap-2 rounded-full px-5 py-2 text-[13px] font-semibold transition",
                  profileLiked
                    ? "bg-[#1A1A4A] text-white"
                    : "border border-[#1A1A4A] bg-[#1A1A4A] text-white hover:bg-[#2D2D6A]",
                ].join(" ")}
              >
                <HeartIcon filled={profileLiked} className="h-4 w-4" />
                {profileLiked ? "Liked" : "Like Expert"} ({formatCount(profileLikes)})
              </button>
            </div>
          </div>
        </div>

        {/* Comments list — scrollable, compact */}
        <div className="mt-5 rounded-xl border border-[#E8EAF4] bg-white shadow-[0_4px_20px_rgba(26,26,74,0.05)]">
          <div className="flex items-center justify-between border-b border-[#E8EAF4] px-4 py-3 sm:px-5">
            <h3 className="text-[14px] font-semibold text-[#1A1A4A]">
              Comments ({formatCount(comments.length)})
            </h3>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none rounded-lg border border-[#E0E2EE] bg-white py-1.5 pl-3 pr-8 text-[12px] font-medium text-[#4A4A6A] focus:border-[#3D3D8F] focus:outline-none"
              >
                <option value="recent">Most Recent</option>
                <option value="top">Top Rated</option>
                <option value="oldest">Oldest</option>
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6B6B8A]" />
            </div>
          </div>

          <div className="max-h-[260px] overflow-y-auto overscroll-contain [scrollbar-color:#C5C5D5_#F4F4FA] [scrollbar-width:thin] sm:max-h-[300px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#C5C5D5] [&::-webkit-scrollbar-track]:bg-[#F4F4FA]">
            {visibleComments.length === 0 ? (
              <p className="px-5 py-10 text-center text-[13px] text-[#8A8AA8] sm:px-6">
                No comments yet. Be the first to share your experience!
              </p>
            ) : (
              visibleComments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  liked={likedComments.has(comment.id)}
                  onLike={() => toggleCommentLike(comment.id)}
                  isReplying={replyingTo === comment.id}
                  replyText={replyingTo === comment.id ? replyText : ""}
                  onReplyClick={() => {
                    setOpenMenuId(null);
                    setReplyingTo(replyingTo === comment.id ? null : comment.id);
                    setReplyText("");
                  }}
                  onReplyTextChange={setReplyText}
                  onSubmitReply={() => handleReply(comment.id)}
                  onCancelReply={() => {
                    setReplyingTo(null);
                    setReplyText("");
                  }}
                  menuOpen={openMenuId === comment.id}
                  onMenuToggle={() =>
                    setOpenMenuId(openMenuId === comment.id ? null : comment.id)
                  }
                  onMenuClose={() => setOpenMenuId(null)}
                  onDelete={() => handleDeleteComment(comment.id)}
                />
              ))
            )}
          </div>

          {visibleCount < sortedComments.length && (
            <div className="border-t border-[#E8EAF4] px-5 py-4 text-center sm:px-6">
              <button
                type="button"
                onClick={() => setVisibleCount((c) => c + 5)}
                className="inline-flex items-center gap-2 rounded-lg border border-[#E0E2EE] bg-white px-6 py-2.5 text-[13px] font-medium text-[#3D3D8F] transition hover:bg-[#F4F4FA]"
              >
                Load More Comments
                <ChevronDownIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function CommentItem({
  comment,
  liked,
  onLike,
  isReplying,
  replyText,
  onReplyClick,
  onReplyTextChange,
  onSubmitReply,
  onCancelReply,
  menuOpen,
  onMenuToggle,
  onMenuClose,
  onDelete,
}: {
  comment: ExpertComment;
  liked: boolean;
  onLike: () => void;
  isReplying: boolean;
  replyText: string;
  onReplyClick: () => void;
  onReplyTextChange: (text: string) => void;
  onSubmitReply: () => void;
  onCancelReply: () => void;
  menuOpen: boolean;
  onMenuToggle: () => void;
  onMenuClose: () => void;
  onDelete: () => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onMenuClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, onMenuClose]);

  return (
    <div className="border-b border-[#EEF0F6] px-4 py-3 last:border-b-0 sm:px-5">
      <div className="flex gap-3">
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#EDEEF5]">
          <Image
            src={comment.avatar}
            alt={comment.name}
            fill
            className="object-cover object-top"
            sizes="36px"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[13px] font-semibold text-[#1A1A4A]">
                  {comment.name}
                </span>
                {comment.verified && <VerifiedBadge />}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <GoldStarIcon
                      key={i}
                      className="h-3 w-3"
                      filled={i < comment.rating}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-[#8A8AA8]">{comment.timeAgo}</span>
              </div>
            </div>
            <div className="relative shrink-0" ref={menuRef}>
              <button
                type="button"
                aria-label="More options"
                aria-expanded={menuOpen}
                onClick={onMenuToggle}
                className="rounded p-1 text-[#8A8AA8] transition hover:bg-[#F4F4FA] hover:text-[#4A4A6A]"
              >
                <DotsVerticalIcon className="h-4 w-4" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full z-20 mt-1 min-w-[148px] overflow-hidden rounded-lg border border-[#E8EAF4] bg-white py-1 shadow-[0_8px_24px_rgba(26,26,74,0.12)]">
                  <button
                    type="button"
                    onClick={() => {
                      onDelete();
                      onMenuClose();
                    }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-[12px] font-medium text-[#B42318] transition hover:bg-[#FEF3F2]"
                  >
                    <TrashIcon className="h-3.5 w-3.5" />
                    Delete comment
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="mt-2.5 text-[13px] leading-[1.7] text-[#4A4A6A]">
            {comment.text}
          </p>

          <div className="mt-2.5 flex items-center gap-4">
            <button
              type="button"
              onClick={onLike}
              className={[
                "inline-flex items-center gap-1 text-[12px] font-medium transition",
                liked ? "text-[#3D3D8F]" : "text-[#6B6B8A] hover:text-[#3D3D8F]",
              ].join(" ")}
            >
              <ThumbsUpIcon className="h-3.5 w-3.5" filled={liked} />
              Like ({comment.likes})
            </button>
            <button
              type="button"
              onClick={onReplyClick}
              className="inline-flex items-center gap-1 text-[12px] font-medium text-[#6B6B8A] transition hover:text-[#3D3D8F]"
            >
              <ReplyIcon className="h-3.5 w-3.5" />
              Reply
            </button>
          </div>

          {isReplying && (
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => onReplyTextChange(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 rounded-lg border border-[#E0E2EE] px-3 py-2 text-[12px] focus:border-[#3D3D8F] focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") onSubmitReply();
                }}
              />
              <button
                type="button"
                onClick={onSubmitReply}
                disabled={!replyText.trim()}
                className="rounded-lg bg-[#1A1A4A] px-3 py-2 text-[12px] font-semibold text-white disabled:opacity-50"
              >
                Reply
              </button>
              <button
                type="button"
                onClick={onCancelReply}
                className="rounded-lg border border-[#E0E2EE] px-3 py-2 text-[12px] text-[#6B6B8A]"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-0.5 rounded bg-[#EDE9FE] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#7C3AED]">
      <CheckIcon className="h-2.5 w-2.5" />
      Verified
    </span>
  );
}

function GoldStarIcon({
  className = "h-4 w-4",
  filled = true,
  outline = false,
}: {
  className?: string;
  filled?: boolean;
  outline?: boolean;
}) {
  if (outline || !filled) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 4L14.2 9.2L20 9.8L15.5 13.6L16.8 19.5L12 16.6L7.2 19.5L8.5 13.6L4 9.8L9.8 9.2L12 4Z"
          stroke="#D4AF37"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#EAB308" aria-hidden>
      <path d="M12 4L14.2 9.2L20 9.8L15.5 13.6L16.8 19.5L12 16.6L7.2 19.5L8.5 13.6L4 9.8L9.8 9.2L12 4Z" />
    </svg>
  );
}

function ThumbsUpIcon({
  className = "h-4 w-4",
  filled = false,
}: {
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 11V20H4C3.4 20 3 19.6 3 19V12C3 11.4 3.4 11 4 11H7ZM7 11L10.5 4.5C11.2 3.2 12.8 3.2 13.5 4.5L15 8V18C15 19.1 14.1 20 13 20H8.5C7.7 20 7 19.4 6.8 18.6L5.5 13H7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill={filled ? "currentColor" : "none"}
      />
    </svg>
  );
}

function HeartIcon({
  className = "h-4 w-4",
  filled = false,
}: {
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20.5C12 20.5 4 15 4 9.5C4 6.5 6.5 4 9.5 4C11.2 4 12 5 12 5C12 5 12.8 4 14.5 4C17.5 4 20 6.5 20 9.5C20 15 12 20.5 12 20.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill={filled ? "currentColor" : "none"}
      />
    </svg>
  );
}

function ReplyIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 17L4 12L9 7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 12H16C18 12 20 10 20 8V6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 7H19M9 7V5.5C9 4.7 9.7 4 10.5 4H13.5C14.3 4 15 4.7 15 5.5V7M8 7L9 19.5C9 20.3 9.7 21 10.5 21H13.5C14.3 21 15 20.3 15 19.5L16 7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DotsVerticalIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <circle cx="12" cy="5" r="1.5" />
      <circle cx="12" cy="12" r="1.5" />
      <circle cx="12" cy="19" r="1.5" />
    </svg>
  );
}

function ChevronDownIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.5 6L5 8.5L9.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
