"use client";

import { useEffect, useRef, useState } from "react";

import { USE_CASES } from "../../lib/brand";
import { UseCaseIcon } from "../../components/UseCaseIcons";
import { display } from "./display";

/**
 * "Carried, not stored" — three interchangeable treatments, switched with the
 * style toggle in the section header (a review tool while the direction is
 * being chosen):
 *   hover     — the 3×2 card grid; a hovered card lifts, grows, and unfolds
 *               need-driven copy beneath its summary line.
 *   strip     — a horizontal accordion of six photo panels; the hovered panel
 *               widens while the others compress (FUME/awwwards editorial
 *               pattern), revealing the full pitch over the scene.
 *   spotlight — one full-bleed photo stage that auto-advances through the six
 *               cases with a progress bar; hover pauses, chips jump.
 */

// Need-driven copy: why you NEED it, per case.
const NEED: Record<string, string> = {
  "At home":
    "Boil-water advisories don't send a warning the day before. When the tap turns on you, the kettle is slow and the shops sell out in an hour — the water already in your kitchen becomes safe in sixty seconds.",
  "The office":
    "Nobody can tell you when the cooler's tank was last cleaned. Shared taps, shared kitchens, shared germs — one Forth in the desk drawer means your water is nobody else's problem.",
  "The gym":
    "A used shaker is a petri dish with a lid. Powder residue feeds bacteria within hours, and a rinse doesn't touch it — sterilize the bottle you're about to drink from, every session.",
  "Hotels":
    "The glass by the sink was wiped with the same cloth as the counter, and the mini-bar charges £4 for certainty. Drop Forth in and the room tap becomes your own supply.",
  "Travel":
    "One bad glass of water costs three days of a ten-day trip. Street tap, train-station fountain, mountain spring — drink like a local without gambling like a tourist.",
  "Outdoors":
    "The clearest burn can carry giardia from a sheep a mile upstream. Filters clog and tablets want thirty minutes — sixty seconds of light and the stream is yours.",
};

// Scene photo per case (strip + spotlight treatments).
const SCENE: Record<string, { img: string; pos: string }> = {
  "At home":    { img: "/photos/cns-home.jpg",          pos: "center 45%" },
  "The office": { img: "/photos/cns-office.jpg",        pos: "center 50%" },
  "The gym":    { img: "/photos/cns-gym.jpg",           pos: "center 45%" },
  "Hotels":     { img: "/photos/cns-hotel.jpg",         pos: "center 55%" },
  "Travel":     { img: "/photos/cns-travel.jpg",        pos: "center 50%" },
  "Outdoors":   { img: "/photos/waterfall-divider.jpg", pos: "center 42%" },
};

type Style = "strip" | "spotlight" | "hover" | "original";

/* ————— Treatment 4: the original static grid ————— */
function OriginalGrid() {
  return (
    <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {USE_CASES.map((u) => (
        <li
          key={u.tag}
          className="flex flex-col items-center gap-3 rounded-2xl bg-white/50 p-7 ring-1 ring-a-ink/10 transition duration-300 hover:-translate-y-1 hover:shadow-md"
        >
          <span className="text-a-sage"><UseCaseIcon tag={u.tag} /></span>
          <div className={`${display} text-[20px]`}>{u.tag}</div>
          <p className="max-w-[300px] font-serif text-[16px] leading-snug text-a-ink/75">{u.line}</p>
        </li>
      ))}
    </ul>
  );
}

