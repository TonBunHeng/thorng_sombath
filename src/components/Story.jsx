import React, { useEffect, useRef } from "react";
import { initEmbers } from "../utils/canvasEffects";
import { toKhmerNumber } from "../data/i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Story({ wedding, t, lang }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const embersRef = useRef(null);

  useEffect(() => {
    let embersInstance = null;
    if (embersRef.current) {
      embersInstance = initEmbers(embersRef.current, { count: 24, intensity: 0.8 });
    }

    const section = sectionRef.current;
    const track = trackRef.current;

    const ctx = gsap.context(() => {
      if (!track || !section) return;

      const getScrollDistance = () => track.scrollWidth - window.innerWidth;

      const skewSetter = gsap.quickTo(track.querySelectorAll(".shot__img"), "skewX", {
        duration: 0.5,
        ease: "power3"
      });
      let skewTimer = null;

      // Horizontal track scrub with responsive, silky smooth tracking
      const trackTween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 0.35,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const skewVal = gsap.utils.clamp(-4, 4, self.getVelocity() / -400);
            skewSetter(skewVal);
            clearTimeout(skewTimer);
            skewTimer = setTimeout(() => skewSetter(0), 120);

            if (embersInstance) {
              embersInstance.setIntensity(Math.min(1, Math.max(0, (self.progress - 0.4) * 2.5)));
            }
          }
        }
      });

      // Background color shift from day -> dusk -> night
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: true,
          invalidateOnRefresh: true
        }
      })
      .to(section, { backgroundColor: "#4a4a22", ease: "none", duration: 1 })
      .to(section, { backgroundColor: "#4a2a1a", ease: "none", duration: 1 })
      .to(section, { backgroundColor: "#120f0b", ease: "none", duration: 1 });

      // Photo parallax animations matching reference
      track.querySelectorAll(".shot").forEach((shotEl) => {
        const img = shotEl.querySelector("img");
        if (img) {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: shotEl,
                containerAnimation: trackTween,
                start: "left right",
                end: "right left",
                scrub: true
              }
            }
          );
        }
      });
    }, sectionRef);

    return () => {
      if (embersInstance) embersInstance.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="story" id="story">
      <div className="story__pin">
        <canvas ref={embersRef} className="story__embers" id="story-embers"></canvas>
        <div ref={trackRef} className="story__track" id="story-track">
          <div className="story__intro">
            <span className="kicker">{t.storyKicker}</span>
            <h2 className="display">{t.storyTitle}</h2>
            <div className="caps">{t.storyHint}</div>
          </div>

          {wedding.story.map((shot, idx) => {
            const isTall = shot.ar === "2/3";
            return (
              <figure
                key={shot.k}
                className={`shot ${shot.v ? `shot--${shot.v}` : ""}`}
                style={{ "--ar": shot.ar, "--h": isTall ? "66svh" : "54svh" }}
              >
                <div className="shot__img">
                  <img
                    src={`/img/${shot.k}-640.webp`}
                    srcSet={`/img/${shot.k}-640.webp 640w, /img/${shot.k}-1280.webp 1280w`}
                    sizes={isTall ? "45vh" : "80vh"}
                    alt={shot.en}
                    loading={idx < 4 ? "eager" : "lazy"}
                    decoding="async"
                    onLoad={() => ScrollTrigger.refresh()}
                  />
                </div>
                <figcaption>
                  <span className="caps">
                    {lang === "km" ? toKhmerNumber(String(idx + 1).padStart(2, "0")) : String(idx + 1).padStart(2, "0")}
                  </span>
                  <span>{shot[lang]}</span>
                </figcaption>
              </figure>
            );
          })}

          <div className="story__end">
            <div className="kicker" style={{ color: "var(--foil)" }}>
              {lang === "km" ? "ហើយដំណើរនៃស្នេហ៍" : "and our story"}
            </div>
            <div className="display foil">
              {lang === "km" ? "នឹងបន្តជារៀងរហូត" : "continues forever"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
