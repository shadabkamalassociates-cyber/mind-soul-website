export const JUST99_ASSETS = {
  lotus: "/just99/lotus.png",
  vine: "/just99/vine.png?v=4",
  star: "/just99/star.png?v=2",
  meditate: "/just99/meditate.png",
  community: "/just99/community.png",
  gift: "/just99/gift.png",
  heart: "/just99/heart.png",
  headset: "/just99/headset.png",
} as const;

export const JUST99_FEATURES = [
  { image: JUST99_ASSETS.lotus, title: "Inner Healing", desc: "Find peace within you" },
  { image: JUST99_ASSETS.community, title: "Community", desc: "Connect with like-minded souls" },
  { image: JUST99_ASSETS.meditate, title: "Live Sessions", desc: "Weekly healing & meditation" },
  { image: JUST99_ASSETS.star, title: "Positive Energy", desc: "Daily guidance for a better you" },
] as const;

export const JUST99_PERKS = [
  { image: JUST99_ASSETS.gift, title: "Lifetime Access", desc: "One Time Payment" },
  { image: JUST99_ASSETS.headset, title: "Live Healing Sessions", desc: "Weekly Live Interaction" },
  { image: JUST99_ASSETS.community, title: "Supportive Community", desc: "Connect & Share" },
  { image: JUST99_ASSETS.heart, title: "Daily Guidance", desc: "Uplift Your Journey" },
] as const;
