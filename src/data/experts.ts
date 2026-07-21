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
};

export const experts: ExpertProfile[] = [
  {
    slug: "dr-ananya-sharma",
    name: "Dr. Ananya Sharma",
    role: "FOUNDER & SPIRITUAL GUIDE",
    experience: "10+ YEARS EXPERIENCE",
    bio: "A renowned spiritual guide with over a decade of experience helping seekers find inner peace, purpose, and profound transformation.",
    specialization: "Spiritual Guidance",
    experienceDetail: "12+ Years",
    image: "/experts-page/expert-2-cutout.png",
    titles: "Vedic Astrologer | Spiritual Guide | Life Coach",
    profession: "Vedic Astrologer",
    clients: "10,000+",
    sessions: "25,000+",
    rating: "4.9/5 (1200+)",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "ananya@soulsensei.in",
    location: "New Delhi, India",
    languages: ["English", "Hindi", "Sanskrit", "Punjabi"],
    education: ["MA in Astrology", "B.A. in Sanskrit"],
    certifications: [
      "Certified Vedic Astrologer",
      "Numerology Expert",
      "Tarot Card Reader",
    ],
    specializations: [
      "Career & Finance",
      "Relationship & Marriage",
      "Health & Wellness",
      "Spiritual Growth",
      "Life Purpose",
    ],
    about: [
      "Dr. Ananya Sharma is a renowned Vedic Astrologer and Spiritual Guide with over 12 years of experience in helping individuals navigate life's challenges through ancient wisdom and modern insights.",
      "With a deep understanding of Vedic astrology, numerology, and spiritual counseling, Dr. Ananya has guided thousands of clients worldwide in finding clarity, purpose, and direction in their lives.",
      "Her compassionate approach combines traditional Vedic principles with practical guidance, making complex astrological concepts accessible and actionable for everyone.",
      "Dr. Ananya believes that astrology is not about predicting fate, but about understanding cosmic energies to make empowered choices and create the life you desire.",
    ],
    highlights: [
      {
        title: "Why I Started Astrology",
        desc: "To help people find clarity and purpose through ancient Vedic wisdom.",
      },
      {
        title: "My Mission",
        desc: "Empowering individuals to make conscious life choices with confidence.",
      },
      {
        title: "My Approach",
        desc: "Blending traditional Vedic principles with practical modern guidance.",
      },
      {
        title: "What Makes Me Different",
        desc: "Compassionate counseling combined with deep astrological expertise.",
      },
    ],
    services: [
      {
        title: "Vedic Astrology Consultation",
        desc: "In-depth analysis of your birth chart to provide personalized guidance on life path and destiny.",
      },
      {
        title: "Career & Finance Guidance",
        desc: "Strategic astrological insights to help you make informed career and financial decisions.",
      },
      {
        title: "Relationship & Marriage Compatibility",
        desc: "Comprehensive compatibility analysis for harmonious relationships and lasting partnerships.",
      },
      {
        title: "Numerology Reading",
        desc: "Discover your life path number and how it influences your destiny and decisions.",
      },
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
