export const JUST99_ASSETS = {
  lotus: "/just99/lotus.png",
  vine: "/just99/vine.png?v=4",
  star: "/just99/star.png?v=2",
  meditate: "/just99/meditate.png",
  community: "/just99/community.png",
  gift: "/just99/gift.png",
  heart: "/just99/heart.png",
  headset: "/just99/headset.png",
  heroPortrait: "/just99/hero-portrait.png?v=4",
  whyJoinArt: "/just99/why-join-chakra.png",
  mentor: "/just99/mentor.png?v=3",
} as const;

export const JUST99_FEATURES = [
  { image: JUST99_ASSETS.lotus, title: "Inner Healing", desc: "Find peace within you" },
  { image: JUST99_ASSETS.community, title: "Community", desc: "Connect with like-minded souls" },
  { image: JUST99_ASSETS.meditate, title: "Live Sessions", desc: "Weekly healing & meditation" },
  { image: JUST99_ASSETS.star, title: "Positive Energy", desc: "Daily guidance for a better you" },
] as const;

export const JUST99_HERO_FEATURES = [
  { image: JUST99_ASSETS.lotus, title: "Inner Healing", desc: "Peace, mind & soul" },
  { image: JUST99_ASSETS.headset, title: "Live Sessions", desc: "Weekly healing & meditation" },
  { image: JUST99_ASSETS.community, title: "Community", desc: "Connect & grow together" },
] as const;

export const JUST99_PERKS = [
  { image: JUST99_ASSETS.gift, title: "Lifetime Access", desc: "One Time Payment" },
  { image: JUST99_ASSETS.headset, title: "Live Healing Sessions", desc: "Weekly Live Interaction" },
  { image: JUST99_ASSETS.community, title: "Supportive Community", desc: "Connect & Share" },
  { image: JUST99_ASSETS.heart, title: "Daily Guidance", desc: "Uplift Your Journey" },
] as const;

export const JUST99_WHY_JOIN_CHECKLIST = [
  "Lifetime Community Access",
  "Live Healing Sessions",
  "Supportive Community",
  "Daily Guidance",
] as const;

export const JUST99_TRUST_STATS = [
  { value: "100,000+", label: "Happy Students" },
  { value: "4.8 / 5", label: "Average Rating" },
  { value: "10+ Years", label: "Experience" },
  { value: "Trusted by", label: "Thousands of Families" },
] as const;

export const JUST99_ENERGY_FLOW = [
  { title: "Your Energy", detail: "Lo Shu Grid\nName + DOB", tone: "navy" },
  { title: "Your Home", detail: "Vastu Directions\n+ Zones", tone: "navy" },
  { title: "Where the\nImbalance\nMay Be", detail: "", tone: "gold" },
  { title: "Personalised\nVastu Remedy", detail: "", tone: "purple" },
] as const;

export const JUST99_ENERGY_HOME_POINTS = [
  "Every direction carries a specific energy",
  "Different directions relate to different areas of life",
  "The layout and energy of your home need to be understood",
] as const;

export const JUST99_ENERGY_YOU_POINTS = [
  "Your Date of Birth + Name reveal your numerical profile",
  "Your Lo Shu Grid highlights missing, weak and excessive energies",
  "These patterns help us understand your individual energy",
] as const;

export const JUST99_COMPARE_ROWS = [
  {
    aspect: "Focus",
    traditional: "Focuses only on physical structure",
    numero: "Focuses on house directions + personal energy",
  },
  {
    aspect: "Personalization",
    traditional: "Same remedies for everyone",
    numero: "Personalized using Lo Shu Grid, Name & DOB",
  },
  {
    aspect: "Analysis Depth",
    traditional: "Checks Vastu defects",
    numero: "Understands energy balance, imbalances & life impact",
  },
  {
    aspect: "Life Impact",
    traditional: "General suggestions",
    numero: "Connects to career, health, relationships, finances & more",
  },
  {
    aspect: "Remedies",
    traditional: "One-size-fits-all",
    numero: "Personalised, practical & effective remedies",
  },
  {
    aspect: "Outcome",
    traditional: "Partial improvement",
    numero: "Better clarity, harmony & long-lasting balance",
  },
] as const;

export const JUST99_LIFE_AREAS = [
  {
    icon: "career",
    title: "Career & Growth",
    points: [
      "Career growth feels stuck",
      "Promotions keep getting delayed",
      "Opportunities don't come",
      "Your work isn't recognised",
    ],
  },
  {
    icon: "money",
    title: "Money & Business",
    points: [
      "Money comes but doesn't stay",
      "Expenses keep increasing",
      "Leads don't convert",
      "Business growth feels difficult",
    ],
  },
  {
    icon: "relationships",
    title: "Relationships & Family",
    points: [
      "Frequent arguments",
      "Emotional understanding feels low",
      "Marriage-related difficulties",
      "Family conflicts keep repeating",
    ],
  },
  {
    icon: "confidence",
    title: "Confidence & Recognition",
    points: [
      "Lack of confidence",
      "Fear of public visibility",
      "Difficulty communicating",
      "Others take credit for your work",
    ],
  },
  {
    icon: "support",
    title: "Support & Opportunities",
    points: [
      "People enquire but don't buy",
      "Customers don't return",
      "You have contacts but little support",
      "Discussions don't move forward",
    ],
  },
  {
    icon: "luck",
    title: "Luck, Guidance & Clarity",
    points: [
      "Luck doesn't feel supportive",
      "Decisions feel difficult",
      "You keep overthinking",
      "Success feels delayed",
    ],
  },
] as const;

