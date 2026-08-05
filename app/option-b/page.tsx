import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";

import { BRAND, PRESS_QUOTES, USE_CASES } from "../lib/brand";
import { VariantToggle } from "../components/VariantToggle";
import { FumeNav } from "../components/FumeNav";
import { ObjectViewToggle } from "../components/ObjectViewToggle";
import { HeroDeviceRotator } from "../components/HeroDeviceRotator";
import { ProductAnimation } from "../components/ProductAnimation";
import { UseCaseIcon } from "../components/UseCaseIcons";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

export const metadata = {
  title: `${BRAND} — Option B`,
  description: `${BRAND} is a submersible UV-C sterilizer the size of a marker. Designed and assembled in Scotland.`,
};

/* elegant editorial serif — the voice of Option B */
const serif = "[font-family:var(--font-cormorant),Georgia,serif]";

/* ● micro-label used throughout, FUME-style */
function Eyebrow({ children, tone = "ink" }: { children: React.ReactNode; tone?: "ink" | "light" }) {
  const c = tone === "light" ? "text-[#F7F4EE]/70" : "text-[#0F1B2D]/55";
  return (
    <span className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] ${c}`}>
      <span className="text-[7px] leading-none">●</span>
      {children}
    </span>
  );
}

export default function OptionB() {
  return (
    <div className={`${cormorant.variable} bg-[#F7F4EE] text-[#0F1B2D]`}>
      <FumeNav />

      {/* ————— Hero: full-bleed cinematic ————— */}
      <section data-nav-dark className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-[position:center_35%]"
          style={{ backgroundImage: "url(/photos/storr-hero.jpg)" }}
        />
        {/* cool wash to unify with the palette + legibility */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0F1B2D66_0%,#0F1B2D22_35%,#0F1B2D88_100%)]" />

        {/* bottom-left statement */}
        <div className="absolute bottom-14 left-6 max-w-[560px] lg:left-10">
          <h1 className={`${serif} text-[clamp(40px,6vw,80px)] font-light leading-[1.02] tracking-[0.01em] text-[#F7F4EE]`}>
            Any water,
            <br />
            any bottle.
          </h1>
        </div>

        {/* rotating device — position/size driven by the tuner sliders */}
        <div
          className="absolute hidden -translate-x-1/2 -translate-y-1/2 lg:block"
          style={{ left: "50%", top: "51%" }}
        >
          <HeroDeviceRotator alt={`The ${BRAND} device, rotating`} heightClass="h-[480px]" />
        </div>

        {/* right CTA box */}
        <div className="absolute bottom-14 right-6 lg:right-10">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 border border-[#F7F4EE]/50 px-7 py-4 text-[12px] uppercase tracking-[0.2em] text-[#F7F4EE] transition hover:bg-[#F7F4EE] hover:text-[#0F1B2D]"
          >
            Discover Forth <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* ————— Technology — dark editorial ————— */}
      <section data-nav-dark className="bg-[#22333E] text-[#EAF1F2]">
        <div className="mx-auto grid max-w-[1240px] items-center gap-16 px-6 py-28 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
          <div className="flex justify-center lg:justify-start">
            <ObjectViewToggle defaultView="internal" swapButtons />
          </div>
          <div>
            <Eyebrow tone="light">The technology</Eyebrow>
            <h2 className={`${serif} mt-5 text-[clamp(38px,5vw,72px)] font-light leading-[1.02]`}>Purified by light</h2>
            <p className="mt-6 max-w-[440px] text-[15px] leading-relaxed text-[#EAF1F2]/75">
              Emission at 265 nanometres — the wavelength microbial DNA cannot survive. Twin geodesic emitters reach every
              face of the bottle: no shadowed water, no missed surface.
            </p>

            <div className="mt-12 grid max-w-[520px] grid-cols-3 gap-8 border-t border-white/15 pt-8">
              {[
                { k: "99.9%", v: "bacteria, viruses & protozoa" },
                { k: "60 s", v: "standard cycle" },
                { k: "30", v: "cycles per charge" },
              ].map((s) => (
                <div key={s.k}>
                  <div className={`${serif} text-[34px] font-light`}>{s.k}</div>
                  <div className="mt-1 text-[12px] leading-snug text-[#EAF1F2]/60">{s.v}</div>
                </div>
              ))}
            </div>

            <Link
              href="/technology"
              className="mt-12 inline-flex items-center gap-3 border border-white/40 px-7 py-3.5 text-[12px] uppercase tracking-[0.2em] transition hover:bg-[#EAF1F2] hover:text-[#22333E]"
            >
              Read the science <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ————— Poured by you — animation + stacked steps ————— */}
      <section className="mx-auto max-w-[1240px] px-6 py-28 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <Eyebrow>Born of the Highlands</Eyebrow>
          <h2 className={`${serif} text-[clamp(34px,4.4vw,58px)] font-light leading-[1.06]`}>
            Poured by you, purified by light.
          </h2>
        </div>

        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[1fr_1fr]">
          {/* device usage animation, from the How It Works page */}
          <div className="overflow-hidden rounded-sm border border-[#0F1B2D]/10">
            <ProductAnimation />
          </div>

          {/* steps, stacked */}
          <div className="flex flex-col">
            {[
              { n: "01", t: "Drop", d: "Slip it into any bottle with a neck wider than 25 mm. Loch, fountain, hotel tap — no worries." },
              { n: "02", t: "Shake", d: "One shake wakes the cycle. Dual UV-C emitters flood the water from every direction." },
              { n: "03", t: "Drink", d: "Sixty seconds later the light goes out and the water is yours. Pure as the untouched highlands." },
            ].map((s) => (
              <div key={s.n} className="flex items-start gap-8 border-t border-[#0F1B2D]/10 py-9 last:pb-0">
                <div className={`${serif} text-[38px] font-light leading-none text-[#0F1B2D]/35`}>{s.n}</div>
                <div>
                  <h3 className="text-[13px] uppercase tracking-[0.22em]">{s.t}</h3>
                  <p className="mt-3 max-w-[440px] text-[15px] leading-relaxed text-[#0F1B2D]/70">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Split panels: the Highlands / the instrument ————— */}
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="group relative h-[70vh] min-h-[440px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-[position:center_45%] transition-transform duration-[1200ms] group-hover:scale-[1.05]"
            style={{ backgroundImage: "url(/photos/waterfall-divider.jpg)" }}
          />
          <div className="absolute inset-0 bg-[#0F1B2D]/15" />
          {/* soft top scrim for label legibility */}
          <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,#0F1B2D59,transparent)]" />
          <div className="absolute inset-x-0 top-0 flex flex-col items-center pt-10 text-center">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[#F7F4EE] [text-shadow:0_1px_12px_rgba(15,27,45,0.85)]">
              <span className="text-[7px] leading-none">●</span>
              The Source
            </span>
          </div>
        </div>

        <div className="group relative flex h-[70vh] min-h-[440px] flex-col items-center justify-center overflow-hidden bg-[#C7D4D6]">
          <HeroDeviceRotator alt={`The ${BRAND} device, rotating`} heightClass="h-[42vh] min-h-[280px]" />
          <div className="absolute inset-x-0 top-0 flex flex-col items-center pt-10 text-center">
            <Eyebrow>The instrument</Eyebrow>
          </div>
        </div>
      </section>

      {/* ————— Break — matches the breathing room above the split panels ————— */}
      <div aria-hidden className="h-[233px] bg-[#F7F4EE]" />

      {/* ————— Cinematic quote band ————— */}
      <section data-nav-dark className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-[position:center_60%]" style={{ backgroundImage: "url(/photos/moor-story.jpg)" }} />
        <div className="absolute inset-0 bg-[#0F1B2D]/50" />
        <div className="relative mx-auto flex min-h-[60vh] max-w-[820px] flex-col items-center justify-center px-6 py-24 text-center text-[#F7F4EE]">
          <Eyebrow tone="light">Designed in the heart of Scotland</Eyebrow>
          <p className={`${serif} mt-6 text-[clamp(26px,3.6vw,44px)] font-light italic leading-[1.15]`}>
            Engineered and assembled in a workshop above the Firth of Forth. The first water it ever cleaned came out of a
            Highland burn.
          </p>
          <Link
            href="/about"
            className="mt-10 inline-flex items-center gap-3 border border-[#F7F4EE]/50 px-7 py-3.5 text-[12px] uppercase tracking-[0.2em] transition hover:bg-[#F7F4EE] hover:text-[#0F1B2D]"
          >
            Our story <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* ————— Carried, not stored ————— */}
      <section className="mx-auto max-w-[1240px] px-6 py-28 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <Eyebrow>Where it lives</Eyebrow>
          <h2 className={`${serif} text-[clamp(34px,4.4vw,58px)] font-light leading-[1.06]`}>Carried, not stored.</h2>
        </div>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map((u) => (
            <div
              key={u.tag}
              className="flex flex-col items-center rounded-sm border border-[#0F1B2D]/10 bg-white/40 px-8 py-10 text-center transition duration-500 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,27,45,0.08)]"
            >
              <span className="text-a-sage"><UseCaseIcon tag={u.tag} /></span>
              <div className="mt-4 text-[12px] uppercase tracking-[0.22em] text-[#0F1B2D]/55">{u.tag}</div>
              <p className={`${serif} mt-3 max-w-[280px] text-[21px] font-light leading-snug`}>{u.line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ————— Pick your colour — product on fields ————— */}
      <section className="border-t border-[#0F1B2D]/10">
        <div className="mx-auto max-w-[1240px] px-6 pb-6 pt-24 text-center lg:px-10">
          <Eyebrow>Three finishes</Eyebrow>
          <h2 className={`${serif} mt-5 text-[clamp(34px,4.6vw,64px)] font-light`}>Pick your colour</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {[
            { name: "Midnight", bg: "#C7D4D6", img: "/renderings/forth-device-hero.png", scene: "/photos/waterfall-divider.jpg", pos: "center 42%", tint: "#51707E" },
            { name: "Sage", bg: "#DCE4D7", img: "/renderings/forth-device-sage-hero.png", scene: "/photos/moor-story.jpg", pos: "center 55%", tint: "#889E81" },
            { name: "Sun", bg: "#F0E3BC", img: "/renderings/forth-device-sun-hero.png", scene: "/photos/storr-sunset.jpg", pos: "center 35%", tint: "#F0E3BC" },
          ].map((c) => (
            <div key={c.name} className="group relative flex flex-col items-center overflow-hidden px-6 pb-14 pt-16" style={{ backgroundColor: c.bg }}>
              {/* scene reveal on hover — FUME-style */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div className="absolute inset-0 bg-cover" style={{ backgroundImage: `url(${c.scene})`, backgroundPosition: c.pos }} />
                <div className="absolute inset-0" style={{ backgroundColor: `${c.tint}30` }} />
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.img}
                alt={`${BRAND} in ${c.name}`}
                className="relative z-10 h-[300px] w-auto drop-shadow-[0_24px_38px_rgba(15,27,45,0.3)]"
              />
              <div className="relative z-10 mt-10 text-[12px] uppercase tracking-[0.22em] text-[#0F1B2D]/60 transition-colors duration-700 group-hover:text-[#F7F4EE]/85">{c.name}</div>
              <div className={`${serif} relative z-10 mt-2 text-[26px] font-light transition-colors duration-700 group-hover:text-[#F7F4EE]`}>From $79</div>
              <Link
                href="/shop"
                className="relative z-10 mt-5 border border-[#0F1B2D]/40 px-6 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-colors duration-700 hover:bg-[#0F1B2D] hover:text-[#F7F4EE] group-hover:border-[#F7F4EE]/70 group-hover:text-[#F7F4EE]"
              >
                Reserve
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ————— Press line ————— */}
      <section className="mx-auto max-w-[1240px] px-6 py-20 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {PRESS_QUOTES.map((q) => (
            <figure key={q.source} className="border-t border-[#0F1B2D]/15 pt-5">
              <blockquote className={`${serif} text-[19px] font-light italic leading-snug text-[#0F1B2D]/85`}>
                “{q.text}”
              </blockquote>
            </figure>
          ))}
        </div>
      </section>

      {/* ————— Cited on the record — sunset band ————— */}
      <section data-nav-dark className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/photos/storr-sunset.jpg)" }} />
        <div className="absolute inset-0 bg-[#0F1B2D]/45" />
        <div className="relative mx-auto flex min-h-[54vh] max-w-[820px] flex-col items-center justify-center px-6 py-24 text-center text-[#F7F4EE]">
          <Eyebrow tone="light">Cited, on the record</Eyebrow>
          <p className={`${serif} mt-6 text-[clamp(24px,3.4vw,40px)] font-light italic leading-[1.18]`}>
            Built on a wavelength microbiology has studied for sixty years — three peer-reviewed papers on the same band
            the device operates within.
          </p>
          <Link
            href="/technology"
            className="mt-10 inline-flex items-center gap-3 border border-[#F7F4EE]/50 px-7 py-3.5 text-[12px] uppercase tracking-[0.2em] transition hover:bg-[#F7F4EE] hover:text-[#0F1B2D]"
          >
            The evidence <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* ————— Newsletter / early access ————— */}
      <section data-nav-dark className="relative overflow-hidden bg-[#22333E] text-[#EAF1F2]">
        {/* faint oversized watermark, FUME-style typographic emphasis */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center text-[22vw] font-light leading-none text-[#EAF1F2]/[0.045]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          FORTH
        </div>
        <div className="relative mx-auto flex min-h-[85vh] max-w-[820px] flex-col items-center justify-center px-6 py-36 text-center">
          <Eyebrow tone="light">First 500 only</Eyebrow>
          <h2 className={`${serif} mt-6 text-[clamp(44px,6.5vw,92px)] font-light leading-[1.0]`}>
            Don&rsquo;t miss the drop
          </h2>
          <p className="mx-auto mt-7 max-w-[480px] text-[16px] leading-relaxed text-[#EAF1F2]/75">
            The founding run ships first, with founder exclusives. Everyone else waits for round two — leave your email
            and be first through the door.
          </p>
          <form className="mt-14 w-full max-w-[560px]">
            <div className="flex items-center gap-4 border-b border-white/40 pb-4">
              <input
                type="email"
                required
                placeholder="Email address"
                className="w-full bg-transparent text-center text-[19px] text-[#EAF1F2] outline-none transition-colors placeholder:text-[#EAF1F2]/45 focus:placeholder:text-[#EAF1F2]/25"
              />
              <button
                type="submit"
                aria-label="Sign up"
                className="text-[26px] transition-transform hover:translate-x-1.5"
              >
                →
              </button>
            </div>
            <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-[#EAF1F2]/45">
              No spam · unsubscribe anytime
            </p>
          </form>
        </div>
      </section>

      {/* ————— Footer ————— */}
      <footer className="bg-[#F7F4EE] text-[#0F1B2D]">
        <div className="mx-auto max-w-[1240px] px-6 py-20 lg:px-10">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <div className={`${serif} text-[28px] font-medium tracking-[0.12em]`}>{BRAND.toUpperCase()}</div>
              <p className="mt-4 max-w-[300px] text-[14px] leading-relaxed text-[#0F1B2D]/65">
                A submersible UV-C water sterilizer. Drops into any bottle and disinfects in sixty seconds. Designed and
                assembled in Scotland.
              </p>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#0F1B2D]/45">Shop</div>
              <ul className="mt-5 space-y-3 text-[14px] text-[#0F1B2D]/75">
                <li><Link href="/shop" className="hover:opacity-60">Product</Link></li>
                <li><Link href="/how-it-works" className="hover:opacity-60">How it works</Link></li>
                <li><Link href="/technology" className="hover:opacity-60">Technology</Link></li>
                <li><Link href="/compare" className="hover:opacity-60">Compare</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-[#0F1B2D]/45">Company</div>
              <ul className="mt-5 space-y-3 text-[14px] text-[#0F1B2D]/75">
                <li><Link href="/about" className="hover:opacity-60">About</Link></li>
                <li><Link href="/press" className="hover:opacity-60">Press</Link></li>
                <li><Link href="/contact" className="hover:opacity-60">Contact</Link></li>
                <li><Link href="/help" className="hover:opacity-60">Help</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-[#0F1B2D]/10 pt-6 text-[11px] uppercase tracking-[0.18em] text-[#0F1B2D]/45 sm:flex-row">
            <span>© 2026 {BRAND}, Ltd · Patent-pending</span>
            <span>Terms · Privacy · Cookies</span>
          </div>
        </div>
      </footer>

      <VariantToggle active="b" tone="light" />
    </div>
  );
}
