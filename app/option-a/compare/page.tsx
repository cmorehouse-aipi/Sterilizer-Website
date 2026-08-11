import Link from "next/link";

import { BRAND, COMPARE_ROWS } from "../../lib/brand";
import { OptionAShell } from "../_components/OptionAShell";
import { display } from "../_components/display";

export const metadata = { title: `Compare — ${BRAND} · Option A` };

// Option A pricing supersedes the shared table data.
const ROWS = COMPARE_ROWS.map((r) =>
  r.label === "Price" ? { ...r, forth: "From $79" } : r
);

export default function OptionACompare() {
  return (
    <OptionAShell>
      {/* ————— Header ————— */}
      <section className="bg-grain bg-a-bg">
        <div className="mx-auto max-w-[1240px] px-6 pb-16 pt-20 text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-a-ink/50">compare</p>
          <h1 className={`${display} mt-4 text-[clamp(40px,6vw,84px)]`}>Side by side</h1>
          <p className="mt-3 font-serif text-[clamp(19px,2.4vw,27px)] italic text-a-ink/75">
            we&rsquo;re honest about where the others win a row — credibility compounds
          </p>
        </div>
      </section>

      {/* ————— Table ————— */}
      <section className="bg-grain bg-a-bg">
        <div className="mx-auto max-w-[1240px] px-6 pb-24">
          <div className="overflow-x-auto rounded-2xl bg-white/50 ring-1 ring-a-ink/10">
            <table className="w-full min-w-[620px] text-left text-[14.5px]">
              <thead>
                <tr className="font-mono text-[11px] uppercase tracking-[0.18em] text-a-ink/50">
                  <th className="px-6 py-5"></th>
                  <th className="border-l-2 border-r-2 border-t-2 border-a-sage/50 bg-a-sage/15 px-6 py-5 text-a-ink">
                    {BRAND}
                  </th>
                  <th className="px-6 py-5">SteriPen Ultra</th>
                  <th className="px-6 py-5">LARQ Bottle</th>
                  <th className="px-6 py-5">Aquatabs</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.label} className="group border-t border-a-ink/10">
                    <td className="px-6 py-5 font-serif italic text-a-ink/60">{row.label}</td>
                    <td className="border-l-2 border-r-2 border-a-sage/50 bg-a-sage/15 px-6 py-5 font-medium group-last:border-b-2">
                      {row.forth}
                    </td>
                    <td className="px-6 py-5 text-a-ink/70">{row.steripen}</td>
                    <td className="px-6 py-5 text-a-ink/70">{row.larq}</td>
                    <td className="px-6 py-5 text-a-ink/70">{row.tabs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ————— Moor band ————— */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/photos/moor-story.jpg)" }} />
        <div className="absolute inset-0 bg-[#0F1B2D]/45" />
        <div className="relative mx-auto flex min-h-[52vh] max-w-[860px] flex-col items-center justify-center px-6 py-24 text-center text-[#F2EFE8]">
          <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-[#F2EFE8]/70">why it&rsquo;s different</p>
          <p className="mt-6 font-serif text-[clamp(24px,3.4vw,38px)] italic leading-snug">
            Better technology, in a better object, at a fairer price.
          </p>
          <Link
            href="/option-a/shop"
            className="mt-10 rounded-full bg-[#F2EFE8] px-7 py-3.5 text-[14px] font-semibold tracking-wide text-[#0F1B2D] transition hover:-translate-y-0.5"
          >
            Reserve yours — from $79
          </Link>
        </div>
      </section>
    </OptionAShell>
  );
}
