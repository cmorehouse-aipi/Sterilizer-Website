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
export function ObjectViewToggle() {
  const [view, setView] = useState<"device" | "internal">("device");
  const internal = view === "internal";

  const activeBtn = "bg-a-bg text-a-ink shadow-sm";
  const inactiveBtn = "text-a-bg/50 hover:text-a-bg/75";

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
        <div className="relative z-10 h-[520px] md:h-[620px]" style={{ aspectRatio: "1600 / 2400" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={DEVICE_SRC}
            alt="Forth device — Midnight"
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
        className="z-10 flex items-center gap-1 rounded-full bg-a-bg/10 p-0.5 text-[11px] font-medium tracking-wide"
      >
        <button
          aria-pressed={!internal}
          onClick={() => setView("device")}
          className={`rounded-full px-3 py-1 transition-all duration-200 ${internal ? inactiveBtn : activeBtn}`}
        >
          Device
        </button>
        <button
          aria-pressed={internal}
          onClick={() => setView("internal")}
          className={`rounded-full px-3 py-1 transition-all duration-200 ${internal ? activeBtn : inactiveBtn}`}
        >
          Internal
        </button>
      </div>
    </div>
  );
}
