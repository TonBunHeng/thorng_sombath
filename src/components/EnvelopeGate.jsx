import React, { useRef, useState, useEffect } from "react";
import { Corner, Crest, Lockup, WaxSeal } from "../utils/svgs";
import { playSfx, toggleMusic } from "../utils/audio";
import { pictures } from "../data/pictures";
import gsap from "gsap";

export function EnvelopeGate({ wedding, t, _lang, onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  const gateRef = useRef(null);

  const groomShort = wedding.couple.groom.shortKm || wedding.couple.groom.km.split(" ").pop();
  const brideShort = wedding.couple.bride.shortKm || wedding.couple.bride.km.split(" ").pop();

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (isOpening) return;
      const el = document.getElementById("env-tilt");
      if (!el) return;
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX / innerWidth) - 0.5) * 16;
      const y = ((e.clientY / innerHeight) - 0.5) * -16;
      gsap.to(el, {
        rotateY: x,
        rotateX: y,
        duration: 0.6,
        ease: "power2.out"
      });
    };

    const handlePointerLeave = () => {
      if (isOpening) return;
      const el = document.getElementById("env-tilt");
      if (!el) return;
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "power2.out"
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [isOpening]);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    playSfx("paper");
    setTimeout(() => playSfx("chime"), 500);
    toggleMusic(true, wedding.music);

    // 0. Reset 3D tilt immediately so envelope unfolds flat towards camera
    const tiltEl = document.getElementById("env-tilt");
    if (tiltEl) {
      gsap.to(tiltEl, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.35,
        ease: "power2.out"
      });
    }

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        onOpen();
      }
    });

    // Fade out hint text and gate title
    tl.to([".gate__hint", ".gate__invite"], {
      opacity: 0,
      y: -12,
      duration: 0.35,
      ease: "power2.out"
    }, 0);

    // 1. Wax seal lifts & fades away
    tl.to("#seal", {
      scale: 1.25,
      y: -35,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    }, 0.05);

    // 2. Flap unfolds 180 deg around top hinge
    tl.to("#env-flap", {
      rotateX: -180,
      transformOrigin: "50% 0%",
      duration: 0.95,
      ease: "power2.inOut"
    }, 0.25);

    tl.to("#flap-shadow", {
      opacity: 0,
      duration: 0.6,
      ease: "power1.out"
    }, 0.35);

    // 3. Card slides up smoothly from inside the pocket
    tl.to("#env-card", {
      yPercent: -68,
      duration: 1.1,
      ease: "power2.out"
    }, 0.6);

    // 4. Envelope body & pocket descend into the depth
    tl.to([".e2__back", ".e2__pocket", "#env-flap"], {
      yPercent: 35,
      opacity: 0,
      duration: 0.85,
      ease: "power2.in"
    }, 0.9);

    // 5. Card glides forward toward the camera
    tl.to("#env-card", {
      scale: 1.25,
      opacity: 0,
      duration: 0.7,
      ease: "power2.in"
    }, 1.4);

    // 6. Gate fades away cleanly into the hero cover
    tl.to(gateRef.current, {
      opacity: 0,
      duration: 0.65,
      ease: "power2.out"
    }, 1.6);
  };

  return (
    <div
      ref={gateRef}
      className={`gate ${isOpening ? "is-opening" : ""}`}
      id="gate"
      role="dialog"
      aria-modal="true"
    >
      <picture className="gate__bg" aria-hidden="true">
        <source media="(max-aspect-ratio: 1/1)" srcSet={pictures.gate.srcSetMobile} sizes="100vw" />
        <img src={pictures.gate.bgDesktop} srcSet={pictures.gate.srcSetDesktop} sizes="100vw" alt="" />
      </picture>
      <svg className="gate__florals emboss" id="gate-florals" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true"></svg>

      <div className="gate__stage">
        <div className="gate__invite">
          <div className="gate__kicker foil">{t.kicker}</div>
          <div className="gate__sub">{t.weddingInvitation}</div>
        </div>

        <div id="env-mount">
          <div className="e2" id="env" onClick={handleOpen} style={{ cursor: "pointer" }}>
            <div className="e2__ground" aria-hidden="true"></div>
            <div className="e2__stage" id="env-tilt">
              <div className="e2__part e2__back"></div>

              {/* Inner Card */}
              <div className="e2__card" id="env-card">
                <div className="e2__card-frame"></div>
                <div className="e2__card-corners">
                  <Corner position="tl" />
                  <Corner position="tr" />
                  <Corner position="bl" />
                  <Corner position="br" />
                </div>
                <div className="e2__card-inner">
                  <div className="e2__card-kicker">{t.kicker}</div>
                  <Lockup
                    groom={groomShort}
                    bride={brideShort}
                    className="lk-card"
                  />
                  <div className="e2__card-invite">{t.inviteTo}</div>
                  <div className="e2__card-date">15 · 11 · 2026</div>
                </div>
              </div>

              {/* Pocket front */}
              <div className="e2__part e2__pocket">
                <div className="e2__pocket-l"></div>
                <div className="e2__pocket-r"></div>
                <div className="e2__pocket-b"></div>
                <div className="e2__emboss">
                  <Corner position="bl" />
                  <Corner position="br" />
                </div>
              </div>

              {/* Flap shadow */}
              <div className="e2__part e2__flapshadow" id="flap-shadow"></div>

              {/* Foldable Flap */}
              <div className="e2__part e2__flap" id="env-flap">
                <div className="e2__flap-front">
                  <svg className="e2__flap-foil" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="flap-foil-grad" x1="0" y1="0" x2="1" y2="0.35">
                        <stop offset="0%" stopColor="#9c7124" />
                        <stop offset="25%" stopColor="#d9b15a" />
                        <stop offset="45%" stopColor="#fbefc0" />
                        <stop offset="62%" stopColor="#d9b15a" />
                        <stop offset="85%" stopColor="#9c7124" />
                        <stop offset="100%" stopColor="#d9b15a" />
                      </linearGradient>
                      <filter id="flap-foil-glow" x="-10%" y="-10%" width="120%" height="120%">
                        <feDropShadow dx="0" dy="1" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.45" />
                      </filter>
                    </defs>
                    <path
                      d="M 38 18 C 71.7 58.4, 99.7 120.0, 108 172 C 147.9 216.3, 184.7 284.3, 200 342 C 242.2 388.5, 282.2 459.7, 300 520 C 343.9 566.9, 386.3 638.9, 406 700 C 426 738, 448 770, 468 782 C 480 788, 490 792, 500 792 C 510 792, 520 788, 532 782 C 552 770, 574 738, 594 700 C 637.9 653.1, 680.3 581.1, 700 520 C 742.2 473.5, 782.2 402.3, 800 342 C 839.9 297.7, 876.7 229.7, 892 172 C 925.7 131.6, 953.7 70.0, 962 18 L 38 18 Z"
                      fill="none"
                      stroke="url(#flap-foil-grad)"
                      strokeWidth="2.4"
                      filter="url(#flap-foil-glow)"
                    />
                  </svg>
                  <div className="e2__flap-logo">
                    <Lockup
                      groom={groomShort}
                      bride={brideShort}
                      crest={false}
                      className="lk-env"
                    />
                  </div>
                </div>
                <div className="e2__flap-back">
                  <div className="e2__flap-crest">
                    <Crest />
                  </div>
                </div>
              </div>

              {/* Wax Seal Button */}
              <button
                className="e2__seal"
                id="seal"
                type="button"
                onClick={handleOpen}
                aria-label="Open the invitation / បើកធៀប"
              >
                <WaxSeal />
              </button>
            </div>
          </div>
        </div>

        <div
          className="gate__hint"
          onClick={handleOpen}
          style={{ cursor: "pointer" }}
        >
          {t.tapSeal}
        </div>
      </div>
      <div className="gate__dim" aria-hidden="true"></div>
    </div>
  );
}
