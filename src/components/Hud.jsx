import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lockup } from "../utils/svgs";
import { toggleMusic, subscribeMusic, getIsMusicPlaying } from "../utils/audio";
import { smoothScrollTo } from "../utils/scroll";

gsap.registerPlugin(ScrollTrigger);

export function Hud({ onToggleLang, musicUrl, isLightboxOpen = false, wedding }) {
  const [isPlaying, setIsPlaying] = useState(() => getIsMusicPlaying());
  const [isScrolled, setIsScrolled] = useState(false);

  const groomShort = wedding?.couple?.groom?.shortKm || "រស្មី";
  const brideShort = wedding?.couple?.bride?.shortKm || "ភក្ដី";

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 80,
      end: "max",
      onToggle: (self) => {
        setIsScrolled(self.isActive);
      }
    });

    const unsubscribe = subscribeMusic((playing) => {
      setIsPlaying(playing);
    });

    return () => {
      st.kill();
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
        href="#top"
        id="hud-mono"
        aria-label="Top"
        onClick={(e) => {
          e.preventDefault();
          smoothScrollTo(0, { duration: 1.4 });
        }}
      >
        <Lockup groom={groomShort} bride={brideShort} crest={false} className="lk-hud" />
      </a>
      <div className="hud__right">
        <button
          className="chip"
          id="lang-toggle"
          type="button"
          onClick={onToggleLang}
          aria-label="Switch language"
        >
          <span className="lang-km">ខ្មែរ</span> / EN
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
