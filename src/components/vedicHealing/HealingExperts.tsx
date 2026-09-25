import Image from "next/image";
import { JUST99_ASSETS, JUST99_MENTOR } from "@/components/communityJoin/just99Assets";

export default function HealingExperts() {
  return (
    <section className="just99-mentor-section" id="experts">
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
