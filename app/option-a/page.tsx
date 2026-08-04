import Link from "next/link";
import { Anton } from "next/font/google";

import { BRAND, SPECS, PRESS_QUOTES } from "../lib/brand";
import { VariantToggle } from "../components/VariantToggle";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";
import { HeroDeviceRotator } from "../components/HeroDeviceRotator";
import { ObjectViewToggle } from "../components/ObjectViewToggle";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });

export const metadata = {
  title: `${BRAND} — Option A`,
  description: `${BRAND} is a submersible UV-C sterilizer the size of a marker. Designed and assembled in Scotland.`,
};

/* ————— Display type helper ————— */
const display = "[font-family:var(--font-anton),Impact,sans-serif] uppercase leading-[0.92] tracking-[0.005em]";

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

        </div>
      </section>

      {/* ————— Three moves ————— */}
      <section className="bg-grain bg-a-bg">
        <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-6 py-24 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="text-left">
            <h2 className={`${display} text-[clamp(44px,6vw,80px)]`}>Born of the Highlands</h2>
            <p className="mt-3 font-serif text-[clamp(20px,2.4vw,28px)] italic text-a-ink/75">purified by light, not by luck</p>

            <div className="mt-14 flex flex-col gap-10">
              {[
                { n: "01", t: "Drop", d: "Slip it into any bottle with a neck wider than 25 mm. Loch, burn, hotel tap — no ceremony." },
                { n: "02", t: "Shake", d: "One shake wakes the cycle. Dual UV-C emitters flood the water from every direction." },
                { n: "03", t: "Drink", d: "Sixty seconds later the light goes out and the water is yours. No taste, no chemicals." },
              ].map((s) => (
                <div key={s.n} className="flex items-start gap-5">
                  <span className="mt-1 font-mono text-[12px] tracking-[0.25em] text-a-ink/50">{s.n}</span>
                  <div>
                    <h3 className={`${display} text-[30px]`}>{s.t}</h3>
                    <p className="mt-2 max-w-[460px] font-serif text-[17px] leading-relaxed text-a-ink/75">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <HeroDeviceRotator alt={`The ${BRAND} device, rotating`} />
          </div>
        </div>
      </section>

      {/* ————— Waterfall divider ————— */}
      <section
        className="h-[48vh] min-h-[340px] bg-cover bg-center"
        style={{ backgroundImage: "url(/photos/waterfall-divider.jpg)" }}
        aria-label="A cascading burn in the Highlands"
      />

      {/* ————— The claim ————— */}
      <section className="bg-[#22333E] text-[#EAF1F2]">
        <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-6 py-28 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
            <ObjectViewToggle />
          </div>

          <div className="order-1 text-left lg:order-2">
            <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-[#EAF1F2]/60">the technology</p>
            <h2 className={`${display} mt-4 text-[clamp(44px,6vw,84px)]`}>265 nm of pure light</h2>
            <p className="mt-5 max-w-[520px] font-serif text-[clamp(19px,2.2vw,25px)] italic text-[#EAF1F2]/80">
              the wavelength microbial DNA cannot survive
            </p>

            <div className="mt-12 grid max-w-[640px] gap-5 sm:grid-cols-3">
              {[
                { k: "99.9%", v: "bacteria, viruses & protozoa" },
                { k: "60 sec", v: "standard cycle, one shake" },
                { k: "30", v: "cycles per induction charge" },
              ].map((s) => (
                <div key={s.k} className="rounded-2xl bg-white/5 px-5 py-6 ring-1 ring-white/10">
                  <div className={`${display} text-[34px]`}>{s.k}</div>
                  <div className="mt-2 font-serif text-[14px] italic text-[#EAF1F2]/70">{s.v}</div>
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
        </div>
      </section>

      {/* ————— Scotland story: moor panorama ————— */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/photos/moor-story.jpg)" }} />
        <div className="absolute inset-0 bg-[#0F1B2D]/45" />
        <div className="relative mx-auto flex min-h-[64vh] max-w-[860px] flex-col items-center justify-center px-6 py-24 text-center text-[#F2EFE8]">
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
