"use client";

import { useEffect, useState } from "react";

/**
 * Dev-only control for positioning/sizing the rotating device in the Option B
 * hero. Drives three CSS variables consumed by the hero:
 *   --spin-x  horizontal position (% of viewport width, anchor = device centre)
 *   --spin-y  vertical position   (% of hero height,   anchor = device centre)
 *   --spin-h  device height in px
 * Read off the numbers you like and tell Claude to bake them in.
 */
export function HeroSpinTuner({ x0 = 50, y0 = 45, h0 = 340 }: { x0?: number; y0?: number; h0?: number }) {
  const [x, setX] = useState(x0);
  const [y, setY] = useState(y0);
  const [h, setH] = useState(h0);

  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty("--spin-x", `${x}%`);
    r.setProperty("--spin-y", `${y}%`);
    r.setProperty("--spin-h", `${h}px`);
  }, [x, y, h]);

  const Row = ({
    label,
    value,
    unit,
    min,
    max,
    step,
    onChange,
  }: {
    label: string;
    value: number;
    unit: string;
    min: number;
    max: number;
    step: number;
    onChange: (v: number) => void;
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
      <span className="w-14 text-right tabular-nums text-white/80">
        {value}
        {unit}
      </span>
    </div>
  );

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-2 rounded-2xl bg-black/70 px-4 py-3 text-[12px] tracking-wide text-white/90 ring-1 ring-white/15 backdrop-blur">
      <Row label="Horiz." value={x} unit="%" min={0} max={100} step={0.5} onChange={setX} />
      <Row label="Vert." value={y} unit="%" min={0} max={100} step={0.5} onChange={setY} />
      <Row label="Size" value={h} unit="px" min={120} max={700} step={5} onChange={setH} />
    </div>
  );
}
