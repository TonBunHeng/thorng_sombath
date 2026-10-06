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
              trigger: "#couple",
              start: "top 60%",
              end: "center 45%",
              scrub: 1.2
            }
          }
        );
      }
    }, coupleRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={coupleRef} className="chapter couple" id="couple">
      <div className="chapter__head">
        <span className="kicker">{t.coupleKicker}</span>
        <Divider />
      </div>

      <div className="couple__stage">
        {/* Groom */}
        <div className="person" data-from="left">
          <div className="caps">{t.groomLabel}</div>
          <div className="person__name foil">{g[lang]}</div>
          <div className="person__en">{g.en}</div>
          <div className="person__parents">
            <span>{t.sonOf}</span>
            <br />
            <span>
              {gp.father[lang]} {lang === "km" ? "និង" : "&"} {gp.mother[lang]}
            </span>
          </div>
        </div>

        {/* Center photo in scallop frame */}
        <div className="couple__photo">
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
          <div className="couple__amp" id="couple-amp">
            <span className="foil">&amp;</span>
          </div>
          <div className="couple__butterfly" id="couple-butterfly">
            <Butterfly />
          </div>
        </div>

        {/* Bride */}
        <div className="person" data-from="right">
          <div className="caps">{t.brideLabel}</div>
          <div className="person__name foil">{b[lang]}</div>
          <div className="person__en">{b.en}</div>
          <div className="person__parents">
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
