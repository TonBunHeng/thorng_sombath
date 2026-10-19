import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Toast({ message, isVisible }) {
  return (
    <div
      className={`toast ${isVisible ? "show" : ""}`}
      id="toast"
      role="status"
    >
      {message}
    </div>
  );
}

export function VineProgress({ progress }) {
  const barRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (progress !== undefined) {
      if (barRef.current) barRef.current.style.transform = `scaleY(${progress})`;
      if (dotRef.current) dotRef.current.style.top = `${progress * 100}%`;
      return;
    }

    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        if (barRef.current) barRef.current.style.transform = `scaleY(${self.progress})`;
        if (dotRef.current) dotRef.current.style.top = `${self.progress * 100}%`;
      }
    });

    return () => st.kill();
  }, [progress]);

  return (
    <div className="vine-progress" aria-hidden="true">
      <span ref={barRef} style={{ transform: "scaleY(0)" }}></span>
      <b ref={dotRef} style={{ top: "0%" }}></b>
    </div>
  );
}

export function RsvpPill({ label, onClick }) {
  const pillRef = useRef(null);

  useEffect(() => {
    const el = pillRef.current;
    if (!el) return;

    let st = null;
    const timer = setTimeout(() => {
      const coupleEl = document.querySelector("#couple");
      const venueEl = document.querySelector("#venue");
      if (!coupleEl || !venueEl) return;

      st = ScrollTrigger.create({
        trigger: coupleEl,
        start: "top center",
        endTrigger: venueEl,
        end: "top 80%",
        onToggle: (self) => {
          el.classList.toggle("show", self.isActive);
        }
      });
    }, 150);

    return () => {
      clearTimeout(timer);
      if (st) st.kill();
    };
  }, []);

  return (
    <a
      ref={pillRef}
      className="btn rsvp-pill"
      href="#venue"
      onClick={onClick}
      data-t="location"
    >
      {label}
    </a>
  );
}
