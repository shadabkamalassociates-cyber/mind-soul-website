import type { RecordedVideo } from "@/types/recordedVideo";

const experts = [
  {
    name: "Swami Adhyatmanand",
    role: "Meditation Master",
    avatar: "/experts-page/expert-1-cutout.png",
    bio: "Swami Adhyatmanand has guided thousands through meditation and mindfulness practices for over 15 years.",
    stats: [
      { label: "Years Exp.", value: "15+" },
      { label: "Videos", value: "120+" },
      { label: "Students", value: "50K+" },
    ],
  },
  {
    name: "Acharya Devansh",
    role: "Vedic Astrologer",
    avatar: "/experts-page/expert-2-cutout.png",
    bio: "Acharya Devansh brings ancient Vedic wisdom to modern seekers with clarity and compassion.",
    stats: [
      { label: "Years Exp.", value: "12+" },
      { label: "Videos", value: "85+" },
      { label: "Students", value: "32K+" },
    ],
  },
  {
    name: "Dr. Kavita Mehta",
    role: "Energy Healer",
    avatar: "/experts-page/expert-3-cutout.png",
    bio: "Dr. Kavita specializes in chakra healing and energy alignment for holistic wellness.",
    stats: [
      { label: "Years Exp.", value: "10+" },
      { label: "Videos", value: "64+" },
      { label: "Students", value: "28K+" },
    ],
  },
] as const;

const defaultLessons = [
  { id: "1", title: "Introduction & Welcome", duration: "08:30", completed: true, active: true },
  { id: "2", title: "Preparing Your Mind & Space", duration: "12:45", completed: true },
  { id: "3", title: "Core Techniques Overview", duration: "18:20" },
  { id: "4", title: "Deep Practice Session", duration: "24:15" },
  { id: "5", title: "Integration & Daily Rituals", duration: "15:40" },
  { id: "6", title: "Advanced Methods", duration: "22:10" },
  { id: "7", title: "Troubleshooting Common Blocks", duration: "14:55" },
  { id: "8", title: "Closing & Next Steps", duration: "10:25" },
];

const defaultReviews = [
  {
    id: "1",
    name: "Priya Sharma",
    avatar: "/experts/expert-1.jpg",
    rating: 5,
    text: "This recording transformed my daily practice. Clear, calming, and deeply insightful from start to finish.",
    completed: true,
  },
  {
    id: "2",
    name: "Rahul Verma",
    avatar: "/experts/expert-2.jpg",
    rating: 5,
    text: "Excellent structure and expert guidance. I revisit these lessons every week — worth every rupee.",
    completed: true,
  },
  {
    id: "3",
    name: "Ananya Patel",
    avatar: "/experts/expert-3.jpg",
    rating: 4,
    text: "Beautifully produced with lifetime access. The instructor explains complex concepts in simple terms.",
    completed: true,
  },
];

function video(
  partial: Omit<
    RecordedVideo,
    | "sessionId"
    | "lessons"
    | "lessonCount"
    | "reviewsList"
    | "expertStats"
    | "features"
    | "about"
    | "level"
    | "language"
    | "access"
    | "lastUpdated"
    | "expertBio"
    | "expert"
    | "expertRole"
    | "expertAvatar"
  > &
    Partial<
      Pick<
        RecordedVideo,
        | "lessons"
        | "lessonCount"
        | "reviewsList"
        | "expertStats"
        | "features"
        | "about"
        | "progress"
        | "level"
        | "language"
        | "access"
        | "lastUpdated"
        | "expertBio"
        | "expert"
        | "expertRole"
        | "expertAvatar"
      >
    > & { expertIndex?: number },
): RecordedVideo {
  const expert = experts[partial.expertIndex ?? 0];
  return {
    ...partial,
    sessionId: partial.slug,
    lessons: partial.lessons ?? defaultLessons,
    lessonCount: partial.lessonCount ?? 12,
    reviewsList: partial.reviewsList ?? defaultReviews,
    level: partial.level ?? "All Levels",
    language: partial.language ?? "English",
    access: partial.access ?? "Lifetime",
    lastUpdated: partial.lastUpdated ?? "Jan 2026",
    features: partial.features ?? [
      { label: "Lifetime Access", icon: "infinity" },
      { label: "HD Quality", icon: "hd" },
      { label: "Certificate Included", icon: "cert" },
      { label: "Downloadable", icon: "download" },
    ],
    about: partial.about ?? [
      partial.description,
      "Designed for seekers at every stage — from curious beginners to dedicated practitioners. Each lesson builds naturally on the last, with practical exercises you can apply immediately.",
      "Includes guided practices, downloadable resources, and lifetime access so you can learn at your own pace and revisit anytime.",
    ],
    expert: partial.expert ?? expert.name,
    expertRole: partial.expertRole ?? expert.role,
    expertAvatar: partial.expertAvatar ?? expert.avatar,
    expertBio: partial.expertBio ?? expert.bio,
    expertStats: partial.expertStats ?? [...expert.stats],
  };
}

