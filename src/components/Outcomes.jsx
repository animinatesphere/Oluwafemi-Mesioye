import { useLayoutEffect, useRef } from "react";
import { gsap, revealOnScroll, reduced } from "../lib/motion.js";
import { outcomes } from "../data/content.js";

export default function Outcomes() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealOnScroll(".outcome-head", { trigger: root.current, stagger: 0.1 });

      if (reduced()) return;

      gsap.utils.toArray(".metric-value").forEach((el) => {
        const target = Number(el.dataset.value);
        const suffix = el.dataset.suffix || "";
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.v) + suffix;
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="outcomes"
      ref={root}
      className="scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="marker outcome-head">Outcomes</p>
            <h2 className="outcome-head mt-5 max-w-[20ch] font-display text-[2rem] font-medium leading-[1.1] tracking-tight sm:text-[3rem]">
              What changed when the work shipped
            </h2>
          </div>
          <p className="outcome-head max-w-[32ch] text-[15px] leading-relaxed text-muted">
            Recorded as {outcomes.source}.
          </p>
        </div>

        <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.metrics.map((m) => (
            <div key={m.label} className="border-t border-line pt-6">
              <p
                className="metric-value font-display text-[3.4rem] font-semibold leading-none tracking-tightest text-paper sm:text-[4rem]"
                data-value={m.value}
                data-suffix={m.suffix}
              >
                {m.value}
                {m.suffix}
              </p>
              <p className="mt-4 text-[16px] text-paper">{m.label}</p>
              <p className="mt-1.5 max-w-[34ch] text-[14px] leading-relaxed text-faint">
                {m.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
