"use client";

import { useEffect, useRef } from "react";

const VIDEO_WEBM = "/renderings/forth-device-rotation.webm";
const VIDEO_MP4 = "/renderings/forth-device-rotation.mp4";
const POSTER_SRC = "/renderings/forth-device-frame-00.png";

// One full 360° turn every 10 seconds — slow, continuous, not scroll-driven.
// The clip is 312 frames / 5.2s natural, so playbackRate = natural/10 gives a
// ~31fps effective frame rate at display speed.
const HERO_TURN_MS = 10000;

type Props = { alt: string; heightClass?: string };

/**
 * Slow continuous 360° spin. Preferred path: native loop playback slowed via
 * playbackRate — the browser's own clock drives it, no seek thrash. Fallback
 * (autoplay refused): rAF scrubbing quantized to frame boundaries so we only
 * seek when the displayed frame actually changes.
 */
export function HeroDeviceRotator({ alt, heightClass = "h-[460px] md:h-[560px]" }: Props) {
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
    </div>
  );
}
