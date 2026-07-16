"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Coral "limited release" unlock gate — ported as-is from the coworker's build.
 *
 * DEMO BUILD: there is no email backend. The signup form sends nothing and the
 * UI openly reveals the unlock code, exactly as the coworker shipped it. Enter
 * CORAL-EARLY26 to unlock; the unlocked state persists in localStorage.
 */
const STORAGE_KEY = "forth_coral_unlocked";
const DEMO_CODE = "CORAL-EARLY26";
const HANDLE = "forth-1-coral";
const RENDER = "/renderings/forth-device-coral-frame-00.png";

export function CoralGate() {
  const [unlocked, setUnlocked] = useState(false);
  const [open, setOpen] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [signupEmail, setSignupEmail] = useState("");
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);

  useEffect(() => {
    try {
      setUnlocked(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const doUnlock = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setUnlocked(true);
    setOpen(false);
  };

  const submitSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupEmail) return;
    setSentTo(signupEmail);
    setShowCode(true);
    setSignupEmail("");
  };

  const submitCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === DEMO_CODE) doUnlock();
    else setCodeError(true);
  };

  const cardInner = (
    <>
      <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-a-rule/40 to-a-bg">
        <div className="grid h-full place-items-center">
          <div className="flex h-full w-full items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={RENDER}
              alt="Forth — Coral"
              className={`max-h-[88%] max-w-[88%] transition-[filter] duration-500 ${unlocked ? "" : "blur-md"}`}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 flex items-end justify-between">
        <div>
          <div className="font-serif text-[20px] tracking-tight">Forth — Coral</div>
          <div className="mt-0.5 text-[13px] text-neutral-500">
            {unlocked ? "Limited release" : "Limited release · click to unlock"}
          </div>
        </div>
        <div className="text-[14px] font-medium text-neutral-900">$44</div>
      </div>
    </>
  );

  return (
    <>
      {unlocked ? (
        <Link
          href={`/shop/${HANDLE}`}
          className="group rounded-3xl bg-white/50 p-5 ring-1 ring-black/5 transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-0.5"
        >
          {cardInner}
        </Link>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative rounded-3xl bg-white/50 p-5 text-left ring-1 ring-black/5 transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-0.5"
        >
          {cardInner}
          <span className="pointer-events-none absolute right-7 top-7 rounded-full bg-a-ink/85 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
            Locked
          </span>
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} aria-hidden />
          <div className="relative z-10 w-full max-w-md rounded-3xl bg-a-bg p-8 shadow-2xl ring-1 ring-black/10">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-5 top-5 text-[18px] leading-none text-neutral-400 hover:text-neutral-700"
            >
              ✕
            </button>
            <div className="font-serif text-[26px] leading-tight tracking-tight">Coral — limited release</div>
            <p className="mt-2 text-[14px] leading-relaxed text-neutral-600">
              Coral is reserved for our early-access list. Sign up with your email and we&apos;ll send you an unlock code.
            </p>

            <form onSubmit={submitSignup} className="mt-5 flex gap-2">
              <input
                type="email"
                required
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-full border border-black/15 bg-white px-4 py-2 text-[14px] outline-none focus:border-a-ink"
              />
              <button type="submit" className="shrink-0 rounded-full bg-a-ink px-4 py-2 text-[13px] font-medium text-white">
                Notify me
              </button>
            </form>

            {sentTo && (
              <p className="mt-3 text-[13px] leading-relaxed text-neutral-600">
                You&apos;re on the list — a code is on its way to <strong>{sentTo}</strong>.
                <br />
                <span className="opacity-65">
                  (Demo build: no email service is wired up yet, so nothing actually sends. Your test code is{" "}
                  <strong>{DEMO_CODE}</strong> — enter it below to see the unlock flow.)
                </span>
              </p>
            )}

            {!showCode && (
              <button
                type="button"
                onClick={() => setShowCode(true)}
                className="mt-4 text-[13px] text-neutral-600 underline underline-offset-4 hover:text-a-ink"
              >
                Already have a code? Enter it →
              </button>
            )}

            {showCode && (
              <form onSubmit={submitCode} className="mt-5 border-t border-black/10 pt-4">
                <label className="text-[12px] font-medium uppercase tracking-[0.14em] text-neutral-500">Unlock code</label>
                <div className="mt-2 flex gap-2">
                  <input
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setCodeError(false);
                    }}
                    placeholder="CORAL-EARLY26"
                    className="min-w-0 flex-1 rounded-full border border-black/15 bg-white px-4 py-2 text-[14px] uppercase tracking-wide outline-none focus:border-a-ink"
                  />
                  <button type="submit" className="shrink-0 rounded-full bg-a-ink px-4 py-2 text-[13px] font-medium text-white">
                    Unlock
                  </button>
                </div>
                {codeError && <p className="mt-2 text-[13px] text-red-600">That code doesn&apos;t look right — try again.</p>}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
