import { useLayoutEffect, useRef } from "react";
import { gsap, revealOnScroll } from "../lib/motion.js";
import { practice } from "../data/content.js";

export default function Practice() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealOnScroll(".practice-reveal", {
        trigger: root.current,
        stagger: 0.12,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="practice"
      ref={root}
      className="scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="marker practice-reveal">How I work</p>
            <h2 className="practice-reveal mt-5 max-w-[18ch] font-display text-[2rem] font-medium leading-[1.1] tracking-tight sm:text-[3rem]">
              Three questions, asked in order
            </h2>
          </div>
          <p className="practice-reveal max-w-[38ch] text-[15px] leading-relaxed text-muted">
            Every product decision I make sits under one of these. The skills
            below are the tools I use to answer them.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {practice.map((group, i) => (
            <div
              key={group.stage}
              className="practice-reveal group relative bg-ink p-7 transition-colors duration-500 hover:bg-white/[0.025] sm:p-9"
            >
              <span className="text-[13px] text-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-paper">
                {group.stage}
              </h3>
              <p className="mt-2 text-[15px] italic text-violet-soft/90">
                {group.question}
              </p>

              <ul className="mt-7 space-y-3.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[15px] leading-snug text-muted"
                  >
                    <span className="mt-[9px] h-px w-3 shrink-0 bg-faint transition-colors duration-500 group-hover:bg-violet-soft" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
