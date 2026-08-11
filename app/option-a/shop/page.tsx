import Link from "next/link";

import { BRAND } from "../../lib/brand";
import { OptionAShell } from "../_components/OptionAShell";
import { display } from "../_components/display";

export const metadata = { title: `Shop — ${BRAND} · Option A` };

const DEVICES = [
  {
    name: "Midnight",
    price: "$79",
    render: "/renderings/forth-device-hero.png",
    scene: "/photos/waterfall-divider.jpg",
    pos: "center 42%",
    line: "The original. Navy body, frost domes.",
  },
  {
    name: "Sage",
    price: "$79",
    render: "/renderings/forth-device-sage-hero.png",
    scene: "/photos/moor-story.jpg",
    pos: "center 55%",
    line: "Moss and moor. Quietly at home outdoors.",
  },
  {
    name: "Sun",
    price: "$79",
    render: "/renderings/forth-device-sun-hero.png",
    scene: "/photos/storr-sunset.jpg",
    pos: "center 35%",
    line: "Late light on the Storr. The warm one.",
  },
];

const ACCESSORIES = [
  {
    name: "Replacement domes",
    sub: "Pack of 2",
    price: "$12",
    icon: (
      <svg aria-hidden width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 30 A 14 14 0 0 1 38 30 Z" />
        <path d="M17 30 L24 19 L31 30" strokeOpacity="0.5" />
        <line x1="8" y1="36" x2="40" y2="36" strokeDasharray="2.5 2.5" strokeOpacity="0.6" />
      </svg>
    ),
  },
  {
    name: "Travel case",
    sub: "Felt-lined, magnetic",
    price: "$24",
    icon: (
      <svg aria-hidden width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="14" width="32" height="22" rx="8" />
        <line x1="8" y1="25" x2="40" y2="25" strokeOpacity="0.5" />
        <rect x="20" y="19" width="8" height="12" rx="4" strokeOpacity="0.6" />
      </svg>
    ),
  },
  {
    name: "Induction base",
    sub: "Spare charger",
    price: "$19",
    icon: (
      <svg aria-hidden width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="24" cy="34" rx="14" ry="4" />
        <path d="M18 28 C14 25 14 22 18 19" strokeOpacity="0.5" />
        <path d="M30 28 C34 25 34 22 30 19" strokeOpacity="0.5" />
        <circle cx="24" cy="14" r="4" strokeOpacity="0.7" />
      </svg>
    ),
  },
  {
    name: `${BRAND} × 2`,
    sub: "Family pack — any colours",
    price: "$148",
    icon: (
      <svg aria-hidden width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="8" width="11" height="32" rx="5.5" />
        <rect x="27" y="8" width="11" height="32" rx="5.5" strokeOpacity="0.6" />
      </svg>
    ),
  },
];

export default function OptionAShop() {
  return (
    <OptionAShell>
      {/* ————— Header ————— */}
      <section className="bg-grain bg-a-bg">
        <div className="mx-auto max-w-[1240px] px-6 pb-16 pt-20 text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-a-ink/50">the lineup</p>
          <h1 className={`${display} mt-4 text-[clamp(48px,7vw,92px)]`}>One instrument</h1>
          <p className="mt-3 font-serif text-[clamp(19px,2.4vw,27px)] italic text-a-ink/75">
            three moods, and the pieces that travel with it
          </p>
        </div>
      </section>

      {/* ————— The three colours — scene reveal cards ————— */}
      <section className="grid grid-cols-1 sm:grid-cols-3">
        {DEVICES.map((c) => (
          <div key={c.name} className="group relative flex flex-col items-center overflow-hidden px-6 pb-14 pt-12">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-cover" style={{ backgroundImage: `url(${c.scene})`, backgroundPosition: c.pos }} />
            </div>
            <div className="colour-overlay pointer-events-none absolute inset-0 bg-a-bg" />
            <span className="relative z-10 font-mono text-[12px] uppercase tracking-[0.3em] text-a-ink/60 transition-colors duration-700 group-hover:text-[#F7F4EE]/85">
              {c.name}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.render}
              alt={`${BRAND} in ${c.name}`}
              className="relative z-10 mt-6 w-[150px] drop-shadow-[0_24px_36px_rgba(15,27,45,0.35)] sm:w-[170px]"
            />
            <p className="relative z-10 mt-6 max-w-[280px] text-center font-serif text-[15px] italic text-a-ink/70 transition-colors duration-700 group-hover:text-[#F7F4EE]/85">
              {c.line}
            </p>
            <div className={`${display} relative z-10 mt-5 text-[26px] transition-colors duration-700 group-hover:text-[#F7F4EE]`}>
              {c.price}
            </div>
            <Link
              href="/option-a/shop"
              className="relative z-10 mt-4 rounded-full bg-a-ink px-6 py-3 text-[13px] font-semibold tracking-wide text-a-bg transition hover:-translate-y-0.5"
            >
              Reserve {c.name}
            </Link>
          </div>
        ))}
      </section>

      {/* ————— Accessories ————— */}
      <section className="bg-grain bg-a-bg">
        <div className="mx-auto max-w-[1240px] px-6 py-24 text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-a-ink/50">alongside it</p>
          <h2 className={`${display} mt-4 text-[clamp(38px,5.4vw,68px)]`}>The kit</h2>
          <p className="mt-3 font-serif text-[clamp(18px,2.2vw,24px)] italic text-a-ink/75">
            small things that keep it working for years
          </p>

          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ACCESSORIES.map((a) => (
              <li
                key={a.name}
                className="flex flex-col items-center gap-3 rounded-2xl bg-white/50 p-7 ring-1 ring-a-ink/10 transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-a-sage">{a.icon}</span>
                <div className={`${display} text-[20px]`}>{a.name}</div>
                <p className="font-serif text-[15px] italic text-a-ink/60">{a.sub}</p>
                <div className="mt-1 text-[14px] font-semibold">{a.price}</div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ————— Early access band ————— */}
      <section className="bg-[#22333E] text-[#EAF1F2]">
        <div className="mx-auto max-w-[760px] px-6 py-24 text-center">
          <span className="inline-block rounded-full bg-[#C7D4D6] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-[#22333E]">
            First 500 only · founding batch
          </span>
          <h2 className={`${display} mt-6 text-[clamp(30px,5vw,64px)]`}>Reserve before the drop</h2>
          <p className="mx-auto mt-5 max-w-[540px] font-serif text-[clamp(17px,2.2vw,22px)] italic text-[#EAF1F2]/80">
            The founding run ships first. Get founder exclusives — leave your email on the front page
            and be first through the door.
          </p>
          <Link
            href="/option-a"
            className="mt-9 inline-block rounded-full bg-[#C7D4D6] px-8 py-4 text-[14px] font-bold uppercase tracking-wide text-[#22333E] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#d6e0e1]"
          >
            Claim my spot
          </Link>
        </div>
      </section>
    </OptionAShell>
  );
}
