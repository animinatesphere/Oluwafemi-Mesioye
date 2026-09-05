import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ease } from "../lib/motion.js";

export default function Loader({ onDone }) {
  const root = useRef(null);
  const bar = useRef(null);
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          onDone?.();
          setGone(true);
        },
      });

      tl.to(counter, {
        v: 100,
        duration: 1.15,
        ease: "power2.inOut",
        onUpdate: () => setCount(Math.round(counter.v)),
      })
        .to(bar.current, { scaleX: 1, duration: 1.15, ease: "power2.inOut" }, 0)
        .to(".loader-line", { y: "-110%", duration: 0.6, ease }, "-=0.15")
        .to(root.current, {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
        });
    }, root);

    return () => ctx.revert();
  }, [onDone]);

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-ink px-5 py-8 sm:px-8 sm:py-10"
      aria-hidden="true"
    >
      <div className="overflow-hidden">
        <p className="loader-line font-display text-lg text-paper">
          Oluwafemi Mesioye
        </p>
      </div>

      <div className="overflow-hidden">
        <div className="loader-line flex items-end justify-between gap-6">
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Product manager. Discovery, delivery, growth.
          </p>
          <span className="font-display text-[16vw] leading-[0.8] tracking-tightest text-paper sm:text-[9vw]">
            {count}
          </span>
        </div>
      </div>

      <div className="mt-6 h-px w-full bg-line">
        <div
          ref={bar}
          className="h-px w-full origin-left scale-x-0 bg-violet-soft"
        />
      </div>
    </div>
  );
}
