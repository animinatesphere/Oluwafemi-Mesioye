import { useLayoutEffect, useRef, useState } from "react";
import { gsap, ease, reduced, ScrollTrigger } from "../lib/motion.js";
import { profile, experience } from "../data/content.js";

/* The stack on the right reads like a prioritised backlog of the work itself. */
const stack = experience.slice(0, 4).map((e) => ({
  company: e.company,
  role: e.role,
  product: e.product,
  image: e.image,
  period: e.period,
  current: !!e.current,
  sector: e.sector,
  place: e.place,
  bullets: e.bullets,
}));

function HeroCard({ item, isOpen, onToggle }) {
  const body = useRef(null);
  const inner = useRef(null);

  useLayoutEffect(() => {
    const el = body.current;
    if (!el) return;
    if (reduced()) {
      el.style.maxHeight = isOpen ? "1000px" : "0px";
      el.style.opacity = isOpen ? 1 : 0;
      return;
    }
    const h = inner.current?.offsetHeight || 0;
    const tween = gsap.to(el, {
      maxHeight: isOpen ? h + 24 : 0,
      opacity: isOpen ? 1 : 0,
      duration: 0.4,
      ease: "power3.inOut",
      onComplete: () => {
        if (isOpen) el.style.maxHeight = "none";
        ScrollTrigger.refresh();
      },
    });
    return () => tween.kill();
  }, [isOpen]);

  return (
    <div className="hero-card pre-anim group relative">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 rounded-xl border border-line bg-white/[0.02] px-4 py-3.5 text-left backdrop-blur-sm transition-all hover:border-violet-soft hover:bg-white/[0.04]"
      >
        <div className="text-left">
          <p className="text-[15px] font-medium text-paper">{item.company}</p>
          <p className="mt-0.5 text-[13px] leading-snug text-faint">
            {item.product ? `${item.product} · ${item.role}` : item.role}
          </p>
        </div>
        <span
          className={`shrink-0 whitespace-nowrap pt-1 text-[12px] transition-transform duration-300 ${
            item.current ? "text-violet-soft" : "text-faint"
          } ${isOpen ? "rotate-180" : ""}`}
        >
          ↓
        </span>
      </button>

      {item.image && (
        <div className="grid max-h-0 overflow-hidden opacity-0 transition-[max-height,opacity] duration-500 group-hover:max-h-96 group-hover:opacity-100 group-focus-within:max-h-96 group-focus-within:opacity-100">
          <img
            src={item.image}
            alt={`${item.product || item.company} product preview`}
            className="mt-2 aspect-square w-full rounded-xl border border-line bg-black/20 object-contain object-center p-2"
          />
        </div>
      )}

      <div ref={body} className="overflow-hidden opacity-0 max-h-0">
        <div ref={inner} className="px-4 py-4 pt-0">
          <div className="space-y-4 border-t border-line/50 pt-4">
            <div className="flex flex-wrap gap-2 text-[12px]">
              <span className="rounded-full bg-violet/20 px-2.5 py-1 text-violet-soft">
                {item.place}
              </span>
              <span className="rounded-full bg-amber/20 px-2.5 py-1 text-amber">
                {item.sector}
              </span>
              <span className="rounded-full bg-line px-2.5 py-1 text-faint">
                {item.period}
              </span>
            </div>
            <ul className="space-y-3">
              {item.bullets.slice(0, 4).map((bullet, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-[13px] leading-relaxed text-muted"
                >
                  <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-violet-soft/70" />
                  {bullet}
                </li>
              ))}
            </ul>
            <p className="text-[12px] text-faint italic">
              +{item.bullets.length - 4} more accomplishments...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ ready }) {
  const root = useRef(null);
  const played = useRef(false);
  const [openIndex, setOpenIndex] = useState(-1);

  useLayoutEffect(() => {
    if (!ready || played.current) return;
    played.current = true;

    const ctx = gsap.context(() => {
      gsap.set(".pre-anim", { visibility: "visible" });

      if (reduced()) return;

      const tl = gsap.timeline({ defaults: { ease } });

      tl.from(".hero-word", {
        yPercent: 118,
        duration: 1.05,
        stagger: 0.09,
        ease: "power4.out",
      })
        .from(
          ".hero-meta",
          { y: 18, autoAlpha: 0, duration: 0.7, stagger: 0.08 },
          "-=0.65",
        )
        .from(
          ".hero-card",
          {
            y: 26,
            autoAlpha: 0,
            rotate: 1.5,
            duration: 0.7,
            stagger: 0.09,
          },
          "-=0.55",
        )
        .from(".hero-glow", { autoAlpha: 0, duration: 1.4 }, 0)
        .from(".hero-scroll", { autoAlpha: 0, duration: 0.6 }, "-=0.2");

      // Parallax drift on the headline as the page moves away.
      gsap.to(".hero-title", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-14 pt-32 sm:pb-20"
    >
      {/* ambient field */}
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-glow absolute -left-32 top-10 h-[46rem] w-[46rem] animate-drift rounded-full bg-violet/20 blur-[130px]" />
        <div className="hero-glow absolute -right-24 bottom-0 h-[32rem] w-[32rem] animate-drift rounded-full bg-amber/10 blur-[120px] [animation-delay:-6s]" />
        <div className="absolute inset-0 grain opacity-70" />
      </div>

      <div className="shell relative">
        <div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="hero-title">
              <h1 className="font-display text-[clamp(2.9rem,11.5vw,6.6rem)] font-semibold leading-[0.88] tracking-tightest">
                <span className="block overflow-hidden pb-1">
                  <span className="hero-word block pre-anim">Oluwafemi</span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <span className="hero-word block pre-anim text-violet-soft">
                    Mesioye
                  </span>
                </span>
              </h1>
            </div>

            <p className="hero-meta pre-anim mt-7 max-w-[46ch] text-[17px] leading-relaxed text-muted sm:text-lg">
              {profile.intro}
            </p>

            <div className="hero-meta pre-anim mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#work"
                className="rounded-full bg-paper px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-violet-soft"
              >
                See the work
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full border border-line px-6 py-3 text-[15px] text-paper transition-colors hover:border-violet-soft hover:text-violet-soft"
              >
                Start a conversation
              </a>
            </div>

            <p className="hero-meta pre-anim mt-8 text-sm text-faint">
              {profile.role} · {profile.location} · Open to remote roles
            </p>
          </div>

          {/* Prioritised stack of roles */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <div className="space-y-2">
                {stack.map((s, i) => (
                  <HeroCard
                    key={s.company}
                    item={s}
                    isOpen={openIndex === i}
                    onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                  />
                ))}
              </div>
            </div>

            {/* Personal image */}
            <div className="hero-card pre-anim overflow-hidden rounded-2xl border border-line">
              <img
                src="/72QEouUP.jpg"
                alt="Oluwafemi Mesioye"
                className="w-full h-full object-cover"
                style={{ height: "700px" }}
              />
            </div>
          </div>
        </div>

        <div className="hero-scroll pre-anim mt-16 flex items-center gap-3 text-[13px] text-faint">
          <span className="relative block h-8 w-px overflow-hidden bg-line">
            <span className="absolute inset-x-0 top-0 block h-3 animate-[drift_2.4s_ease-in-out_infinite] bg-violet-soft" />
          </span>
          Scroll
        </div>
      </div>
    </section>
  );
}
