"use client";

import { useEffect, useState } from "react";

/**
 * Dev-only control for the Internal/Device render in Option B's technology
 * section. Drives:
 *   --obj-x  horizontal offset in px (whole assembly, buttons follow)
 *   --obj-y  vertical offset in px
 *   --obj-h  render height in px (buttons keep their size and stay the same
 *            distance below the render)
 * Read off the numbers you like and tell Claude to bake them in.
 */
export function ObjToggleTuner({ x0 = 0, y0 = 0, h0 = 520 }: { x0?: number; y0?: number; h0?: number }) {
  const [x, setX] = useState(x0);
  const [y, setY] = useState(y0);
  const [h, setH] = useState(h0);

  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty("--obj-x", `${x}px`);
    r.setProperty("--obj-y", `${y}px`);
    r.setProperty("--obj-h", `${h}px`);
  }, [x, y, h]);

  const Row = ({
    label, value, unit, min, max, step, onChange,
  }: {
    label: string; value: number; unit: string; min: number; max: number; step: number; onChange: (v: number) => void;
  }) => (
    <div className="flex items-center gap-3">
      <span className="w-14 text-white/60">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1 w-36 cursor-pointer accent-[#C7D4D6]"
        aria-label={label}
      />
      <span className="w-14 text-right tabular-nums text-white/80">{value}{unit}</span>
    </div>
  );

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-2 rounded-2xl bg-black/70 px-4 py-3 text-[12px] tracking-wide text-white/90 ring-1 ring-white/15 backdrop-blur">
      <Row label="Horiz." value={x} unit="px" min={-300} max={300} step={2} onChange={setX} />
      <Row label="Vert." value={y} unit="px" min={-300} max={300} step={2} onChange={setY} />
      <Row label="Size" value={h} unit="px" min={300} max={800} step={5} onChange={setH} />
    </div>
  );
}
