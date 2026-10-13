import React, { useEffect, useRef, useState } from "react";
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

export function ScrollTopBtn({ label, isVisible, onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`btn-up ${isVisible ? "show" : ""}`}
      type="button"
      onClick={handleClick}
      aria-label={label || "Back to top"}
      title={label || "Back to top"}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        width="16"
        height="16"
      >
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  );
}

export function RsvpPill({ label, isVisible, onClick }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a
      className={`btn rsvp-pill ${isVisible ? "show" : ""}`}
      href="#venue"
      onClick={handleClick}
      aria-label={label}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
      <span>{label}</span>
    </a>
  );
}

export function FloatingActions({ t, isLightboxOpen, onScrollToTop, onLocationClick }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 400,
      end: "max",
      onToggle: (self) => {
        setIsVisible(self.isActive);
      }
    });

    return () => st.kill();
  }, []);

  const show = isVisible && !isLightboxOpen;

  return (
    <div className="floating-actions">
      <ScrollTopBtn
        label={t.toTop}
        isVisible={show}
        onClick={onScrollToTop}
      />
      <RsvpPill
        label={t.location}
        isVisible={show}
        onClick={onLocationClick}
      />
    </div>
  );
}
