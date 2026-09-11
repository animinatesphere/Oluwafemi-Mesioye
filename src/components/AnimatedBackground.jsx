import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/motion.js";

export default function AnimatedBackground() {
  const containerRef = useRef(null);
  const orbsRef = useRef([]);
  const videoContainerRef = useRef(null);
  const overlayRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate each orb with different speeds and directions
      orbsRef.current.forEach((orb, index) => {
        const duration = 15 + index * 3;
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;

        gsap.to(orb, {
          x: x,
          y: y,
          duration: duration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.5,
        });
      });

      // Video parallax scroll effect with more intensity
      if (videoContainerRef.current) {
        gsap.to(videoContainerRef.current, {
          yPercent: 50,
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });

        // Additional scale animation on scroll
        gsap.to(videoContainerRef.current, {
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom center",
            scrub: 2,
          },
        });
      }

      // Overlay opacity animation based on scroll
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0.8,
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      }

      // Floating particles effect on scroll
      gsap.to(".bg-particle-1", {
        x: 100,
        y: 50,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      gsap.to(".bg-particle-2", {
        x: -80,
        y: 80,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 overflow-hidden bg-ink"
    >
      {/* Video background - plays as you scroll through content */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 z-0 will-change-transform origin-center"
      >
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="/13238272_1920_1080_30fps.mp4"
        />
        {/* Dynamic dark overlay */}
        <div ref={overlayRef} className="absolute inset-0 bg-black/50" />
      </div>

      {/* Floating particle 1 */}
      <div className="bg-particle-1 absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-violet/20 to-transparent blur-3xl" />

      {/* Floating particle 2 */}
      <div className="bg-particle-2 absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-gradient-to-br from-amber/15 to-transparent blur-3xl" />

      {/* Primary animated orbs */}
      <div
        ref={(el) => (orbsRef.current[0] = el)}
        className="absolute -left-64 -top-64 h-96 w-96 rounded-full bg-gradient-to-br from-violet via-violet/50 to-transparent blur-3xl opacity-30 z-20"
      />
      <div
        ref={(el) => (orbsRef.current[1] = el)}
        className="absolute -right-48 top-1/3 h-80 w-80 rounded-full bg-gradient-to-br from-amber to-amber/30 blur-3xl opacity-25 z-20"
      />
      <div
        ref={(el) => (orbsRef.current[2] = el)}
        className="absolute -bottom-64 left-1/2 h-96 w-96 rounded-full bg-gradient-to-br from-violet-soft via-violet/30 to-transparent blur-3xl opacity-20 z-20"
      />
      <div
        ref={(el) => (orbsRef.current[3] = el)}
        className="absolute -right-64 -bottom-32 h-80 w-80 rounded-full bg-gradient-to-br from-violet via-purple/50 to-transparent blur-3xl opacity-15 z-20"
      />

      {/* Grain texture overlay */}
      <div className="absolute inset-0 grain opacity-50 z-30 pointer-events-none" />
    </div>
  );
}
