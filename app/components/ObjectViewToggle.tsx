"use client";

import { useState } from "react";

const DEVICE_SRC = "/renderings/forth-device-frame-00.png";
const INTERNAL_SRC = "/renderings/forth-device-glass-frame-00.png";

/**
 * "The object" section visual: toggles between the Midnight product render
 * ("Device") and the glass render revealing the internal components
 * ("Internal"). The two images crossfade; in the Internal view an extra soft
 * core glow fades in behind the device so the transparent body reads clearly
 * against the navy section background.
 *
 * The Internal render (forth-device-glass-frame-00.png) is produced by
 * scripts/render-device-glass.py — same camera/framing as the hero still.
 */
export function ObjectViewToggle({
  defaultView = "device",
  swapButtons = false,
  renderHeight,
  deviceSrc = DEVICE_SRC,
  deviceAlt = "Forth device — Midnight",
  tone = "dark",
}: {
  defaultView?: "device" | "internal";
  swapButtons?: boolean;
  /** CSS height for the render block (e.g. "var(--obj-h, 520px)"). Buttons keep their size and spacing. */
  renderHeight?: string;
  /** Override the "Device" view render (same camera/framing expected). */
  deviceSrc?: string;
  deviceAlt?: string;
  /** Background the toggle sits on: "dark" (navy sections) or "light" (cream sections). */
  tone?: "dark" | "light";
} = {}) {
  const [view, setView] = useState<"device" | "internal">(defaultView);
  const internal = view === "internal";

  const onLight = tone === "light";
  const groupBg = onLight ? "bg-a-ink/10" : "bg-a-bg/10";
  const activeBtn = onLight ? "bg-a-ink text-a-bg shadow-sm" : "bg-a-bg text-a-ink shadow-sm";
  const inactiveBtn = onLight ? "text-a-ink/50 hover:text-a-ink/75" : "text-a-bg/50 hover:text-a-bg/75";

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative flex items-center justify-center">
        <div
          className="animate-glow pointer-events-none absolute left-1/2 top-0 h-44 w-44 -translate-x-1/2 -translate-y-1/3 rounded-full"
          style={{ backgroundColor: "#7FB3FF" }}
          aria-hidden
        />
        <div
          className="animate-glow pointer-events-none absolute bottom-0 left-1/2 h-44 w-44 -translate-x-1/2 translate-y-1/3 rounded-full"
          style={{ backgroundColor: "#7FB3FF" }}
          aria-hidden
        />
        {/* core glow — only visible in the Internal view */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-opacity duration-500"
          style={{ backgroundColor: "#7FB3FF", opacity: internal ? 0.4 : 0 }}
          aria-hidden
        />
        <div
          className={renderHeight ? "relative z-10" : "relative z-10 h-[520px] md:h-[620px]"}
          style={{ aspectRatio: "1600 / 2400", ...(renderHeight ? { height: renderHeight } : {}) }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={deviceSrc}
            alt={deviceAlt}
            className="absolute inset-0 m-auto h-full w-auto object-contain transition-opacity duration-500"
            style={{ opacity: internal ? 0 : 1 }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={INTERNAL_SRC}
            alt="Forth device — glass view revealing the internal components"
            className="absolute inset-0 m-auto h-full w-auto object-contain transition-opacity duration-500"
            style={{ opacity: internal ? 1 : 0 }}
          />
        </div>
      </div>
      <div
        role="group"
        aria-label="Device view"
        className={`z-10 flex items-center gap-1 rounded-full ${groupBg} p-0.5 text-[11px] font-medium tracking-wide`}
      >
        {(swapButtons ? ["internal", "device"] : ["device", "internal"]).map((v) => (
          <button
            key={v}
            aria-pressed={view === v}
            onClick={() => setView(v as "device" | "internal")}
            className={`rounded-full px-3 py-1 capitalize transition-all duration-200 ${view === v ? activeBtn : inactiveBtn}`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
