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
  { label: "Sessions", href: "/live-sessions" },
  { label: "Blogs", href: "/blogs" },
  { label: "Categories", href: "/categories", hasDropdown: true },
  { label: "Contact", href: "/contact" },
];

function isNavItemActive(pathname: string, href: string) {
  if (href === "/about") return pathname === "/about";
  if (href === "/experts")
    return pathname === "/experts" || pathname.startsWith("/experts/");
  if (href === "/contact") return pathname === "/contact";
  if (href === "/live-sessions")
    return (
      pathname === "/live-sessions" ||
      pathname.startsWith("/live-sessions/") ||
      pathname === "/recorded-videos" ||
      pathname.startsWith("/recorded-videos/")
    );
  if (href === "/blogs")
    return pathname === "/blogs" || pathname.startsWith("/blogs/");
  if (href === "/categories")
    return pathname === "/categories" || pathname.startsWith("/categories/");
  if (href === "/") return pathname === "/";
  return false;
}

export default function Header() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { items: categoryItems, status: categoriesStatus } = useAppSelector(
    (s) => s.categories,
  );
  const cartItems = useAppSelector((s) => s.cart.items);
  const auth = useAppSelector((s) => s.auth);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
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
    setCategoriesOpen(false);
    setMobileMenuOpen(false);
    setMobileCategoriesOpen(false);
    setQuery("");
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setCategoriesOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setCategoriesOpen(false);
        setMobileMenuOpen(false);
        setMobileCategoriesOpen(false);
      }
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
          <img src="https://res.cloudinary.com/dgnztzmzp/image/upload/v1785323232/logo_-_icon_fbp439.png" alt="Cosmicguruji" className="w-12 h-12" />
          {/* <LogoIcon className="shrink-0" variant="indigo" /> */}
          <div className="hidden flex-col leading-none sm:flex">
            <span
              className="text-[20px] font-semibold tracking-[-0.01em] text-[#1A1A4A] lg:text-[21px]"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Cosmicguruji
            </span>
            <span className="mt-2 text-[8px] font-medium uppercase tracking-[0.16em] text-[#5B5B9A] lg:text-[9px]">
              Awakening Within
            </span>
          </div>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-5 lg:flex xl:gap-6">
          {navItems.map((item) => {
            const isActive = isNavItemActive(pathname, item.href);

            if (item.hasDropdown) {
              return (
                <div key={item.label} className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    aria-expanded={categoriesOpen}
                    aria-haspopup="listbox"
                    onClick={() => setCategoriesOpen((v) => !v)}
                    className={`inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-[13.5px] font-medium transition-colors hover:text-[#3D3D8F] xl:text-[14px] ${
                      isActive || categoriesOpen
                        ? "text-[#3D3D8F]"
                        : "text-[#1A1A4A]"
                    }`}
                  >
                    {item.label}
                    <ChevronIcon open={categoriesOpen} />
                  </button>

                  {categoriesOpen && (
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
                              onClick={() => setCategoriesOpen(false)}
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
                  isActive ? "text-[#3D3D8F]" : "text-[#1A1A4A]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3.5 lg:gap-5">
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
            <Link
              href="/profile"
              aria-label="Profile"
              className="hidden p-1.5 text-[#1A1A4A] transition-colors hover:text-[#3D3D8F] md:inline-flex"
            >
              <UserIcon />
            </Link>
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
            href="/just99"
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#3d3d8f] px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_8px_20px_rgba(109,40,217,0.32)] transition hover:brightness-105 hover:shadow-[0_10px_24px_rgba(109,40,217,0.4)] sm:gap-2 sm:px-5 sm:py-2.5 sm:text-[13px]"
          >
            <SparkleIcon />
            Join Now
          </Link>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E4E6F2] text-[#1A1A4A] transition hover:border-[#3D3D8F] hover:text-[#3D3D8F] lg:hidden"
          >
            {mobileMenuOpen ? <CloseMenuIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu overlay"
            className="fixed inset-0 top-[68px] z-40 bg-[#1A1A4A]/20 backdrop-blur-[2px] lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav
            aria-label="Mobile navigation"
            className="relative z-50 max-h-[calc(100dvh-68px)] overflow-y-auto border-t border-[#EEF0FA] bg-white px-4 py-4 shadow-[0_12px_32px_rgba(26,26,74,0.08)] lg:hidden"
          >
            <ul className="space-y-1">
              {navItems.map((item) => {
                const isActive = isNavItemActive(pathname, item.href);

                if (item.hasDropdown) {
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        aria-expanded={mobileCategoriesOpen}
                        onClick={() => setMobileCategoriesOpen((v) => !v)}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium transition ${
                          isActive || mobileCategoriesOpen
                            ? "bg-[#F4F2FA] text-[#3D3D8F]"
                            : "text-[#1A1A4A] hover:bg-[#F8F9FC]"
                        }`}
                      >
                        {item.label}
                        <ChevronIcon open={mobileCategoriesOpen} />
                      </button>
                      {mobileCategoriesOpen && (
                        <div className="mt-1 rounded-xl border border-[#EEF0FA] bg-[#F8F9FC] p-2">
                          <div className="relative mb-2">
                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8AA8]">
                              <SearchIconSmall />
                            </span>
                            <input
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              placeholder="Search Categories"
                              className="w-full rounded-lg border border-[#E0E2EE] bg-white py-2 pl-9 pr-3 text-[13px] text-[#1A1A4A] outline-none placeholder:text-[#A0A0B8] focus:border-[#3D3D8F]"
                            />
                          </div>
                          <ul className="max-h-48 overflow-y-auto">
                            {categoriesStatus === "loading" &&
                              filteredCategories.length === 0 && (
                                <li className="px-2 py-3 text-center text-[13px] text-[#8A8AA8]">
                                  Loading...
                                </li>
                              )}
                            {filteredCategories.map((cat) => (
                              <li key={cat.id}>
                                <Link
                                  href={`/categories/${cat.slug}`}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block rounded-lg px-2 py-2.5 text-[14px] font-medium text-[#1A1A4A] hover:bg-white hover:text-[#3D3D8F]"
                                >
                                  {cat.label}
                                </Link>
                              </li>
                            ))}
                            {categoriesStatus !== "loading" &&
                              filteredCategories.length === 0 && (
                                <li className="px-2 py-3 text-center text-[13px] text-[#8A8AA8]">
                                  No categories found
                                </li>
                              )}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block rounded-xl px-3 py-3 text-[15px] font-medium transition ${
                        isActive
                          ? "bg-[#F4F2FA] text-[#3D3D8F]"
                          : "text-[#1A1A4A] hover:bg-[#F8F9FC]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 space-y-2 border-t border-[#EEF0FA] pt-4">
              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium text-[#1A1A4A] hover:bg-[#F8F9FC]"
              >
                <span className="inline-flex items-center gap-2">
                  <CartIcon />
                  Cart
                </span>
                {cartItems.length > 0 && (
                  <span className="rounded-full bg-[#C9A06A] px-2 py-0.5 text-[11px] font-bold text-white">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              {auth.token ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-3 text-[15px] font-medium text-[#1A1A4A] hover:bg-[#F8F9FC]"
                  >
                    <UserIcon />
                    My Profile
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(logout());
                      dispatch(resetCart());
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-3 text-left text-[15px] font-medium text-[#1A1A4A] hover:bg-[#F8F9FC]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-3 text-[15px] font-medium text-[#1A1A4A] hover:bg-[#F8F9FC]"
                >
                  <UserIcon />
                  Login
                </Link>
              )}

              <Link
                href="/just99"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#4C1D95] px-4 py-3 text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(109,40,217,0.32)]"
              >
                <SparkleIcon />
                Join Now
              </Link>
            </div>
          </nav>
        </>
      )}
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

function SparkleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0 text-white">
      <path d="M8 1L9.2 6.2L14 7.4L9.2 8.6L8 14L6.8 8.6L2 7.4L6.8 6.2L8 1Z" fill="currentColor" />
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

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7H20M4 12H20M4 17H20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseMenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
