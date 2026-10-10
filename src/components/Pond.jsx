import React, { useEffect, useRef } from "react";
import { initPondWater } from "../utils/canvasEffects";
import { playSfx } from "../utils/audio";
import { FloatingLotus } from "../utils/svgs";
import { pictures } from "../data/pictures";
import gsap from "gsap";

export function Pond({ wedding, t, lang }) {
  const canvasRef = useRef(null);
  const stickyRef = useRef(null);

  const groomShort = lang === "km"
    ? wedding.couple.groom.km.split(" ").pop()
    : (wedding.couple.groom.shortEn || wedding.couple.groom.en.split(" ").pop());
  const brideShort = lang === "km"
    ? wedding.couple.bride.km.split(" ").pop()
    : (wedding.couple.bride.shortEn || wedding.couple.bride.en.split(" ").pop());

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
    <section className="pond bg-night h-[130svh] p-0 relative overflow-clip" id="pond">
      <div ref={stickyRef} className="pond__sticky h-[100svh] sticky top-0">
        <picture>
          <source media="(min-aspect-ratio: 1/1)" srcSet={pictures.pond.srcSetWater} sizes="100vw" />
          <img
            className="pond__fallback w-full h-full absolute inset-0 object-cover object-[50%_30%]"
            src={pictures.pond.fallback1280}
            srcSet={`${pictures.pond.fallback640} 640w, ${pictures.pond.fallback1280} 1280w, ${pictures.pond.fallback2000} 2000w`}
            sizes="100vw"
            alt={pictures.pond.alt}
            loading="lazy"
            id="pond-img"
          />
        </picture>
        <canvas ref={canvasRef} className="pond__canvas w-full h-full absolute inset-0" id="pond-canvas"></canvas>
        <div className="pond__shade absolute inset-0 pointer-events-none"></div>
        <div className="pond__text text-center px-4 md:px-8 pointer-events-none absolute top-[max(70px,7svh)] inset-x-0">
          <div className="kicker text-foil-hi">{t.pondKicker}</div>
          <div className="display foil font-moul text-3xl sm:text-4xl md:text-5xl drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)]">
            <span>{groomShort}</span>{" "}
            <span style={{ fontFamily: "var(--f-script)" }}>&amp;</span>{" "}
            <span>{brideShort}</span>
          </div>
        </div>
        <div className="pond__hint text-center text-cream pointer-events-none text-sm absolute bottom-[8svh] inset-x-0">{t.pondLine}</div>
      </div>
    </section>
  );
}
