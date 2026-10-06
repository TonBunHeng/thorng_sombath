import React, { useEffect, useRef } from "react";
import { initPondWater } from "../utils/canvasEffects";
import { playSfx } from "../utils/audio";
import { FloatingLotus } from "../utils/svgs";
import { pictures } from "../data/pictures";
import gsap from "gsap";

export function Pond({ wedding, t, lang }) {
  const canvasRef = useRef(null);
  const stickyRef = useRef(null);

  const groomShort = lang === "km" ? wedding.couple.groom.km.split(" ").pop() : wedding.couple.groom.en.split(" ").pop();
  const brideShort = lang === "km" ? wedding.couple.bride.km.split(" ").pop() : wedding.couple.bride.en.split(" ").pop();

  useEffect(() => {
    let pondInstance = null;

    const handleTap = (clientX, clientY) => {
      playSfx("drop");

      if (stickyRef.current) {
        const lotus = document.createElement("div");
        lotus.className = "wish-float";
        lotus.innerHTML = FloatingLotus();
        lotus.style.left = `${clientX}px`;
        lotus.style.top = `${clientY}px`;
        stickyRef.current.appendChild(lotus);

        gsap.fromTo(
          lotus,
          { scale: 0.3, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" }
        );

        gsap.to(lotus, {
          y: -120 - Math.random() * 60,
          x: (Math.random() - 0.5) * 80,
          opacity: 0,
          duration: 5,
          ease: "sine.out",
          delay: 0.4,
          onComplete: () => lotus.remove()
        });
      }
    };

    if (canvasRef.current) {
      pondInstance = initPondWater(canvasRef.current, null, { onTap: handleTap });
    }

    return () => {
      if (pondInstance) pondInstance.destroy();
    };
  }, []);

  return (
    <section className="pond" id="pond">
      <div ref={stickyRef} className="pond__sticky" id="pond-sticky">
        <picture>
          <source media="(min-aspect-ratio: 1/1)" srcSet={pictures.pond.srcSetWater} sizes="100vw" />
          <img
            className="pond__fallback"
            src={pictures.pond.fallback1280}
            srcSet={`${pictures.pond.fallback640} 640w, ${pictures.pond.fallback1280} 1280w, ${pictures.pond.fallback2000} 2000w`}
            sizes="100vw"
            alt={pictures.pond.alt}
            loading="lazy"
            id="pond-img"
          />
        </picture>
        <canvas ref={canvasRef} className="pond__canvas" id="pond-canvas"></canvas>
        <div className="pond__shade"></div>
        <div className="pond__text">
          <div className="kicker">{t.pondKicker}</div>
          <div className="display foil" style={{ fontSize: "var(--t-l)" }}>
            <span>{groomShort}</span>{" "}
            <span style={{ fontFamily: "var(--f-script)" }}>&amp;</span>{" "}
            <span>{brideShort}</span>
          </div>
        </div>
        <div className="pond__hint">{t.pondLine}</div>
      </div>
    </section>
  );
}
