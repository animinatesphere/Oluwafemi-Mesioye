import { useEffect, useRef } from "react";
import { gsap } from "../lib/motion.js";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;

    if (!cursor || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update dot position immediately
      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        overwrite: "auto",
      });

      // Update cursor with slight delay for trailing effect
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, dot], { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, dot], { opacity: 0, duration: 0.3 });
    };

    // Add hover effects for interactive elements
    const addHoverEffects = () => {
      const clickables = document.querySelectorAll(
        "a, button, input, textarea, [role='button']",
      );

      clickables.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(cursor, { scale: 1.5, duration: 0.3 });
          gsap.to(dot, { scale: 0.5, opacity: 0.5, duration: 0.3 });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(cursor, { scale: 1, duration: 0.3 });
          gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    addHoverEffects();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Cursor ring */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-50 hidden lg:block w-8 h-8 border-2 border-violet-soft rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-0"
        style={{ mixBlendMode: "screen" }}
      />
      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-50 hidden lg:block w-2 h-2 bg-violet-soft rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-0"
      />
    </>
  );
}
