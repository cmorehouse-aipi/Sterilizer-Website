import Link from "next/link";
import { Anton } from "next/font/google";

import { BRAND, SPECS, PRESS_QUOTES } from "../lib/brand";
import { VariantToggle } from "../components/VariantToggle";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });

export const metadata = {
  title: `${BRAND} — Option A`,
  description: `${BRAND} is a submersible UV-C sterilizer the size of a marker. Designed and assembled in Scotland.`,
};

/* ————— Display type helper ————— */
const display = "[font-family:var(--font-anton),Impact,sans-serif] uppercase leading-[0.92] tracking-[0.005em]";

/* ————— Generated loch-at-dusk scene (original SVG artwork) ————— */
function LochDusk({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden>
      <defs>
        <linearGradient id="ld-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DCE7E8" />
          <stop offset="0.45" stopColor="#B9CDD1" />
          <stop offset="0.72" stopColor="#7E9AA6" />
          <stop offset="1" stopColor="#54707F" />
        </linearGradient>
        <linearGradient id="ld-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5E7C8A" />
          <stop offset="1" stopColor="#22333E" />
        </linearGradient>
        <linearGradient id="ld-mist" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DCE7E8" stopOpacity="0" />
          <stop offset="1" stopColor="#DCE7E8" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <rect width="800" height="380" fill="url(#ld-sky)" />
      {/* far ridge */}
      <path d="M0 250 L90 200 L170 245 L260 175 L350 240 L430 195 L520 250 L610 185 L700 240 L800 205 L800 380 L0 380 Z" fill="#8FA6AC" />
      {/* mid ridge */}
      <path d="M0 300 L110 240 L210 295 L330 225 L450 300 L560 250 L670 305 L800 255 L800 380 L0 380 Z" fill="#5F7A85" />
      {/* mist band */}
      <rect y="285" width="800" height="95" fill="url(#ld-mist)" />
      {/* near headland */}
      <path d="M0 355 L140 305 L300 360 L470 315 L640 365 L800 330 L800 380 L0 380 Z" fill="#37505C" />
      {/* loch */}
      <rect y="380" width="800" height="220" fill="url(#ld-water)" />
      {/* reflections */}
      <g stroke="#C9D8DB" strokeWidth="2" opacity="0.35">
        <line x1="120" y1="415" x2="290" y2="415" />
        <line x1="420" y1="440" x2="620" y2="440" />
        <line x1="60" y1="475" x2="210" y2="475" />
        <line x1="500" y1="500" x2="700" y2="500" />
        <line x1="220" y1="535" x2="430" y2="535" />
      </g>
      <g stroke="#0F1B2D" strokeWidth="3" opacity="0.25">
        <line x1="180" y1="430" x2="340" y2="430" />
        <line x1="460" y1="465" x2="640" y2="465" />
        <line x1="90" y1="520" x2="260" y2="520" />
      </g>
    </svg>
  );
}

/* ————— Marquee ticker ————— */
function Ticker({ items, dark = true }: { items: string[]; dark?: boolean }) {
  const row = (
    <span className="flex shrink-0 items-center">
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="whitespace-nowrap px-6">{t}</span>
          <span aria-hidden className="text-[0.7em] opacity-60">✦</span>
        </span>
      ))}
    </span>
  );
  return (
    <div className={`overflow-hidden py-2.5 ${dark ? "bg-a-ink text-a-bg" : "bg-a-bg text-a-ink"}`}>
      <div className="animate-ticker flex w-max">
        {row}{row}{row}{row}
      </div>
    </div>
  );
}

