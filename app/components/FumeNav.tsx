"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BRAND } from "../lib/brand";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/technology", label: "Technology" },
  { href: "/about", label: "About" },
];

/**
 * FUME-style top bar for Option B: elegant serif wordmark, centred
 * letter-spaced links, currency/cart at right. Transparent and light over the
 * hero photo, solidifying to warm paper on scroll. Mobile collapses to a simple
 * slide-down sheet.
 */
export function FumeNav() {
  const pathname = usePathname();
  const isHome = pathname === "/option-b";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => setOpen(false), [pathname]);

  const light = !scrolled; // light text over hero
  const barCls = scrolled
    ? "bg-[#F7F4EE]/92 text-[#0F1B2D] shadow-[inset_0_-1px_0_0_rgba(15,27,45,0.08)] backdrop-blur"
    : "bg-transparent text-[#F7F4EE]";

  return (
    <header className={`fixed top-0 z-40 w-full transition-[background-color,color] duration-500 ${barCls}`}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">
        {/* wordmark */}
        <Link
          href="/option-b"
          className="font-cormorant text-[26px] font-medium tracking-[0.14em]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          {BRAND.toUpperCase()}
        </Link>

        {/* centre links */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 text-[12px] uppercase tracking-[0.18em] md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="transition-opacity hover:opacity-60">
              {n.label}
            </Link>
          ))}
        </nav>

        {/* right */}
        <div className="flex items-center gap-5 text-[12px] uppercase tracking-[0.18em]">
          <span className="hidden sm:inline">USD</span>
          <Link href="/shop" className="hidden transition-opacity hover:opacity-60 sm:inline">
            Cart (0)
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="flex h-6 w-6 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span className={`h-px w-5 ${light ? "bg-[#F7F4EE]" : "bg-[#0F1B2D]"}`} />
            <span className={`h-px w-5 ${light ? "bg-[#F7F4EE]" : "bg-[#0F1B2D]"}`} />
          </button>
        </div>
      </div>

      {/* mobile sheet */}
      {open && (
        <div className="border-t border-[#0F1B2D]/10 bg-[#F7F4EE] px-6 py-4 text-[#0F1B2D] md:hidden">
          <nav className="flex flex-col gap-4 text-[13px] uppercase tracking-[0.18em]">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="transition-opacity hover:opacity-60">
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
