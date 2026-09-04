"use client";

import { useState } from "react";
import { JUST99_CHAT_REVIEWS } from "@/components/communityJoin/just99Assets";

export default function Just99ChatReviews() {
  const total = JUST99_CHAT_REVIEWS.length;
  const [active, setActive] = useState(1);

  function go(delta: number) {
    setActive((prev) => (prev + delta + total) % total);
  }

  return (
    <section className="just99-says-section" aria-label="What people are saying">
      <div className="just99-says-inner">
        <header className="just99-says-head">
          <h2 className="just99-says-title">What people are saying</h2>
          <p className="just99-says-sub">
            Real conversations from participants of the Numero Vastu Masterclass.
          </p>
        </header>

        <div className="just99-says-slider">
          <button
            type="button"
            className="just99-says-nav"
            aria-label="Previous review"
            onClick={() => go(-1)}
          >
            <NavArrow dir="left" />
          </button>

          <div className="just99-says-track">
            {JUST99_CHAT_REVIEWS.map((review, index) => {
              const offset = (index - active + total) % total;
              const pos =
                offset === 0
                  ? "is-active"
                  : offset === 1
                    ? "is-next"
                    : offset === total - 1
                      ? "is-prev"
                      : "is-hidden";
              return (
                <article key={review.id} className={`just99-phone ${pos}`}>
                  <div className="just99-phone-bar">
                    <span className="just99-phone-back" aria-hidden>
                      <BackChevron />
                    </span>
                    <span className="just99-phone-avatar" aria-hidden>
                      {review.contact.charAt(0)}
                    </span>
                    <span className="just99-phone-meta">
                      <span className="just99-phone-name">{review.contact}</span>
                      <span className="just99-phone-status">online</span>
                    </span>
                    <span className="just99-phone-actions" aria-hidden>
                      <VideoIcon />
                      <CallIcon />
                    </span>
                  </div>
                  <div className="just99-phone-body">
                    <span className="just99-phone-day">Today</span>
                    {review.messages.map((msg, msgIndex) => {
                      const prev = review.messages[msgIndex - 1];
                      const grouped = prev?.from === msg.from;
                      return (
                        <p
                          key={`${review.id}-${msg.time}-${msg.text.slice(0, 12)}`}
                          className={`just99-bubble just99-bubble-${msg.from}${grouped ? " is-grouped" : ""}`}
                        >
                          {msg.text}
                          <span className="just99-bubble-meta">
                            {msg.time}
                            {msg.from === "us" ? <DoubleTick /> : null}
                          </span>
                        </p>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            className="just99-says-nav"
            aria-label="Next review"
            onClick={() => go(1)}
          >
            <NavArrow dir="right" />
          </button>
        </div>
      </div>
    </section>
  );
}

function NavArrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d={dir === "left" ? "M10 3.5 5.5 8 10 12.5" : "M6 3.5 10.5 8 6 12.5"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackChevron() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15.5 4.5 8 12l7.5 7.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VideoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3.5 7.2h11.2A1.8 1.8 0 0 1 16.5 9v6a1.8 1.8 0 0 1-1.8 1.8H3.5A1.8 1.8 0 0 1 1.7 15V9a1.8 1.8 0 0 1 1.8-1.8Z"
        fill="currentColor"
      />
      <path d="M16.7 9.6 22 7.4v9.2l-5.3-2.2V9.6Z" fill="currentColor" />
    </svg>
  );
}

function CallIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6.6 3.7c.5-.5 1.4-.4 1.8.2l1.6 2.4c.4.6.2 1.4-.3 1.8l-1.2 1c1.4 2.4 3.3 4.2 5.7 5.5l1-.9c.5-.5 1.3-.6 1.9-.2l2.4 1.5c.6.4.8 1.3.3 1.9l-1.3 1.8c-.4.6-1.2.8-1.9.6-3.6-.8-7-2.8-9.7-5.6-2.7-2.7-4.6-6-5.4-9.6-.2-.7.1-1.5.7-1.9l1.7-1.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function DoubleTick() {
  return (
    <svg className="just99-bubble-ticks" width="14" height="10" viewBox="0 0 16 11" fill="none" aria-hidden>
      <path
        d="M1.2 6.1 3.7 8.7 8.8 2.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.4 8.7 7.3 9.6 14.8 1.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
