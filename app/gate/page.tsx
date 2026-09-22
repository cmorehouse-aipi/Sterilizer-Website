"use client";

import { FormEvent, useState } from "react";

import { display } from "../option-a/_components/display";

/**
 * Private-preview gate. The whole site sits behind this page until the
 * demo password is entered (validated server-side by /api/unlock, which
 * sets the access cookie the middleware checks).
 */

const LETTERS = ["F", "O", "R", "T", "H"];

// Light motes drifting up through the scene (deterministic, no hydration drift).
const MOTES = [
  { left: "8%",  size: 3, delay: 0,    dur: 14 },
  { left: "18%", size: 2, delay: 3.2,  dur: 17 },
  { left: "29%", size: 4, delay: 6.1,  dur: 12 },
  { left: "41%", size: 2, delay: 1.4,  dur: 19 },
  { left: "55%", size: 3, delay: 8.3,  dur: 15 },
  { left: "64%", size: 2, delay: 4.7,  dur: 13 },
  { left: "76%", size: 4, delay: 2.2,  dur: 18 },
  { left: "87%", size: 2, delay: 9.6,  dur: 14 },
  { left: "94%", size: 3, delay: 5.5,  dur: 16 },
];

export default function Gate() {
  const [pw, setPw] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "error" | "open">("idle");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "checking" || status === "open") return;
    setStatus("checking");
    const res = await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pw }),
    }).catch(() => null);

    if (res?.ok) {
      setStatus("open");
      // let the light-flood animation play, then enter
      setTimeout(() => { window.location.href = "/"; }, 950);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 650);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0F1B2D] px-6 text-center">
      {/* ————— scene: slow Ken Burns over the Storr ————— */}
      <div
        className="gate-kenburns absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/photos/storr-hero.jpg)" }}
      />
      {/* drifting mist band */}
      <div
        className="gate-mist absolute inset-y-0 -left-1/2 w-[200%] bg-cover bg-center opacity-[0.14] blur-2xl"
        style={{ backgroundImage: "url(/photos/moor-story.jpg)" }}
      />
      <div className="absolute inset-0 bg-[#0F1B2D]/62" />
      {/* rising light motes */}
      {MOTES.map((m, i) => (
        <span
          key={i}
          className="gate-mote pointer-events-none absolute bottom-[-4%] rounded-full bg-[#C7D4D6]"
          style={{
            left: m.left,
            width: m.size,
            height: m.size,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.dur}s`,
          }}
        />
      ))}

      {/* ————— content ————— */}
      <div className="relative z-10 flex flex-col items-center">
        <p className="gate-rise relative -top-10 font-mono text-[11px] uppercase tracking-[0.42em] text-[#E5EDEF]/95" style={{ animationDelay: "150ms", textShadow: "0 1px 14px rgba(15,27,45,0.55)" }}>
          private preview · founding run
        </p>

        {/* wordmark + device share one width: the device's ends align with the title's */}
        <div className="inline-flex w-fit flex-col items-stretch">
          {/* wordmark: staggered letter rise + a shine clipped to the glyphs */}
          <h1 aria-label="FORTH" className="relative mt-6 flex justify-center overflow-hidden">
            {LETTERS.map((l, i) => (
              <span
                key={i}
                className={`${display} gate-letter inline-block text-[clamp(88px,17vw,220px)] leading-[0.85] text-[#F2EFE8]`}
                style={{ animationDelay: `${260 + i * 90}ms` }}
              >
                {l}
              </span>
            ))}
            {/* shine layer: same glyphs, gradient clipped to the text so the
                sweep follows the letterforms and glides off the H edge */}
            <span aria-hidden className="gate-shine pointer-events-none absolute inset-0 flex justify-center">
              {LETTERS.map((l, i) => (
                <span key={i} className={`${display} inline-block text-[clamp(88px,17vw,220px)] leading-[0.85]`}>
                  {l}
                </span>
              ))}
            </span>
          </h1>

          {/* floating horizontal device with breathing UV glow */}
          {/* Locked design decision: device at 35% of the wordmark's width. */}
          <div className="gate-rise relative mx-auto mt-10 w-[35%]" style={{ animationDelay: "900ms" }}>
            <div
              className="gate-pulse pointer-events-none absolute left-1/2 top-1/2 h-[260%] w-[104%] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
              style={{ background: "radial-gradient(ellipse, rgba(127,179,255,0.45) 0%, rgba(127,179,255,0.12) 45%, transparent 70%)" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/renderings/forth-device-horizontal.png"
              alt="Forth UV-C sterilizer"
              className="gate-float relative w-full drop-shadow-[0_0_28px_rgba(127,179,255,0.35)]"
            />
          </div>
        </div>

        {/* password */}
        <form
          onSubmit={submit}
          className={`gate-rise mt-10 flex w-full max-w-[380px] items-center gap-2 rounded-full p-1.5 ring-1 backdrop-blur-md transition-colors duration-300 ${
            status === "error" ? "gate-shake bg-[#F0876B]/15 ring-[#F0876B]/70" : "bg-white/10 ring-white/25 focus-within:ring-[#C7D4D6]/70"
          }`}
          style={{ animationDelay: "1150ms" }}
        >
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Enter the password"
            aria-label="Preview password"
            autoFocus
            className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-[15px] text-[#F2EFE8] placeholder:text-[#F2EFE8]/40 focus:outline-none"
          />
          <button
            type="submit"
            disabled={status === "checking"}
            className="shrink-0 rounded-full bg-[#F2EFE8] px-6 py-2.5 text-[13px] font-bold uppercase tracking-wide text-[#0F1B2D] transition hover:-translate-y-0.5 hover:bg-white disabled:opacity-60"
          >
            {status === "checking" ? "…" : "Enter"}
          </button>
        </form>
        <p className={`mt-3 h-5 font-mono text-[11px] uppercase tracking-[0.2em] transition-opacity duration-300 ${status === "error" ? "text-[#F0876B] opacity-100" : "opacity-0"}`}>
          not the right light — try again
        </p>

        <p className="gate-rise mt-12 font-mono text-[10px] uppercase tracking-[0.3em] text-[#F2EFE8]/35" style={{ animationDelay: "1350ms" }}>
          © Forth — private demonstration build
        </p>
      </div>

      {/* unlock: UV light flood */}
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 z-20 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full ${status === "open" ? "gate-flood" : "opacity-0"}`}
        style={{ background: "radial-gradient(circle, #EAF4FF 0%, #7FB3FF 55%, rgba(127,179,255,0.9) 100%)" }}
      />

      <style jsx global>{`
        @keyframes gate-kenburns {
          from { transform: scale(1); }
          to   { transform: scale(1.09); }
        }
        .gate-kenburns { animation: gate-kenburns 26s ease-in-out infinite alternate; }

        @keyframes gate-mist {
          from { transform: translateX(0); }
          to   { transform: translateX(12%); }
        }
        .gate-mist { animation: gate-mist 40s ease-in-out infinite alternate; }

        @keyframes gate-mote {
          0%   { transform: translateY(0); opacity: 0; }
          12%  { opacity: 0.7; }
          88%  { opacity: 0.5; }
          100% { transform: translateY(-108vh); opacity: 0; }
        }
        .gate-mote { animation-name: gate-mote; animation-timing-function: linear; animation-iteration-count: infinite; }

        @keyframes gate-letter {
          from { transform: translateY(110%); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        .gate-letter { animation: gate-letter 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }

        .gate-shine {
          background-image: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.98) 48%, #dbeeff 50%, rgba(255,255,255,0.98) 52%, transparent 60%);
          background-size: 260% 100%;
          background-repeat: no-repeat;
          background-position: 115% 0;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          animation: gate-shine 5s infinite 1.8s;
        }
        @keyframes gate-shine {
          0%   { background-position: 115% 0; animation-timing-function: cubic-bezier(0.55, 0, 0.3, 1); }
          52%  { background-position: -15% 0; }
          100% { background-position: -15% 0; }
        }

        @keyframes gate-rise {
          from { transform: translateY(18px); opacity: 0; }
          to   { transform: translateY(0); opacity: 1; }
        }
        .gate-rise { animation: gate-rise 0.8s ease-out both; }

        @keyframes gate-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-9px); }
        }
        .gate-float { animation: gate-float 5s ease-in-out infinite; }

        @keyframes gate-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.75; }
          50%      { transform: translate(-50%, -50%) scale(1.22); opacity: 1; }
        }
        .gate-pulse { animation: gate-pulse 3.4s ease-in-out infinite; }

        @keyframes gate-shake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(4px); }
          30%, 50%, 70% { transform: translateX(-7px); }
          40%, 60% { transform: translateX(7px); }
        }
        .gate-shake { animation: gate-shake 0.55s cubic-bezier(0.36, 0.07, 0.19, 0.97) both; }

        @keyframes gate-flood {
          from { transform: translate(-50%, -50%) scale(1); opacity: 0.9; }
          to   { transform: translate(-50%, -50%) scale(90); opacity: 1; }
        }
        .gate-flood { animation: gate-flood 0.95s ease-in both; }

        @media (prefers-reduced-motion: reduce) {
          .gate-kenburns, .gate-mist, .gate-mote, .gate-letter, .gate-shine,
          .gate-rise, .gate-float, .gate-pulse { animation: none; }
          .gate-letter, .gate-rise { opacity: 1; transform: none; }
        }
      `}</style>
    </main>
  );
}
