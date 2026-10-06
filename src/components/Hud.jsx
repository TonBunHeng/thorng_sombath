import React, { useEffect, useState } from "react";
import { Crest } from "../utils/svgs";
import { toggleMusic } from "../utils/audio";

export function Hud({ lang, onToggleLang, musicUrl }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMusicClick = async () => {
    const nextState = !isPlaying;
    await toggleMusic(nextState, musicUrl);
    setIsPlaying(nextState);
  };

  return (
    <header className={`hud ${isScrolled ? "is-scrolled" : ""}`}>
      <a className="hud__mono" href="#hero" id="hud-mono" aria-label="Top">
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