export const recordedVideoCategories = [
  { id: "all", label: "All", icon: "grid" },
  { id: "meditation", label: "Meditation", icon: "meditation" },
  { id: "astrology", label: "Astrology", icon: "astrology" },
  { id: "numerology", label: "Numerology", icon: "numerology" },
  { id: "tarot", label: "Tarot", icon: "tarot" },
  { id: "healing", label: "Healing", icon: "healing" },
  { id: "chakra", label: "Chakra", icon: "chakra" },
  { id: "manifestation", label: "Manifestation", icon: "manifestation" },
  { id: "vastu", label: "Vastu", icon: "vastu" },
  { id: "coaching", label: "Life Coaching", icon: "coaching" },
];

export const recordedVideos: RecordedVideo[] = [
  video({
    slug: "complete-meditation-mastery",
    title: "Complete Meditation Mastery",
    subtitle: "A complete guide to meditation for beginners to advanced practitioners",
    description:
      "Master meditation from foundational breathwork to advanced mindfulness techniques in this comprehensive recorded course.",
    category: "Meditation",
    categoryId: "meditation",
    badge: "BESTSELLER",
    image: "/sessions/session-1.jpg",
    heroImage: "/about/hero.png",
    duration: "01:42:30",
    durationLabel: "1h 42m",
    rating: "4.9",
    reviews: "2,320",
    students: "52.5K",
    price: "₹1,499",
    expertIndex: 0,
  }),
  video({
    slug: "vedic-astrology-fundamentals",
    title: "Vedic Astrology Fundamentals",
    subtitle: "Learn birth chart reading and planetary influences step by step",
    description:
      "Understand the foundations of Vedic astrology with practical chart reading techniques and remedial guidance.",
    category: "Astrology",
    categoryId: "astrology",
    badge: "TRENDING",
    image: "/sessions/session-2.jpg",
    duration: "02:15:40",
    durationLabel: "2h 15m",
    rating: "4.8",
    reviews: "1,840",
    students: "38.2K",
    price: "₹1,999",
    expertIndex: 1,
  }),
  video({
    slug: "chakra-healing-meditation",
    title: "Chakra Healing Meditation",
    subtitle: "Balance and activate your seven energy centers",
    description:
      "A guided journey through all seven chakras with healing meditations, affirmations, and energy practices.",
    category: "Chakra",
    categoryId: "chakra",
    badge: "POPULAR",
    image: "/sessions/session-3.jpg",
    duration: "01:28:50",
    durationLabel: "1h 28m",
    rating: "4.9",
    reviews: "980",
    students: "24.1K",
    price: "₹999",
    expertIndex: 2,
    progress: 45,
  }),
  video({
    slug: "manifest-your-dream-life",
    title: "Manifest Your Dream Life",
    subtitle: "Law of attraction and manifestation techniques that work",
    description:
      "Learn proven manifestation frameworks to align your thoughts, energy, and actions with your deepest desires.",
    category: "Manifestation",
    categoryId: "manifestation",
    badge: "NEW",
    image: "/sessions/session-4.jpg",
    duration: "01:55:20",
    durationLabel: "1h 55m",
    rating: "4.7",
    reviews: "620",
    students: "18.6K",
    price: "₹1,299",
    expertIndex: 0,
  }),
  video({
    slug: "tarot-reading-masterclass",
    title: "Tarot Reading Masterclass",
    subtitle: "From card meanings to professional-level readings",
    description:
      "Build confidence in tarot with spreads, intuitive reading methods, and ethical practice guidelines.",
    category: "Tarot",
    categoryId: "tarot",
    image: "/sessions/session-5.jpg",
    duration: "02:08:10",
    durationLabel: "2h 8m",
    rating: "4.8",
    reviews: "740",
    students: "15.3K",
    price: "₹1,799",
    expertIndex: 1,
    progress: 72,
  }),
  video({
    slug: "numerology-life-path",
    title: "Numerology & Life Path Decoded",
    subtitle: "Discover your numbers and their influence on your destiny",
    description:
      "Decode your life path, destiny, and personal year numbers with practical numerology applications.",
    category: "Numerology",
    categoryId: "numerology",
    image: "/sessions/session-6.jpg",
    duration: "01:36:45",
    durationLabel: "1h 36m",
    rating: "4.6",
    reviews: "510",
    students: "12.8K",
    price: "₹899",
    expertIndex: 1,
  }),
  video({
    slug: "energy-healing-basics",
    title: "Energy Healing Basics",
    subtitle: "Restore balance through aura cleansing and Reiki principles",
    description:
      "Introduction to energy healing modalities for self-care and supporting others on their healing journey.",
    category: "Healing",
    categoryId: "healing",
    image: "/sessions/session-2.jpg",
    duration: "01:22:30",
    durationLabel: "1h 22m",
    rating: "4.9",
    reviews: "890",
    students: "21.4K",
    price: "₹1,099",
    expertIndex: 2,
  }),
  video({
    slug: "vastu-home-harmony",
    title: "Vastu for Home Harmony",
    subtitle: "Create positive energy flow in your living spaces",
    description:
      "Apply Vastu Shastra principles to harmonize your home and workspace for prosperity and peace.",
    category: "Vastu",
    categoryId: "vastu",
    image: "/sessions/session-3.jpg",
    duration: "01:48:00",
    durationLabel: "1h 48m",
    rating: "4.7",
    reviews: "430",
    students: "9.6K",
    price: "₹1,399",
    expertIndex: 1,
  }),
  video({
    slug: "life-coaching-breakthrough",
    title: "Life Coaching Breakthrough",
    subtitle: "Unlock clarity, confidence, and purposeful action",
    description:
      "Structured coaching frameworks to overcome blocks, set meaningful goals, and create lasting change.",
    category: "Life Coaching",
    categoryId: "coaching",
    image: "/sessions/session-4.jpg",
    duration: "02:02:15",
    durationLabel: "2h 2m",
    rating: "4.8",
    reviews: "670",
    students: "14.2K",
    price: "₹1,599",
    expertIndex: 0,
  }),
  video({
    slug: "mindful-breathwork",
    title: "Mindful Breathwork Series",
    subtitle: "Calm anxiety and restore inner balance through breath",
    description:
      "Science-backed breathwork practices for stress relief, better sleep, and emotional regulation.",
    category: "Meditation",
    categoryId: "meditation",
    image: "/sessions/session-5.jpg",
    duration: "01:12:20",
    durationLabel: "1h 12m",
    rating: "4.9",
    reviews: "1,120",
    students: "29.7K",
    price: "₹799",
    expertIndex: 0,
    progress: 28,
  }),
];

export function getRecordedVideoSlugs(): string[] {
  return recordedVideos.map((v) => v.slug);
}

export function getRecordedVideo(slug: string): RecordedVideo | undefined {
  return recordedVideos.find((v) => v.slug === slug);
}

export function getFeaturedRecordedVideos(): RecordedVideo[] {
  return recordedVideos.filter((v) => v.badge).slice(0, 3);
}

export function getContinueWatchingVideos(): RecordedVideo[] {
  return recordedVideos.filter((v) => v.progress != null).slice(0, 4);
}

export function getPopularRecordedVideos(): RecordedVideo[] {
  return [...recordedVideos]
    .sort((a, b) => Number(b.students.replace(/\D/g, "")) - Number(a.students.replace(/\D/g, "")))
    .slice(0, 4);
}

export function getRecentRecordedVideos(): RecordedVideo[] {
  return recordedVideos.slice(-6);
}
