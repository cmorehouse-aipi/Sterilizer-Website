import { PageShell, Eyebrow, H1, H2, Lead } from "../components/PageShell";

export const metadata = { title: "The Technology — Forth" };

export default function Technology() {
  return (
    <PageShell>
      <header>
        <Eyebrow>The Technology</Eyebrow>
        <H1>UV-C, refracted across twelve faces.</H1>
        <Lead>
          Forth is a 12-faceted geodesic UV-C emitter with multi-directional dose distribution. This page covers the science, the engineering, and the patent.
        </Lead>
      </header>

      <section className="mt-20 grid grid-cols-12 items-start gap-10">
        <div className="col-span-12 md:col-span-7">
          <H2>The wavelength: 265 nanometres.</H2>
          <p className="mt-4 max-w-2xl text-[16px] leading-[1.7] text-neutral-700">
            UV light at 265 nm is the precise wavelength that disrupts microbial DNA. It is the same mechanism municipalities use to treat drinking water at scale, miniaturized into a 32 g cylinder. Independent of bottle material, water clarity, or temperature, the dose-to-kill relationship is well characterized: at &gt; 40 mJ/cm² across the bottle&apos;s interior surface, you achieve ≥ 3-log reduction across bacteria, viruses, and protozoa.
          </p>
          <H2 className="mt-12">The engineering.</H2>
          <p className="mt-4 max-w-2xl text-[16px] leading-[1.7] text-neutral-700">
            Twin geodesic emitters at each end of the device project UV-C through twelve refractive facets. The geometry was optimized in simulation against bottle archetypes (Nalgene, Hydro Flask, soda bottle, hotel glass) to eliminate shadowed water — the failure mode of single-emitter pens.
          </p>
          <H2 className="mt-12">The patent.</H2>
          <p className="mt-4 max-w-2xl text-[16px] leading-[1.7] text-neutral-700">
            Patent application <span className="font-mono text-[14.5px]">GB 24/00000.0</span> — Multi-directional submersible UV-C disinfection device with geodesic refraction. Filed at the UK IPO; PCT pending.
          </p>
        </div>

        {/* Side-view UV-C cross-section diagram */}
        <div className="col-span-12 md:col-span-5">
          <div className="flex flex-col items-center rounded-3xl bg-neutral-50 py-8 ring-1 ring-black/5">
            <svg viewBox="0 0 260 440" className="w-auto" style={{ height: "360px" }} fill="none" aria-hidden>
              <defs>
                <clipPath id="techTopDome">
                  <path d="M 80,136 A 50,50 0 0,1 180,136 Z" />
                </clipPath>
                <clipPath id="techBotDome">
                  <path d="M 80,300 A 50,50 0 0,0 180,300 Z" />
                </clipPath>
              </defs>
              {/* Water fill */}
              <rect x="22" y="18" width="216" height="404" rx="42" fill="#E8F2FB" fillOpacity="0.45" />
              {/* UV rays — top dome */}
              <g stroke="#4B82C8" strokeWidth="0.9" strokeDasharray="4 5" opacity="0.48">
                <line x1="130" y1="86"  x2="130" y2="18" />
                <line x1="105" y1="93"  x2="42"  y2="18" />
                <line x1="105" y1="93"  x2="22"  y2="54" />
                <line x1="87"  y1="111" x2="22"  y2="90" />
                <line x1="80"  y1="136" x2="22"  y2="136" />
                <line x1="80"  y1="136" x2="22"  y2="200" />
                <line x1="87"  y1="111" x2="22"  y2="300" />
                <line x1="105" y1="93"  x2="22"  y2="380" />
                <line x1="155" y1="93"  x2="218" y2="18" />
                <line x1="155" y1="93"  x2="238" y2="54" />
                <line x1="173" y1="111" x2="238" y2="90" />
                <line x1="180" y1="136" x2="238" y2="136" />
                <line x1="180" y1="136" x2="238" y2="200" />
                <line x1="173" y1="111" x2="238" y2="300" />
                <line x1="155" y1="93"  x2="238" y2="380" />
              </g>
              {/* UV rays — bottom dome */}
              <g stroke="#4B82C8" strokeWidth="0.9" strokeDasharray="4 5" opacity="0.48">
                <line x1="130" y1="350" x2="130" y2="422" />
                <line x1="105" y1="343" x2="42"  y2="422" />
                <line x1="105" y1="343" x2="22"  y2="386" />
                <line x1="87"  y1="325" x2="22"  y2="350" />
                <line x1="80"  y1="300" x2="22"  y2="300" />
                <line x1="80"  y1="300" x2="22"  y2="240" />
                <line x1="87"  y1="325" x2="22"  y2="140" />
                <line x1="105" y1="343" x2="22"  y2="60" />
                <line x1="155" y1="343" x2="218" y2="422" />
                <line x1="155" y1="343" x2="238" y2="386" />
                <line x1="173" y1="325" x2="238" y2="350" />
                <line x1="180" y1="300" x2="238" y2="300" />
                <line x1="180" y1="300" x2="238" y2="240" />
                <line x1="173" y1="325" x2="238" y2="140" />
                <line x1="155" y1="343" x2="238" y2="60" />
              </g>
              {/* Bottle outline */}
              <rect x="22" y="18" width="216" height="404" rx="42" stroke="#0F1B2D" strokeWidth="1.2" strokeOpacity="0.15" />
              {/* Body */}
              <rect x="80" y="136" width="100" height="164" fill="#EDEAE2" />
              <line x1="90"  y1="136" x2="90"  y2="300" stroke="#0F1B2D" strokeWidth="0.5" strokeOpacity="0.08" />
              <line x1="170" y1="136" x2="170" y2="300" stroke="#0F1B2D" strokeWidth="0.5" strokeOpacity="0.08" />
              <text x="130" y="221" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" fill="#0F1B2D" fillOpacity="0.22" textAnchor="middle" letterSpacing="4">FORTH</text>
              {/* Top dome fill + glow */}
              <path d="M 80,136 A 50,50 0 0,1 180,136 Z" fill="#D8E2EC" />
              <path d="M 80,136 A 50,50 0 0,1 180,136 Z" fill="#5588BB" fillOpacity="0.12" />
              {/* Top dome geodesic facets (ExplodedReveal pattern rotated 90°) */}
              <g clipPath="url(#techTopDome)" stroke="#0F1B2D" strokeWidth="0.6" strokeOpacity="0.30" fill="none">
                <line x1="80"    y1="136"   x2="103.1" y2="119.7" />
                <line x1="80"    y1="136"   x2="108.9" y2="136" />
                <line x1="180"   y1="136"   x2="156.9" y2="119.7" />
                <line x1="180"   y1="136"   x2="151.1" y2="136" />
                <line x1="84.8"  y1="112.1" x2="103.1" y2="119.7" />
                <line x1="99.2"  y1="94.7"  x2="103.1" y2="119.7" />
                <line x1="99.2"  y1="94.7"  x2="118.5" y2="103.4" />
                <line x1="118.5" y1="86"    x2="118.5" y2="103.4" />
                <line x1="141.5" y1="86"    x2="141.5" y2="103.4" />
                <line x1="160.8" y1="94.7"  x2="141.5" y2="103.4" />
                <line x1="160.8" y1="94.7"  x2="156.9" y2="119.7" />
                <line x1="175.2" y1="112.1" x2="156.9" y2="119.7" />
                <line x1="103.1" y1="119.7" x2="108.9" y2="136" />
                <line x1="103.1" y1="119.7" x2="118.5" y2="103.4" />
                <line x1="108.9" y1="136"   x2="118.5" y2="103.4" />
                <line x1="118.5" y1="103.4" x2="141.5" y2="103.4" />
                <line x1="108.9" y1="136"   x2="151.1" y2="136" />
                <line x1="118.5" y1="103.4" x2="151.1" y2="136" />
                <line x1="141.5" y1="103.4" x2="151.1" y2="136" />
                <line x1="141.5" y1="103.4" x2="156.9" y2="119.7" />
                <line x1="151.1" y1="136"   x2="156.9" y2="119.7" />
              </g>
              <path d="M 80,136 A 50,50 0 0,1 180,136" stroke="#0F1B2D" strokeWidth="1.35" strokeLinecap="round" />
              {/* Bottom dome fill + glow */}
              <path d="M 80,300 A 50,50 0 0,0 180,300 Z" fill="#D8E2EC" />
              <path d="M 80,300 A 50,50 0 0,0 180,300 Z" fill="#5588BB" fillOpacity="0.12" />
              {/* Bottom dome geodesic facets */}
              <g clipPath="url(#techBotDome)" stroke="#0F1B2D" strokeWidth="0.6" strokeOpacity="0.30" fill="none">
                <line x1="80"    y1="300"   x2="103.1" y2="316.3" />
                <line x1="80"    y1="300"   x2="108.9" y2="300" />
                <line x1="180"   y1="300"   x2="156.9" y2="316.3" />
                <line x1="180"   y1="300"   x2="151.1" y2="300" />
                <line x1="84.8"  y1="323.9" x2="103.1" y2="316.3" />
                <line x1="99.2"  y1="341.3" x2="103.1" y2="316.3" />
                <line x1="99.2"  y1="341.3" x2="118.5" y2="332.6" />
                <line x1="118.5" y1="350"   x2="118.5" y2="332.6" />
                <line x1="141.5" y1="350"   x2="141.5" y2="332.6" />
                <line x1="160.8" y1="341.3" x2="141.5" y2="332.6" />
                <line x1="160.8" y1="341.3" x2="156.9" y2="316.3" />
                <line x1="175.2" y1="323.9" x2="156.9" y2="316.3" />
                <line x1="103.1" y1="316.3" x2="108.9" y2="300" />
                <line x1="103.1" y1="316.3" x2="118.5" y2="332.6" />
                <line x1="108.9" y1="300"   x2="118.5" y2="332.6" />
                <line x1="118.5" y1="332.6" x2="141.5" y2="332.6" />
                <line x1="108.9" y1="300"   x2="151.1" y2="300" />
                <line x1="118.5" y1="332.6" x2="151.1" y2="300" />
                <line x1="141.5" y1="332.6" x2="151.1" y2="300" />
                <line x1="141.5" y1="332.6" x2="156.9" y2="316.3" />
                <line x1="151.1" y1="300"   x2="156.9" y2="316.3" />
              </g>
              <path d="M 80,300 A 50,50 0 0,0 180,300" stroke="#0F1B2D" strokeWidth="1.35" strokeLinecap="round" />
              {/* Capsule sides */}
              <line x1="80"  y1="136" x2="80"  y2="300" stroke="#0F1B2D" strokeWidth="1.35" />
              <line x1="180" y1="136" x2="180" y2="300" stroke="#0F1B2D" strokeWidth="1.35" />
              {/* 265 nm annotation */}
              <line x1="105" y1="93" x2="50" y2="44" stroke="#4B82C8" strokeWidth="0.75" strokeOpacity="0.6" />
              <text x="38" y="40" fontFamily="'JetBrains Mono', monospace" fontSize="8.5" fill="#4B82C8" fillOpacity="0.8" textAnchor="middle">265 nm</text>
              {/* Corner brackets */}
              <g stroke="#0F1B2D" strokeOpacity="0.16" strokeWidth="0.8">
                <polyline points="22,34  22,18  38,18" />
                <polyline points="238,34 238,18 222,18" />
                <polyline points="22,406 22,422 38,422" />
                <polyline points="238,406 238,422 222,422" />
              </g>
            </svg>
          </div>
          <p className="mt-3 text-center text-[11.5px] uppercase tracking-[0.18em] text-neutral-500">
            UV-C · geodesic refraction · side cross-section
          </p>
        </div>
      </section>

      <section className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-black/10 md:grid-cols-3">
        {[
          { k: "Dose at center", v: "60 mJ/cm²", note: "with 750 ml clear water at 20 °C" },
          { k: "Log reduction", v: "≥ 3.0", note: "B / V / P (bacteria, viruses, protozoa)" },
          { k: "Cycle time", v: "60 seconds", note: "standard cycle, app-adjustable" },
          { k: "Power draw", v: "0.3 Wh / cycle", note: "induction-charged Li-ion cell" },
          { k: "Materials", v: "Recycled aluminum + PETG dome", note: "domes are user-replaceable" },
          { k: "Compliance", v: "EPA · NSF/ANSI 55", note: "third-party validated" },
        ].map((row) => (
          <div key={row.k} className="bg-white p-7">
            <div className="text-[12px] uppercase tracking-[0.18em] text-neutral-500">{row.k}</div>
            <div className="mt-3 font-serif text-[28px]">{row.v}</div>
            <p className="mt-2 text-[13.5px] text-neutral-600">{row.note}</p>
          </div>
        ))}
      </section>
    </PageShell>
  );
}