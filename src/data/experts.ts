export type ExpertProfile = {
  slug: string;
  name: string;
  role: string;
  experience: string;
  bio: string;
  specialization: string;
  experienceDetail: string;
  image: string;
  titles: string;
  profession: string;
  clients: string;
  sessions: string;
  rating: string;
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  languages: string[];
  education: string[];
  certifications: string[];
  specializations: string[];
  about: string[];
  highlights: { title: string; desc: string }[];
  services: { title: string; desc: string }[];
  /** Enabled consultation labels; if omitted, all default types show */
  consultationTypes?: string[];
};

export const experts: ExpertProfile[] = [
  {
    slug: "jyoti-rajput",
    name: "Jyoti Rajput",
    role: "HEAD HR | HEALING PRACTITIONER",
    experience: "14 YEARS EXPERIENCE",
    bio: "HR leader and healing practitioner with 14 years of experience, offering Theta Healing and Inner Child Healing for emotional balance and lasting transformation.",
    specialization: "HR & Marketing",
    experienceDetail: "14 Years",
    image: "/experts-page/expert-2-cutout.png",
    titles: "HEAD HR | Hypnosis Practitioner | Healing Guide",
    profession: "HEAD HR",
    clients: "—",
    sessions: "—",
    rating: "—",
    phone: "+91 9548891040",
    whatsapp: "+91 9548891040",
    email: "09jyotirajput1@gmail.com",
    location: "Bengaluru, India",
    languages: ["Hindi", "English"],
    education: ["MBA"],
    certifications: [
      "Advance course in Hypnosis",
      "Wrist Watch Analysis",
    ],
    specializations: ["HR & Marketing", "Theta Healing", "Inner Child Healing"],
    about: [
      "Jyoti Rajput brings 14 years of professional experience as HEAD HR, combining people leadership with deep interest in emotional healing and personal transformation.",
      "Trained in advanced hypnosis and wrist watch analysis, she supports clients in releasing blocks, finding clarity, and rebuilding confidence through gentle healing practices.",
      "Based in Bengaluru, she conducts sessions in Hindi and English, with a practical, compassionate approach shaped by years of working closely with people.",
    ],
    highlights: [
      {
        title: "Why I Started Healing Work",
        desc: "To help people release emotional blocks and reconnect with inner confidence, alongside a career built on understanding people.",
      },
      {
        title: "My Mission",
        desc: "Support lasting emotional well-being through Theta Healing and Inner Child Healing, with clarity and care.",
      },
      {
        title: "My Approach",
        desc: "Gentle, practical healing grounded in real-world people experience from 14 years in HR leadership.",
      },
      {
        title: "What Makes Me Different",
        desc: "A rare blend of corporate HR insight with hypnosis and energy-based healing for balanced transformation.",
      },
    ],
    services: [
      {
        title: "Theta Healing",
        desc: "Experience the power of Theta Healing to release limiting beliefs, clear emotional blocks, and restore inner balance. This gentle energy healing technique promotes emotional well-being, mental clarity, self-empowerment, and a deeper connection with your true self, helping you create positive and lasting transformation.",
      },
      {
        title: "Inner Child Healing",
        desc: "Reconnect with your inner child to gently heal emotional wounds, release past pain, and let go of limiting beliefs formed in childhood. This transformative healing process nurtures self-love, emotional freedom, and inner peace, helping you build healthier relationships and live with greater confidence and joy.",
      },
    ],
    consultationTypes: [
      "Video Call",
      "Audio Call",
      "Live Session",
      "Recorded Session",
    ],
  },
  {
    slug: "dr-kavita-mehta",
    name: "Dr. Kavita Mehta",
    role: "MEDITATION & MINDFULNESS COACH",
    experience: "8+ YEARS EXPERIENCE",
    bio: "Certified meditation coach specializing in mindfulness practices, stress relief, and emotional balance for modern living.",
    specialization: "Meditation & Mindfulness",
    experienceDetail: "8+ Years",
    image: "/experts-page/expert-1-cutout.png",
    titles: "Meditation Coach | Mindfulness Expert | Stress Relief Specialist",
    profession: "Meditation Coach",
    clients: "8,500+",
    sessions: "18,000+",
    rating: "4.8/5 (950+)",
    phone: "+91 98765 43211",
    whatsapp: "+91 98765 43211",
    email: "kavita@soulsensei.in",
    location: "Mumbai, India",
    languages: ["English", "Hindi", "Marathi"],
    education: ["MSc in Psychology", "Certified Mindfulness Trainer"],
    certifications: [
      "Certified Meditation Instructor",
      "Mindfulness-Based Stress Reduction (MBSR)",
      "Yoga Nidra Practitioner",
    ],
    specializations: [
      "Stress Management",
      "Anxiety Relief",
      "Sleep Improvement",
      "Emotional Balance",
      "Mindful Living",
    ],
    about: [
      "Dr. Kavita Mehta is a certified meditation and mindfulness coach with over 8 years of experience helping professionals and seekers find calm in a chaotic world.",
      "Her sessions blend evidence-based mindfulness techniques with compassionate guidance, making meditation accessible even for complete beginners.",
      "She has worked with corporate teams, wellness retreats, and individual clients to build sustainable practices for mental clarity and emotional resilience.",
      "Dr. Kavita believes mindfulness is not about emptying the mind, but about observing thoughts with kindness and choosing responses with awareness.",
    ],
    highlights: [
      {
        title: "Why I Teach Meditation",
        desc: "To help people reclaim peace and presence in everyday life.",
      },
      {
        title: "My Mission",
        desc: "Making mindfulness practical, simple, and sustainable for all.",
      },
      {
        title: "My Approach",
        desc: "Gentle, science-backed techniques tailored to each person's needs.",
      },
      {
        title: "What Makes Me Different",
        desc: "Warm guidance that meets you where you are, without judgment.",
      },
    ],
    services: [
      {
        title: "Guided Meditation Sessions",
        desc: "Personalized meditation practices for stress relief, focus, and inner peace.",
      },
      {
        title: "Mindfulness Coaching",
        desc: "Learn to stay present and manage emotions in daily life situations.",
      },
      {
        title: "Breathwork Training",
        desc: "Master breathing techniques to calm the nervous system instantly.",
      },
      {
        title: "Corporate Wellness Programs",
        desc: "Group sessions designed for workplace stress and team wellbeing.",
      },
    ],
  },
  {
    slug: "dr-riya-desai",
    name: "Dr. Riya Desai",
    role: "CHAKRA & ENERGY HEALER",
    experience: "12+ YEARS EXPERIENCE",
    bio: "Expert chakra healer and energy therapist dedicated to balancing your energy centers for holistic wellbeing.",
    specialization: "Chakra & Energy Healing",
    experienceDetail: "12+ Years",
    image: "/experts-page/expert-3-cutout.png",
    titles: "Chakra Healer | Reiki Master | Energy Therapist",
    profession: "Energy Healer",
    clients: "12,000+",
    sessions: "30,000+",
    rating: "4.9/5 (1400+)",
    phone: "+91 98765 43212",
    whatsapp: "+91 98765 43212",
    email: "riya@soulsensei.in",
    location: "Bangalore, India",
    languages: ["English", "Hindi", "Kannada"],
    education: ["BSc in Alternative Medicine", "Reiki Master Certification"],
    certifications: [
      "Certified Chakra Healer",
      "Reiki Master Level III",
      "Crystal Healing Practitioner",
    ],
    specializations: [
      "Chakra Balancing",
      "Energy Clearing",
      "Aura Healing",
      "Emotional Release",
      "Spiritual Awakening",
    ],
    about: [
      "Dr. Riya Desai is an expert chakra and energy healer with over 12 years of experience in restoring energetic balance and promoting holistic wellbeing.",
      "Trained in Reiki, crystal healing, and traditional energy work, she helps clients release blockages and activate their natural healing abilities.",
      "Her sessions are deeply transformative, addressing the root causes of emotional, physical, and spiritual imbalances through energy alignment.",
      "Dr. Riya believes that when your energy flows freely, your body, mind, and spirit naturally move toward harmony and wholeness.",
    ],
    highlights: [
      {
        title: "Why I Practice Energy Healing",
        desc: "To help people release what no longer serves them and heal from within.",
      },
      {
        title: "My Mission",
        desc: "Restoring energetic balance for lasting physical and emotional wellness.",
      },
      {
        title: "My Approach",
        desc: "Intuitive healing combined with structured chakra and Reiki techniques.",
      },
      {
        title: "What Makes Me Different",
        desc: "Deep sensitivity to energy patterns with compassionate, grounded sessions.",
      },
    ],
    services: [
      {
        title: "Chakra Balancing Session",
        desc: "Align and activate your seven chakras for optimal energy flow and wellbeing.",
      },
      {
        title: "Reiki Healing",
        desc: "Channel universal life force energy to promote deep relaxation and healing.",
      },
      {
        title: "Aura Cleansing",
        desc: "Clear negative energy and strengthen your energetic field for protection.",
      },
      {
        title: "Crystal Healing Therapy",
        desc: "Harness the power of crystals to amplify healing and spiritual growth.",
      },
    ],
  },
];

export function getExpertBySlug(slug: string): ExpertProfile | undefined {
  return experts.find((e) => e.slug === slug);
}
