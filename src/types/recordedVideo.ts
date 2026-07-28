export type RecordedVideoBadge = "BESTSELLER" | "TRENDING" | "POPULAR" | "NEW";

export type RecordedVideoLesson = {
  id: string;
  title: string;
  duration: string;
  thumbnail?: string;
  completed?: boolean;
  active?: boolean;
};

export type RecordedVideoReview = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  completed?: boolean;
};

export type RecordedVideo = {
  slug: string;
  sessionId: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  categoryId: string;
  badge?: RecordedVideoBadge;
  image: string;
  heroImage?: string;
  duration: string;
  durationLabel: string;
  rating: string;
  reviews: string;
  students: string;
  price: string;
  expert: string;
  expertRole: string;
  expertAvatar: string;
  expertBio: string;
  expertStats: { label: string; value: string }[];
  level: string;
  language: string;
  access: string;
  lastUpdated: string;
  lessons: RecordedVideoLesson[];
  lessonCount: number;
  features: { label: string; icon: string }[];
  about: string[];
  reviewsList: RecordedVideoReview[];
  progress?: number;
};
