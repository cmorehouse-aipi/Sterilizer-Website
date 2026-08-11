"use client";

import { useEffect, useState } from "react";

/**
 * Temporary dial-in panel for Option A:
 *  – UV glow intensity on the hero device domes (0–100)
 *  – Solid-colour card opacity in "Pick your colour" (0–100)
 * Values write CSS variables on :root; remove this component once locked.
 */
export function OptionATuner() {
  const [glow, setGlow] = useState(65);
  const [cardAlpha, setCardAlpha] = useState(76);

  useEffect(() => {
    document.documentElement.style.setProperty("--uv-glow-intensity", String(glow / 100));
  }, [glow]);

  useEffect(() => {
    document.documentElement.style.setProperty("--colour-card-alpha", String(cardAlpha / 100));
  }, [cardAlpha]);

  return (
    <div className="fixed right-4 top-1/2 z-50 w-[220px] -translate-y-1/2 rounded-2xl bg-black/80 p-4 text-white shadow-xl ring-1 ring-white/15 backdrop-blur">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Tuner</p>

      <label className="mt-3 block text-[11px] uppercase tracking-wide text-white/80">
        UV glow intensity — {glow}
        <input
          type="range"
          min={0}
          max={100}
          value={glow}
          onChange={(e) => setGlow(Number(e.target.value))}
          className="mt-1 w-full accent-[#8CC4FF]"
        />
      </label>

      <label className="mt-4 block text-[11px] uppercase tracking-wide text-white/80">
        Colour card opacity — {cardAlpha}
        <input
          type="range"
          min={0}
          max={100}
          value={cardAlpha}
          onChange={(e) => setCardAlpha(Number(e.target.value))}
          className="mt-1 w-full accent-[#C7D4D6]"
        />
      </label>
    </div>
  );
}