export default function OptionA() {
  return (
    <div className={`${anton.variable} bg-a-bg text-a-ink`}>
      {/* ————— Announcement ticker ————— */}
      <div className={`${display} text-[13px] tracking-[0.08em]`}>
        <Ticker
          items={[
            `${BRAND} — clean water, in any bottle, in seconds`,
            "Designed in Scotland",
            "99.9% of bacteria, viruses & protozoa",
            "Sixty-second cycle",
          ]}
        />
      </div>

      <SiteNav tone="light" />

      {/* ————— Hero: full-bleed Storr scene ————— */}
      <section className="relative overflow-hidden">
        {/* single continuous backdrop — no seams */}
        <div
          className="absolute inset-0 bg-cover bg-[position:center_30%]"
          style={{ backgroundImage: "url(/photos/storr-hero.jpg)" }}
        />
        {/* soft scrim behind the headline zone for legibility */}
        <div className="absolute inset-x-0 top-0 h-[55%] bg-[linear-gradient(to_bottom,#EAF1F2b3_0%,#EAF1F266_45%,transparent_100%)]" />
        {/* gentle darkening at the very bottom so the device reads */}
        <div className="absolute inset-x-0 bottom-0 h-[22%] bg-[linear-gradient(to_top,#0F1B2D59,transparent)]" />

        <div className="relative mx-auto flex min-h-[92svh] max-w-[1240px] flex-col items-center px-6 pt-10 text-center">
          <p className="font-serif text-[17px] italic tracking-wide text-a-ink/70">the water is fine —</p>
          <h1 className={`${display} mt-3 text-[19vw] leading-[0.88] sm:text-[13vw] lg:text-[150px]`}>
            Any water.
            <br />
            Any bottle.
          </h1>
          <p className="mt-5 font-serif text-[clamp(19px,2.4vw,27px)] italic text-a-ink/80">
            from loch to lips, in sixty seconds
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-a-ink px-7 py-3.5 text-[14px] font-semibold tracking-wide text-a-bg transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Reserve yours — from $39
            </Link>
            <Link
              href="/how-it-works"
              className="rounded-full bg-white/70 px-7 py-3.5 text-[14px] font-semibold tracking-wide ring-1 ring-a-ink/15 backdrop-blur transition hover:bg-white"
            >
              How it works
            </Link>
          </div>

          {/* device floating over the loch */}
          <div className="relative mt-4 flex w-full flex-1 items-end justify-center">
            <div className="absolute bottom-6 h-10 w-56 rounded-full bg-[#0F1B2D]/30 blur-2xl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/renderings/forth-device-hero.png"
              alt={`The ${BRAND} device`}
              className="relative z-10 w-[190px] max-w-[42vw] drop-shadow-[0_30px_50px_rgba(15,27,45,0.45)] sm:w-[230px]"
            />
          </div>
        </div>
      </section>

      {/* ————— Three moves ————— */}
      <section className="bg-grain bg-a-bg">
        <div className="mx-auto max-w-[1240px] px-6 py-24 text-center">
          <h2 className={`${display} text-[clamp(44px,7vw,86px)]`}>Born of the Highlands</h2>
          <p className="mt-3 font-serif text-[clamp(20px,2.6vw,30px)] italic text-a-ink/75">purified by light, not by luck</p>

          <div className="mt-16 grid gap-12 sm:grid-cols-3">
            {[
              { n: "01", t: "Drop", d: "Slip it into any bottle with a neck wider than 25 mm. Loch, burn, hotel tap — no ceremony." },
              { n: "02", t: "Shake", d: "One shake wakes the cycle. Dual UV-C emitters flood the water from every direction." },
              { n: "03", t: "Drink", d: "Sixty seconds later the light goes out and the water is yours. No taste, no chemicals." },
            ].map((s) => (
              <div key={s.n} className="flex flex-col items-center">
                <span className="font-mono text-[12px] tracking-[0.25em] text-a-ink/50">{s.n}</span>
                <h3 className={`${display} mt-2 text-[34px]`}>{s.t}</h3>
                <p className="mt-3 max-w-[300px] font-serif text-[17px] leading-relaxed text-a-ink/75">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Photo triptych ————— */}
      <section className="grid h-[52vh] min-h-[380px] grid-cols-1 sm:grid-cols-3">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/photos/waterfall.jpg)" }} />
        </div>
        <div className="relative hidden overflow-hidden sm:block">
          <LochDusk className="absolute inset-0 h-full w-full" />
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-[position:70%_35%]" style={{ backgroundImage: "url(/photos/rocky-peaks.jpg)" }} />
        </div>
      </section>

      {/* ————— The claim ————— */}
      <section className="bg-[#22333E] text-[#EAF1F2]">
        <div className="mx-auto max-w-[1240px] px-6 py-28 text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-[#EAF1F2]/60">the technology</p>
          <h2 className={`${display} mt-4 text-[clamp(46px,8vw,110px)]`}>265 nm of pure light</h2>
          <p className="mx-auto mt-5 max-w-[560px] font-serif text-[clamp(19px,2.4vw,26px)] italic text-[#EAF1F2]/80">
            the wavelength microbial DNA cannot survive
          </p>

          <div className="mx-auto mt-14 grid max-w-[760px] gap-6 sm:grid-cols-3">
            {[
              { k: "99.9%", v: "bacteria, viruses & protozoa" },
              { k: "60 sec", v: "standard cycle, one shake" },
              { k: "30", v: "cycles per induction charge" },
            ].map((s) => (
              <div key={s.k} className="rounded-2xl bg-white/5 px-6 py-8 ring-1 ring-white/10">
                <div className={`${display} text-[40px]`}>{s.k}</div>
                <div className="mt-2 font-serif text-[15px] italic text-[#EAF1F2]/70">{s.v}</div>
              </div>
            ))}
          </div>

          <Link
            href="/technology"
            className="mt-12 inline-block rounded-full bg-[#EAF1F2] px-7 py-3.5 text-[14px] font-semibold tracking-wide text-[#22333E] transition hover:-translate-y-0.5"
          >
            Read the technology page
          </Link>
        </div>
      </section>

      {/* ————— Colour fields ————— */}
      <section className="bg-a-bg">
        <div className="mx-auto max-w-[1240px] px-6 pt-24 text-center">
          <h2 className={`${display} text-[clamp(44px,7vw,86px)]`}>Pick your colour</h2>
          <p className="mt-3 font-serif text-[clamp(19px,2.4vw,27px)] italic text-a-ink/75">one instrument, three moods</p>
        </div>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3">
          {[
            { name: "Midnight", bg: "#C7D4D6", img: "/renderings/forth-device-hero.png" },
            { name: "Sage", bg: "#DCE4D7", img: "/renderings/forth-device-sage-hero.png" },
            { name: "Sun", bg: "#F0E3BC", img: "/renderings/forth-device-sun-hero.png" },
          ].map((c) => (
            <div key={c.name} className="relative flex flex-col items-center px-6 pb-14 pt-12" style={{ backgroundColor: c.bg }}>
              <span className="font-mono text-[12px] uppercase tracking-[0.3em] text-a-ink/60">{c.name}</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.img}
                alt={`${BRAND} in ${c.name}`}
                className="mt-6 w-[150px] drop-shadow-[0_24px_36px_rgba(15,27,45,0.35)] transition duration-300 hover:-translate-y-2 sm:w-[170px]"
              />
              <div className={`${display} mt-8 text-[26px]`}>From $39</div>
              <Link
                href="/shop"
                className="mt-4 rounded-full bg-a-ink px-6 py-3 text-[13px] font-semibold tracking-wide text-a-bg transition hover:-translate-y-0.5"
              >
                Reserve {c.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ————— Press ticker ————— */}
      <div className="border-y border-a-ink/10 bg-a-bg font-serif text-[16px] italic text-a-ink/80">
        <Ticker dark={false} items={PRESS_QUOTES.map((q) => `“${q.text}” — ${q.source}`)} />
      </div>

      {/* ————— Scotland story ————— */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/photos/waterfall.jpg)" }} />
        <div className="absolute inset-0 bg-[#0F1B2D]/55" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-[860px] flex-col items-center justify-center px-6 py-28 text-center text-[#F2EFE8]">
          <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-[#F2EFE8]/70">designed in the heart of Scotland</p>
          <p className="mt-6 font-serif text-[clamp(24px,3.4vw,38px)] italic leading-snug">
            Engineered and assembled in a workshop above the Firth of Forth. The first water it ever cleaned came out of a
            Highland burn.
          </p>
          <Link
            href="/about"
            className="mt-10 rounded-full bg-[#F2EFE8] px-7 py-3.5 text-[14px] font-semibold tracking-wide text-[#0F1B2D] transition hover:-translate-y-0.5"
          >
            Our story
          </Link>
        </div>
      </section>

      {/* ————— Footer CTA ————— */}
      <section className="bg-grain bg-a-bg">
        <div className="mx-auto max-w-[860px] px-6 py-24 text-center">
          <h2 className={`${display} text-[clamp(40px,6.4vw,76px)]`}>First to know when it ships</h2>
          <p className="mt-4 font-serif text-[18px] italic text-a-ink/70">
            {SPECS.size} · {SPECS.weight} · {SPECS.rating} — early access opens soon
          </p>
          <form className="mx-auto mt-9 flex max-w-[440px] items-center gap-2">
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-full border border-a-ink/20 bg-white px-5 py-3.5 text-[14px] outline-none placeholder:text-a-ink/40 focus:border-a-ink/50"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-a-ink px-6 py-3.5 text-[14px] font-semibold text-a-bg transition hover:-translate-y-0.5"
            >
              Notify me
            </button>
          </form>
        </div>
      </section>

      <SiteFooter />
      <VariantToggle active="a" tone="light" />
    </div>
  );
}
