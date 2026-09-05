import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ease } from "../lib/motion.js";
import { nav, profile } from "../data/content.js";
import Logo from "./Logo.jsx";

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const panel = useRef(null);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .fromTo(
          panel.current,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power4.out" }
        )
        .from(
          ".menu-item",
          { y: 34, autoAlpha: 0, duration: 0.5, stagger: 0.06, ease },
          "-=0.25"
        );
    }, panel);
    return () => ctx.revert();
  }, [open]);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          solid ? "bg-ink/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div
          className={`shell flex items-center justify-between py-4 transition-[border-color] duration-500 ${
            solid ? "border-b border-line" : "border-b border-transparent"
          }`}
        >
          <a
            href="#top"
            onClick={(e) => go(e, "top")}
            className="flex items-center"
          >
            <Logo />
            <span className="ml-2 hidden text-muted sm:inline">
              {profile.role}
            </span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {nav.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={(e) => go(e, n.id)}
                className="link-underline text-[14px] text-muted transition-colors hover:text-paper"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 text-[14px] text-paper md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? "Close" : "Menu"}
            <span className="relative block h-[10px] w-5">
              <span
                className={`absolute left-0 block h-px w-5 bg-paper transition-transform duration-300 ${
                  open ? "top-[5px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-5 bg-paper transition-transform duration-300 ${
                  open ? "top-[5px] -rotate-45" : "top-[9px]"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          ref={panel}
          className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-5 md:hidden"
        >
          <ul className="space-y-2">
            {nav.map((n, i) => (
              <li key={n.id} className="menu-item border-b border-line pb-3">
                <a
                  href={`#${n.id}`}
                  onClick={(e) => go(e, n.id)}
                  className="flex items-baseline gap-4 font-display text-[2.6rem] leading-tight tracking-tightest text-paper"
                >
                  <span className="font-sans text-xs text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${profile.email}`}
            className="menu-item mt-10 text-sm text-violet-soft"
          >
            {profile.email}
          </a>
        </div>
      )}
    </>
  );
}
