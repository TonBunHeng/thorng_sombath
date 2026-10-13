import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor({ lang }) {
  const cursorRef = useRef(null);
  const glowRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || prefersReducedMotion) return;

    const cursor = cursorRef.current;
    const glow = glowRef.current;
    const labelEl = labelRef.current;
    if (!cursor || !glow) return;

    const setX = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
    const setY = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
    const setGlowX = gsap.quickTo(glow, "x", { duration: 0.9, ease: "power3" });
    const setGlowY = gsap.quickTo(glow, "y", { duration: 0.9, ease: "power3" });

    let prevX = 0;
    let prevY = 0;

    const handlePointerMove = (e) => {
      setX(e.clientX);
      setY(e.clientY);
      setGlowX(prevX - e.clientX);
      setGlowY(prevY - e.clientY);
      prevX = e.clientX;
      prevY = e.clientY;
      setGlowX(0);
      setGlowY(0);
    };

    const handlePointerOver = (e) => {
      const target = e.target;
      const isInteractive = !!target.closest("a, button, label, .pond__canvas, #env, [role='button']");
      cursor.classList.toggle("is-hover", isInteractive);

      let text = "";
      if (target.closest("#env")) {
        text = lang === "km" ? "ចុចបើក" : "Open";
      } else if (target.closest(".pond__canvas")) {
        text = lang === "km" ? "ប៉ះទឹក" : "Touch";
      }
      cursor.classList.toggle("has-label", !!text);
      if (labelEl) labelEl.textContent = text;
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerover", handlePointerOver);

    // Magnetic buttons effect
    const buttons = document.querySelectorAll(".btn");
    const cleanupButtons = [];

    buttons.forEach((btn) => {
      const onMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
        gsap.to(btn, { x, y, duration: 0.4, ease: "power3.out" });
      };

      const onLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });
      };

      btn.addEventListener("pointermove", onMove);
      btn.addEventListener("pointerleave", onLeave);
      cleanupButtons.push(() => {
        btn.removeEventListener("pointermove", onMove);
        btn.removeEventListener("pointerleave", onLeave);
      });
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerover", handlePointerOver);
      cleanupButtons.forEach((c) => c());
    };
  }, [lang]);

  return (
    <div
      ref={cursorRef}
      className="cursor"
      aria-hidden="true"
    >
      <div ref={glowRef} className="cursor__glow"></div>
      <div className="cursor__dot"></div>
      <div ref={labelRef} className="cursor__label"></div>
    </div>
  );
}
