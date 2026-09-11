import { useLayoutEffect, useRef } from "react";
import { gsap, revealOnScroll, reduced } from "../lib/motion.js";
import { roadmap } from "../data/content.js";

const roadmapImages = [
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
];

export default function Roadmap() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealOnScroll(".roadmap-reveal", {
        trigger: root.current,
        stagger: 0.08,
      });

      if (reduced()) return;
      gsap.to(".roadmap-glow", {
        scale: 1.1,
        opacity: 0.5,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "in-progress":
        return "border-violet-soft bg-violet/5";
      case "planned":
        return "border-amber bg-amber/5";
      case "future":
        return "border-line bg-white/[0.02]";
      default:
        return "border-line bg-white/[0.02]";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "in-progress":
        return (
          <span className="inline-flex items-center gap-2 rounded-full bg-violet/20 px-3 py-1 text-[12px] font-medium text-violet-soft">
            <span className="h-2 w-2 rounded-full bg-violet-soft animate-pulse" />
            Active
          </span>
        );
      case "planned":
        return (
          <span className="inline-flex items-center gap-2 rounded-full bg-amber/20 px-3 py-1 text-[12px] font-medium text-amber">
            <span className="h-2 w-2 rounded-full bg-amber" />
            Planned
          </span>
        );
      case "future":
        return (
          <span className="inline-flex items-center gap-2 rounded-full bg-faint/20 px-3 py-1 text-[12px] font-medium text-faint">
            <span className="h-2 w-2 rounded-full bg-faint" />
            Future
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="roadmap"
      ref={root}
      className="relative scroll-mt-24 overflow-hidden border-t border-line py-24 sm:py-32"
    >
      <div className="roadmap-glow pointer-events-none absolute right-0 top-1/2 h-[40rem] w-[40rem] -translate-y-1/2 rounded-full bg-violet/10 blur-[140px]" />

      <div className="shell relative">
        <div className="roadmap-reveal">
          <p className="marker">Roadmap</p>
        </div>

        <div className="roadmap-reveal mt-6 max-w-4xl">
          <h2 className="font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tightest sm:text-[4.6rem]">
            {roadmap.title}
          </h2>
          <p className="mt-6 max-w-[60ch] text-[17px] leading-relaxed text-muted sm:text-lg">
            {roadmap.subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="roadmap-reveal mt-20">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-violet-soft via-violet/50 to-transparent" />

            {/* Timeline items */}
            <div className="space-y-8">
              {roadmap.phases.map((item, index) => (
                <div key={index} className="roadmap-reveal pl-24 relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 h-12 w-12 -translate-x-[22px] rounded-full border-2 border-ink bg-violet/20 flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-violet-soft" />
                  </div>

                  {/* Phase card */}
                  <div
                    className={`rounded-2xl border overflow-hidden transition-all hover:border-violet-soft hover:shadow-lg ${getStatusColor(
                      item.status,
                    )}`}
                  >
                    {/* Phase image */}
                    <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-violet/20 to-amber/20">
                      <img
                        src={roadmapImages[index]}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6 backdrop-blur-sm">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-[13px] font-medium text-violet-soft uppercase tracking-wide">
                            {item.phase}
                          </p>
                          <h3 className="mt-2 font-display text-xl font-semibold text-paper sm:text-2xl">
                            {item.title}
                          </h3>
                        </div>
                        <div className="shrink-0">
                          {getStatusBadge(item.status)}
                        </div>
                      </div>

                      {/* Goals */}
                      <ul className="mt-6 space-y-3">
                        {item.goals.map((goal, gIdx) => (
                          <li
                            key={gIdx}
                            className="flex gap-3 text-[15px] leading-relaxed text-paper"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-violet-soft shrink-0" />
                            <span>{goal}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Focus areas tags */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {item.focus.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="rounded-full bg-line px-3 py-1.5 text-[12px] font-medium text-paper"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
