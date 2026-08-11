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
  // The cone's base is the dome/body seam itself: an arc matching the curved
  // rim of the opaque cylinder (bowing ~3 viewBox units toward the dome at
  // centre). Everything — cone, core, and blur spill — is clipped along that
  // same arc, so at any intensity the light stops exactly where the dark body
  // begins and appears to come solely from the dome.
  // Anchors measured pixel-exact from forth-device-frame-00.png (1600×2400):
  // top seam corners at 12.35% container height (apex 10.8%), bottom seam
  // corners at 88.3% (apex 89.2%). Wrapper is 34% tall, so its seam edge is
  // pinned to the corner height and the arc apex is drawn inside the viewBox.
  const anchor = isTop ? { top: "-21.65%" } : { bottom: "-22.3%" };
  // viewBox is 0 0 100 100; the seam edge is y=100 (top cone) / y=0 (bottom).
  // Body rim corners sit at x=33/67; the far end terminates wide at x=7/93.
  const conePath = isTop
    ? "M 33 100 Q 50 91 67 100 L 93 0 L 7 0 Z"
    : "M 33 0 Q 50 5.3 67 0 L 93 100 L 7 100 Z";
  const clipPath = isTop
    ? "M -30 -60 L 130 -60 L 130 100 L 67 100 Q 50 91 33 100 L -30 100 Z"
    : "M -30 160 L 130 160 L 130 0 L 67 0 Q 50 5.3 33 0 L -30 0 Z";
  const grad = isTop
    ? { x1: "0", y1: "1", x2: "0", y2: "0" }
    : { x1: "0", y1: "0", x2: "0", y2: "1" };
  const coreCy = isTop ? 90 : 10;
  const ids = {
    cone: `uv-cone-${position}`,
    core: `uv-core-${position}`,
    blur: `uv-blur-${position}`,
    clip: `uv-clip-${position}`,
  };
  return (
    <div
      aria-hidden
      className="uv-glow pointer-events-none absolute left-1/2 -translate-x-1/2"
      style={{ ...anchor, width: "112%", height: "34%" }}
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id={ids.cone} {...grad}>
            <stop offset="0" stopColor="rgb(150,205,255)" stopOpacity="0.85" />
            <stop offset="0.48" stopColor="rgb(128,182,255)" stopOpacity="0.35" />
            <stop offset="0.96" stopColor="rgb(128,182,255)" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={ids.core}>
            <stop offset="0" stopColor="rgb(228,244,255)" stopOpacity="0.95" />
            <stop offset="0.45" stopColor="rgb(145,202,255)" stopOpacity="0.55" />
            <stop offset="0.72" stopColor="rgb(145,202,255)" stopOpacity="0" />
          </radialGradient>
          <filter id={ids.blur} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
          <clipPath id={ids.clip}>
            <path d={clipPath} />
          </clipPath>
        </defs>
        {/* blur first, then clip along the seam arc — spill can never cross it */}
        <g clipPath={`url(#${ids.clip})`}>
          <g filter={`url(#${ids.blur})`}>
            <path d={conePath} fill={`url(#${ids.cone})`} />
          </g>
          {/* bright core on the dome where the light exits */}
          <ellipse cx="50" cy={coreCy} rx="17" ry="15" fill={`url(#${ids.core})`} />
        </g>
      </svg>
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
