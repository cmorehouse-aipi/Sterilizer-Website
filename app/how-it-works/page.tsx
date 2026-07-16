import Link from "next/link";
import { PageShell, Eyebrow, H1, Lead } from "../components/PageShell";
import { ProductAnimation } from "../components/ProductAnimation";
import { SPECS, BRAND } from "../lib/brand";

export const metadata = { title: "How It Works — Forth" };

const STEPS = [
  {
    n: "01",
    h: "Drop it in",
    b: "The 87 × 22 mm cylinder fits any bottle with a neck wider than 25 mm. That includes the standard Nalgene, Hydro Flask wide-mouth, Owala, Yeti Rambler, most stainless and glass bottles, and many hotel-room glasses.",
    icon: (
      <svg aria-hidden width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="18" y="1" width="12" height="26" rx="6"/>
        <line x1="24" y1="29" x2="24" y2="33" strokeDasharray="2.5 2"/>
        <line x1="13" y1="35" x2="35" y2="35"/>
        <line x1="17" y1="35" x2="17" y2="45"/>
        <line x1="31" y1="35" x2="31" y2="45"/>
      </svg>
    ),
  },
  {
    n: "02",
    h: "Shake to start",
    b: "An accelerometer detects the shake gesture and fires the standard 60-second cycle. The device pulses blue while running. No buttons, no ports, no apps required for the basic cycle.",
    icon: (
      <svg aria-hidden width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 4h8v10l6 5v24q0 3-3 3H17q-3 0-3-3V19l6-5V4z"/>
        <rect x="21" y="20" width="6" height="20" rx="3"/>
        <path d="M10 22 C7 26 7 32 10 36" strokeOpacity="0.55"/>
        <path d="M7 19 C4 24 4 34 7 39" strokeOpacity="0.25"/>
        <path d="M38 22 C41 26 41 32 38 36" strokeOpacity="0.55"/>
        <path d="M41 19 C44 24 44 34 41 39" strokeOpacity="0.25"/>
      </svg>
    ),
  },
  {
    n: "03",
    h: "Drink",
    b: "Twin geodesic emitters refract 265 nm UV-C across twelve faces of the bottle. The result is multi-directional dose with no shadowed water. ≥ 99.9% reduction of bacteria, viruses, and protozoa.",
    icon: (
      <svg aria-hidden width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 7C24 7 11 22 11 31c0 7.2 5.9 12 13 12s13-4.8 13-12c0-9-13-24-13-24Z"/>
        <polyline points="18,31 22,35 31,25"/>
      </svg>
    ),
  },
  {
    n: "04",
    h: "Charge by induction",
    b: "Drop the device on the magnetic base when you're not using it. There is no charging port — there is no way for water to get in. A full charge gives you about 30 cycles.",
    icon: (
      <svg aria-hidden width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Charging base */}
        <ellipse cx="24" cy="42" rx="13" ry="3"/>
        {/* Device — horizontal capsule */}
        <rect x="4" y="18" width="40" height="14" rx="7"/>
        {/* Charging contact — recessed arc at bottom center of shell */}
        <path d="M20 32 A 4 2 0 0 1 28 32"/>
        {/* Induction field arcs in the gap between base and device */}
        <path d="M18 39 C13 36 13 34 18 32" strokeOpacity="0.45"/>
        <path d="M30 39 C35 36 35 34 30 32" strokeOpacity="0.45"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <PageShell>
      <header>
        <Eyebrow>How it works</Eyebrow>
        <H1>Three motions. Sixty seconds. No mystery.</H1>
        <Lead>
          The product is technical. The interface is not. Drop {BRAND} into your bottle, give it a shake, and drink. Everything else is doing its job inside the dome.
        </Lead>
      </header>

      <section className="grid grid-cols-12 gap-10">
        <div className="col-span-12 md:col-span-7 space-y-0 divide-y divide-a-rule">
          {STEPS.map((s) => (
            <div key={s.n} className="py-10 first:pt-0">
              <div className="relative">
                {/* Ghosted numeral */}
                <div className="pointer-events-none absolute -top-2 left-0 select-none font-serif text-[96px] leading-none tracking-tighter text-neutral-900/[0.06]">
                  {s.n}
                </div>
                <div className="relative">
                  <div className="text-a-ink/45">{s.icon}</div>
                  <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-a-ink/55">Step {s.n}</div>
                  <h2 className="mt-2 font-serif text-[32px] leading-tight tracking-tight md:text-[38px]">{s.h}</h2>
                  <p className="mt-3 max-w-xl text-[16px] leading-[1.65] text-neutral-600">{s.b}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="col-span-12 md:col-span-5">
          <div className="sticky top-24 rounded-3xl bg-white/60 p-8 ring-1 ring-black/5">
            {/* The drop/shake/drink/charge film plays in this sticky card,
                staying alongside the steps as you scroll — per the approved
                consolidated build. */}
            <ProductAnimation />
            <dl className="mt-6 space-y-3 text-[13.5px]">
              {Object.entries(SPECS).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-t border-black/5 pt-2 first:border-0 first:pt-0">
                  <dt className="capitalize text-neutral-400">{k}</dt>
                  <dd className="text-right text-neutral-800">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </section>

      <section className="mt-20 rounded-3xl bg-white/60 p-10 ring-1 ring-black/5">
        <Eyebrow>Honesty section</Eyebrow>
        <h2 className="mt-3 font-serif text-[36px] leading-tight tracking-tight">What it doesn&apos;t do.</h2>
        <p className="mt-4 max-w-2xl text-[16px] leading-[1.65] text-neutral-600">
          UV-C disinfects — it doesn&apos;t filter. Forth will not remove sediment, heavy metals, PFAS, or chlorine. For visibly cloudy or chemically contaminated water, pair Forth with a sediment filter. We build trust by being clear about this.
        </p>
        <Link href="/technology" className="mt-6 inline-block text-[14px] underline-offset-4 hover:underline">
          Read the full technology page →
        </Link>
      </section>
    </PageShell>
  );
}