import { useLayoutEffect, useRef, useState } from "react";
import { gsap, revealOnScroll, reduced, ScrollTrigger } from "../lib/motion.js";
import { experience } from "../data/content.js";

function Role({ item, index, open, onToggle }) {
  const body = useRef(null);
  const inner = useRef(null);

  useLayoutEffect(() => {
    const el = body.current;
    if (!el) return;
    if (reduced()) {
      el.style.height = open ? "auto" : "0px";
      el.style.opacity = open ? 1 : 0;
      return;
    }
    const h = inner.current.offsetHeight;
    const tween = gsap.to(el, {
      height: open ? h : 0,
      opacity: open ? 1 : 0,
      duration: 0.55,
      ease: "power3.inOut",
      onComplete: () => {
        if (open) el.style.height = "auto";
        ScrollTrigger.refresh();
      },
    });
    return () => tween.kill();
  }, [open]);

  return (
    <div className="work-reveal border-t border-line">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="group grid w-full grid-cols-[auto_1fr_auto] items-start gap-4 py-7 text-left sm:gap-8"
      >
        <span className="pt-1.5 text-[13px] tabular-nums text-faint">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span>
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-display text-[1.45rem] font-medium leading-tight tracking-tight text-paper transition-colors duration-300 group-hover:text-violet-soft sm:text-[2rem]">
              {item.company}
            </span>
            {item.current && (
              <span className="rounded-full border border-violet-soft/40 px-2.5 py-0.5 text-[11px] text-violet-soft">
                Current
              </span>
            )}
          </span>
          <span className="mt-2 block text-[15px] text-muted">{item.role}</span>
          <span className="mt-1 block text-[13px] text-faint">
            {item.place} · {item.sector}
          </span>
        </span>

        <span className="flex items-center gap-4 pt-1.5">
          <span className="hidden whitespace-nowrap text-[13px] text-faint sm:block">
            {item.period}
          </span>
          <span className="relative block h-3 w-3 shrink-0">
            <span className="absolute left-0 top-1/2 h-px w-3 bg-paper" />
            <span
              className={`absolute left-0 top-1/2 h-px w-3 bg-paper transition-transform duration-500 ${
                open ? "rotate-0" : "rotate-90"
              }`}
            />
          </span>
        </span>
      </button>

      <div ref={body} className="h-0 overflow-hidden opacity-0">
        <div ref={inner} className="pb-9 sm:pl-[3.4rem]">
          <p className="mb-5 text-[13px] text-faint sm:hidden">{item.period}</p>
          <ul className="grid gap-4 md:grid-cols-2 md:gap-x-10">
            {item.bullets.map((b, i) => (
              <li
                key={i}
                className="flex gap-3 text-[15px] leading-relaxed text-muted"
              >
                <span className="mt-[10px] h-1 w-1 shrink-0 rounded-full bg-violet-soft/70" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const root = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealOnScroll(".work-head", { trigger: root.current, stagger: 0.1 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={root}
      className="scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="marker work-head">Work</p>
            <h2 className="work-head mt-5 max-w-[20ch] font-display text-[2rem] font-medium leading-[1.1] tracking-tight sm:text-[3rem]">
              Products, teams and operations I've owned
            </h2>
          </div>
          <div className="space-y-4">
            <p className="work-head max-w-[34ch] text-[15px] leading-relaxed text-muted">
              Open a role to read what the work actually involved.
            </p>
            <p className="work-head max-w-[34ch] text-[13px] leading-relaxed text-faint">
              From founding roles at early-stage startups to managing complex
              product operations at scale, I've led cross-functional teams
              through discovery, delivery, and growth phases.
            </p>
          </div>
        </div>

        <div className="mt-14 border-b border-line">
          {experience.map((item, i) => (
            <Role
              key={item.company}
              item={item}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
