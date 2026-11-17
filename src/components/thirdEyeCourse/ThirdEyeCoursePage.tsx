"use client";

import Image from "next/image";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnrollModal from "./EnrollModal";
import {
  COURSE_BENEFITS,
  COURSE_FAQS,
  COURSE_HIGHLIGHTS,
  COURSE_INCLUDES,
  COURSE_MODULES,
  COURSE_TESTIMONIALS,
  THIRD_EYE_COURSE,
} from "./content";

export default function ThirdEyeCoursePage() {
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [openModule, setOpenModule] = useState<string | null>(COURSE_MODULES[0].id);
  const [openFaq, setOpenFaq] = useState<string | null>(COURSE_FAQS[0].id);

  function enroll() {
    setEnrollOpen(true);
  }

  function watchPreview() {
    if (THIRD_EYE_COURSE.previewUrl) {
      window.open(THIRD_EYE_COURSE.previewUrl, "_blank", "noopener,noreferrer");
      return;
    }
    setPreviewOpen(true);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FBF8FF] text-[#211936]">
      <Header />

      <Hero onEnroll={enroll} onPreview={watchPreview} />
      <WhySection />
      <IncludesSection onEnroll={enroll} />
      <CurriculumSection openId={openModule} onToggle={setOpenModule} />
      <InstructorSection />
      <TestimonialsSection />
      <FaqSection openId={openFaq} onToggle={setOpenFaq} />
      <FinalCta onEnroll={enroll} />

      <Footer />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E6D9F5] bg-white/95 p-3 backdrop-blur md:hidden">
        <button
          type="button"
          onClick={enroll}
          className="flex h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-[#7C4DFF] to-[#4B2A9A] text-sm font-semibold text-white shadow-[0_8px_20px_rgba(104,66,166,0.3)]"
        >
          Enroll Now · ₹{THIRD_EYE_COURSE.priceInr.toLocaleString("en-IN")}
        </button>
      </div>

      <EnrollModal open={enrollOpen} onClose={() => setEnrollOpen(false)} />

      {previewOpen ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 bg-[#24133F]/50"
            aria-label="Close preview"
            onClick={() => setPreviewOpen(false)}
          />
          <div className="relative z-10 max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
            <h2
              className="text-xl font-semibold text-[#24133F]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Course preview
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#5B4B73]">
              The preview video URL is not configured yet. Set{" "}
              <code className="text-xs">NEXT_PUBLIC_THIRD_EYE_PREVIEW_URL</code> to enable Watch Course Preview.
            </p>
            <button
              type="button"
              onClick={() => setPreviewOpen(false)}
              className="mt-4 rounded-full bg-[#24133F] px-5 py-2 text-sm font-semibold text-white"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}

function Hero({
  onEnroll,
  onPreview,
}: {
  onEnroll: () => void;
  onPreview: () => void;
}) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(120deg,#16082c_0%,#2a1450_45%,#3b1d6b_100%)] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(185,154,239,0.28),transparent_42%)]" />
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#E8D7FF]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D9B66D]" />
            Spiritual Course
          </span>
          <h1
            className="mt-5 text-[36px] font-semibold leading-[1.12] sm:text-[48px] lg:text-[56px]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Third Eye
            <br />
            Awakening Course
          </h1>
          <p className="mt-4 text-[15px] font-medium text-[#E4D4FF] sm:text-[17px]">
            Activate Your Inner Vision • Expand Your Awareness • Deepen Your Spiritual Growth
          </p>
          <p className="mt-4 max-w-xl text-[14px] leading-7 text-[#C9B8E6]">
            A guided, step-by-step program to awaken and balance your Ajna (Third Eye) chakra,
            enhance intuition and experience a higher state of awareness.
          </p>

          <div className="mt-6 flex flex-wrap items-end gap-3">
            <p
              className="text-[40px] font-semibold leading-none text-white"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              ₹{THIRD_EYE_COURSE.priceInr.toLocaleString("en-IN")}
            </p>
            <span className="mb-1 rounded-full bg-[#D9B66D] px-3 py-1 text-[11px] font-semibold text-[#24133F]">
              One-time enrollment
            </span>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onEnroll}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9B6DFF] to-[#6B3CD4] px-7 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(155,109,255,0.35)]"
            >
              Enroll Now →
            </button>
            <button
              type="button"
              onClick={onPreview}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 text-sm font-semibold text-white hover:bg-white/10"
            >
              ▶ Watch Course Preview
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {COURSE_HIGHLIGHTS.map((item) => (
              <div key={item.title} className="flex items-start gap-2.5 text-left">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#D9B66D]">
                  <SparkIcon />
                </span>
                <span>
                  <span className="block text-[12px] font-semibold">{item.title}</span>
                  {item.desc ? (
                    <span className="block text-[11px] text-[#C9B8E6]">{item.desc}</span>
                  ) : null}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[520px]">
          <div className="absolute -inset-6 rounded-full bg-[#B99AEF]/25 blur-3xl" />
          <Image
            src={THIRD_EYE_COURSE.assets.hero}
            alt="Meditating seeker with a glowing third-eye chakra against a cosmic mandala"
            width={720}
            height={960}
            priority
            className="relative z-10 h-auto w-full rounded-[28px] object-cover shadow-[0_30px_80px_rgba(10,0,30,0.45)]"
          />
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="bg-[#FBF8FF] px-5 py-14 sm:px-8 lg:py-16">
      <div className="mx-auto max-w-[1100px] text-center">
        <h2
          className="text-[28px] font-semibold text-[#24133F] sm:text-[34px]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Why Awaken Your Third Eye?
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-[15px] leading-7 text-[#5B4B73]">
          The Third Eye (Ajna Chakra) is the centre of intuition, clarity and higher consciousness.
          When activated and balanced, it helps you see beyond the obvious, make better decisions
          and connect deeply with your inner self.
        </p>
        <p className="mx-auto mt-6 text-[18px] font-semibold text-[#24133F]" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
          What You Will Experience
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {COURSE_BENEFITS.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[#EDE3FA] bg-white px-4 py-6 shadow-[0_8px_24px_rgba(36,19,63,0.04)]"
            >
              <span className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#F3EBFF] text-[#6842A6]">
                <LotusIcon />
              </span>
              <h3 className="text-[14px] font-semibold text-[#24133F]">{item.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function IncludesSection({ onEnroll }: { onEnroll: () => void }) {
  return (
    <section className="px-5 pb-14 sm:px-8">
      <div className="mx-auto grid max-w-[1100px] items-center gap-6 rounded-[28px] bg-white p-4 shadow-[0_16px_50px_rgba(36,19,63,0.06)] lg:grid-cols-[0.9fr_1.1fr_0.85fr] lg:p-6">
        <Image
          src={THIRD_EYE_COURSE.assets.includes}
          alt="Silhouette in meditation with a glowing Ajna centre"
          width={640}
          height={480}
          className="h-full max-h-[360px] w-full rounded-2xl object-cover"
        />
        <div className="px-2 py-3">
          <h2
            className="text-[26px] font-semibold text-[#24133F]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Your Course Includes
          </h2>
          <ul className="mt-5 space-y-3">
            {COURSE_INCLUDES.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[14px] text-[#3D2E57]">
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <aside className="rounded-3xl bg-gradient-to-b from-[#5B2FA8] to-[#2A1458] p-6 text-white shadow-[0_16px_40px_rgba(75,42,154,0.35)]">
          <p className="text-sm text-[#E4D4FF]">Course Fee</p>
          <p
            className="mt-1 text-[40px] font-semibold leading-none"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            ₹{THIRD_EYE_COURSE.priceInr.toLocaleString("en-IN")}
          </p>
          <p className="mt-2 text-sm text-[#D9B66D]">One-time payment</p>
          <button
            type="button"
            onClick={onEnroll}
            className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-[#D9B66D] text-sm font-semibold text-[#24133F]"
          >
            Enroll Now →
          </button>
          <p className="mt-3 text-center text-[11px] text-[#E4D4FF]">🔒 100% Secure Payment</p>
        </aside>
      </div>
    </section>
  );
}

function CurriculumSection({
  openId,
  onToggle,
}: {
  openId: string | null;
  onToggle: (id: string | null) => void;
}) {
  return (
    <section id="curriculum" className="bg-[#F7F2FF] px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-[800px]">
        <h2
          className="text-center text-[28px] font-semibold text-[#24133F] sm:text-[34px]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Course Curriculum
        </h2>
        <div className="mt-8 space-y-3">
          {COURSE_MODULES.map((mod, index) => {
            const open = openId === mod.id;
            return (
              <div
                key={mod.id}
                className="overflow-hidden rounded-2xl border border-[#E6D9F5] bg-white"
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => onToggle(open ? null : mod.id)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left"
                >
                  <Image
                    src={THIRD_EYE_COURSE.assets.module}
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6842A6]">
                      Module {index + 1}
                    </span>
                    <span className="block text-[15px] font-semibold text-[#24133F]">{mod.title}</span>
                    <span className="block truncate text-[12px] text-[#7A6B90]">{mod.summary}</span>
                  </span>
                  <span className="text-xl text-[#6842A6]" aria-hidden>
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open ? (
                  <ul className="space-y-2 border-t border-[#F0E7FB] px-4 py-4 text-[13px] text-[#5B4B73]">
                    {mod.lessons.map((lesson) => (
                      <li key={lesson} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D9B66D]" />
                        {lesson}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function InstructorSection() {
  return (
    <section className="px-5 py-14 sm:px-8">
      <div className="mx-auto grid max-w-[900px] items-center gap-8 rounded-[28px] bg-white p-6 shadow-[0_16px_50px_rgba(36,19,63,0.06)] md:grid-cols-[220px_1fr] md:p-8">
        <Image
          src={THIRD_EYE_COURSE.assets.instructor}
          alt="Portrait of Cosmic Guruji"
          width={360}
          height={360}
          className="mx-auto h-[220px] w-[220px] rounded-2xl object-cover"
        />
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#6842A6]">
            Learn from
          </p>
          <h2
            className="mt-1 text-[28px] font-semibold text-[#24133F]"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Cosmic Guruji
          </h2>
          <p className="text-sm font-medium text-[#6842A6]">
            Spiritual Mentor · Healer · Consciousness Guide
          </p>
          <p className="mt-4 text-[14px] leading-7 text-[#5B4B73]">
            Cosmic Guruji guides seekers through meditation, energy awareness and chakra-focused
            practices with a calm, practical approach. Teaching emphasises inner clarity, daily
            sadhana and respectful spiritual growth — without pressure or sensational claims.
          </p>
          <p className="mt-3 text-[13px] text-[#7A6B90]">
            Specialization: Meditation, Energy &amp; Chakra Healing
          </p>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="bg-[linear-gradient(180deg,#2A1458_0%,#1A0C38_100%)] px-5 py-14 text-white sm:px-8">
      <h2
        className="text-center text-[28px] font-semibold sm:text-[34px]"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        What Our Students Say
      </h2>
      <p className="mt-2 text-center text-xs text-[#C9B8E6]">Demo testimonials until published reviews are supplied.</p>
      <div className="mx-auto mt-8 grid max-w-[1100px] gap-4 md:grid-cols-3">
        {COURSE_TESTIMONIALS.map((item, index) => (
          <article key={item.name} className="rounded-2xl bg-white p-5 text-[#211936]">
            <div className="flex items-center gap-3">
              <Image
                src={THIRD_EYE_COURSE.assets.students[index]}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-[11px] text-[#D9B66D]">★★★★★</p>
              </div>
            </div>
            <p className="mt-3 text-[14px] leading-6 text-[#5B4B73]">“{item.quote}”</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FaqSection({
  openId,
  onToggle,
}: {
  openId: string | null;
  onToggle: (id: string | null) => void;
}) {
  return (
    <section id="faq" className="px-5 py-14 sm:px-8">
      <h2
        className="text-center text-[28px] font-semibold text-[#24133F] sm:text-[34px]"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        Frequently Asked Questions
      </h2>
      <div className="mx-auto mt-8 max-w-[760px] divide-y divide-[#EDE3FA] overflow-hidden rounded-2xl border border-[#EDE3FA] bg-white">
        {COURSE_FAQS.map((item) => {
          const open = openId === item.id;
          return (
            <div key={item.id}>
              <button
                type="button"
                aria-expanded={open}
                onClick={() => onToggle(open ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-[15px] font-semibold text-[#24133F]">{item.question}</span>
                <span className="text-xl text-[#6842A6]" aria-hidden>
                  {open ? "−" : "+"}
                </span>
              </button>
              {open ? (
                <p className="px-5 pb-4 text-[14px] leading-7 text-[#5B4B73]">{item.answer}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FinalCta({ onEnroll }: { onEnroll: () => void }) {
  return (
    <section className="px-5 pb-24 pt-4 sm:px-8 md:pb-14">
      <div className="relative mx-auto min-h-[280px] max-w-[1100px] overflow-hidden rounded-[28px]">
        <Image
          src={THIRD_EYE_COURSE.assets.cta}
          alt=""
          fill
          className="object-cover"
        />
        <div className="relative z-10 bg-[#1A0C38]/72 px-6 py-12 text-white sm:px-12">
          <div className="max-w-xl">
            <h2
              className="text-[30px] font-semibold sm:text-[36px]"
              style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
            >
              Ready to Awaken Your Third Eye?
            </h2>
            <p className="mt-3 text-[15px] leading-7 text-[#E4D4FF]">
              Take the first step towards greater self-awareness, inner clarity and spiritual growth.
            </p>
            <button
              type="button"
              onClick={onEnroll}
              className="mt-6 inline-flex h-12 items-center rounded-full bg-gradient-to-r from-[#9B6DFF] to-[#6B3CD4] px-7 text-sm font-semibold"
            >
              Enroll Now for ₹{THIRD_EYE_COURSE.priceInr.toLocaleString("en-IN")}
            </button>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-[#E4D4FF]">
              <span>∞ Lifetime Access</span>
              <span>Course Certificate</span>
              <span>Expert Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SparkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2l1.2 6.8L20 12l-6.8 3.2L12 22l-1.2-6.8L4 12l6.8-3.2L12 2z" fill="currentColor" />
    </svg>
  );
}

function LotusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 20c3-3 4-6 4-9-2 1-3.2 3-4 5-0.8-2-2-4-4-5 0 3 1 6 4 9z"
        fill="currentColor"
        opacity="0.9"
      />
      <path d="M12 20c2.5-2 6-4 8-8-3 .5-6 2.5-8 5-2-2.5-5-4.5-8-5 2 4 5.5 6 8 8z" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="mt-0.5 shrink-0 text-[#6842A6]" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#F3EBFF" />
      <path d="M8 12.5l2.4 2.4L16 9.5" stroke="#6842A6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
