import { useLayoutEffect, useRef } from "react";
import { gsap, revealOnScroll } from "../lib/motion.js";
import { education, certifications } from "../data/content.js";

export default function Credentials() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      revealOnScroll(".cred-reveal", { trigger: root.current, stagger: 0.08 });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="credentials"
      ref={root}
      className="scroll-mt-24 border-t border-line py-24 sm:py-32"
    >
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <p className="marker cred-reveal">Credentials</p>
          <h2 className="cred-reveal mt-5 font-display text-[2rem] font-medium leading-[1.1] tracking-tight sm:text-[2.6rem]">
            Trained in the practice, not just the theory
          </h2>
          <p className="cred-reveal mt-6 text-[15px] leading-relaxed text-faint">
            Continuous learning and formal certifications in product management,
            agile methodologies, and evidence-based leadership keep my practice
            sharp and aligned with industry standards.
          </p>
        </div>

        <div className="lg:col-span-8">
          <div className="cred-reveal">
            <h3 className="text-[15px] text-faint">
              Certifications and training
            </h3>
            <ul className="mt-5">
              {certifications.map((c) => (
                <li
                  key={c.title}
                  className="cred-reveal flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10"
                >
                  <div>
                    <p className="text-[17px] leading-snug text-paper">
                      {c.title}
                    </p>
                    <p className="mt-1 text-[14px] text-muted">{c.body}</p>
                  </div>
                  <span
                    className={`shrink-0 self-start rounded-full border px-3 py-1 text-[12px] ${
                      c.status === "Certified"
                        ? "border-violet-soft/40 text-violet-soft"
                        : "border-line text-faint"
                    }`}
                  >
                    {c.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cred-reveal mt-14">
            <h3 className="text-[15px] text-faint">Education</h3>
            <ul className="mt-5">
              {education.map((e) => (
                <li
                  key={e.school}
                  className="cred-reveal flex flex-col gap-2 border-t border-line py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10"
                >
                  <div>
                    <p className="text-[17px] text-paper">{e.school}</p>
                    <p className="mt-1 text-[14px] text-muted">{e.award}</p>
                  </div>
                  <span className="shrink-0 text-[13px] text-faint">
                    {e.place}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
