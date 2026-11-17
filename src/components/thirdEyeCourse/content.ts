export const THIRD_EYE_COURSE = {
  slug: "third-eye-awakening",
  name: "Third Eye Awakening Course",
  priceInr: 3000,
  source: "third_eye_course",
  previewUrl: process.env.NEXT_PUBLIC_THIRD_EYE_PREVIEW_URL || "",
  assets: {
    hero: "/courses/third-eye/hero.jpg",
    includes: "/courses/third-eye/includes.jpg",
    instructor: "/courses/third-eye/instructor.jpg",
    cta: "/courses/third-eye/cta.jpg",
    module: "/courses/third-eye/module.jpg",
    students: [
      "/courses/third-eye/student-1.jpg",
      "/courses/third-eye/student-2.jpg",
      "/courses/third-eye/student-3.jpg",
    ],
  },
} as const;

export const COURSE_INCLUDES = [
  "Step-by-step Third Eye activation practices",
  "Guided meditation & energy exercises",
  "Ajna Chakra balancing techniques",
  "Daily sadhana (practice) plan",
  "PDF resources & guided audio sessions",
  "Course completion certificate",
] as const;

export const COURSE_HIGHLIGHTS = [
  { title: "Online Course", desc: "(Live + Recorded)" },
  { title: "6 Modules", desc: "Self-paced" },
  { title: "Lifetime Access", desc: "" },
  { title: "Completion Certificate", desc: "" },
] as const;

export const COURSE_BENEFITS = [
  {
    title: "Enhanced Intuition",
    desc: "Strengthen your inner sensing so everyday choices feel clearer and more grounded.",
  },
  {
    title: "Mental Clarity",
    desc: "Quiet mental noise and notice what matters with a calmer, more focused mind.",
  },
  {
    title: "Better Focus & Memory",
    desc: "Build attention through simple awareness practices you can repeat each day.",
  },
  {
    title: "Deeper Meditation",
    desc: "Settle into stillness more easily with structured Ajna-focused sessions.",
  },
  {
    title: "Higher Self-Awareness",
    desc: "Observe thoughts and emotions with kindness, and live with greater presence.",
  },
] as const;

export const COURSE_MODULES = [
  {
    id: "m1",
    title: "Foundations of the Third Eye",
    summary: "Understand the science and spirituality of the Ajna Chakra.",
    lessons: [
      "What the Ajna (Third Eye) centre represents in yogic tradition",
      "How inner vision relates to attention, intuition and awareness",
      "Setting a respectful, grounded intention for this course",
    ],
  },
  {
    id: "m2",
    title: "Preparing Your Mind & Energy",
    summary: "Breathwork, cleansing and basic energy alignment.",
    lessons: [
      "Simple breath practices to settle the nervous system",
      "Body and energy alignment before Ajna work",
      "Creating a quiet daily space for sadhana",
    ],
  },
  {
    id: "m3",
    title: "Guided Third Eye Activation",
    summary: "Powerful meditations to stimulate and open your inner vision.",
    lessons: [
      "Guided visualisation for the brow centre",
      "Soft-gaze and inner-light awareness practices",
      "How to rest after activation without strain",
    ],
  },
  {
    id: "m4",
    title: "Deepening Your Intuition",
    summary: "Exercises to stimulate and refine inner awareness.",
    lessons: [
      "Journaling prompts for intuitive noticing",
      "Distinguishing imagination, fear and inner knowing",
      "Short daily listening practices",
    ],
  },
  {
    id: "m5",
    title: "Daily Practices & Integration",
    summary: "A sustainable routine to keep your Third Eye active and aware.",
    lessons: [
      "A 10–15 minute daily sadhana plan",
      "Using the PDF and audio resources",
      "Integrating practice into work and family life",
    ],
  },
  {
    id: "m6",
    title: "Living with Higher Awareness",
    summary: "Applying your awakened clarity, intuition and insight in daily life.",
    lessons: [
      "Bringing awareness into conversations and decisions",
      "Staying balanced when life feels busy",
      "Closing ritual and certificate of completion",
    ],
  },
] as const;

export const COURSE_FAQS = [
  {
    id: "beginners",
    question: "Is this course suitable for beginners?",
    answer:
      "Yes. Modules begin with foundations and move step by step. No prior meditation experience is required.",
  },
  {
    id: "access",
    question: "How will I access the course?",
    answer:
      "After successful payment you will receive access details on your registered email and WhatsApp. Keep those contacts accurate at checkout.",
  },
  {
    id: "format",
    question: "Is this a live course or recorded?",
    answer:
      "The course is designed as an online programme with recorded modules you can revisit, plus live session opportunities when they are scheduled.",
  },
  {
    id: "duration",
    question: "How long will I have access?",
    answer:
      "Enrollment includes lifetime access to the course materials included at purchase.",
  },
  {
    id: "certificate",
    question: "Will I receive a certificate?",
    answer:
      "Yes. A course completion certificate is included when you finish the programme.",
  },
  {
    id: "support",
    question: "How can I contact support?",
    answer:
      "Use the Contact page on Cosmicguruji.com and mention Third Eye Awakening Course in your message.",
  },
] as const;

export const COURSE_TESTIMONIALS = [
  {
    name: "Priya S.",
    quote:
      "This course helped me feel more intuitive, focused and calm. The meditations are truly powerful.",
    demo: true,
  },
  {
    name: "Rohan K.",
    quote:
      "I could clearly feel a shift in my awareness and decision-making within a few weeks.",
    demo: true,
  },
  {
    name: "Anjali M.",
    quote:
      "A beautifully structured and deeply transformative course. Highly recommended.",
    demo: true,
  },
] as const;
