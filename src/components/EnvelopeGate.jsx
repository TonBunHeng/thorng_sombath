import React, { useRef, useState, useEffect } from "react";
import { Corner, Crest, Lockup, WaxSeal, VineInner, FlapBorder, getFlapFoilPath } from "../utils/svgs";
import { playSfx, toggleMusic } from "../utils/audio";
import { formatDate } from "../data/i18n";
import gsap from "gsap";

export function EnvelopeGate({ wedding, t, lang, onOpen, startIntro = true }) {
  const [mounted, setMounted] = useState(true);
  const gateRef = useRef(null);
  const isOpeningRef = useRef(false);

  const groomShort = wedding.couple.groom.shortKm || wedding.couple.groom.km.split(" ").pop();
  const brideShort = wedding.couple.bride.shortKm || wedding.couple.bride.km.split(" ").pop();

  const formattedDate = formatDate(wedding.date, lang);
  const dateShort = formattedDate.short;

  useEffect(() => {
    if (!startIntro) return;

    const gate = gateRef.current;
    if (!gate) return;

    const env = gate.querySelector("#env");
    const tilt = gate.querySelector("#env-tilt");
    const seal = gate.querySelector("#seal");

    const ctx = gsap.context(() => {
      // Intro entrance using explicit fromTo
      gsap.fromTo(
        ".gate__invite > *",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", stagger: 0.12, delay: 0.1 }
      );
      gsap.fromTo(
        env,
        { y: 80, rotateX: 22, opacity: 0 },
        { y: 0, rotateX: 0, opacity: 1, duration: 1.6, ease: "power3.out", delay: 0.15 }
      );
      gsap.fromTo(
        seal,
        { scale: 1.25, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9, ease: "back.out(2)", delay: 0.9 }
      );
      gsap.fromTo(
        ".gate__hint",
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.3 }
      );

      // Idle float
      gsap.to(tilt, { y: -6, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 });
    }, gateRef);

    // 3D tilt tracking
    gsap.set(tilt, { rotateX: 6 });
    const updateTilt = (nx, ny) => {
      gsap.to(tilt, { rotateY: nx * 9, rotateX: 6 - ny * 7, duration: 0.8, ease: "power3.out", overwrite: "auto" });
    };

    const handlePointerMove = (e) => {
      if (isOpeningRef.current) return;
      updateTilt(e.clientX / window.innerWidth - 0.5, e.clientY / window.innerHeight - 0.5);
    };

    const handleDeviceOrientation = (e) => {
      if (isOpeningRef.current || e.gamma == null) return;
      updateTilt(gsap.utils.clamp(-0.5, 0.5, e.gamma / 40), gsap.utils.clamp(-0.5, 0.5, (e.beta - 45) / 40));
    };

    const isFine = matchMedia("(pointer: fine)").matches;
    if (isFine) {
      gate.addEventListener("pointermove", handlePointerMove);
    } else {
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    }

    return () => {
      gate.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
      ctx.revert();
    };
  }, [startIntro]);

  const handleTriggerOpen = () => {
    if (isOpeningRef.current) return;
    isOpeningRef.current = true;

    const gate = gateRef.current;
    if (!gate) return;

    const tilt = gate.querySelector("#env-tilt");
    const seal = gate.querySelector("#seal");
    const parts = gate.querySelectorAll(".e2__part");

    gate.classList.add("is-opening");

    // Audio sfx and background music
    playSfx("paper");
    setTimeout(() => playSfx("chime"), 550);
    toggleMusic(true, wedding.music);

    let opened = false;
    const triggerPageOpen = () => {
      if (opened) return;
      opened = true;
      onOpen();
      gsap.to(gate, {
        opacity: 0,
        duration: 1.1,
        ease: "power1.inOut",
        onComplete: () => setMounted(false)
      });
    };

    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    tl.to(tilt, { rotateX: 4, rotateY: 0, y: 0, duration: 0.6 }, 0)
      .to(".gate__invite, .gate__hint", { opacity: 0, y: -14, duration: 0.7 }, 0)
      .to(seal, { scale: 0.93, duration: 0.18, ease: "power2.in" }, 0)
      .to(seal, { scale: 1.1, y: -18, rotate: -10, duration: 0.55, ease: "power2.out" }, 0.18)
      .to(seal, { "--seal-shadow": 1, duration: 0.55 }, 0.18)
      .to(seal, { x: "38vw", y: "60vh", rotate: 70, scale: 0.9, duration: 0.9, ease: "power2.in" }, 0.8)
      .to("#env-flap", { rotateX: 180, duration: 1.6, ease: "power2.inOut" }, 0.75)
      .to("#flap-shadow", { opacity: 0, duration: 0.7 }, 0.75)
      .set("#env-flap", { zIndex: 1 }, 1.55)
      .to("#env-card", { yPercent: -66, rotate: -1.4, duration: 1.5, ease: "power2.inOut" }, 2.15)
      .to(parts, { yPercent: 7, duration: 1.5, ease: "power2.inOut" }, 2.15)
      .set("#env-card", { zIndex: 6 }, 3.6)
      .to(parts, { yPercent: 135, rotate: 3, duration: 1, ease: "power2.in" }, 3.6)
      .to(".e2__ground", { opacity: 0, duration: 0.6 }, 3.6)
      .to("#env-card", { yPercent: -20, rotate: 0, scale: 1.35, duration: 1.2, ease: "power3.inOut" }, 3.7)
      .to(".gate__dim", { opacity: 1, duration: 0.9, ease: "power1.in" }, 4.6)
      .to("#env-card", { scale: 2.4, opacity: 0, duration: 1, ease: "power2.in" }, 4.6)
      .add(triggerPageOpen, 5.45);

    setTimeout(triggerPageOpen, 7500);
  };

  if (!mounted) return null;

  return (
    <div className="gate" id="gate" ref={gateRef} role="dialog" aria-modal="true" aria-labelledby="gate-guest">
      <picture className="gate__bg" aria-hidden="true">
        <source media="(max-aspect-ratio: 1/1)" srcSet="/img/words/words-640.webp 640w, /img/words/words-1280.webp 1280w" sizes="100vw" />
        <img src="/img/couple/cozy-1280.webp" srcSet="/img/couple/cozy-1280.webp 1280w, /img/couple/cozy-2000.webp 2000w" sizes="100vw" alt="" />
      </picture>
      <svg className="gate__florals emboss" id="gate-florals" viewBox="0 0 400 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g transform="translate(0 0)"><VineInner /></g>
        <g transform="translate(400 800) scale(-1 -1)"><VineInner /></g>
        <g transform="translate(400 120) scale(-.7 .7)"><VineInner /></g>
        <g transform="translate(0 690) scale(.6 -.6)"><VineInner /></g>
      </svg>
      <div className="gate__stage">
        <div className="gate__invite">
          <div className="gate__kicker foil" data-t="kicker">{t.kicker}</div>
        </div>
        <div id="env-mount">
          <div className="e2" id="env" onClick={handleTriggerOpen}>
            <div className="e2__ground" aria-hidden="true"></div>
            <div className="e2__stage" id="env-tilt">
              <div className="e2__part e2__back"></div>
              <div className="e2__card" id="env-card">
                <div className="e2__card-frame"></div>
                <div className="e2__card-corners">
                  <Corner position="tl" />
                  <Corner position="tr" />
                  <Corner position="bl" />
                  <Corner position="br" />
                </div>
                <div className="e2__card-inner">
                  <div className="e2__card-kicker" data-t="kicker">{t.kicker}</div>
                  <Lockup groom={groomShort} bride={brideShort} crest={true} className="lk-card" />
                  <div className="e2__card-invite" data-t="inviteTo">{t.inviteTo}</div>
                  <div className="e2__card-date">{dateShort}</div>
                </div>
              </div>
              <div className="e2__part e2__pocket">
                <div className="e2__pocket-l"></div>
                <div className="e2__pocket-r"></div>
                <div className="e2__pocket-b"></div>
                <div className="e2__emboss">
                  <Corner position="bl" />
                  <Corner position="br" />
                </div>
                <div className="e2__date">{dateShort}</div>
              </div>
              <div className="e2__part e2__flapshadow" id="flap-shadow"></div>
              <div className="e2__part e2__flap" id="env-flap">
                <div className="e2__flap-front">
                  <svg className="e2__flap-foil" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    <path d={getFlapFoilPath()} transform="translate(50 2.5) scale(.93) translate(-50 0)" />
                  </svg>
                  <FlapBorder />
                  <div className="e2__flap-logo">
                    <Lockup groom={groomShort} bride={brideShort} crest={false} className="lk-env" />
                  </div>
                </div>
                <div className="e2__flap-back">
                  <div className="e2__flap-crest"><Crest /></div>
                </div>
              </div>
              <button
                className="e2__seal"
                id="seal"
                type="button"
                aria-label="Open the invitation / បើកធៀប"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTriggerOpen();
                }}
              >
                <WaxSeal />
              </button>
            </div>
          </div>
        </div>
        <div className="gate__hint" data-t="tapSeal">{t.tapSeal}</div>
      </div>
      <div className="gate__dim" aria-hidden="true"></div>
    </div>
  );
}
