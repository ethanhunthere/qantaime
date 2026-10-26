"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

export function EspressoAmbientBlobs() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mq.addEventListener("change", handleMotionChange);

    const handlePointerMove = (e: PointerEvent) => {
      // Subtle parallax offset (-20px to +20px)
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      mq.removeEventListener("change", handleMotionChange);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden [contain:paint] select-none"
    >
      {/* Blob 1: Deep Roast Espresso (Top-Left) */}
      <motion.div
        animate={
          prefersReducedMotion
            ? { x: 0, y: 0 }
            : {
                x: [0, 45, -25, 0],
                y: [0, -35, 30, 0],
                scale: [1, 1.12, 0.94, 1],
              }
        }
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transform: `translate3d(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px, 0)`,
        }}
        className="absolute -top-24 -left-24 w-[360px] sm:w-[520px] md:w-[680px] h-[360px] sm:h-[520px] md:h-[680px] rounded-full blur-[80px] sm:blur-[110px] md:blur-[130px] opacity-45 dark:opacity-40 transition-colors duration-1000 will-change-transform bg-[radial-gradient(circle,rgba(66,34,19,0.7)_0%,rgba(42,22,13,0.4)_50%,transparent_75%)] dark:bg-[radial-gradient(circle,rgba(84,40,20,0.65)_0%,rgba(46,20,12,0.45)_55%,transparent_80%)]"
      />

      {/* Blob 2: Warm Tuscan Cognac & Amber (Top-Right) */}
      <motion.div
        animate={
          prefersReducedMotion
            ? { x: 0, y: 0 }
            : {
                x: [0, -50, 30, 0],
                y: [0, 40, -30, 0],
                scale: [1, 0.92, 1.15, 1],
              }
        }
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transform: `translate3d(${-mousePos.x * 0.3}px, ${-mousePos.y * 0.3}px, 0)`,
        }}
        className="absolute top-12 -right-28 w-[340px] sm:w-[480px] md:w-[620px] h-[340px] sm:h-[480px] md:h-[620px] rounded-full blur-[85px] sm:blur-[115px] md:blur-[140px] opacity-35 dark:opacity-35 transition-colors duration-1000 will-change-transform bg-[radial-gradient(circle,rgba(138,75,30,0.55)_0%,rgba(102,52,22,0.3)_50%,transparent_75%)] dark:bg-[radial-gradient(circle,rgba(156,82,32,0.5)_0%,rgba(92,44,18,0.35)_55%,transparent_80%)]"
      />

      {/* Blob 3: Velvet Hazelnut Shadow (Mid-Bottom Canvas) */}
      <motion.div
        animate={
          prefersReducedMotion
            ? { x: 0, y: 0 }
            : {
                x: [0, 30, -40, 0],
                y: [0, -25, 20, 0],
                scale: [1, 1.08, 0.96, 1],
              }
        }
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transform: `translate3d(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px, 0)`,
        }}
        className="absolute top-[45%] left-[20%] w-[320px] sm:w-[460px] md:w-[580px] h-[320px] sm:h-[460px] md:h-[580px] rounded-full blur-[90px] sm:blur-[120px] md:blur-[150px] opacity-25 dark:opacity-30 transition-colors duration-1000 will-change-transform bg-[radial-gradient(circle,rgba(80,45,25,0.45)_0%,rgba(50,26,16,0.25)_50%,transparent_75%)] dark:bg-[radial-gradient(circle,rgba(110,55,25,0.4)_0%,rgba(60,28,14,0.25)_55%,transparent_80%)]"
      />

      {/* Subtle Micro-Grain Atmosphere Overlay */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
    </div>
  );
}
