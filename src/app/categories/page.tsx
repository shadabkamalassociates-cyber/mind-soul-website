import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { sessionCategories } from "@/data/categories";
import { getSessionsByCategory } from "@/data/liveSessions";

export const metadata: Metadata = {
  title: "Categories | SoulSensei",
  description: "Browse SoulSensei session categories and find guidance that fits your journey.",
};

export default function CategoriesIndexPage() {
  return (
    <main className="min-h-screen bg-white text-[#1A1A4A]">
      <Header />
      <section className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
        <h1
          className="text-[32px] font-semibold text-[#3D3D8F] sm:text-[40px]"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Categories
        </h1>
        <p className="mt-3 max-w-[560px] text-[14px] text-[#5C5C7A] sm:text-[15px]">
          Choose a category to see all related live sessions.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sessionCategories.map((cat) => {
            const count = getSessionsByCategory(cat.slug).length;
            return (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="rounded-2xl border border-[#E8EAF4] bg-white px-5 py-4 transition hover:border-[#3D3D8F]/35 hover:shadow-[0_8px_24px_rgba(26,26,74,0.08)]"
              >
                <p className="text-[15px] font-semibold text-[#1A1A4A]">{cat.label}</p>
                <p className="mt-1 text-[12px] text-[#8A8AA8]">
                  {count} session{count === 1 ? "" : "s"}
                </p>
              </Link>
            );
          })}
        </div>
      </section>
      <Footer />
    </main>
  );
}
