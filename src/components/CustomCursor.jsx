import React, { useEffect, useState } from "react";
import gsap from "gsap";

export function CustomCursor({ lang }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHover, setIsHover] = useState(false);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const handlePointerMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const handlePointerOver = (e) => {
      const target = e.target;
      const isInteractive = !!target.closest("a, button, label, .pond__canvas, #env");
      setIsHover(isInteractive);

      if (target.closest("#env")) {
        setLabel(lang === "km" ? "ចុចបើក" : "Open");
      } else if (target.closest(".pond__canvas")) {
        setLabel(lang === "km" ? "ប៉ះទឹក" : "Touch");
      } else {
        setLabel("");
      }
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
      className={`cursor ${isHover ? "is-hover" : ""} ${label ? "has-label" : ""}`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
      }}
      aria-hidden="true"
    >
      <div className="cursor__glow"></div>
      <div className="cursor__dot"></div>
      <div className="cursor__label">{label}</div>
    </div>
  );
}
