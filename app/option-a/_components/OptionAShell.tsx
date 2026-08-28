"use client";

import Link from "next/link";
import { Anton } from "next/font/google";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { BRAND } from "../../lib/brand";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });

import { display } from "./display";

const NAV = [
  { href: "/option-a/shop", label: "Shop" },
  { href: "/option-a/how-it-works", label: "How It Works" },
  { href: "/option-a/technology", label: "Technology" },
  { href: "/option-a/compare", label: "Compare" },
  { href: "/option-a/about", label: "About" },
  { href: "/option-a/help", label: "Help" },
];

export function OptionANav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-30 w-full backdrop-blur transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "bg-a-bg/85 shadow-[inset_0_-1px_0_0_rgba(15,27,45,0.08)]" : "bg-transparent"
      } text-a-ink`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="block h-px w-5 bg-a-ink" />
            <span className="block h-px w-5 bg-a-ink" />
            <span className="block h-px w-5 bg-a-ink" />
          </button>
          <Link href="/option-a" className={`${display} text-[22px] tracking-[0.04em]`} aria-label={BRAND}>
            {BRAND}
          </Link>
        </div>

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
                {active && <span className="absolute -bottom-[18px] left-0 right-0 h-px bg-a-ink" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 text-[12.5px]">
          <span className="hidden rounded-full px-2 py-1 ring-1 ring-a-ink/10 sm:inline">US · USD</span>
          <Link href="/option-a/shop" className="rounded-full bg-a-ink px-3.5 py-1.5 text-a-bg">
            Buy
          </Link>
        </div>
      </div>

      {/* mobile sheet */}
      {open && (
        <nav className="border-t border-a-ink/10 bg-a-bg px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-[14px] tracking-tight">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="transition-opacity hover:opacity-60">
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export function OptionAFooter() {
  return (
    <footer className="bg-[#0F1B2D] text-[#EAF1F2]">
      <div className="mx-auto max-w-[1240px] px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className={`${display} text-[28px]`}>{BRAND}</div>
            <p className="mt-4 max-w-sm font-serif text-[15px] italic leading-relaxed text-[#EAF1F2]/70">
              A submersible UV-C water sterilizer. Drops into any bottle and disinfects in sixty
              seconds. Designed and assembled in Scotland.
            </p>
          </div>
          {[
            {
              title: "Product",
              items: [
                { href: "/option-a/shop", label: "Shop" },
                { href: "/option-a/compare", label: "Compare" },
                { href: "/option-a/help", label: "Help & FAQ" },
              ],
            },
            {
              title: "Learn",
              items: [
                { href: "/option-a/how-it-works", label: "How It Works" },
                { href: "/option-a/technology", label: "The Technology" },
              ],
            },
            {
              title: "Company",
              items: [
                { href: "/option-a/about", label: "About" },
                { href: "/option-a/about", label: "Contact" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <div className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#EAF1F2]/50">
                {col.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((it, i) => (
                  <li key={`${col.title}-${i}`}>
                    <Link href={it.href} className="text-[13.5px] hover:opacity-60">
                      {it.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-[#EAF1F2]/45">
          <div>© {new Date().getFullYear()} {BRAND}, Ltd · Patent-pending</div>
          <div className="flex gap-5">
            <Link href="#" className="hover:opacity-60">Terms</Link>
            <Link href="#" className="hover:opacity-60">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** Page chrome for every Option A subpage: nav and footer. */
export function OptionAShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${anton.variable} bg-a-bg text-a-ink`}>
      <OptionANav />
      {children}
      <OptionAFooter />
    </div>
  );
}