export const JUST99_MENTOR = {
  name: "Dr. Ankiit Btra",
  titleLead: "India's Leading",
  titleGold: "Numerologist & Vastu",
  titleTail: "Consultant",
  bio: "Dr. Ankiit Btra has helped business owners, factory operators, hospitals, and commercial property investors identify hidden Vastu imbalances — using a practical, no-demolition approach that aligns space energy with personal energy.",
  highlights: [
    "20,000+ Factories Audited",
    "50,000+ Businesses Transformed",
    "Commercial Vastu Specialist",
    "No-Demolition Solutions",
    "4.9/5 Client Rating",
  ],
} as const;

export const JUST99_AUDIENCES = [
  {
    icon: "homeowners",
    title: "Homeowners",
    desc: "who want peace & harmony at home",
  },
  {
    icon: "business",
    title: "Business Owners",
    desc: "seeking growth & stability",
  },
  {
    icon: "professionals",
    title: "Professionals",
    desc: "facing career blocks",
  },
  {
    icon: "individuals",
    title: "Individuals",
    desc: "with relationship or health concerns",
  },
] as const;

export const JUST99_LEARN_ITEMS = [
  {
    title: "Read Your Lo Shu Grid",
    desc: "Identify missing, weak and excessive energies.",
  },
  {
    title: "Understand Your Name & DOB Energy",
    desc: "Understand how your name and date of birth contribute to your personal energy profile.",
  },
  {
    title: "Decode Vastu Directions",
    desc: "Understand the energy associated with different directions.",
  },
  {
    title: "Connect Numbers with Directions",
    desc: "Learn how number energies relate to specific Vastu directions.",
  },
  {
    title: "Identify Life-Area Indicators",
    desc: "Understand how different energies may correspond with different life areas.",
  },
  {
    title: "Analyse Person + House Together",
    desc: "Understand why analysing only the house may not be enough.",
  },
  {
    title: "Identify Where the Imbalance May Be",
    desc: "Connect your energy, life concerns and relevant areas of the house.",
  },
  {
    title: "Understand Personalised Vastu Guidance",
    desc: "Learn the framework for creating Vastu remedies based on individual analysis.",
  },
] as const;

export const JUST99_LEARN_FLOW = [
  "Lo Shu Grid",
  "Personal Energy",
  "Vastu Directions",
  "Life-Area Indicators",
  "Person + House Analysis",
  "Personalised Vastu Guidance",
] as const;

export const JUST99_CHAT_REVIEWS = [
  {
    id: "r1",
    contact: "Priya S.",
    messages: [
      { from: "us", text: "Hi! How did you find your Destiny Report? 😊", time: "11:20 AM" },
      {
        from: "them",
        text: "I honestly didn't expect the report to be this detailed yaar. The way it explained my strengths and where I needed to work gave me a lot of clarity.",
        time: "11:24 AM",
      },
      { from: "us", text: "That means a lot, thank you for sharing this with us 🙏", time: "11:25 AM" },
    ],
  },
  {
    id: "r2",
    contact: "Rohit V.",
    messages: [
      { from: "us", text: "Hi! Kaisa laga aapko your report?", time: "10:05 AM" },
      {
        from: "them",
        text: "It felt personal, not generic. I finally understood why the same issues kept repeating at home and at work.",
        time: "10:08 AM",
      },
      { from: "them", text: "The Vastu + number connection was an eye opener.", time: "10:09 AM" },
    ],
  },
  {
    id: "r3",
    contact: "Sneha I.",
    messages: [
      { from: "us", text: "How was the masterclass for you?", time: "4:12 PM" },
      {
        from: "them",
        text: "So clear and practical. I now know which direction and number energy I need to work on first.",
        time: "4:16 PM",
      },
      { from: "us", text: "Happy this helped you ✨", time: "4:17 PM" },
    ],
  },
  {
    id: "r4",
    contact: "Aman K.",
    messages: [
      { from: "us", text: "Hi! How did the session go for you?", time: "8:40 PM" },
      {
        from: "them",
        text: "Best part was no demolition talk. Simple remedies I can actually follow at home.",
        time: "8:44 PM",
      },
    ],
  },
] as const;

export const JUST99_BOTTOM_VALUES = [
  {
    image: JUST99_ASSETS.lotus,
    title: "A Safe Space",
    desc: "Judgment-free & compassionate environment",
  },
  {
    image: JUST99_ASSETS.star,
    title: "Expert Guidance",
    desc: "Learn from experienced healers & guides",
  },
  {
    image: JUST99_ASSETS.community,
    title: "Grow Together",
    desc: "Together we heal, together we rise",
  },
] as const;