/* ————— Treatment 3: hover-expand cards ————— */
function HoverGrid() {
  return (
    <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {USE_CASES.map((u) => (
        <li
          key={u.tag}
          className="group relative flex flex-col items-center gap-3 rounded-2xl bg-white/50 p-7 ring-1 ring-a-ink/10 transition-all duration-300 hover:z-10 hover:scale-[1.04] hover:bg-white hover:shadow-xl"
        >
          <span className="text-a-sage transition-transform duration-300 group-hover:scale-110">
            <UseCaseIcon tag={u.tag} />
          </span>
          <div className={`${display} text-[20px]`}>{u.tag}</div>
          <p className="max-w-[300px] font-serif text-[16px] leading-snug text-a-ink/75">{u.line}</p>
          {/* need copy unfolds on hover */}
          <div className="grid w-full grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <div className="mx-auto mt-2 h-px w-10 bg-a-sage/60" />
              <p className="mx-auto mt-3 max-w-[320px] pb-1 font-serif text-[14.5px] italic leading-relaxed text-a-ink/70">
                {NEED[u.tag]}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ————— Treatment 2: horizontal accordion strip ————— */
function AccordionStrip() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="mt-14">
      {/* desktop strip */}
      <div className="hidden h-[480px] gap-2 md:flex" onMouseLeave={() => setActive(null)}>
        {USE_CASES.map((u) => {
          const open = active === u.tag;
          const dim = active !== null && !open;
          return (
            <button
              key={u.tag}
              type="button"
              onMouseEnter={() => setActive(u.tag)}
              onFocus={() => setActive(u.tag)}
              className="relative min-w-0 cursor-default overflow-hidden rounded-2xl text-left transition-all duration-500 ease-out"
              style={{ flexGrow: open ? 4.2 : 1, flexBasis: 0 }}
            >
              <div
                className="absolute inset-0 bg-cover transition-transform duration-700"
                style={{
                  backgroundImage: `url(${SCENE[u.tag].img})`,
                  backgroundPosition: SCENE[u.tag].pos,
                  transform: open ? "scale(1.05)" : "scale(1)",
                }}
              />
              <div
                className="absolute inset-0 transition-colors duration-500"
                style={{ backgroundColor: open ? "rgba(15,27,45,0.50)" : dim ? "rgba(15,27,45,0.72)" : "rgba(15,27,45,0.62)" }}
              />
              {/* collapsed label — vertical */}
              <div
                className="absolute inset-x-0 bottom-6 flex justify-center transition-opacity duration-300"
                style={{ opacity: open ? 0 : 1 }}
              >
                <span
                  className="font-mono text-[12px] uppercase tracking-[0.3em] text-[#F2EFE8]/85"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  {u.tag}
                </span>
              </div>
              {/* expanded content */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-7 transition-opacity delay-150 duration-400"
                style={{ opacity: open ? 1 : 0 }}
              >
                <span className="text-[#C7D4D6]"><UseCaseIcon tag={u.tag} /></span>
                <h3 className={`${display} mt-3 whitespace-nowrap text-[30px] text-[#F2EFE8]`}>{u.tag}</h3>
                <p className="mt-2 max-w-[380px] font-serif text-[15px] italic leading-relaxed text-[#F2EFE8]/85">
                  {NEED[u.tag]}
                </p>
              </div>
            </button>
          );
        })}
      </div>
      {/* mobile: stacked photo cards */}
      <ul className="flex flex-col gap-3 md:hidden">
        {USE_CASES.map((u) => (
          <li key={u.tag} className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-cover" style={{ backgroundImage: `url(${SCENE[u.tag].img})`, backgroundPosition: SCENE[u.tag].pos }} />
            <div className="absolute inset-0 bg-[#0F1B2D]/60" />
            <div className="relative p-6 text-left">
              <h3 className={`${display} text-[24px] text-[#F2EFE8]`}>{u.tag}</h3>
              <p className="mt-2 font-serif text-[14px] italic leading-relaxed text-[#F2EFE8]/85">{NEED[u.tag]}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ————— Treatment 3: auto-advancing spotlight ————— */
const HOLD_MS = 5000;

function Spotlight() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0); // restarts the progress bar animation
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => {
      setIdx((i) => (i + 1) % USE_CASES.length);
      setTick((t) => t + 1);
    }, HOLD_MS);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [paused]);

  const go = (i: number) => { setIdx(i); setTick((t) => t + 1); };
  const u = USE_CASES[idx];

  return (
    <div
      className="mt-14 overflow-hidden rounded-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-[440px]">
        {/* stacked scenes crossfade */}
        {USE_CASES.map((c, i) => (
          <div
            key={c.tag}
            className="absolute inset-0 bg-cover transition-opacity duration-700"
            style={{
              backgroundImage: `url(${SCENE[c.tag].img})`,
              backgroundPosition: SCENE[c.tag].pos,
              opacity: i === idx ? 1 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-[#0F1B2D]/55" />
        <div className="relative flex min-h-[440px] flex-col items-center justify-center px-6 py-16 text-center">
          <span className="text-[#C7D4D6]"><UseCaseIcon tag={u.tag} /></span>
          <h3 key={`t-${idx}`} className={`${display} cns-rise mt-4 text-[clamp(34px,4.6vw,58px)] text-[#F2EFE8]`}>
            {u.tag}
          </h3>
          <p key={`p-${idx}`} className="cns-rise mx-auto mt-4 max-w-[620px] font-serif text-[clamp(16px,1.9vw,20px)] italic leading-relaxed text-[#F2EFE8]/90" style={{ animationDelay: "80ms" }}>
            {NEED[u.tag]}
          </p>
        </div>
        {/* chip rail + progress */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-5">
          <div className="mx-auto flex max-w-[860px] flex-wrap items-center justify-center gap-2">
            {USE_CASES.map((c, i) => (
              <button
                key={c.tag}
                type="button"
                onClick={() => go(i)}
                className={`rounded-full px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                  i === idx ? "bg-[#F2EFE8] text-[#0F1B2D]" : "bg-white/10 text-[#F2EFE8]/75 hover:bg-white/20"
                }`}
              >
                {c.tag}
              </button>
            ))}
          </div>
          <div className="mx-auto mt-4 h-px w-full max-w-[860px] bg-white/20">
            <div
              key={tick}
              className="cns-progress h-full bg-[#C7D4D6]"
              style={{ animationDuration: `${HOLD_MS}ms`, animationPlayState: paused ? "paused" : "running" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ————— Section wrapper with the style toggle ————— */
export function CarriedNotStored() {
  const [style, setStyle] = useState<Style>("strip");
  return (
    <section className="bg-grain bg-a-bg">
      <div className="mx-auto max-w-[1240px] px-6 py-24 text-center">
        <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-a-ink/50">where it lives</p>
        <h2 className={`${display} mt-4 text-[clamp(44px,6.4vw,82px)]`}>Carried, not stored</h2>
        <p className="mt-3 font-serif text-[clamp(19px,2.4vw,27px)] italic text-a-ink/75">six places it earns its keep</p>

        {/* style toggle — review tool while the treatment is being chosen */}
        <div
          role="group"
          aria-label="Section style"
          className="mt-7 inline-flex items-center gap-1 rounded-full bg-a-ink/10 p-0.5 text-[11px] font-medium tracking-wide"
        >
          {(["strip", "spotlight", "hover", "original"] as Style[]).map((s) => (
            <button
              key={s}
              aria-pressed={style === s}
              onClick={() => setStyle(s)}
              className={`rounded-full px-3 py-1 capitalize transition-all duration-200 ${
                style === s ? "bg-a-ink text-a-bg shadow-sm" : "text-a-ink/50 hover:text-a-ink/75"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {style === "strip" && <AccordionStrip />}
        {style === "spotlight" && <Spotlight />}
        {style === "hover" && <HoverGrid />}
        {style === "original" && <OriginalGrid />}
      </div>

      <style jsx global>{`
        @keyframes cns-rise {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cns-rise { animation: cns-rise 0.5s ease-out both; }
        @keyframes cns-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .cns-progress { animation-name: cns-progress; animation-timing-function: linear; animation-fill-mode: forwards; }
        @media (prefers-reduced-motion: reduce) {
          .cns-rise { animation: none; }
        }
      `}</style>
    </section>
  );
}
