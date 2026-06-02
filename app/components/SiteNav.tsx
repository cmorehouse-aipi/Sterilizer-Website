"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BRAND } from "../lib/brand";
import { HorizontalDeviceMark } from "./HorizontalDeviceMark";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/technology", label: "Technology" },
  { href: "/compare", label: "Compare" },
  { href: "/about", label: "About" },
  { href: "/help", label: "Help" },
];

export function SiteNav({ tone = "light" }: { tone?: "light" | "dark" }) {
  const isDark = tone === "dark";
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHome) { setScrolled(true); return; }
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Close drawer on navigation
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-30 w-full backdrop-blur transition-[background-color,box-shadow] duration-300 ${
          isDark
            ? scrolled
              ? "bg-b-bg/80 text-b-ink shadow-[inset_0_-1px_0_0_rgba(255,255,255,0.10)]"
              : "bg-transparent text-b-ink"
            : scrolled
              ? "bg-white/80 text-neutral-900 shadow-[inset_0_-1px_0_0_rgba(0,0,0,0.05)]"
              : "bg-transparent text-neutral-900"
        }`}
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <span className={`block h-px w-5 transition-colors ${isDark ? "bg-b-ink" : "bg-neutral-900"}`} />
              <span className={`block h-px w-5 transition-colors ${isDark ? "bg-b-ink" : "bg-neutral-900"}`} />
              <span className={`block h-px w-5 transition-colors ${isDark ? "bg-b-ink" : "bg-neutral-900"}`} />
            </button>
            <Link href="/" className="flex items-center" aria-label={BRAND}>
              <HorizontalDeviceMark name={BRAND} className="h-7 w-auto" />
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => {
              const active = pathname === n.href || pathname.startsWith(n.href + "/");
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`relative text-[13.5px] tracking-tight transition-opacity hover:opacity-60 ${
                    active ? "opacity-100" : "opacity-70"
                  }`}
                >
                  {n.label}
                  {active && (
                    <span
                      className={`absolute -bottom-[18px] left-0 right-0 h-px ${
                        isDark ? "bg-b-ink" : "bg-neutral-900"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 text-[12.5px]">
            <span className={`hidden rounded-full px-2 py-1 sm:inline ${isDark ? "ring-1 ring-white/15" : "ring-1 ring-black/10"}`}>
              US · USD
            </span>
            <Link
              href="/shop"
              className={`rounded-full px-3.5 py-1.5 ${
                isDark ? "bg-white text-black" : "bg-neutral-900 text-white"
              }`}
            >
              Buy
            </Link>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden
      />

      {/* Sidebar drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } ${isDark ? "bg-b-bg text-b-ink" : "bg-white text-neutral-900"}`}
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
      >
        {/* Drawer header */}
        <div className={`flex flex-shrink-0 items-center justify-between px-5 py-4 border-b ${
          isDark ? "border-white/10" : "border-black/8"
        }`}>
          <HorizontalDeviceMark name={BRAND} className="h-7 w-auto" />
          <button
            onClick={() => setMenuOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full opacity-50 hover:opacity-100 transition-opacity"
            aria-label="Close menu"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <line x1="1" y1="1" x2="11" y2="11" />
              <line x1="11" y1="1" x2="1" y2="11" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {NAV.map((n) => {
            const active = pathname === n.href || pathname.startsWith(n.href + "/");
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex items-center justify-between rounded-xl px-3 py-3.5 text-[15px] tracking-tight transition-colors ${
                  active
                    ? isDark
                      ? "bg-white/10 text-b-ink"
                      : "bg-neutral-100 text-neutral-900"
                    : isDark
                      ? "text-b-ink/60 hover:bg-white/5 hover:text-b-ink"
                      : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                }`}
              >
                {n.label}
                {active && (
                  <span className={`h-1.5 w-1.5 rounded-full ${isDark ? "bg-b-ink" : "bg-neutral-900"}`} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Drawer footer */}
        <div className={`flex-shrink-0 px-5 py-5 border-t ${isDark ? "border-white/10" : "border-black/8"}`}>
          <Link
            href="/shop"
            className={`flex w-full items-center justify-center rounded-full py-3 text-[14px] font-medium tracking-tight ${
              isDark ? "bg-white text-black" : "bg-neutral-900 text-white"
            }`}
          >
            Buy Forth
          </Link>
          <p className={`mt-3 text-center text-[11.5px] tracking-wide ${isDark ? "text-b-mute" : "text-neutral-400"}`}>
            US · USD
          </p>
        </div>
      </aside>
    </>
  );
}