/**
 * Drop / shake / drink / charge product animation.
 *
 * Ported verbatim from the coworker's consolidated build, where it shipped as a
 * self-contained <iframe srcdoc> document (its own HTML/CSS/JS, entirely
 * CSS-drawn — no image assets). We keep it as a standalone document served from
 * /public and load it through an iframe so it reproduces exactly and its CSS/JS
 * stay isolated from the rest of the site.
 */
export function ProductAnimation() {
  return (
    <section className="mt-10" aria-label="How Forth works — drop, shake, drink, charge">
      <iframe
        title="How Forth works — drop, shake, drink, charge"
        src="/forth-product-animation.html"
        loading="lazy"
        className="block w-full rounded-xl ring-1 ring-black/5"
        style={{ aspectRatio: "4 / 3", border: 0 }}
      />
    </section>
  );
}
