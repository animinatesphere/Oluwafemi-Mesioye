import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const ease = "power3.out";

/**
 * Quiet scroll reveal. Used on section headings only, so the page has
 * a few deliberate moments rather than everything sliding in at once.
 */
export function revealOnScroll(targets, options = {}) {
  if (reduced()) {
    gsap.set(targets, { autoAlpha: 1, y: 0 });
    return;
  }
  return gsap.from(targets, {
    y: 26,
    autoAlpha: 0,
    duration: 0.9,
    ease,
    stagger: options.stagger ?? 0.08,
    scrollTrigger: {
      trigger: options.trigger,
      start: options.start ?? "top 82%",
      once: true,
    },
  });
}

export { gsap, ScrollTrigger };
