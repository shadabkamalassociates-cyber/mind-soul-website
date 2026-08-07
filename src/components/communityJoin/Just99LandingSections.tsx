"use client";

import Image from "next/image";
import {
  JUST99_ASSETS,
  JUST99_BOTTOM_VALUES,
  JUST99_FEATURES,
  JUST99_WHY_JOIN_CHECKLIST,
} from "@/components/communityJoin/just99Assets";

function Just99Asset({
  src,
  size,
  className = "",
}: {
  src: string;
  size: number;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      unoptimized
      className={`just99-asset-img object-contain ${className}`.trim()}
      style={{ width: size, height: size }}
    />
  );
}

export default function Just99LandingSections() {
  return (
    <div className="just99-landing-sections shrink-0">
      <section className="just99-mid-section">
        <div className="just99-mid-inner">
          <div className="just99-mid-grid">
            <article className="just99-why-card">
              <div className="just99-why-card-media">
                <Image
                  src={JUST99_ASSETS.whyJoinArt}
                  alt=""
                  width={200}
                  height={260}
                  unoptimized
                  className="just99-why-card-art-img"
                />
              </div>
              <div className="just99-why-card-content">
                <h2 className="just99-why-card-title">Why Join Our Community?</h2>
                <div className="just99-why-card-divider" aria-hidden>
                  <span className="just99-why-card-divider-line" />
                  <span className="just99-why-card-divider-diamond" />
                  <span className="just99-why-card-divider-line" />
                </div>
                <ul className="just99-why-card-list">
                  {JUST99_WHY_JOIN_CHECKLIST.map((item) => (
                    <li key={item}>
                      <span className="just99-why-card-check" aria-hidden>
                        <CheckIcon />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <div className="just99-mid-features">
              {JUST99_FEATURES.map((item) => (
                <div key={item.title} className="just99-mid-feature-card">
                  <span className="just99-mid-feature-icon">
                    <Just99Asset src={item.image} size={30} />
                  </span>
                  <p className="just99-mid-feature-title">{item.title}</p>
                  <p className="just99-mid-feature-desc">{item.desc}</p>
                </div>
              ))}
            </div>

            <article className="just99-quote-card">
              <span className="just99-quote-mark" aria-hidden>
                <QuoteIcon />
              </span>
              <p className="just99-quote-text">
                Be a part of a loving community that uplifts and inspires you every day.
              </p>
              <div className="just99-quote-footer" aria-hidden>
                <span className="just99-quote-line" />
                <Just99Asset src={JUST99_ASSETS.lotus} size={14} className="just99-quote-lotus" />
                <span className="just99-quote-line" />
              </div>
              <Image
                src={JUST99_ASSETS.vine}
                alt=""
                width={90}
                height={200}
                unoptimized
                className="just99-quote-vine"
              />
            </article>
          </div>
        </div>
      </section>

      <section className="just99-values-bar">
        <div className="just99-values-inner">
          {JUST99_BOTTOM_VALUES.map((item) => (
            <div key={item.title} className="just99-values-item">
              <span className="just99-values-icon">
                <Just99Asset src={item.image} size={22} />
              </span>
              <div>
                <p className="just99-values-title">{item.title}</p>
                <p className="just99-values-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.5 8.2L6.6 11.3L12.5 4.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QuoteIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M8 18C8 14.5 10.2 12 13.5 12L14 16C12.2 16 11 17.1 11 18.5C11 19.6 11.8 20.5 13 20.5C14.8 20.5 16 19.1 16 17C16 13.8 13.8 11 10.5 11C7.5 11 5 13.5 5 17V22H11V18H8ZM20 18C20 14.5 22.2 12 25.5 12L26 16C24.2 16 23 17.1 23 18.5C23 19.6 23.8 20.5 25 20.5C26.8 20.5 28 19.1 28 17C28 13.8 25.8 11 22.5 11C19.5 11 17 13.5 17 17V22H23V18H20Z"
        fill="currentColor"
      />
    </svg>
  );
}
