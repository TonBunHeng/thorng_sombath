import React, { useRef, useState, useEffect } from "react";
import { Corner, Crest, Lockup, WaxSeal } from "../utils/svgs";
import { playSfx, toggleMusic } from "../utils/audio";
import { pictures } from "../data/pictures";
import gsap from "gsap";

export function EnvelopeGate({ wedding, t, _lang, onOpen }) {
  const [isOpening, setIsOpening] = useState(false);
  const gateRef = useRef(null);

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
                    groom={wedding.couple.groom.km.split(" ").pop()}
                    bride={wedding.couple.bride.km.split(" ").pop()}
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
                <div className="e2__date">15 · 11 · 2026</div>
              </div>

              {/* Flap shadow */}
              <div className="e2__part e2__flapshadow" id="flap-shadow"></div>

              {/* Foldable Flap */}
              <div className="e2__part e2__flap" id="env-flap">
                <div className="e2__flap-front">
                  <svg className="e2__flap-foil" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    <path
                      d="M0 0 L100 0 Q96 28 88 44 Q76 64 62 82 Q54 92 50 100 Q46 92 38 82 Q24 64 12 44 Q4 28 0 0 Z"
                      transform="translate(50 2.5) scale(.93) translate(-50 0)"
                    />
                  </svg>
                  <div className="e2__flap-logo">
                    <Lockup
                      groom={wedding.couple.groom.km.split(" ").pop()}
                      bride={wedding.couple.bride.km.split(" ").pop()}
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
