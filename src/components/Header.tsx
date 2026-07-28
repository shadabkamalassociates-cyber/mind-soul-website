"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { LogoIcon, SearchIcon, UserIcon } from "./Icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchCategories,
  mapCategoryForUi,
} from "@/store/slices/categoriesSlice";
import { logout } from "@/store/slices/authSlice";
import { fetchCart, resetCart } from "@/store/slices/cartSlice";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Expert", href: "/experts" },
  { label: "Live Sessions", href: "/live-sessions" },
  { label: "Recorded Videos", href: "/recorded-videos" },
  { label: "Blogs", href: "/blogs" },
  { label: "Categories", href: "/categories", hasDropdown: true },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { items: categoryItems, status: categoriesStatus } = useAppSelector(
    (s) => s.categories,
  );
  const cartItems = useAppSelector((s) => s.cart.items);
  const auth = useAppSelector((s) => s.auth);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (categoriesStatus === "idle") {
      dispatch(fetchCategories());
    }
  }, [categoriesStatus, dispatch]);

  useEffect(() => {
    if (auth.hydrated && auth.token) {
      dispatch(fetchCart());
    }
  }, [auth.hydrated, auth.token, dispatch]);

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

  const categories = useMemo(
    () => categoryItems.map(mapCategoryForUi),
    [categoryItems],
  );

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.label.toLowerCase().includes(q));
  }, [categories, query]);

  return (
    <header className="relative z-50 w-full border-b border-[#EEF0FA] bg-white">
      <div className="mx-auto flex h-[68px] w-full max-w-[1440px] items-center gap-3 px-4 sm:px-5 lg:h-[72px] lg:gap-4 lg:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <LogoIcon className="shrink-0" variant="indigo" />
          <div className="hidden flex-col leading-none sm:flex">
            <span
              className="text-[20px] font-semibold tracking-[-0.01em] text-[#1A1A4A] lg:text-[21px]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              SoulSensei
            </span>
            <span className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.16em] text-[#5B5B9A] lg:text-[9px]">
              Awakening Within
            </span>
          </div>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-5 lg:flex xl:gap-6">
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
                        : item.href === "/recorded-videos"
                          ? pathname === "/recorded-videos" ||
                            pathname.startsWith("/recorded-videos/")
                          : item.href === "/blogs"
                        ? pathname === "/blogs" ||
                          pathname.startsWith("/blogs/")
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
                    className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[13.5px] font-medium transition-colors hover:text-[#3D3D8F] xl:text-[14px] ${
                      isActive || open
                        ? "text-[#3D3D8F]"
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
                        {categoriesStatus === "loading" &&
                          filteredCategories.length === 0 && (
                            <li className="px-4 py-6 text-center text-[13px] text-[#8A8AA8]">
                              Loading categories...
                            </li>
                          )}
                        {filteredCategories.map((cat) => (
                          <li key={cat.id}>
                            <Link
                              href={`/categories/${cat.slug}`}
                              onClick={() => setOpen(false)}
                              className="block px-4 py-2.5 text-[13px] font-medium text-[#1A1A4A] transition hover:bg-[#F4F2FA] hover:text-[#3D3D8F]"
                            >
                              {cat.label}
                            </Link>
                          </li>
                        ))}
                        {categoriesStatus !== "loading" &&
                          filteredCategories.length === 0 && (
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
                className={`shrink-0 whitespace-nowrap text-[13.5px] font-medium transition-colors hover:text-[#3D3D8F] xl:text-[14px] ${
                  isActive
                    ? "text-[#3D3D8F]"
                    : "text-[#1A1A4A]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-3.5 sm:gap-4 lg:gap-5">
          <button
            type="button"
            aria-label="Search"
            className="hidden p-1.5 text-[#1A1A4A] transition-colors hover:text-[#3D3D8F] md:inline-flex"
          >
            <SearchIcon />
          </button>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative hidden p-1.5 text-[#1A1A4A] transition-colors hover:text-[#3D3D8F] md:inline-flex"
          >
            <CartIcon />
            {cartItems.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#C9A06A] px-1 text-[9px] font-bold text-white">
                {cartItems.length}
              </span>
            )}
          </Link>
          {auth.token ? (
            <button
              type="button"
              onClick={() => {
                dispatch(logout());
                dispatch(resetCart());
              }}
              aria-label="Logout"
              className="hidden whitespace-nowrap px-0.5 text-[13px] font-medium text-[#1A1A4A] transition-colors hover:text-[#3D3D8F] md:inline-flex lg:text-[14px]"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              aria-label="Account"
              className="hidden p-1.5 text-[#1A1A4A] transition-colors hover:text-[#3D3D8F] md:inline-flex"
            >
              <UserIcon />
            </Link>
          )}

          <Link
            href="/#start"
            className="ml-1 inline-flex shrink-0 items-center whitespace-nowrap rounded-xl bg-[#3D3D8F] px-3.5 py-2 text-[12px] font-semibold text-white transition hover:bg-[#2F2F70] sm:ml-2 sm:px-4 sm:py-2.5 sm:text-[13px]"
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
      <path
        d="M16 16L20 20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M3 3L9 9M9 3L3 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6H20L19 14H8L7 6H6M6 6L5 3H3M8 18C8.55228 18 9 17.5523 9 17C9 16.4477 8.55228 16 8 16C7.44772 16 7 16.4477 7 17C7 17.5523 7.44772 18 8 18ZM18 18C18.5523 18 19 17.5523 19 17C19 16.4477 18.5523 16 18 16C17.4477 16 17 16.4477 17 17C17 17.5523 17.4477 18 18 18Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
