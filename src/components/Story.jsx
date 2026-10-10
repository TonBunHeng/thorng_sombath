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

      // Horizontal track scrub
      const trackTween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
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

      // Photo entrance animations
      document.querySelectorAll(".shot").forEach((shotEl) => {
        gsap.from(shotEl.querySelector(".shot__img"), {
          clipPath: "inset(0% 0% 0% 100%)",
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: shotEl,
            containerAnimation: trackTween,
            start: "left 88%",
            once: true
          }
        });

        gsap.from(shotEl.querySelector("figcaption"), {
          y: 20,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: shotEl,
            containerAnimation: trackTween,
            start: "left 75%",
            once: true
          }
        });
      });
    }, sectionRef);

    return () => {
      if (embersInstance) embersInstance.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="story bg-olive-800 p-0 overflow-hidden" id="story">
      <div className="story__pin h-[100svh] flex items-center overflow-hidden relative">
        <canvas ref={embersRef} className="story__embers pointer-events-none opacity-0 mix-blend-screen w-full h-full absolute inset-0" id="story-embers"></canvas>
        <div ref={trackRef} className="story__track flex items-center gap-8 md:gap-16 px-4 md:px-12 will-change-transform" id="story-track">
          <div className="story__intro flex-none w-[min(80vw,560px)]">
            <span className="kicker text-foil block">{t.storyKicker}</span>
            <h2 className="display font-moul text-3xl sm:text-4xl md:text-5xl mt-1.5">{t.storyTitle}</h2>
            <div className="caps text-cream-dim flex items-center gap-3 mt-4">{t.storyHint}</div>
          </div>

          {wedding.story.map((shot, idx) => {
            const isTall = shot.ar === "2/3";
            return (
              <figure
                key={shot.k}
                className={`shot flex-none m-0 relative ${shot.v ? `shot--${shot.v}` : ""}`}
                style={{ "--ar": shot.ar, "--h": isTall ? "66svh" : "54svh" }}
              >
                <div className="shot__img rounded overflow-hidden max-w-[82vw]">
                  <img
                    src={`/img/story/${shot.k}-640.webp`}
                    srcSet={`/img/story/${shot.k}-640.webp 640w, /img/story/${shot.k}-1280.webp 1280w`}
                    sizes={isTall ? "45vh" : "80vh"}
                    alt={shot.en}
                    loading="lazy"
                    decoding="async"
                    className="w-[118%] h-full object-cover origin-center will-change-transform"
                  />
                </div>
                <figcaption className="text-cream-dim flex items-baseline gap-4 mt-3">
                  <span className="caps text-foil">
                    {lang === "km" ? toKhmerNumber(String(idx + 1).padStart(2, "0")) : String(idx + 1).padStart(2, "0")}
                  </span>
                  <span>{shot[lang]}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
