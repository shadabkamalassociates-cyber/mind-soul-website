export type ExpertComment = {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  rating: number;
  timeAgo: string;
  text: string;
  likes: number;
};

export type ExpertReviewData = {
  overallRating: number;
  totalReviews: number;
  profileLikes: number;
  distribution: { stars: number; percent: number }[];
  comments: ExpertComment[];
};

const defaultComments: ExpertComment[] = [
  {
    id: "c1",
    name: "Rahul Sharma",
    avatar: "/experts-page/expert-1-cutout.png",
    verified: true,
    rating: 5,
    timeAgo: "2 days ago",
    text: "Amazing experience! The session was incredibly insightful and helped me gain clarity on issues I've been struggling with for years. Highly recommend to anyone seeking genuine guidance.",
    likes: 142,
  },
  {
    id: "c2",
    name: "Priya Patel",
    avatar: "/experts-page/expert-2-cutout.png",
    verified: true,
    rating: 5,
    timeAgo: "5 days ago",
    text: "Very professional and caring approach. Felt completely at ease throughout the consultation. The remedies suggested have already started showing positive results in my life.",
    likes: 98,
  },
  {
    id: "c3",
    name: "Amit Kumar",
    avatar: "/experts-page/expert-3-cutout.png",
    verified: false,
    rating: 4,
    timeAgo: "1 week ago",
    text: "Good session overall. The expert was patient and answered all my questions thoroughly. Would definitely book again for a follow-up consultation.",
    likes: 67,
  },
  {
    id: "c4",
    name: "Sneha Reddy",
    avatar: "/experts-page/expert-1-cutout.png",
    verified: true,
    rating: 5,
    timeAgo: "2 weeks ago",
    text: "Life-changing consultation! I came with so many doubts and left with a clear path forward. The expert's wisdom and compassion made all the difference.",
    likes: 215,
  },
  {
    id: "c5",
    name: "Vikram Singh",
    avatar: "/experts-page/expert-2-cutout.png",
    verified: false,
    rating: 5,
    timeAgo: "3 weeks ago",
    text: "Excellent guidance on career and personal matters. Very accurate predictions and practical advice. Worth every penny!",
    likes: 89,
  },
  {
    id: "c6",
    name: "Ananya Desai",
    avatar: "/experts-page/expert-3-cutout.png",
    verified: true,
    rating: 5,
    timeAgo: "1 month ago",
    text: "I've consulted many experts before, but this was by far the most genuine and helpful session. Felt a real connection and received actionable guidance.",
    likes: 156,
  },
  {
    id: "c7",
    name: "Rohit Mehta",
    avatar: "/experts-page/expert-1-cutout.png",
    verified: false,
    rating: 4,
    timeAgo: "1 month ago",
    text: "Very knowledgeable and approachable. The session exceeded my expectations. Will recommend to friends and family.",
    likes: 43,
  },
  {
    id: "c8",
    name: "Kavita Nair",
    avatar: "/experts-page/expert-2-cutout.png",
    verified: true,
    rating: 5,
    timeAgo: "2 months ago",
    text: "Transformative experience! The healing session helped me release years of emotional baggage. Grateful for this beautiful journey.",
    likes: 201,
  },
];

const defaultDistribution = [
  { stars: 5, percent: 82 },
  { stars: 4, percent: 12 },
  { stars: 3, percent: 4 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
];

function parseRatingString(rating: string): { score: number; count: number } {
  const scoreMatch = rating.match(/([\d.]+)\s*\/\s*5/);
  const countMatch = rating.match(/\(([\d,]+)/);
  return {
    score: scoreMatch ? parseFloat(scoreMatch[1]) : 4.9,
    count: countMatch ? parseInt(countMatch[1].replace(/,/g, ""), 10) : 12468,
  };
}

export function getExpertReviewData(
  expertSlug: string,
  ratingLabel: string,
): ExpertReviewData {
  const { score, count } = parseRatingString(ratingLabel);
  const seed = expertSlug.length * 137;

  return {
    overallRating: Number.isFinite(score) ? score : 4.9,
    totalReviews: count > 0 ? count : 12468,
    profileLikes: 7800 + (seed % 2000),
    distribution: defaultDistribution,
    comments: defaultComments.map((comment, i) => ({
      ...comment,
      id: `${expertSlug}-${comment.id}`,
      likes: comment.likes + (seed % 50) + i * 3,
    })),
  };
}

export function formatCount(n: number): string {
  if (n >= 1000) {
    const val = n / 1000;
    return val >= 10 ? `${Math.round(val)}k` : `${val.toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(n);
}
