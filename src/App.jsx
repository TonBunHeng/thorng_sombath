import React, { useEffect, useState, useRef } from "react";
import { flushSync } from "react-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingData } from "./data/wedding";
import { translations } from "./data/i18n";

gsap.registerPlugin(ScrollTrigger);
import { SvgDefs } from "./utils/svgs";
import { Preloader } from "./components/Preloader";
import { EnvelopeGate } from "./components/EnvelopeGate";
import { Hud } from "./components/Hud";
import { HeroCover } from "./components/HeroCover";
import { InvitationWords } from "./components/InvitationWords";
import { Couple } from "./components/Couple";
import { Countdown } from "./components/Countdown";
import { Programme } from "./components/Programme";
import { Story } from "./components/Story";
import { Pond } from "./components/Pond";
import { Gallery } from "./components/Gallery";
import { Venue } from "./components/Venue";
import { Gift } from "./components/Gift";
import { Finale } from "./components/Finale";
import { Lightbox } from "./components/Lightbox";
import { CustomCursor } from "./components/CustomCursor";
import { Toast, VineProgress, FloatingActions } from "./components/FloatingControls";
import { smoothScrollTo } from "./utils/scroll";

export function App() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("rp-lang") || "km";
    } catch {
      return "km";
    }
  });

  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [isGateOpen, setIsGateOpen] = useState(false);

  const [lightbox, setLightbox] = useState({
    isOpen: false,
    activeIndex: 0,
    photos: []
  });

  const [toast, setToast] = useState({
    message: "",
    isVisible: false
  });

  const t = translations[lang];

  const isTransitioningLang = useRef(false);

  const handleToggleLang = () => {
    if (isTransitioningLang.current) return;
    isTransitioningLang.current = true;

    const nextLang = lang === "km" ? "en" : "km";
    const savedScrollY = window.scrollY;

    // 1. If supported, use native View Transitions API for zero-jerk GPU crossfade
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      const transition = document.startViewTransition(() => {
        flushSync(() => {
          setLang(nextLang);
          document.body.dataset.lang = nextLang;
          try {
            localStorage.setItem("rp-lang", nextLang);
          } catch { }
        });
      });

      transition.finished.finally(() => {
        window.scrollTo(0, savedScrollY);
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(() => {
            ScrollTrigger.refresh();
          });
        } else {
          ScrollTrigger.refresh();
        }
        isTransitioningLang.current = false;
      });
      return;
    }

    // 2. Fallback: GSAP smooth opacity crossfade
    const targets = [
      document.getElementById("main"),
      document.getElementById("gate"),
      document.querySelector(".hud")
    ].filter(Boolean);

    gsap.to(targets, {
      opacity: 0,
      duration: 0.18,
      ease: "power2.inOut",
      onComplete: () => {
        setLang(nextLang);
        document.body.dataset.lang = nextLang;
        try {
          localStorage.setItem("rp-lang", nextLang);
        } catch { }

        requestAnimationFrame(() => {
          window.scrollTo(0, savedScrollY);
          if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
              ScrollTrigger.refresh();
            });
          } else {
            ScrollTrigger.refresh();
          }

          gsap.fromTo(
            targets,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.28,
              ease: "power2.out",
              onComplete: () => {
                isTransitioningLang.current = false;
                ScrollTrigger.refresh();
              }
            }
          );
        });
      }
    });
  };

  const showToast = (message) => {
    setToast({ message, isVisible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 2000);
  };

  useEffect(() => {
    document.body.dataset.lang = lang;
    if (!isGateOpen) {
      document.body.classList.add("is-locked");
    } else {
      document.body.classList.remove("is-locked");
      document.body.classList.add("is-open");
      window.scrollTo(0, 0);
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  }, [lang, isGateOpen]);

  // Lenis smooth scrolling & GSAP ScrollTrigger synchronization
  useEffect(() => {
    let lenis = null;
    let tickerCallback = null;

    if (isGateOpen) {
      lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.5
      });
      window.__lenis = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      tickerCallback = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);

      // Refresh ScrollTrigger and resize Lenis once gate DOM unmount settles
      const t1 = setTimeout(() => {
        lenis?.resize();
        ScrollTrigger.refresh();
      }, 150);
      const t2 = setTimeout(() => {
        lenis?.resize();
        ScrollTrigger.refresh();
      }, 500);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        if (tickerCallback) gsap.ticker.remove(tickerCallback);
        window.__lenis = null;
        if (lenis) lenis.destroy();
      };
    }
  }, [isGateOpen]);

  const handleLocationClick = (e) => {
    if (e) e.preventDefault();
    const venueEl = document.getElementById("venue");
    if (venueEl) {
      smoothScrollTo(venueEl, { duration: 1.5 });
    }
  };

  const handleScrollToTop = (e) => {
    if (e) e.preventDefault();
    smoothScrollTo(0, { duration: 1.5 });
  };

  const handleOpenLightbox = (index, photos) => {
    setLightbox({
      isOpen: true,
      activeIndex: index,
      photos
    });
  };

  const handleCloseLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
  };

  const handlePrevPhoto = () => {
    setLightbox((prev) => ({
      ...prev,
      activeIndex: (prev.activeIndex - 1 + prev.photos.length) % prev.photos.length
    }));
  };

  const handleNextPhoto = () => {
    setLightbox((prev) => ({
      ...prev,
      activeIndex: (prev.activeIndex + 1) % prev.photos.length
    }));
  };

  return (
    <>
      <SvgDefs />
      <div className="grain" aria-hidden="true"></div>

      {/* Preloader */}
      {!isPreloaderDone && (
        <Preloader onComplete={() => setIsPreloaderDone(true)} />
      )}

      {/* 3D Envelope Gate */}
      {!isGateOpen && (
        <EnvelopeGate
          wedding={weddingData}
          t={t}
          lang={lang}
          onOpen={() => setIsGateOpen(true)}
        />
      )}

      {/* HUD navigation */}
      <Hud
        lang={lang}
        onToggleLang={handleToggleLang}
        musicUrl={weddingData.music}
        isLightboxOpen={lightbox.isOpen}
      />

      {/* Side scroll vine indicator */}
      <VineProgress />

      {/* Floating action buttons: Back to Top & Location */}
      <FloatingActions
        t={t}
        isLightboxOpen={lightbox.isOpen}
        onScrollToTop={handleScrollToTop}
        onLocationClick={handleLocationClick}
      />

      {/* Main Content Sections */}
      <main id="main" className="relative">
        <HeroCover wedding={weddingData} t={t} lang={lang} isGateOpen={isGateOpen} />
        <InvitationWords wedding={weddingData} t={t} lang={lang} />
        <Couple wedding={weddingData} t={t} lang={lang} />
        <Countdown wedding={weddingData} t={t} lang={lang} />
        <Programme wedding={weddingData} t={t} lang={lang} />
        <Story wedding={weddingData} t={t} lang={lang} />
        <Pond wedding={weddingData} t={t} lang={lang} />
        <Gallery t={t} onOpenLightbox={handleOpenLightbox} />
        <Venue wedding={weddingData} t={t} lang={lang} />
        <Gift wedding={weddingData} t={t} lang={lang} />
        <Finale
          wedding={weddingData}
          t={t}
          lang={lang}
          onShowToast={showToast}
        />
      </main>

      {/* Custom glowing cursor */}
      <CustomCursor lang={lang} />

      {/* Toast popup */}
      <Toast message={toast.message} isVisible={toast.isVisible} />

      {/* Lightbox photo viewer */}
      <Lightbox
        isOpen={lightbox.isOpen}
        activeIndex={lightbox.activeIndex}
        photos={lightbox.photos}
        onClose={handleCloseLightbox}
        onPrev={handlePrevPhoto}
        onNext={handleNextPhoto}
        lang={lang}
      />
    </>
  );
}
export default App;
