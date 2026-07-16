/**
 * Drop / shake / drink / charge product animation.
 *
 * Ported verbatim from the coworker's consolidated build, where it shipped as a
 * self-contained <iframe srcdoc> document (its own HTML/CSS/JS, entirely
 * CSS-drawn — no image assets). We keep it as a standalone document served from
 * /public and load it through an iframe so it reproduces exactly and its CSS/JS
 * stay isolated from the rest of the site.
 *
 * Frame styling matches the consolidated build exactly: full width of its
 * container, 4:3, 12px radius — designed to sit inside the sticky spec card on
 * the How It Works page.
 */
export function ProductAnimation() {
  return (
    <iframe
      title="How Forth works — drop, shake, drink, charge"
      src="/forth-product-animation.html"
      loading="lazy"
      style={{ width: "100%", aspectRatio: "4 / 3", border: 0, display: "block", borderRadius: 12 }}
    />
  );
}
