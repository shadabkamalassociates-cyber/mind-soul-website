import { categoryIcons, GridIcon } from "./Icons";

const categories = [
  "Meditation",
  "Tarot",
  "Healing",
  "Astrology",
  "Manifestation",
  "Reiki",
  "Breathwork",
  "Past Life",
  "Chakra",
  "Kundalini",
  "Akashic Records",
] as const;

export default function CategoryBar() {
  return (
    <div className="relative z-20 w-full bg-white px-4 pb-5 pt-1 lg:px-8">
      <div className="category-bar mx-auto flex max-w-[1400px] items-center gap-1 rounded-2xl px-2 py-2.5 sm:gap-2 sm:px-4 sm:py-3">
        <div className="flex flex-1 items-center justify-between gap-1 overflow-x-auto pb-0.5 sm:gap-0">
          {categories.map((cat, index) => {
            const isActive = index === 0;
            return (
              <a
                key={cat}
                href={`#${cat.toLowerCase().replace(/\s+/g, "-")}`}
                className={`category-item flex min-w-[72px] shrink-0 flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-center transition sm:min-w-0 sm:flex-1 ${
                  isActive
                    ? "bg-[#1A1A4A]/[0.08] text-[#1A1A4A]"
                    : "text-[#5C5C7A]"
                }`}
              >
                <span className="flex h-6 w-6 items-center justify-center sm:h-7 sm:w-7">
                  {categoryIcons[cat]}
                </span>
                <span className="whitespace-nowrap text-[10px] font-medium tracking-wide sm:text-[11px]">
                  {cat}
                </span>
              </a>
            );
          })}
        </div>

        <a
          href="#all-categories"
          className="ml-1 flex shrink-0 flex-col items-center justify-center gap-1 rounded-xl border border-[#1A1A4A]/40 bg-[#1A1A4A]/[0.04] px-2.5 py-2 text-[#1A1A4A] transition hover:border-[#1A1A4A]/70 hover:bg-[#1A1A4A]/10 sm:px-3 sm:py-2.5"
        >
          <GridIcon />
          <span className="whitespace-nowrap text-[9px] font-medium tracking-wide sm:text-[10px]">
            All Categories
          </span>
        </a>
      </div>
    </div>
  );
}
