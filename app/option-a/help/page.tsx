import Link from "next/link";

import { BRAND, FAQS } from "../../lib/brand";
import { OptionAShell } from "../_components/OptionAShell";
import { display } from "../_components/display";

export const metadata = { title: `Help — ${BRAND} · Option A` };

export default function OptionAHelp() {
  return (
    <OptionAShell>
      {/* ————— Header ————— */}
      <section className="bg-grain bg-a-bg">
        <div className="mx-auto max-w-[1240px] px-6 pb-16 pt-20 text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-a-ink/50">help &amp; faq</p>
          <h1 className={`${display} mt-4 text-[clamp(44px,6.4vw,88px)]`}>Answers, briefly</h1>
          <p className="mt-3 font-serif text-[clamp(19px,2.4vw,27px)] italic text-a-ink/75">
            most things people ask, in under fifty words
          </p>
        </div>
      </section>

      {/* ————— FAQ ————— */}
      <section className="bg-grain bg-a-bg">
        <div className="mx-auto max-w-[860px] px-6 pb-24">
          <div className="divide-y divide-a-ink/10 rounded-2xl bg-white/50 ring-1 ring-a-ink/10">
            {FAQS.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                  <span className={`${display} text-[19px] leading-snug`}>{f.q}</span>
                  <span className="shrink-0 text-a-ink/40 transition-transform duration-200 group-open:rotate-45">＋</span>
                </summary>
                <p className="mt-4 max-w-2xl font-serif text-[15.5px] leading-relaxed text-a-ink/75">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ————— Support band ————— */}
      <section className="bg-[#22333E] text-[#EAF1F2]">
        <div className="mx-auto max-w-[760px] px-6 py-20 text-center">
          <h2 className={`${display} text-[clamp(30px,5vw,58px)]`}>Still stuck?</h2>
          <p className="mx-auto mt-4 max-w-[480px] font-serif text-[clamp(17px,2.2vw,22px)] italic text-[#EAF1F2]/80">
            email support@forth.co — typical response is under four hours
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:support@forth.co"
              className="rounded-full bg-[#C7D4D6] px-8 py-4 text-[14px] font-bold uppercase tracking-wide text-[#22333E] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#d6e0e1]"
            >
              Email support
            </a>
            <Link
              href="/option-a/how-it-works"
              className="rounded-full bg-white/10 px-8 py-4 text-[14px] font-semibold tracking-wide text-[#EAF1F2] ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-white/15"
            >
              How {BRAND} works
            </Link>
          </div>
        </div>
      </section>
    </OptionAShell>
  );
}
