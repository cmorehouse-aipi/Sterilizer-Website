"use client";

import { useEffect, useState } from "react";

/**
 * Dev-only control for dialing in the blend-fade height on the technology
 * section's transitions. Drives the CSS variable --fade-h, which the fade
 * overlays consume. Sits in the bottom-left corner, out of the way of the
 * concept toggle.
 */
export function TransitionTuner({ initial = 160 }: { initial?: number }) {
  const [h, setH] = useState(initial);

  useEffect(() => {
    document.documentElement.style.setProperty("--fade-h", `${h}px`);
  }, [h]);

  return (
    <div className="fixed bottom-5 left-5 z-50 flex items-center gap-3 rounded-full bg-black/70 px-4 py-2 text-[12px] tracking-wide text-white/90 ring-1 ring-white/15 backdrop-blur">
      <span className="whitespace-nowrap text-white/60">Blend</span>
      <input
        type="range"
        min={0}
        max={400}
        step={4}
        value={h}
        onChange={(e) => setH(Number(e.target.value))}
        className="h-1 w-40 cursor-pointer accent-[#C7D4D6]"
        aria-label="Transition smoothing height"
      />
      <span className="w-10 text-right tabular-nums text-white/80">{h}px</span>
    </div>
  );
}
