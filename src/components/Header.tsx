"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LogoIcon, SearchIcon, UserIcon } from "./Icons";
import { sessionCategories } from "@/data/categories";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Expert", href: "/experts" },
  { label: "Live Sessions", href: "/live-sessions" },
  { label: "Categories", href: "/categories", hasDropdown: true },
  { label: "Retreats", href: "/#retreats" },
  { label: "Blog", href: "/#blog" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    setQuery("");
  }, [pathname]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!dropdownRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sessionCategories;
    return sessionCategories.filter((c) => c.label.toLowerCase().includes(q));
  }, [query]);

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
                    : item.href === "/live-sessions"
                      ? pathname === "/live-sessions" ||
                        pathname.startsWith("/live-sessions/")
                      : item.href === "/categories"
                        ? pathname === "/categories" ||
                          pathname.startsWith("/categories/")
                        : item.href === "/"
                          ? pathname === "/"
                          : false;

            if (item.hasDropdown) {
              return (
                <div key={item.label} className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="listbox"
                    onClick={() => setOpen((v) => !v)}
                    className={`inline-flex items-center gap-1 text-[14px] font-medium transition-colors hover:text-[#3D3D8F] ${
                      isActive || open
                        ? "border-b-2 border-[#3D3D8F] pb-0.5 text-[#1A1A4A]"
                        : "text-[#1A1A4A]"
                    }`}
                  >
                    {item.label}
                    <ChevronIcon open={open} />
                  </button>

                  {open && (
                    <div className="absolute left-1/2 top-[calc(100%+14px)] z-[60] w-[300px] -translate-x-1/2 overflow-hidden rounded-2xl border border-[#E4E6F2] bg-white shadow-[0_16px_40px_rgba(26,26,74,0.14)]">
                      <div className="border-b border-[#EEF0FA] p-3">
                        <div className="relative">
                          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8AA8]">
                            <SearchIconSmall />
                          </span>
                          <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search Categories"
                            className="w-full rounded-xl border border-[#E0E2EE] bg-[#F8F9FC] py-2.5 pl-9 pr-9 text-[13px] text-[#1A1A4A] outline-none placeholder:text-[#A0A0B8] focus:border-[#3D3D8F]"
                          />
                          {query && (
                            <button
                              type="button"
                              aria-label="Clear search"
                              onClick={() => setQuery("")}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#8A8AA8] hover:bg-[#EEF0FA] hover:text-[#1A1A4A]"
                            >
                              <CloseIcon />
                            </button>
                          )}
                        </div>
                      </div>

                      <ul
                        role="listbox"
                        className="max-h-[320px] overflow-y-auto py-2"
                      >
                        {filteredCategories.map((cat) => (
                          <li key={cat.slug}>
                            <Link
                              href={`/categories/${cat.slug}`}
                              onClick={() => setOpen(false)}
                              className="block px-4 py-2.5 text-[13px] font-medium text-[#1A1A4A] transition hover:bg-[#F4F2FA] hover:text-[#3D3D8F]"
                            >
                              {cat.label}
                            </Link>
                          </li>
                        ))}
                        {filteredCategories.length === 0 && (
                          <li className="px-4 py-6 text-center text-[13px] text-[#8A8AA8]">
                            No categories found
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-[14px] font-medium transition-colors hover:text-[#3D3D8F] ${
                  isActive
                    ? "border-b-2 border-[#3D3D8F] pb-0.5 text-[#1A1A4A]"
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
            className="inline-flex items-center rounded-xl bg-[#3D3D8F] px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-[#2F2F70] sm:px-6 sm:text-[14px]"
          >
            Book Your Journey
          </Link>
        </div>
      </div>
    </header>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={`transition ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIconSmall() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 16L20 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
