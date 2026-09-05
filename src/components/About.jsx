import { useLayoutEffect, useRef } from "react";
import { gsap, revealOnScroll, reduced } from "../lib/motion.js";
import { about, closingLine, profile } from "../data/content.js";

const facts = [
  { k: "Experience", v: "3+ years in product" },
  { k: "Sectors", v: "Education, health, analytics, mobility, retail" },
  { k: "Ways of working", v: "Agile, Scrum, evidence-based management" },
  { k: "Based in", v: "Ogun State, Nigeria — working remotely" },
];

export default function About() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealOnScroll(".about-reveal", { trigger: root.current, stagger: 0.1 });

      if (!reduced()) {
        gsap.from(".fact-rule", {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".fact-list", start: "top 85%", once: true },
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="shell scroll-mt-24 py-24 sm:py-32">
      <p className="marker about-reveal">About</p>

      <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 className="about-reveal font-display text-[2rem] font-medium leading-[1.15] tracking-tight sm:text-[2.6rem]">
            {profile.summary.split(".")[0]}.
          </h2>

          <div className="mt-8 space-y-6">
            {about.map((p, i) => (
              <p
                key={i}
                className="about-reveal max-w-[68ch] text-[16px] leading-[1.75] text-muted"
              >
                {p}
              </p>
            ))}
          </div>

          <blockquote className="about-reveal mt-10 border-l border-violet-soft/60 pl-5 text-[17px] leading-relaxed text-paper">
            {closingLine}
          </blockquote>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <ul className="fact-list space-y-6">
            {facts.map((f) => (
              <li key={f.k} className="about-reveal">
                <div className="fact-rule h-px w-full bg-line" />
                <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                  <span className="text-[13px] text-faint">{f.k}</span>
                  <span className="text-[15px] text-paper sm:max-w-[62%] sm:text-right">
                    {f.v}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
