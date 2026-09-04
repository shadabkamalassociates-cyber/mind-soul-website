"use client";

import Image from "next/image";
import {
  JUST99_ASSETS,
  JUST99_AUDIENCES,
  JUST99_ENERGY_FLOW,
  JUST99_ENERGY_HOME_POINTS,
  JUST99_ENERGY_YOU_POINTS,
  JUST99_COMPARE_ROWS,
  JUST99_FEATURES,
  JUST99_LEARN_FLOW,
  JUST99_LEARN_ITEMS,
  JUST99_LIFE_AREAS,
  JUST99_MENTOR,
  JUST99_TRUST_STATS,
  JUST99_WHY_JOIN_CHECKLIST,
} from "@/components/communityJoin/just99Assets";
import Just99ChatReviews from "@/components/communityJoin/Just99ChatReviews";

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
      <section className="just99-trust-section" aria-label="Community stats">
        <div className="just99-trust-bar">
          {JUST99_TRUST_STATS.map((item, index) => (
            <div key={item.label} className="just99-trust-item">
              <span className="just99-trust-icon" aria-hidden>
                <TrustStatIcon index={index} />
              </span>
              <div>
                <p className="just99-trust-value">{item.value}</p>
                <p className="just99-trust-label">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="just99-energy-section">
        <div className="just99-energy-inner">
          <header className="just99-energy-head">
            <h2 className="just99-energy-title">
              Your house has <span>energy</span>. So do you.
            </h2>
            <p className="just99-energy-sub">
              True harmony happens when your personal energy and your home&apos;s
              energy are aligned.
            </p>
          </header>

          <div className="just99-energy-grid">
            <article className="just99-energy-card">
              <h3>Your Home</h3>
              <ul>
                {JUST99_ENERGY_HOME_POINTS.map((item) => (
                  <li key={item}>
                    <GoldCheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <div className="just99-energy-flow" aria-hidden>
              <svg className="just99-energy-arcs" viewBox="0 0 320 520" fill="none">
                <path
                  d="M28 250 C 8 180 18 90 128 62"
                  stroke="#c5b8d4"
                  strokeWidth="1.4"
                  strokeDasharray="4 6"
                />
                <path
                  d="M292 250 C 312 180 302 90 192 62"
                  stroke="#c5b8d4"
                  strokeWidth="1.4"
                  strokeDasharray="4 6"
                />
              </svg>
              {JUST99_ENERGY_FLOW.map((step, index) => (
                <div key={step.title} className="just99-energy-step">
                  {index > 0 ? (
                    <span className="just99-energy-arrow" aria-hidden>
                      <FlowArrowIcon />
                    </span>
                  ) : null}
                  <div className={`just99-energy-node just99-energy-node-${step.tone}`}>
                    <p className="just99-energy-node-title">{step.title}</p>
                    {step.detail ? (
                      <p className="just99-energy-node-detail">{step.detail}</p>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <article className="just99-energy-card">
              <h3>You</h3>
              <ul>
                {JUST99_ENERGY_YOU_POINTS.map((item) => (
                  <li key={item}>
                    <GoldCheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="just99-compare-section">
        <div className="just99-compare-inner">
          <h2 className="just99-compare-title">
            Why <span>Numero Vastu</span> Knowledge is Better?
          </h2>
          <div className="just99-compare-wrap">
            <table className="just99-compare-table">
              <thead>
                <tr>
                  <th scope="col">Aspect</th>
                  <th scope="col">Traditional Vastu</th>
                  <th scope="col">Numero Vastu Knowledge</th>
                </tr>
              </thead>
              <tbody>
                {JUST99_COMPARE_ROWS.map((row) => (
                  <tr key={row.aspect}>
                    <th scope="row">{row.aspect}</th>
                    <td>{row.traditional}</td>
                    <td>
                      <span className="just99-compare-highlight">
                        <GoldCheckIcon />
                        <span>{row.numero}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2}>Limited to House Only</td>
                  <td>Complete Understanding of House + You + Total Harmony</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      <section className="just99-life-section">
        <div className="just99-life-inner">
          <header className="just99-life-head">
            <h2 className="just99-life-title">
              What could be affecting your <span>life?</span>
            </h2>
            <p className="just99-life-sub">
              Sometimes, the same challenges keep repeating — even after you&apos;ve
              tried different solutions.
            </p>
          </header>
          <div className="just99-life-grid">
            {JUST99_LIFE_AREAS.map((item) => (
              <article key={item.title} className="just99-life-card">
                <span className="just99-life-icon" aria-hidden>
                  <LifeAreaIcon name={item.icon} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="just99-mentor-section">
        <div className="just99-mentor-inner">
          <div className="just99-mentor-photo">
            <Image
              src={JUST99_ASSETS.mentor}
              alt={JUST99_MENTOR.name}
              width={390}
              height={359}
              unoptimized
              className="just99-mentor-img"
            />
          </div>
          <div className="just99-mentor-copy">
            {/* <span className="just99-mentor-badge">
              <span className="just99-mentor-badge-dot" aria-hidden />
              Meet Your Mentor
            </span> */}
            <h2 className="just99-mentor-name">{JUST99_MENTOR.name}</h2>
            <p className="just99-mentor-role">
              {JUST99_MENTOR.titleLead}{" "}
              <span>{JUST99_MENTOR.titleGold}</span> {JUST99_MENTOR.titleTail}
            </p>
            <p className="just99-mentor-bio">{JUST99_MENTOR.bio}</p>
            <ul className="just99-mentor-list">
              {JUST99_MENTOR.highlights.map((item) => (
                <li key={item}>
                  <ShieldCheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="just99-audience-section">
        <div className="just99-audience-inner">
          <h2 className="just99-audience-title">Who is this for?</h2>
          <div className="just99-audience-grid">
            {JUST99_AUDIENCES.map((item) => (
              <article key={item.title} className="just99-audience-card">
                <span className="just99-audience-thumb" aria-hidden>
                  <AudienceIcon name={item.icon} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="just99-learn-section">
        <div className="just99-learn-inner">
          <header className="just99-learn-head">
            <h2 className="just99-learn-title">
            WHAT YOU'LL DISCOVER IN YOUR SESSION
            </h2>
            <p className="just99-learn-sub">
            A practical approach to understanding your mind, your environment, and the patterns affecting your life.
            </p>
          </header>
          <div className="just99-learn-grid">
            {JUST99_LEARN_ITEMS.map((item, index) => (
              <article key={item.title} className="just99-learn-card">
                <span className="just99-learn-num" aria-hidden>
                  {index + 1}
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
          <ol className="just99-learn-flow">
            {JUST99_LEARN_FLOW.map((step) => (
              <li key={step}>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Just99ChatReviews />

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

      <section className="just99-close-section">
        <div className="just99-close-inner">
          <div className="just99-close-brand">
            <Image
              src="https://res.cloudinary.com/dgnztzmzp/image/upload/v1785323232/logo_-_icon_fbp439.png"
              alt=""
              width={36}
              height={36}
              unoptimized
              className="just99-close-logo"
            />
            <div>
              <p className="just99-close-brand-name">Cosmic Guruji</p>
              <p className="just99-close-brand-tag">
                Transforming Lives by Aligning Numbers, Directions & Energy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function TrustStatIcon({ index }: { index: number }) {
  if (index === 1) return <StarTrustIcon />;
  if (index === 2) return <ClockTrustIcon />;
  if (index === 3) return <HomeTrustIcon />;
  return <PeopleTrustIcon />;
}

function PeopleTrustIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3.1" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3.8 19.2c.8-3.4 3.4-5.2 6.7-5.2 3.3 0 5.9 1.8 6.7 5.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="17.2" cy="8.6" r="2.3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M16.1 14.2c2.4.3 4.1 1.7 4.7 4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StarTrustIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.4 14.3 9h6.1l-4.9 3.7 1.9 5.9L12 15.3 6.6 18.6l1.9-5.9L3.6 9h6.1L12 3.4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockTrustIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.1" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 7.6V12l3.1 2.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeTrustIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4.4 11.2 12 4.8l7.6 6.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.2 10.2V19h11.6v-8.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LifeAreaIcon({ name }: { name: (typeof JUST99_LIFE_AREAS)[number]["icon"] }) {
  if (name === "money") return <MoneyLifeIcon />;
  if (name === "relationships") return <HeartLifeIcon />;
  if (name === "confidence") return <ShieldLifeIcon />;
  if (name === "support") return <SupportLifeIcon />;
  if (name === "luck") return <StarLifeIcon />;
  return <CareerLifeIcon />;
}

function CareerLifeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 4.2 15.4 8.4 12 10.2 8.6 8.4 12 4.2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M7.4 10.4 12 12.8 16.6 10.4 19.2 13.2 12 16.8 4.8 13.2 7.4 10.4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M5.2 15.2 12 19.2 18.8 15.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function MoneyLifeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.1" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 7.4v9.2M14.6 9.1c-.5-.8-1.4-1.2-2.5-1.2-1.6 0-2.7.9-2.7 2.1 0 2.8 5.4 1.4 5.4 4.1 0 1.3-1.2 2.2-2.8 2.2-1.2 0-2.2-.5-2.7-1.3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function HeartLifeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 19.2S5.2 14.6 5.2 9.8C5.2 7.5 7 5.8 9.3 5.8c1.3 0 2.3.7 2.7 1.7.4-1 1.4-1.7 2.7-1.7 2.3 0 4.1 1.7 4.1 4 0 4.8-6.8 9.4-6.8 9.4Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldLifeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3.6 19 6.6v5.4c0 4.4-3.2 7.7-7 9-3.8-1.3-7-4.6-7-9V6.6L12 3.6Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function SupportLifeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.1" stroke="currentColor" strokeWidth="1.7" />
      <path d="M6.2 18.4c.9-3.2 3.3-4.9 5.8-4.9s4.9 1.7 5.8 4.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function StarLifeIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3.5 14.2 8.8h5.6l-4.5 3.4 1.7 5.5L12 14.8 7 17.7l1.7-5.5L4.2 8.8h5.6L12 3.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

function AudienceIcon({
  name,
}: {
  name: (typeof JUST99_AUDIENCES)[number]["icon"];
}) {
  if (name === "business") return <BriefcaseAudienceIcon />;
  if (name === "professionals") return <UserAudienceIcon />;
  if (name === "individuals") return <GroupAudienceIcon />;
  return <HomeAudienceIcon />;
}

function HomeAudienceIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4.4 11.2 12 4.8l7.6 6.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.2 10.2V19h11.6v-8.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BriefcaseAudienceIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.6" y="8" width="16.8" height="11.4" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 8V6.4A1.4 1.4 0 0 1 10.4 5h3.2A1.4 1.4 0 0 1 15 6.4V8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.6 12.4h16.8" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function UserAudienceIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.1" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5.6 18.6c1-3.3 3.5-5 6.4-5s5.4 1.7 6.4 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function GroupAudienceIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8.2" r="2.8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.8 18.6c.8-3.1 3-4.8 5.7-4.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="16.2" cy="8.8" r="2.3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M14.8 14.2c2.3.3 4 1.7 4.6 4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.4 19 6.5v5.3c0 4.3-3.2 7.5-7 8.8-3.8-1.3-7-4.5-7-8.8V6.5L12 3.4Z"
        fill="#563fb2"
      />
      <path
        d="M8.6 12.1 11 14.4 15.5 9.6"
        stroke="#1b1b4d"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoldCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="7.1" fill="#563fb2" />
      <path
        d="M4.7 8.15 6.9 10.3 11.3 5.7"
        stroke="#1b1b4d"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FlowArrowIcon() {
  return (
    <svg width="14" height="22" viewBox="0 0 14 22" fill="none" aria-hidden>
      <path d="M7 0V16.5" stroke="#6b6280" strokeWidth="1.6" />
      <path
        d="M2.2 13.4 7 18.4 11.8 13.4"
        stroke="#6b6280"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
