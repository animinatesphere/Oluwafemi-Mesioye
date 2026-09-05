import { useLayoutEffect, useRef } from "react";
import { gsap, revealOnScroll, reduced } from "../lib/motion.js";
import { profile } from "../data/content.js";

export default function Contact() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealOnScroll(".contact-reveal", { trigger: root.current, stagger: 0.1 });

      if (reduced()) return;
      gsap.to(".contact-glow", {
        scale: 1.15,
        opacity: 0.75,
        duration: 6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const lines = [
    { k: "Email", v: profile.email, href: `mailto:${profile.email}` },
    {
      k: "Phone",
      v: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
    },
    ...(profile.linkedin
      ? [{ k: "LinkedIn", v: "Connect on LinkedIn", href: profile.linkedin }]
      : []),
    { k: "Location", v: profile.address },
  ];

  return (
    <section
      id="contact"
      ref={root}
      className="relative scroll-mt-24 overflow-hidden border-t border-line py-24 sm:py-32"
    >
      <div className="contact-glow pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/15 blur-[140px]" />

      <div className="shell relative">
        <p className="marker contact-reveal">Contact</p>

        <h2 className="contact-reveal mt-6 max-w-[16ch] font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tightest sm:text-[4.6rem]">
          Have a product that needs direction?
        </h2>

        <a
          href={`mailto:${profile.email}`}
          className="contact-reveal link-underline mt-8 inline-block font-display text-[1.4rem] text-violet-soft sm:text-[2rem]"
        >
          {profile.email}
        </a>

        <ul className={`contact-reveal mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 ${
            lines.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}>
          {lines.map((l) => (
            <li key={l.k} className="bg-ink p-6">
              <p className="text-[13px] text-faint">{l.k}</p>
              {l.href ? (
                <a
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="link-underline mt-2 block text-[15px] leading-snug text-paper"
                >
                  {l.v}
                </a>
              ) : (
                <p className="mt-2 text-[15px] leading-snug text-paper">{l.v}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
