export type SessionCategory = {
  slug: string;
  label: string;
};

/** Dummy categories for the header dropdown */
export const sessionCategories: SessionCategory[] = [
  { slug: "align-with-the-cosmos", label: "Align with the Cosmos" },
  { slug: "astrologically-aligned", label: "Astrologically Aligned" },
  { slug: "balance-your-karma", label: "Balance your Karma" },
  { slug: "build-confidence", label: "Build Confidence" },
  { slug: "chronic-healing", label: "Chronic Healing" },
  { slug: "confidence-self-esteem", label: "Confidence & Self-Esteem" },
  { slug: "decode-your-destiny", label: "Decode your Destiny" },
  { slug: "detox-cleansing", label: "Detox & Cleansing" },
  { slug: "energy-vitality", label: "Energy & Vitality" },
  { slug: "family", label: "Family" },
  { slug: "feel-happier", label: "Feel Happier" },
  { slug: "find-your-purpose", label: "Find your Purpose" },
  { slug: "heal-relationships", label: "Heal Relationships" },
  { slug: "inner-peace", label: "Inner Peace" },
  { slug: "manifestation", label: "Manifestation" },
  { slug: "meditation-mindfulness", label: "Meditation & Mindfulness" },
  { slug: "tarot-clarity", label: "Tarot for Clarity" },
  { slug: "wealth-abundance", label: "Wealth & Abundance" },
];

export function getCategory(slug: string): SessionCategory | undefined {
  return sessionCategories.find((c) => c.slug === slug);
}

export function getCategorySlugs(): string[] {
  return sessionCategories.map((c) => c.slug);
}
