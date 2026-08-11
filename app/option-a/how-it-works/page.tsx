import Link from "next/link";

import { BRAND, SPECS } from "../../lib/brand";
import { ProductAnimation } from "../../components/ProductAnimation";
import { OptionAShell } from "../_components/OptionAShell";
import { display } from "../_components/display";

export const metadata = { title: `How It Works — ${BRAND} · Option A` };

const STEPS = [
  {
    n: "01",
    h: "Drop",
    b: "The 87 × 22 mm cylinder fits any bottle with a neck wider than 25 mm — the standard Nalgene, Hydro Flask wide-mouth, Owala, Yeti Rambler, most stainless and glass bottles, and many hotel-room glasses.",
  },
  {
    n: "02",
    h: "Shake",
    b: "An accelerometer detects the shake and fires the standard sixty-second cycle. The device pulses blue while running. No buttons, no ports, no app required for the basic cycle.",
  },
  {
    n: "03",
    h: "Drink",
    b: "Twin geodesic emitters refract 265 nm UV-C across twelve faces of the bottle — multi-directional dose with no shadowed water. ≥ 99.9% reduction of bacteria, viruses, and protozoa.",
  },
  {
    n: "04",
    h: "Charge",
    b: "Drop the device on the magnetic base between uses. There is no charging port — there is no way for water to get in. A full charge is good for about thirty cycles.",
  },
];

export default function OptionAHowItWorks() {
  return (
    <OptionAShell>
      {/* ————— Header ————— */}
      <section className="bg-grain bg-a-bg">
        <div className="mx-auto max-w-[1240px] px-6 pb-16 pt-20 text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-a-ink/50">how it works</p>
          <h1 className={`${display} mt-4 text-[clamp(44px,6.6vw,88px)]`}>
            Drop. Shake. Drink.
          </h1>
          <p className="mt-3 font-serif text-[clamp(19px,2.4vw,27px)] italic text-a-ink/75">
            three motions, sixty seconds, no mystery
          </p>
        </div>
      </section>

      {/* ————— Steps + film ————— */}
      <section className="bg-grain bg-a-bg">
        <div className="mx-auto grid max-w-[1240px] items-start gap-14 px-6 pb-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col gap-10">
            {STEPS.map((s) => (
              <div key={s.n} className="flex items-start gap-5">
                <span className="mt-1 font-mono text-[12px] tracking-[0.25em] text-a-ink/50">{s.n}</span>
                <div>
                  <h2 className={`${display} text-[34px]`}>{s.h}</h2>
                  <p className="mt-2 max-w-[520px] font-serif text-[17px] leading-relaxed text-a-ink/75">{s.b}</p>
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-2xl bg-white/50 p-6 ring-1 ring-a-ink/10">
              <ProductAnimation />
              <dl className="mt-6 space-y-2.5 text-[13.5px]">
                {Object.entries(SPECS).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-t border-a-ink/5 pt-2 first:border-0 first:pt-0">
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-a-ink/45">{k}</dt>
                    <dd className="text-right text-a-ink/85">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      {/* ————— Honesty band on the moor ————— */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/photos/moor-story.jpg)" }} />
        <div className="absolute inset-0 bg-[#0F1B2D]/45" />
        <div className="relative mx-auto flex min-h-[56vh] max-w-[860px] flex-col items-center justify-center px-6 py-24 text-center text-[#F2EFE8]">
          <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-[#F2EFE8]/70">what it doesn&rsquo;t do</p>
          <p className="mt-6 font-serif text-[clamp(22px,3vw,34px)] italic leading-snug">
            UV-C disinfects — it doesn&rsquo;t filter. {BRAND} won&rsquo;t remove sediment, heavy metals, or
            PFAS. For cloudy or chemically contaminated water, pair it with a sediment filter. We build
            trust by being clear about this.
          </p>
          <Link
            href="/option-a/technology"
            className="mt-10 rounded-full bg-[#F2EFE8] px-7 py-3.5 text-[14px] font-semibold tracking-wide text-[#0F1B2D] transition hover:-translate-y-0.5"
          >
            Read the technology page
          </Link>
        </div>
      </section>

      {/* ————— CTA ————— */}
      <section className="bg-[#22333E] text-[#EAF1F2]">
        <div className="mx-auto max-w-[760px] px-6 py-20 text-center">
          <h2 className={`${display} text-[clamp(30px,5vw,58px)]`}>Ready when you are</h2>
          <p className="mx-auto mt-4 max-w-[480px] font-serif text-[clamp(17px,2.2vw,22px)] italic text-[#EAF1F2]/80">
            from loch to sip, in sixty seconds
          </p>
          <Link
            href="/option-a/shop"
            className="mt-8 inline-block rounded-full bg-[#C7D4D6] px-8 py-4 text-[14px] font-bold uppercase tracking-wide text-[#22333E] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#d6e0e1]"
          >
            Reserve yours — from $79
          </Link>
        </div>
      </section>
    </OptionAShell>
  );
}
