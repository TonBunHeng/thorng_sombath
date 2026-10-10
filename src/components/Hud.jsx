import React, { useEffect, useState } from "react";
import { Crest } from "../utils/svgs";
import { toggleMusic, subscribeMusic, getIsMusicPlaying } from "../utils/audio";
import { smoothScrollTo } from "../utils/scroll";

export function Hud({ lang, onToggleLang, musicUrl, isLightboxOpen = false }) {
  const [isPlaying, setIsPlaying] = useState(() => getIsMusicPlaying());
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const next = window.scrollY > 80;
          setIsScrolled((prev) => (prev !== next ? next : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    // Auto-sync playing state when music starts from EnvelopeGate
    const unsubscribe = subscribeMusic((playing) => {
      setIsPlaying(playing);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const handleMusicClick = () => {
    const nextState = !isPlaying;
    toggleMusic(nextState, musicUrl);
  };

  return (
    <header className={`hud fixed top-0 left-0 right-0 z-[60] flex justify-between items-center px-4 md:px-8 py-3.5 transition-opacity duration-700 pointer-events-none ${isScrolled ? "is-scrolled" : ""} ${isLightboxOpen ? "is-hidden" : ""}`}>
      <a
        className="hud__mono w-11 h-11 block pointer-events-auto"
        href="#hero"
        id="hud-mono"
        aria-label="Top"
        onClick={(e) => {
          e.preventDefault();
          smoothScrollTo(0, { duration: 1.4 });
        }}
      >
        <Crest />
      </a>
      <div className="hud__right flex items-center gap-2 pointer-events-auto">
        <button
          className="chip inline-flex items-center justify-center gap-2 h-9 px-3.5 rounded-full text-xs text-foil-hi bg-[#1d2010]/60 border border-foil/40 backdrop-blur-md"
          id="lang-toggle"
          type="button"
          onClick={onToggleLang}
          aria-label="Switch language"
        >
          <span className="lang-km font-kh">{lang === "km" ? "ខ្មែរ" : "EN"}</span> / {lang === "km" ? "EN" : "ខ្មែរ"}
        </button>
        <button
          className={`chip inline-flex items-center justify-center h-9 px-3 rounded-full text-foil-hi bg-[#1d2010]/60 border border-foil/40 backdrop-blur-md ${isPlaying ? "is-playing" : ""}`}
          id="music-toggle"
          type="button"
          onClick={handleMusicClick}
          aria-pressed={isPlaying}
          aria-label="Music"
        >
          <span className="bars inline-flex items-end gap-0.5 h-3" aria-hidden="true">
            <i className="w-0.5 h-full bg-current origin-bottom"></i>
            <i className="w-0.5 h-full bg-current origin-bottom"></i>
            <i className="w-0.5 h-full bg-current origin-bottom"></i>
            <i className="w-0.5 h-full bg-current origin-bottom"></i>
          </span>
        </button>
      </div>
    </header>
  );
}
