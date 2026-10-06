import React, { useEffect, useState } from "react";
import { Crest } from "../utils/svgs";
import { toggleMusic, subscribeMusic, getIsMusicPlaying } from "../utils/audio";
import { smoothScrollTo } from "../utils/scroll";

export function Hud({ lang, onToggleLang, musicUrl, isLightboxOpen = false }) {
  const [isPlaying, setIsPlaying] = useState(() => getIsMusicPlaying());
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    
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
    <header className={`hud ${isScrolled ? "is-scrolled" : ""} ${isLightboxOpen ? "is-hidden" : ""}`}>
      <a
        className="hud__mono"
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
      <div className="hud__right">
        <button
          className="chip"
          id="lang-toggle"
          type="button"
          onClick={onToggleLang}
          aria-label="Switch language"
        >
          <span className="lang-km">{lang === "km" ? "ខ្មែរ" : "EN"}</span> / {lang === "km" ? "EN" : "ខ្មែរ"}
        </button>
        <button
          className={`chip ${isPlaying ? "is-playing" : ""}`}
          id="music-toggle"
          type="button"
          onClick={handleMusicClick}
          aria-pressed={isPlaying}
          aria-label="Music"
        >
          <span className="bars" aria-hidden="true">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </span>
        </button>
      </div>
    </header>
  );
}
