import Link from "next/link";

import { BRAND } from "../../lib/brand";
import { OptionAShell } from "../_components/OptionAShell";
import { display } from "../_components/display";

export const metadata = { title: `About — ${BRAND} · Option A` };

export default function OptionAAbout() {
  return (
    <OptionAShell>
      {/* ————— Waterfall hero band ————— */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/photos/waterfall-divider.jpg)" }} />
        <div className="absolute inset-0 bg-[#0F1B2D]/45" />
        <div className="relative mx-auto flex min-h-[62vh] max-w-[860px] flex-col items-center justify-center px-6 py-24 text-center text-[#F2EFE8]">
          <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-[#F2EFE8]/70">our story</p>
          <h1 className={`${display} mt-5 text-[clamp(40px,6vw,80px)]`}>Born of the Highlands</h1>
          <p className="mt-6 font-serif text-[clamp(20px,2.8vw,30px)] italic leading-snug">
            Engineered and assembled in a workshop above the Firth of Forth. The first water it ever
            cleaned came out of a Highland burn.
          </p>
        </div>
      </section>

      {/* ————— The story ————— */}
      <section className="bg-grain bg-a-bg">
        <div className="mx-auto grid max-w-[1240px] gap-14 px-6 py-24 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="flex flex-col gap-14">
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-a-ink/50">why we built it</p>
              <h2 className={`${display} mt-4 text-[clamp(32px,4.2vw,52px)]`}>A small, real problem</h2>
              <p className="mt-5 max-w-[560px] font-serif text-[17px] leading-relaxed text-a-ink/75">
                {BRAND} was started in Edinburgh in 2024 after one too many trips spent rationing bottled
                water. The category had two products: a 2008-era pen that looks like a medical device,
                and a $130 bottle that locks you into one container. Neither felt right. The insight was
                simple — if the sterilizer is small enough, it drops into the bottle you already love.
              </p>
            </div>
            <div>
              <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-a-ink/50">where we&rsquo;re going</p>
              <h2 className={`${display} mt-4 text-[clamp(32px,4.2vw,52px)]`}>A category, not a SKU</h2>
              <p className="mt-5 max-w-[560px] font-serif text-[17px] leading-relaxed text-a-ink/75">
                The sterilizer is the first product, not the last. Replacement domes, travel cases, and a
                B2B offering for hotels and humanitarian distribution are on the roadmap. We are
                deliberately patient about expansion.
              </p>
            </div>
          </div>

          <aside className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-2xl ring-1 ring-a-ink/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/photos/moor-story.jpg" alt="The Scottish moor" className="h-[340px] w-full object-cover" />
            </div>
            <div className="rounded-2xl bg-white/50 p-7 ring-1 ring-a-ink/10">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-a-ink/50">contact</p>
              <p className="mt-3 font-serif text-[16px] leading-relaxed text-a-ink/80">
                {BRAND} Ltd
                <br />
                11 East Crosscauseway
                <br />
                Edinburgh EH8 9HE
                <br />
                hello@forth.co
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ————— Mission band ————— */}
      <section className="bg-[#22333E] text-[#EAF1F2]">
        <div className="mx-auto max-w-[860px] px-6 py-24 text-center">
          <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-[#EAF1F2]/60">the mission</p>
          <p className="mt-6 font-serif text-[clamp(22px,3vw,34px)] italic leading-snug">
            Make safe drinking water available wherever a bottle is.
          </p>
          <Link
            href="/option-a/shop"
            className="mt-10 inline-block rounded-full bg-[#C7D4D6] px-8 py-4 text-[14px] font-bold uppercase tracking-wide text-[#22333E] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#d6e0e1]"
          >
            Reserve yours — from $79
          </Link>
        </div>
      </section>
    </OptionAShell>
  );
}
