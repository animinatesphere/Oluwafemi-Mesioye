import { useLayoutEffect, useRef, useState } from "react";
import { gsap, revealOnScroll, reduced, ScrollTrigger } from "../lib/motion.js";
import { testimonials } from "../data/content.js";

function TestimonialCard({ item, index }) {
  const cardRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useLayoutEffect(() => {
    if (reduced()) return;

    const ctx = gsap.context(() => {
      // Image parallax - scrolls up as page scrolls down
      gsap.to(cardRef.current, {
        yPercent: -15 * (index % 2 === 0 ? 1 : -1), // Alternate directions
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });

      // Staggered fade-in on scroll
      gsap.from(cardRef.current, {
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  const gradients = [
    "from-violet/40 to-amber/40",
    "from-amber/40 to-violet/40",
    "from-blue-500/30 to-violet/30",
    "from-emerald-500/30 to-cyan-500/30",
  ];

  return (
    <div
      ref={cardRef}
      className="testimonial-card group flex flex-col overflow-hidden rounded-2xl border border-line bg-white/[0.02] backdrop-blur-sm transition-all hover:border-violet-soft hover:bg-white/[0.05]"
    >
      {/* Image with parallax */}
      {/* <div
        className={`relative h-48 overflow-hidden bg-gradient-to-br ${gradients[index % 4]}`}
      >
        <img
          src={item.image}
          alt={item.name}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover ${
            imageLoaded ? "opacity-90" : "opacity-0"
          } group-hover:opacity-100 transition-opacity duration-300`}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full border-2 border-violet-soft/50 border-t-violet-soft animate-spin" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      </div> */}

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[15px] leading-relaxed text-muted italic">
          "{item.quote}"
        </p>

        <div className="mt-6 flex items-center gap-3 border-t border-line/50 pt-4">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-soft to-amber flex items-center justify-center text-[12px] font-bold text-ink">
            {item.name.charAt(0)}
          </div>
          <div>
            <p className="text-[14px] font-medium text-paper">{item.name}</p>
            <p className="text-[12px] text-faint">{item.role}</p>
            <p className="text-[12px] text-violet-soft">{item.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealOnScroll(".testimonials-head", {
        trigger: root.current,
        stagger: 0.1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={root}
      className="scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <div className="shell">
        <div className="max-w-[50ch]">
          <p className="marker testimonials-head">Social Proof</p>
          <h2 className="testimonials-head mt-5 font-display text-[2rem] font-medium leading-[1.1] tracking-tight sm:text-[3rem]">
            What colleagues and leaders say
          </h2>
          <p className="testimonials-head mt-6 max-w-[45ch] text-[15px] leading-relaxed text-muted sm:text-base">
            Testimonials from teammates, leaders, and collaborators I've worked
            with across product, engineering, design, and operations.
          </p>
        </div>

        {/* Testimonials grid with parallax scrolling */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((item, index) => (
            <TestimonialCard key={item.name} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
