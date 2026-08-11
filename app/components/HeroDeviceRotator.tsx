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
 * UV-C emission through a transparent dome. The source sits inside the opaque
 * housing, so the light projects axially — a cone that leaves the dome narrow
 * and widens as it travels away from the device, fading with distance. A tight
 * bright core sits on the dome itself where the light exits.
 * Overall strength follows --uv-glow-intensity (0–1).
 */
function DomeGlow({ position }: { position: "top" | "bottom" }) {
  const isTop = position === "top";
  // Cone sits just outside the dome and points away from the device.
  const anchor = isTop ? { top: "-26%" } : { bottom: "-26%" };
  const coneGradient = isTop
    ? "linear-gradient(to top, rgba(150,205,255,0.85) 0%, rgba(128,182,255,0.35) 48%, transparent 96%)"
    : "linear-gradient(to bottom, rgba(150,205,255,0.85) 0%, rgba(128,182,255,0.35) 48%, transparent 96%)";
  // Narrow at the dome (where it exits), wide at the far end.
  const coneClip = isTop
    ? "polygon(35% 100%, 65% 100%, 97% 0%, 3% 0%)"
    : "polygon(35% 0%, 65% 0%, 97% 100%, 3% 100%)";
  const coreAnchor = isTop ? { bottom: "-2%" } : { top: "-2%" };
  return (
    <div
      aria-hidden
      className="uv-glow pointer-events-none absolute left-1/2 -translate-x-1/2"
      style={{ ...anchor, width: "88%", height: "28%" }}
    >
      {/* upward/downward cone — blur wraps the clipped shape so edges stay soft */}
      <div className="absolute inset-0" style={{ filter: "blur(9px)" }}>
        <div className="absolute inset-0" style={{ background: coneGradient, clipPath: coneClip }} />
      </div>
      {/* bright core on the dome where the light exits */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          ...coreAnchor,
          width: "34%",
          height: "30%",
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(228,244,255,0.95) 0%, rgba(145,202,255,0.55) 45%, transparent 72%)",
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
