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
 * FUME-style top bar for Option B. The announcement strip sits ABOVE the nav
 * and both are fixed. The nav itself is transparent; its text colour adapts to
 * whatever section is currently underneath it — sections marked with
 * [data-nav-dark] flip the text to light.
 */
export function FumeNav() {
  const pathname = usePathname();
  const [dark, setDark] = useState(true); // is the background under the nav dark?
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sample = () => {
      const y = 78; // viewport y of the nav row's midline (below the announcement bar)
      let isDark = false;
      document.querySelectorAll("[data-nav-dark]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom >= y) isDark = true;
      });
      setDark(isDark);
    };
    sample();
    window.addEventListener("scroll", sample, { passive: true });
    window.addEventListener("resize", sample);
    return () => {
      window.removeEventListener("scroll", sample);
      window.removeEventListener("resize", sample);
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const ink = dark ? "text-[#F7F4EE]" : "text-[#0F1B2D]";
  const line = dark ? "bg-[#F7F4EE]" : "bg-[#0F1B2D]";

  return (
    <header className="fixed top-0 z-40 w-full">
      {/* persistent announcement bar — above the nav */}
      <div className="bg-[#0F1B2D]/90 py-2 text-center text-[10px] uppercase tracking-[0.24em] text-[#F7F4EE]/90 backdrop-blur">
        Founding batch — early access now open
      </div>

      <div className={`transition-colors duration-500 ${ink}`}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">
          {/* wordmark */}
          <Link
            href="/option-b"
            className="text-[26px] font-medium tracking-[0.14em]"
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
              <span className={`h-px w-5 ${line}`} />
              <span className={`h-px w-5 ${line}`} />
            </button>
          </div>
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
