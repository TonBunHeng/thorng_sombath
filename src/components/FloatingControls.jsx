import React, { useEffect, useRef, useState } from "react";

export function Toast({ message, isVisible }) {
  return (
    <div
      className={`toast fixed bottom-[90px] left-1/2 -translate-x-1/2 z-[400] bg-cream text-olive-900 rounded-full px-4 py-2.5 text-sm transition-all duration-500 pointer-events-none ${
        isVisible ? "show opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
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

    let rafId = null;
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleY(${p})`;
      if (dotRef.current) dotRef.current.style.top = `${p * 100}%`;
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          update();
          rafId = null;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [progress]);

  return (
    <div className="vine-progress fixed top-[20vh] bottom-[20vh] right-2.5 w-[1px] bg-foil/20 z-[55] transition-opacity duration-700 pointer-events-none" aria-hidden="true">
      <span ref={barRef} className="bg-foil origin-top absolute inset-0" style={{ transform: "scaleY(0)" }}></span>
      <b ref={dotRef} className="bg-foil-hi w-1.5 h-1.5 absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45" style={{ top: "0%" }}></b>
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
      className={`btn-up w-10 h-10 rounded-full inline-flex items-center justify-center cursor-pointer backdrop-blur-md bg-[#1d2010]/60 border border-foil/40 text-foil-hi transition-all duration-500 ${
        isVisible ? "show" : ""
      }`}
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
      className={`btn rsvp-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-widest backdrop-blur-md bg-[#1d2010]/60 border border-foil/40 text-foil-hi transition-all duration-500 ${
        isVisible ? "show" : ""
      }`}
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
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const shouldShow = window.scrollY > 400;
          setIsVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const show = isVisible && !isLightboxOpen;

  return (
    <div className="floating-actions fixed z-[58] right-4 md:right-8 bottom-5 inline-flex items-center gap-2 pointer-events-none">
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
