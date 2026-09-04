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
  name: "Vikas Bhardwaj",
  titleLead: "India's Leading",
  titleGold: "Hypnotherapist & Vastu",
  titleTail: "Consultant",
  bio: "Vikas Bhardwaj is a trusted Hypnotherapist and Vastu Consultant dedicated to helping individuals create positive changes in their lives. With a holistic approach combining hypnotherapy, mindset transformation, and Vastu principles, he helps people overcome challenges, improve well-being, and create a more balanced and positive environment.",
  highlights: [
    "Mindset & Behavioral Transformation",
    "Personalized Hypnotherapy Sessions",
    "Expert Vastu Consultation",
    "Positive Energy & Space Alignment",
    "Holistic Approach to Life & Well-Being",
  ],
} as const;

export const JUST99_AUDIENCES = [
  {
    icon: "individuals",
    title: "Homeowners",
    desc: "Looking to overcome limiting thoughts, fears & emotional challenges",
  },
  {
    icon: "business",
    title: "Professionals",
    desc: "Seeking better focus, confidence & career growth.",
  },
  {
    icon: "professionals",
    title: "Families & Homeowners",
    desc: "Wanting peace, harmony & positive energy at home.",
  },
  {
    icon: "individuals",
    title: "Business Owners",
    desc: "Looking to create a balanced environment for growth & success",
  },
] as const;

export const JUST99_LEARN_ITEMS = [
  {
    title: "Understand Your Mindset",
    desc: "Identify thought patterns, limiting beliefs, and emotional blocks that may be holding you back.",
  },
  {
    title: "Unlock Your Inner Potential",
    desc: "Learn how your subconscious mind can influence confidence, habits, emotions, and everyday decisions.",
  },
  {
    title: "Identify Areas of Imbalance",
    desc: "Explore the areas of life where you may be experiencing stress, uncertainty, or lack of harmony.",
  },
  {
    title: "Understand Your Space",
    desc: "Discover how Vastu principles can help create a more balanced and harmonious environment.",
  },
  {
    title: "Connect Mind & Environment",
    desc: "Understand how your mindset and surroundings can work together to support positive change.",
  },
  {
    title: "Find Personalized Solutions",
    desc: "Receive guidance based on your individual goals, concerns, and circumstances.",
  },
  {
    title: "Build Positive Patterns",
    desc: "Learn practical approaches to develop healthier thoughts, habits, confidence, and emotional balance.",
  },
  {
    title: "Create Lasting Transformation",
    desc: "Take away actionable guidance to move toward greater clarity, harmony, and personal growth.",
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
