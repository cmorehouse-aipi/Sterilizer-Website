"use client";

import { useState } from "react";

/**
 * "Early access / Unlock Coral." — the navy signup box at the bottom of the
 * Shop page, from the consolidated build. DEMO BUILD: no email backend; the
 * form confirms inline and reveals the same demo unlock code the CoralGate
 * accepts (CORAL-EARLY26).
 */
const DEMO_CODE = "CORAL-EARLY26";

export function ShopEarlyAccess() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSentTo(email);
    setEmail("");
  };

  return (
    <section id="early-access" style={{ marginTop: 192 }} className="rounded-3xl bg-a-ink p-8 text-a-bg md:p-12">
      <div className="grid grid-cols-12 items-center gap-8">
        <div className="col-span-12 md:col-span-7">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-a-bg/55">Early access</div>
          <h2 className="mt-3 font-serif text-[32px] leading-tight tracking-tight md:text-[40px]">Unlock Coral.</h2>
          <p className="mt-4 max-w-md text-[14.5px] leading-[1.65] text-a-bg/75">
            Coral is a limited release reserved for our early-access list. Sign up with your email and we&apos;ll send you an unlock code for the Coral colorway.
          </p>
        </div>
        <div className="col-span-12 md:col-span-5">
          <form onSubmit={submit}>
            <label htmlFor="earlyAccessEmail" className="text-[11px] uppercase tracking-[0.18em] text-a-bg/60">
              Email address
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="earlyAccessEmail"
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-full border border-a-bg/30 bg-transparent px-4 py-2.5 text-[14px] text-a-bg placeholder:text-a-bg/40 focus:border-a-bg focus:outline-none"
              />
              <button type="submit" className="shrink-0 rounded-full bg-a-bg px-5 py-2.5 text-[13px] text-a-ink hover:bg-a-bg/85">
                Get code
              </button>
            </div>
            {sentTo && (
              <div className="mt-3 rounded-2xl bg-a-bg/10 p-4 text-[13px] leading-[1.6] text-a-bg/90">
                You&apos;re on the list — a code is on its way to <strong>{sentTo}</strong>.
                <br />
                <span className="opacity-65">
                  (Demo build: no email service is wired up yet, so nothing actually sends. Your test code is <strong>{DEMO_CODE}</strong> — enter it above to see the unlock flow.)
                </span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
