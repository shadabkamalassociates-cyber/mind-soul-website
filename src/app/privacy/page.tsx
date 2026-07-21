import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | SoulSensei",
  description: "Learn how SoulSensei collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-[#1A1A4A]">
      <Header />
      <div className="mx-auto max-w-[800px] px-6 py-12 sm:px-8 sm:py-16 lg:px-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#4B4BA8]">
          Legal
        </p>
        <h1
          className="mt-3 text-[32px] font-semibold text-[#1A1A4A] sm:text-[40px]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Privacy Policy
        </h1>
        <p className="mt-3 text-[14px] text-[#5C5C7A]">Last updated: July 21, 2026</p>

        <div className="mt-10 space-y-8 text-[15px] leading-[1.75] text-[#2A2A3A]">
          <section>
            <h2 className="text-[18px] font-semibold text-[#3D3D8F]">1. Introduction</h2>
            <p className="mt-2">
              SoulSensei (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy. This
              Privacy Policy explains how we collect, use, store, and share
              information when you use our website, apps, and services.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#3D3D8F]">2. Information We Collect</h2>
            <p className="mt-2">
              We may collect personal details such as your name, email address,
              phone number, payment information, booking history, and
              communications with our support team. We also collect device and
              usage data to improve our platform.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#3D3D8F]">3. How We Use Your Information</h2>
            <p className="mt-2">
              We use your information to provide and improve sessions, process
              bookings and payments, send updates and offers (with your
              consent), verify experts, and keep the platform secure.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#3D3D8F]">4. Sharing of Information</h2>
            <p className="mt-2">
              We do not sell your personal data. We may share limited information
              with verified experts for booked sessions, payment processors, and
              service providers who help us operate SoulSensei — all under
              appropriate confidentiality obligations.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#3D3D8F]">5. Data Security</h2>
            <p className="mt-2">
              We use industry-standard safeguards to protect your data. Session
              links and payments are handled through secure systems. No method
              of transmission is 100% secure, but we continuously work to
              strengthen our protections.
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#3D3D8F]">6. Your Rights</h2>
            <p className="mt-2">
              You may request access, correction, or deletion of your personal
              data, and you can unsubscribe from marketing emails at any time.
              Contact us at{" "}
              <a
                href="mailto:support@soulsensei.com"
                className="font-medium text-[#3D3D8F] underline"
              >
                support@soulsensei.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-[18px] font-semibold text-[#3D3D8F]">7. Contact</h2>
            <p className="mt-2">
              For privacy-related questions, email{" "}
              <a
                href="mailto:support@soulsensei.com"
                className="font-medium text-[#3D3D8F] underline"
              >
                support@soulsensei.com
              </a>
              .
            </p>
          </section>
        </div>

        <Link
          href="/"
          className="mt-12 inline-flex text-[14px] font-medium text-[#3D3D8F] hover:text-[#1A1A4A]"
        >
          ← Back to Home
        </Link>
      </div>
      <Footer />
    </main>
  );
}
