import Link from "next/link";

import { BRAND } from "../../lib/brand";
import { ObjectViewToggle } from "../../components/ObjectViewToggle";
import { OptionAShell } from "../_components/OptionAShell";
import { display } from "../_components/display";

export const metadata = { title: `The Technology — ${BRAND} · Option A` };

const STATS = [
  { k: "Dose at center", v: "60 mJ/cm²", note: "with 750 ml clear water at 20 °C" },
  { k: "Log reduction", v: "≥ 3.0", note: "bacteria, viruses, protozoa" },
  { k: "Cycle time", v: "60 sec", note: "standard cycle, app-adjustable" },
  { k: "Power draw", v: "0.3 Wh", note: "per cycle, induction-charged Li-ion" },
  { k: "Materials", v: "Alu + PETG", note: "recycled body, user-replaceable domes" },
  { k: "Compliance", v: "EPA · NSF 55", note: "third-party validated" },
];

export default function OptionATechnology() {
  return (
    <OptionAShell>
      {/* ————— Navy hero with the internal render ————— */}
      <section className="bg-[#22333E] text-[#EAF1F2]">
        <div className="mx-auto grid max-w-[1240px] items-center gap-14 px-6 py-24 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
            <ObjectViewToggle defaultView="internal" swapButtons />
          </div>
          <div className="order-1 text-left lg:order-2">
            <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-[#EAF1F2]/60">the technology</p>
            <h1 className={`${display} mt-4 text-[clamp(44px,6vw,84px)]`}>265 nanometres</h1>
            <p className="mt-5 max-w-[520px] font-serif text-[clamp(19px,2.2vw,25px)] italic text-[#EAF1F2]/80">
              the wavelength microbial DNA cannot survive
            </p>
            <p className="mt-8 max-w-[560px] font-serif text-[16.5px] leading-relaxed text-[#EAF1F2]/70">
              It is the same mechanism municipalities use to treat drinking water at scale, miniaturised
              into a 32-gram cylinder. Independent of bottle material, clarity, or temperature, the
              dose-to-kill relationship is well characterised: above 40 mJ/cm² across the bottle&rsquo;s
              interior, you achieve a ≥ 3-log reduction across bacteria, viruses, and protozoa.
            </p>
          </div>
        </div>
      </section>

      {/* ————— Engineering + patent ————— */}
      <section className="bg-grain bg-a-bg">
        <div className="mx-auto grid max-w-[1240px] gap-14 px-6 py-24 lg:grid-cols-2">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-a-ink/50">the engineering</p>
            <h2 className={`${display} mt-4 text-[clamp(34px,4.4vw,56px)]`}>Twelve faces, no shadows</h2>
            <p className="mt-5 max-w-[520px] font-serif text-[17px] leading-relaxed text-a-ink/75">
              Twin geodesic emitters at each end of the device project UV-C through twelve refractive
              facets. The geometry was optimised in simulation against bottle archetypes — Nalgene,
              Hydro Flask, soda bottle, hotel glass — to eliminate shadowed water, the failure mode of
              single-emitter pens.
            </p>
          </div>
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-a-ink/50">the patent</p>
            <h2 className={`${display} mt-4 text-[clamp(34px,4.4vw,56px)]`}>On the record</h2>
            <p className="mt-5 max-w-[520px] font-serif text-[17px] leading-relaxed text-a-ink/75">
              Patent application <span className="font-mono text-[14.5px] not-italic">GB 24/00000.0</span> —
              multi-directional submersible UV-C disinfection device with geodesic refraction. Filed at
              the UK IPO; PCT pending. Built on a wavelength microbiology has studied for sixty years.
            </p>
          </div>
        </div>
      </section>

      {/* ————— Stats grid ————— */}
      <section className="bg-grain bg-a-bg">
        <div className="mx-auto max-w-[1240px] px-6 pb-24">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STATS.map((s) => (
              <li key={s.k} className="rounded-2xl bg-white/50 px-6 py-7 ring-1 ring-a-ink/10">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-a-ink/50">{s.k}</div>
                <div className={`${display} mt-3 text-[32px]`}>{s.v}</div>
                <p className="mt-2 font-serif text-[14px] italic text-a-ink/65">{s.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ————— Sunset band: cited ————— */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/photos/storr-sunset.jpg)" }} />
        <div className="absolute inset-0 bg-[#0F1B2D]/45" />
        <div className="relative mx-auto flex min-h-[56vh] max-w-[860px] flex-col items-center justify-center px-6 py-24 text-center text-[#F2EFE8]">
          <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-[#F2EFE8]/70">cited, on the record</p>
          <p className="mt-6 font-serif text-[clamp(22px,3vw,34px)] italic leading-snug">
            Three peer-reviewed papers on the same band the device operates within. UV light at 265 nm
            disrupts microbial DNA — the science has been settled for decades; we made it pocketable.
          </p>
          <Link
            href="/option-a/compare"
            className="mt-10 rounded-full bg-[#F2EFE8] px-7 py-3.5 text-[14px] font-semibold tracking-wide text-[#0F1B2D] transition hover:-translate-y-0.5"
          >
            See how it compares
          </Link>
        </div>
      </section>
    </OptionAShell>
  );
}
