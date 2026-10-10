import React, { useEffect, useRef } from "react";
import { Butterfly, Divider } from "../utils/svgs";
import { pictures } from "../data/pictures";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Couple({ wedding, t, lang }) {
  const g = wedding.couple.groom;
  const b = wedding.couple.bride;
  const gp = wedding.families.groom;
  const bp = wedding.families.bride;
  const coupleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".couple__stage",
          start: "top 75%",
          once: true
        },
        defaults: { ease: "power2.out" }
      });

      tl.from("#couple-frame", {
        clipPath: "inset(50% 50% 50% 50%)",
        duration: 1.6,
        ease: "power3.inOut"
      })
      .from("#couple-frame img", { scale: 1.25, duration: 2.2 }, 0)
      .from(".person[data-from='left'] > *", { x: -50, opacity: 0, duration: 1.2, stagger: 0.1 }, 0.4)
      .from(".person[data-from='right'] > *", { x: 50, opacity: 0, duration: 1.2, stagger: 0.1 }, 0.4)
      .from("#couple-amp", { scale: 0, rotate: -90, duration: 1, ease: "back.out(1.8)" }, 1.0);

      // Flying butterfly scrub
      const butterflyEl = document.querySelector("#couple-butterfly");
      const ampEl = document.querySelector("#couple-amp");

      if (butterflyEl && ampEl) {
        gsap.fromTo(
          butterflyEl,
          { x: -140, y: -40, opacity: 0 },
          {
            x: 60,
            y: 20,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: coupleRef.current,
              start: "top 60%",
              end: "center 45%",
              scrub: 0.6
            }
          }
        );
      }
    }, coupleRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={coupleRef} className="chapter couple bg-olive-900 overflow-hidden" id="couple">
      <div className="chapter__head text-center max-w-[900px] mx-auto mb-10">
        <span className="kicker text-foil">{t.coupleKicker}</span>
        <Divider />
      </div>

      <div className="couple__stage grid grid-cols-1 md:grid-cols-[1fr_minmax(0,1.25fr)_1fr] items-center gap-4 md:gap-12 max-w-[1240px] mx-auto relative">
        {/* Groom */}
        <div className="person text-center" data-from="left">
          <div className="caps text-foil">{t.groomLabel}</div>
          <div className="person__name foil font-moul my-1 text-2xl sm:text-3xl md:text-4xl">{g[lang]}</div>
          <div className="person__en font-script text-foil-hi text-2xl sm:text-3xl md:text-4xl leading-tight">{g.en}</div>
          <div className="person__parents text-cream-dim mt-3.5 text-sm leading-relaxed">
            <span>{t.sonOf}</span>
            <br />
            <span>
              {gp.father[lang]} {lang === "km" ? "និង" : "&"} {gp.mother[lang]}
            </span>
          </div>
        </div>

        {/* Center photo in scallop frame */}
        <div className="couple__photo relative">
          <div className="scallop-frame" id="couple-frame">
            <img
              src={pictures.couple.main}
              srcSet={pictures.couple.srcSet}
              sizes="(max-width:860px) 86vw, 40vw"
              alt={pictures.couple.alt}
              loading="lazy"
              style={{ objectPosition: "40% 50%" }}
            />
          </div>
          <div className="couple__amp absolute -bottom-[1.2rem] left-1/2 -translate-x-1/2 w-[84px] h-[84px] font-script rounded-full grid place-items-center text-5xl leading-none bg-olive-900 shadow-[0_0_0_1px_rgba(217,177,90,0.6)]" id="couple-amp">
            <span className="foil">&amp;</span>
          </div>
          <div className="couple__butterfly pointer-events-none w-[50px] h-[40px] absolute top-0 left-0" id="couple-butterfly">
            <Butterfly />
          </div>
        </div>

        {/* Bride */}
        <div className="person text-center" data-from="right">
          <div className="caps text-foil">{t.brideLabel}</div>
          <div className="person__name foil font-moul my-1 text-2xl sm:text-3xl md:text-4xl">{b[lang]}</div>
          <div className="person__en font-script text-foil-hi text-2xl sm:text-3xl md:text-4xl leading-tight">{b.en}</div>
          <div className="person__parents text-cream-dim mt-3.5 text-sm leading-relaxed">
            <span>{t.daughterOf}</span>
            <br />
            <span>
              {bp.father[lang]} {lang === "km" ? "និង" : "&"} {bp.mother[lang]}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
