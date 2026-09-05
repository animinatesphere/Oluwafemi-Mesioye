import { useLayoutEffect, useRef } from "react";
import { gsap, reduced } from "../lib/motion.js";
import { ticker } from "../data/content.js";

export default function Ticker() {
  const track = useRef(null);

  useLayoutEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      gsap.to(".ticker-row", {
        xPercent: -50,
        duration: 34,
        ease: "none",
        repeat: -1,
      });
    }, track);
    return () => ctx.revert();
  }, []);

  const row = [...ticker, ...ticker];

  return (
    <div
      ref={track}
      className="relative overflow-hidden border-y border-line py-5"
      aria-hidden="true"
    >
      <div className="ticker-row flex w-max items-center gap-10 pr-10">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="whitespace-nowrap font-display text-[15px] text-muted">
              {t}
            </span>
            <span className="h-1 w-1 rounded-full bg-violet-soft/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
