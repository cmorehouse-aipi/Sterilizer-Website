"use client";

import { useEffect, useRef } from "react";

const VIDEO_WEBM = "/renderings/forth-device-rotation.webm";
const VIDEO_MP4 = "/renderings/forth-device-rotation.mp4";
const POSTER_SRC = "/renderings/forth-device-frame-00.png";

// One full 360° turn every 10 seconds — slow, continuous, not scroll-driven.
// The clip is 312 frames / 5.2s natural, so playbackRate = natural/10 gives a
// ~31fps effective frame rate at display speed.
const HERO_TURN_MS = 10000;

type Props = { alt: string; heightClass?: string; uvGlow?: boolean };

/**
 * Soft UV-C emission rendered at a dome. Two layers: a wide bloom and a tight
 * bright core, blended with `screen` so they read as light, not paint.
 * Overall strength follows --uv-glow-intensity (0–1).
 */
function DomeGlow({ position }: { position: "top" | "bottom" }) {
  const anchor = position === "top" ? { top: "-4%" } : { bottom: "-4%" };
  return (
    <div
      aria-hidden
      className="uv-glow pointer-events-none absolute left-1/2 -translate-x-1/2"
      style={{ ...anchor, width: "150%", height: "26%" }}
    >
      {/* wide bloom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(112,178,255,0.8) 0%, rgba(112,168,255,0.32) 45%, transparent 72%)",
          filter: "blur(10px)",
        }}
      />
      {/* tight core at the dome itself */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "40%",
          height: "48%",
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(228,244,255,0.98) 0%, rgba(140,200,255,0.6) 45%, transparent 72%)",
          filter: "blur(3px)",
        }}
      />
    </div>
  );
}

/**
 * Slow continuous 360° spin. Preferred path: native loop playback slowed via
 * playbackRate — the browser's own clock drives it, no seek thrash. Fallback
 * (autoplay refused): rAF scrubbing quantized to frame boundaries so we only
 * seek when the displayed frame actually changes.
 */
export function HeroDeviceRotator({ alt, heightClass = "h-[460px] md:h-[560px]", uvGlow = false }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const startSpin = () => {
      const dur = v.duration;
      if (!dur || !isFinite(dur)) return;
      v.playbackRate = (dur * 1000) / HERO_TURN_MS;
      const p = v.play();
      if (p && p.catch) {
        p.catch(() => {
          // Autoplay refused — drive frames manually at the same speed.
          const FPS = 60;
          const nFrames = Math.round(dur * FPS);
          let lastF = -1;
          const t0 = performance.now();
          const tick = (now: number) => {
            const f = Math.floor(((now - t0) / HERO_TURN_MS) * nFrames) % nFrames;
            if (f !== lastF) {
              lastF = f;
              try { v.currentTime = f / FPS; } catch {}
            }
            rafRef.current = requestAnimationFrame(tick);
          };
          rafRef.current = requestAnimationFrame(tick);
        });
      }
    };

    v.muted = true;
    v.loop = true;
    v.addEventListener("loadedmetadata", startSpin);
    if (v.readyState >= 1) {
      startSpin();
    } else {
      try { v.load(); } catch {}
    }

    return () => {
      v.removeEventListener("loadedmetadata", startSpin);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      try { v.pause(); } catch {}
    };
  }, []);

  return (
    <div
      className={`relative w-auto ${heightClass}`}
      style={{ aspectRatio: "1600 / 2400", backgroundColor: "transparent" }}
    >
      <video
        ref={videoRef}
        muted
        playsInline
        loop
        preload="auto"
        poster={POSTER_SRC}
        aria-label={alt}
        style={{
          backgroundColor: "transparent",
          position: "absolute",
          inset: 0,
          margin: "auto",
          height: "100%",
          width: "auto",
          objectFit: "contain",
        }}
      >
        <source src={VIDEO_WEBM} type="video/webm" />
        <source src={VIDEO_MP4} type="video/mp4" />
      </video>
      {uvGlow && (
        <>
          <DomeGlow position="top" />
          <DomeGlow position="bottom" />
        </>
      )}
    </div>
  );
}
