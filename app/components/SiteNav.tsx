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

  useEffect(() => {
    if (!isHome) { setScrolled(true); return; }
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
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
        <Link href="/" className="flex items-center" aria-label={BRAND}>
          <HorizontalDeviceMark name={BRAND} className="h-7 w-auto" />
        </Link>
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
  );
}