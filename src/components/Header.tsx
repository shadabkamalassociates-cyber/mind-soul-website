"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoIcon, SearchIcon, UserIcon } from "./Icons";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Expert", href: "/experts" },
  { label: "Live Sessions", href: "/#sessions" },
  { label: "Categories", href: "/#programs" },
  { label: "Retreats", href: "/#retreats" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="relative z-50 w-full bg-white">
      <div className="mx-auto flex h-[70px] max-w-[1280px] items-center justify-between px-6 lg:h-[78px] lg:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <LogoIcon className="shrink-0" variant="indigo" />
          <div className="flex flex-col leading-none">
            <span
              className="text-[22px] font-semibold tracking-[-0.01em] text-[#1A1A4A]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              SoulSensei
            </span>
            <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.18em] text-[#5B5B9A]">
              Awakening Within
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex xl:gap-8">
          {navItems.map((item) => {
            const isActive =
              item.href === "/about"
                ? pathname === "/about"
                : item.href === "/experts"
                  ? pathname === "/experts" || pathname.startsWith("/experts/")
                  : item.href === "/contact"
                    ? pathname === "/contact"
                    : item.href === "/"
                      ? pathname === "/"
                      : false;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-[14px] font-medium transition-colors hover:text-[#3D3D8F] ${
                  isActive
                    ? "border-b-2 border-[#1A1A4A] pb-0.5 text-[#1A1A4A]"
                    : "text-[#1A1A4A]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label="Search"
            className="hidden p-1 text-[#1A1A4A] transition-colors hover:text-[#3D3D8F] sm:inline-flex"
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            aria-label="Account"
            className="hidden p-1 text-[#1A1A4A] transition-colors hover:text-[#3D3D8F] sm:inline-flex"
          >
            <UserIcon />
          </button>

          <Link
            href="/#start"
            className="inline-flex items-center rounded-xl bg-[#1A1A4A] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#2A2A6A] sm:px-6 sm:text-[14px]"
          >
            Book Your Journey
          </Link>
        </div>
      </div>
    </header>
  );
}
